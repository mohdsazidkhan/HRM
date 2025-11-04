import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Attendance } from '../models/Attendance.model.js';
import { Employee } from '../models/Employee.model.js';
import { Organization } from '../models/Organization.model.js';

dotenv.config();

const normalizeDate = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
};

const calculateTotalWorkingHours = (logs) => {
    if (!logs || logs.length === 0) return 0;
    let totalMinutes = 0;
    logs.forEach(log => {
        if (log.checkIn && log.checkOut) {
            const diff = new Date(log.checkOut) - new Date(log.checkIn);
            totalMinutes += diff / (1000 * 60);
        }
    });
    return Math.round(totalMinutes / 60 * 100) / 100;
};

const seedAttendance = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Get a sample organization
        const org = await Organization.findOne();
        if (!org) {
            console.log('No organization found. Please create an organization first.');
            process.exit(1);
        }

        // Get all employees
        const employees = await Employee.find({ organizationID: org._id });
        if (employees.length === 0) {
            console.log('No employees found. Please create employees first.');
            process.exit(1);
        }

        console.log(`Found ${employees.length} employees. Creating sample attendance records...`);

        // Clear existing attendance records
        await Attendance.deleteMany({ organizationID: org._id });
        console.log('Cleared existing attendance records.');

        const attendanceRecords = [];
        const today = new Date();

        // Create attendance for last 7 days for each employee
        for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
            const date = new Date(today);
            date.setDate(date.getDate() - dayOffset);
            const normalizedDate = normalizeDate(date);

            for (const employee of employees) {
                // Skip some days randomly (simulate weekends/absences)
                if (dayOffset > 0 && Math.random() > 0.7) continue;

                const logs = [];
                const checkInHour = 9 + Math.floor(Math.random() * 2); // 9-10 AM
                const checkInMinute = Math.floor(Math.random() * 60);
                
                // 70% chance of having check-out
                const hasCheckOut = Math.random() > 0.3;
                
                if (hasCheckOut) {
                    const checkOutHour = 17 + Math.floor(Math.random() * 2); // 5-6 PM
                    const checkOutMinute = Math.floor(Math.random() * 60);

                    const checkIn = new Date(normalizedDate);
                    checkIn.setHours(checkInHour, checkInMinute, 0, 0);

                    const checkOut = new Date(normalizedDate);
                    checkOut.setHours(checkOutHour, checkOutMinute, 0, 0);

                    logs.push({
                        checkIn,
                        checkOut,
                        location: `Office Building, Floor ${Math.floor(Math.random() * 5) + 1}`,
                        device: `Device-${Math.floor(Math.random() * 1000)}`
                    });

                    // 30% chance of multiple check-ins (lunch break simulation)
                    if (Math.random() > 0.7) {
                        const lunchCheckOut = new Date(checkIn);
                        lunchCheckOut.setHours(13, 0, 0, 0);

                        const lunchCheckIn = new Date(checkIn);
                        lunchCheckIn.setHours(14, Math.floor(Math.random() * 30), 0, 0);

                        logs.push({
                            checkIn: lunchCheckIn,
                            checkOut: checkOut,
                            location: `Office Building, Floor ${Math.floor(Math.random() * 5) + 1}`,
                            device: `Device-${Math.floor(Math.random() * 1000)}`
                        });

                        // Update first log to end at lunch
                        logs[0].checkOut = lunchCheckOut;
                    }
                } else {
                    // Only check-in, no check-out (active session)
                    const checkIn = new Date(normalizedDate);
                    checkIn.setHours(checkInHour, checkInMinute, 0, 0);

                    logs.push({
                        checkIn,
                        checkOut: null,
                        location: `Office Building, Floor ${Math.floor(Math.random() * 5) + 1}`,
                        device: `Device-${Math.floor(Math.random() * 1000)}`
                    });
                }

                try {
                    const attendance = await Attendance.create({
                        employee: employee._id,
                        date: normalizedDate,
                        logs,
                        organizationID: org._id
                    });

                    attendanceRecords.push({
                        ...attendance.toObject(),
                        totalWorkingHours: calculateTotalWorkingHours(attendance.logs),
                        checkInCount: attendance.logs.length
                    });
                } catch (error) {
                    if (error.code === 11000) {
                        console.log(`Attendance already exists for ${employee.firstname} on ${normalizedDate.toDateString()}`);
                    } else {
                        console.error(`Error creating attendance for ${employee.firstname}:`, error.message);
                    }
                }
            }
        }

        console.log(`\n✅ Successfully created ${attendanceRecords.length} attendance records!`);
        console.log('\nSample attendance records:');
        attendanceRecords.slice(0, 5).forEach((record, index) => {
            console.log(`\n${index + 1}. Employee: ${record.employee?.firstname || 'N/A'}`);
            console.log(`   Date: ${new Date(record.date).toDateString()}`);
            console.log(`   Total Hours: ${record.totalWorkingHours || 0}h`);
            console.log(`   Check-ins: ${record.checkInCount || 0}`);
            console.log(`   Logs: ${record.logs?.length || 0}`);
        });

        await mongoose.connection.close();
        console.log('\n✅ Seed completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding attendance:', error);
        await mongoose.connection.close();
        process.exit(1);
    }
};

// Run the seed function
seedAttendance();

