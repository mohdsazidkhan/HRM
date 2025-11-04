import { Attendance } from "../models/Attendance.model.js"
import { Employee } from "../models/Employee.model.js"

// Helper function to calculate total working hours from logs
const calculateTotalWorkingHours = (logs) => {
    if (!logs || logs.length === 0) return 0;
    
    let totalMinutes = 0;
    logs.forEach(log => {
        if (log.checkIn && log.checkOut) {
            const diff = new Date(log.checkOut) - new Date(log.checkIn);
            totalMinutes += diff / (1000 * 60); // Convert to minutes
        }
    });
    
    return Math.round(totalMinutes / 60 * 100) / 100; // Round to 2 decimal places
};

// Helper function to normalize date to start of day
const normalizeDate = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
};

// Mark check-in - creates attendance if missing, pushes new log
export const HandleCheckIn = async (req, res) => {
    try {
        const employeeID = req.EMid || req.body.employeeID;
        const { location, device } = req.body;

        if (!employeeID) {
            return res.status(400).json({ success: false, message: "Employee ID is required" });
        }

        const employee = await Employee.findOne({ _id: employeeID, organizationID: req.ORGID });
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        const today = normalizeDate(new Date());
        const checkInTime = new Date();

        // Find or create attendance for today
        let attendance = await Attendance.findOne({
            employee: employeeID,
            date: today,
            organizationID: req.ORGID
        });

        if (!attendance) {
            attendance = await Attendance.create({
                employee: employeeID,
                date: today,
                organizationID: req.ORGID,
                logs: []
            });
        }

        // Add new check-in log
        attendance.logs.push({
            checkIn: checkInTime,
            checkOut: null,
            location: location || null,
            device: device || null
        });

        await attendance.save();

        // Calculate total working hours
        const totalHours = calculateTotalWorkingHours(attendance.logs);
        const hasActiveCheckIn = attendance.logs.some(log => !log.checkOut);
        const status = hasActiveCheckIn ? "Check-In" : (totalHours > 0 ? "Check-Out" : "No Check-In");

        return res.status(200).json({
            success: true,
            message: "Check-in recorded successfully",
            data: {
                ...attendance.toObject(),
                totalWorkingHours: totalHours,
                checkInCount: attendance.logs.length,
                status: "Check-In"
            }
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: "Attendance record already exists for today" });
        }
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Mark check-out - updates latest log with checkOut time
export const HandleCheckOut = async (req, res) => {
    try {
        const employeeID = req.EMid || req.body.employeeID;

        if (!employeeID) {
            return res.status(400).json({ success: false, message: "Employee ID is required" });
        }

        const employee = await Employee.findOne({ _id: employeeID, organizationID: req.ORGID });
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        const today = normalizeDate(new Date());
        const checkOutTime = new Date();

        // Find attendance for today
        const attendance = await Attendance.findOne({
            employee: employeeID,
            date: today,
            organizationID: req.ORGID
        });

        if (!attendance) {
            return res.status(404).json({ success: false, message: "No attendance record found for today. Please check in first." });
        }

        // Find the latest log without checkOut
        const latestLog = attendance.logs
            .filter(log => !log.checkOut)
            .sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn))[0];

        if (!latestLog) {
            return res.status(400).json({ success: false, message: "No active check-in found. Please check in first." });
        }

        // Update checkOut time
        latestLog.checkOut = checkOutTime;
        await attendance.save();

        // Calculate total working hours
        const totalHours = calculateTotalWorkingHours(attendance.logs);
        const hasActiveCheckIn = attendance.logs.some(log => !log.checkOut);

        return res.status(200).json({
            success: true,
            message: "Check-out recorded successfully",
            data: {
                ...attendance.toObject(),
                totalWorkingHours: totalHours,
                checkInCount: attendance.logs.length,
                status: "Check-Out"
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Get attendance by employee and date range
export const HandleGetAttendanceByEmployee = async (req, res) => {
    try {
        const employeeID = req.EMid || req.params.employeeID || req.query.employeeID;
        const { startDate, endDate } = req.query;

        if (!employeeID) {
            return res.status(400).json({ success: false, message: "Employee ID is required" });
        }

        const employee = await Employee.findOne({ _id: employeeID, organizationID: req.ORGID });
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        const query = {
            employee: employeeID,
            organizationID: req.ORGID
        };

        if (startDate || endDate) {
            query.date = {};
            if (startDate) {
                query.date.$gte = normalizeDate(new Date(startDate));
            }
            if (endDate) {
                const end = normalizeDate(new Date(endDate));
                end.setHours(23, 59, 59, 999);
                query.date.$lte = end;
            }
        }

        const attendanceRecords = await Attendance.find(query)
            .populate("employee", "firstname lastname email department")
            .sort({ date: -1 });

        // Add calculated fields
        const attendanceWithCalculations = attendanceRecords.map(record => {
            const totalHours = calculateTotalWorkingHours(record.logs);
            const hasActiveCheckIn = record.logs.some(log => !log.checkOut);
            const status = hasActiveCheckIn ? "Check-In" : (totalHours > 0 ? "Check-Out" : "No Check-In");
            return {
                ...record.toObject(),
                totalWorkingHours: totalHours,
                checkInCount: record.logs.length,
                status
            };
        });

        return res.status(200).json({
            success: true,
            message: "Attendance records retrieved successfully",
            data: attendanceWithCalculations
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Get all employees' attendance for admin view with filters
export const HandleGetAllAttendance = async (req, res) => {
    try {
        const { employeeID, startDate, endDate, status } = req.query;

        const query = {
            organizationID: req.ORGID
        };

        // Filter by employee
        if (employeeID) {
            query.employee = employeeID;
        }

        // Filter by date range
        if (startDate || endDate) {
            query.date = {};
            if (startDate) {
                query.date.$gte = normalizeDate(new Date(startDate));
            }
            if (endDate) {
                const end = normalizeDate(new Date(endDate));
                end.setHours(23, 59, 59, 999);
                query.date.$lte = end;
            }
        }

        let attendanceRecords = await Attendance.find(query)
            .populate("employee", "firstname lastname email department designation")
            .sort({ date: -1, createdAt: -1 });

        // Add calculated fields
        let attendanceWithCalculations = attendanceRecords.map(record => {
            const totalHours = calculateTotalWorkingHours(record.logs);
            const hasActiveCheckIn = record.logs.some(log => !log.checkOut);
            const status = hasActiveCheckIn ? "Check-In" : (totalHours > 0 ? "Check-Out" : "No Check-In");
            return {
                ...record.toObject(),
                totalWorkingHours: totalHours,
                checkInCount: record.logs.length,
                status
            };
        });

        // Filter by status (client-side filtering after calculation)
        if (status) {
            attendanceWithCalculations = attendanceWithCalculations.filter(record => 
                record.status.toLowerCase() === status.toLowerCase()
            );
        }

        return res.status(200).json({
            success: true,
            message: "All attendance records retrieved successfully",
            data: attendanceWithCalculations
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Get single attendance record by ID
export const HandleGetAttendance = async (req, res) => {
    try {
        const { attendanceID } = req.params;

        if (!attendanceID) {
            return res.status(400).json({ success: false, message: "Attendance ID is required" });
        }

        const attendance = await Attendance.findOne({ _id: attendanceID, organizationID: req.ORGID })
            .populate("employee", "firstname lastname email department designation");

        if (!attendance) {
            return res.status(404).json({ success: false, message: "Attendance not found" });
        }

        const totalHours = calculateTotalWorkingHours(attendance.logs);

        return res.status(200).json({
            success: true,
            message: "Attendance record retrieved successfully",
            data: {
                ...attendance.toObject(),
                totalWorkingHours: totalHours,
                checkInCount: attendance.logs.length,
                status
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Get today's attendance for current employee
export const HandleGetTodayAttendance = async (req, res) => {
    try {
        const employeeID = req.EMid;

        if (!employeeID) {
            return res.status(400).json({ success: false, message: "Employee ID is required" });
        }

        const today = normalizeDate(new Date());

        const attendance = await Attendance.findOne({
            employee: employeeID,
            date: today,
            organizationID: req.ORGID
        })
        .populate("employee", "firstname lastname email department");

        if (!attendance) {
            return res.status(200).json({
                success: true,
                message: "No attendance record for today",
                data: null
            });
        }

        const totalHours = calculateTotalWorkingHours(attendance.logs);
        const hasActiveCheckIn = attendance.logs.some(log => !log.checkOut);
        const status = hasActiveCheckIn ? "Check-In" : (totalHours > 0 ? "Check-Out" : "No Check-In");

        return res.status(200).json({
            success: true,
            message: "Today's attendance retrieved successfully",
            data: {
                ...attendance.toObject(),
                totalWorkingHours: totalHours,
                checkInCount: attendance.logs.length,
                status
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Delete attendance record (admin only)
export const HandleDeleteAttendance = async (req, res) => {
    try {
        const { attendanceID } = req.params;

        if (!attendanceID) {
            return res.status(400).json({ success: false, message: "Attendance ID is required" });
        }

        const attendance = await Attendance.findOne({ _id: attendanceID, organizationID: req.ORGID });

        if (!attendance) {
            return res.status(404).json({ success: false, message: "Attendance not found" });
        }

        await attendance.deleteOne();

        return res.status(200).json({ success: true, message: "Attendance record deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};
