import { Designation } from "../models/Designation.model.js"
import { Employee } from "../models/Employee.model.js"

export const HandleCreateDesignation = async (req, res) => {
    try {
        const { name, description } = req.body
        if (!name || !description) return res.status(400).json({ success: false, message: "All fields are required" })

        const existing = await Designation.findOne({ name, organizationID: req.ORGID })
        if (existing) return res.status(400).json({ success: false, message: "Designation already exists" })

        const created = await Designation.create({ name, description, organizationID: req.ORGID })
        return res.status(200).json({ success: true, message: "Designation created successfully", data: created, type: "CreateDesignation" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const HandleAllDesignations = async (req, res) => {
    try {
        const list = await Designation.find({ organizationID: req.ORGID }).populate("employees", "firstname lastname email")
        return res.status(200).json({ success: true, message: "All designations retrieved successfully", data: list, type: "AllDesignations" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const HandleDesignation = async (req, res) => {
    try {
        const { designationID } = req.params
        const item = await Designation.findOne({ _id: designationID, organizationID: req.ORGID })
        if (!item) return res.status(404).json({ success: false, message: "Designation not found" })
        return res.status(200).json({ success: true, data: item, type: "GetDesignation" })
    } catch {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const HandleUpdateDesignation = async (req, res) => {
    try {
        const { designationID, UpdatedDesignation, employeeIDArray } = req.body
        const selected = await Designation.findOne({ _id: designationID, organizationID: req.ORGID })
        if (!selected) return res.status(404).json({ success: false, message: "Designation not found" })

        if (employeeIDArray) {
            const employees = selected.employees
            const SelectedEmployees = []
            const RejectedEmployees = []
            for (let i = 0; i < employeeIDArray.length; i++) {
                if (!employees.includes(employeeIDArray[i])) SelectedEmployees.push(employeeIDArray[i])
                else RejectedEmployees.push(employeeIDArray[i])
            }
            if (RejectedEmployees.length > 0) {
                return res.status(400).json({ success: false, message: `Some Employees Already Have ${selected.name} Designation`, EmployeeList: RejectedEmployees })
            }
            for (let i = 0; i < SelectedEmployees.length; i++) employees.push(SelectedEmployees[i])
            await Employee.updateMany({ _id: { $in: SelectedEmployees } }, { $set: { designation: designationID } })
            await selected.save()
            return res.status(200).json({ success: true, message: `Employees Added Successfully to ${selected.name} Designation`, data: selected, type: "DesignationEMUpdate" })
        }

        const updated = await Designation.findByIdAndUpdate(designationID, UpdatedDesignation, { new: true })
        return res.status(200).json({ success: true, message: "Designation updated successfully", data: updated, type: "DesignationUpdate" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const HandleDeleteDesignation = async (req, res) => {
    try {
        const { designationID, employeeIDArray, action } = req.body
        if (action === "delete-designation") {
            const item = await Designation.findOne({ _id: designationID, organizationID: req.ORGID })
            if (!item) return res.status(404).json({ success: false, message: "Designation not found" })
            await Employee.updateMany({ _id: { $in: item.employees } }, { $set: { designation: null } })
            await Designation.findByIdAndDelete(designationID)
            return res.status(200).json({ success: true, message: "Designation deleted successfully", type: "DesignationDelete" })
        }
        if (action === "delete-employee") {
            const item = await Designation.findById(designationID)
            if (!item) return res.status(404).json({ success: false, message: "Designation not found" })
            for (let i = 0; i < employeeIDArray.length; i++) item.employees.splice(item.employees.indexOf(employeeIDArray[i]), 1)
            await item.save()
            await Employee.updateMany({ _id: { $in: employeeIDArray } }, { $set: { designation: null } })
            return res.status(200).json({ success: true, message: "Employee removed successfully", type: "RemoveEmployeeDG" })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}


