import { SalarySet } from "../models/SalarySet.model.js"

export const HandleCreateSalarySet = async (req, res) => {
    try {
        const { name, type, description, isActive } = req.body
        if (!name) return res.status(400).json({ success: false, message: "Name is required" })

        const exists = await SalarySet.findOne({ name: name.trim(), organizationID: req.ORGID })
        if (exists) return res.status(400).json({ success: false, message: "Salary set already exists" })

        const created = await SalarySet.create({
            name: name.trim(),
            type: type || "Earning and Deduction",
            description: description || "",
            isActive: typeof isActive === 'boolean' ? isActive : true,
            organizationID: req.ORGID
        })

        return res.status(200).json({ success: true, message: "Salary set created", data: created })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const HandleAllSalarySets = async (req, res) => {
    try {
        const sets = await SalarySet.find({ organizationID: req.ORGID }).sort({ createdAt: -1 })
        return res.status(200).json({ success: true, data: sets })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const HandleActiveSalarySets = async (req, res) => {
    try {
        const sets = await SalarySet.find({ organizationID: req.ORGID, isActive: true }).sort({ name: 1 })
        return res.status(200).json({ success: true, data: sets })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const HandleUpdateSalarySet = async (req, res) => {
    try {
        const { id, name, type, description, isActive } = req.body
        const updated = await SalarySet.findOneAndUpdate(
            { _id: id, organizationID: req.ORGID },
            { name, type, description, isActive },
            { new: true }
        )
        if (!updated) return res.status(404).json({ success: false, message: "Salary set not found" })
        return res.status(200).json({ success: true, message: "Salary set updated", data: updated })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const HandleDeleteSalarySet = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await SalarySet.findOneAndDelete({ _id: id, organizationID: req.ORGID })
        if (!deleted) return res.status(404).json({ success: false, message: "Salary set not found" })
        return res.status(200).json({ success: true, message: "Salary set deleted" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}


