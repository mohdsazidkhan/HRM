import { Department } from "../models/Department.model.js" 
import { Employee } from "../models/Employee.model.js"
import { Organization } from "../models/Organization.model.js"
import { Notice } from "../models/Notice.model.js"

export const HandleAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({ organizationID: req.ORGID })
            .populate("department", "name")
            .populate("designation", "name")
            .select("firstname lastname email contactnumber department designation attendance notice salary leaverequest generaterequest isverified")
        return res.status(200).json({ success: true, data: employees, type: "AllEmployees" })
    } catch (error) {
        return res.status(500).json({ success: false, error: error, message: "internal server error" })
    }
}

export const HandleAllEmployeesIDS = async (req, res) => {
    try {
        const employees = await Employee.find({ organizationID: req.ORGID })
            .populate("department", "name")
            .populate("designation", "name")
            .select("firstname lastname department designation")
        return res.status(200).json({ success: true, data: employees, type: "AllEmployeesIDS" })
    } catch (error) {
        return res.status(500).json({ success: false, error: error, message: "internal server error" })
    }
}

export const HandleEmployeeByHR = async (req, res) => {
    try {
        const { employeeId } = req.params
        const employee = await Employee.findOne({ _id: employeeId, organizationID: req.ORGID }).select("firstname lastname email contactnumber department attendance notice salary leaverequest generaterequest")

        if (!employee) {
            return res.status(404).json({ success: false, message: "employee not found" })
        }
        
        return res.status(200).json({ success: true, data: employee, type: "GetEmployee" })
    }
    catch (error) {
        return res.status(404).json({ success: false, error: error, message: "employee not found" }) 
    }
}

export const HandleEmployeeByEmployee = async (req, res) => {
    try {
        let employee = await Employee.findOne({ _id: req.EMid, organizationID: req.ORGID })
            .select("firstname lastname email contactnumber department designation attendance notice salary leaverequest generaterequest")
            .populate("department", "name")
            .populate("designation", "name")
            .populate("attendance", "status attendancelog updatedAt createdAt")
            .populate("generaterequest", "requesttitle requestconent status createdAt")
            .populate("notice", "title audience createdAt")
            .populate({
                path: "leaverequest",
                select: "title reason startdate enddate status createdAt",
                options: { sort: { createdAt: -1 } }
            })

        if (!employee) {
            return res.status(404).json({ success: false, message: "employee not found" })
        }

        // Also include department-specific notices
        const deptId = employee.department?._id || employee.department
        if (deptId) {
        const deptNotices = await Notice.find({ department: deptId, organizationID: req.ORGID })
                .select("title audience createdAt")
                .sort({ createdAt: -1 })
                .limit(10)
                .lean()
            const empObj = employee.toObject()
            empObj.notice = Array.isArray(empObj.notice) ? [...empObj.notice, ...deptNotices] : deptNotices
            return res.json({ success: true, message: "Employee Data Fetched Successfully", data: empObj })
        }

        return res.json({ success: true, message: "Employee Data Fetched Successfully", data: employee })

    } catch (error) {
        return res.json({ success: false, message: "Internal Server Error", error: error })
    }
}

export const HandleEmployeeUpdate = async (req, res) => {
    try {
        const { employeeId, updatedEmployee } = req.body

        const checkeemployee = await Employee.findById(employeeId)

        if (!checkeemployee) {
            return res.status(404).json({ success: false, message: "employee not found" })
        }

        const employee = await Employee.findByIdAndUpdate(employeeId, updatedEmployee, { new: true }).select("firstname lastname email contactnumber department")
        return res.status(200).json({ success: true, data: employee })

    } catch (error) {
        return res.status(500).json({ success: false, error: error, message: "internal server error" })
    }
}

export const HandleEmployeeDelete = async (req, res) => {
    try {
        const { employeeId } = req.params
        const employee = await Employee.findOne({ _id: employeeId })

        if (!employee) {
            return res.status(404).json({ success: false, message: "employee not found" })
        }

        const department = await Department.findById(employee.department)

        if (department) {
            department.employees.splice(department.employees.indexOf(employeeId), 1)
            await department.save()
        }

        const organization = await Organization.findById(employee.organizationID)

        if (!organization) {
            return res.status(404).json({ success: false, message: "organization not found" })
        }

        organization.employees.splice(organization.employees.indexOf(employeeId), 1)

        await organization.save()
        await employee.deleteOne()

        return res.status(200).json({ success: true, message: "Employee deleted successfully", type : "EmployeeDelete" })
    } catch (error) {
        return res.status(500).json({ success: false, error: error, message: "internal server error" })
    }
}
