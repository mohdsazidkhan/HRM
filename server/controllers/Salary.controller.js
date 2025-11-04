import { Employee } from "../models/Employee.model.js"
import { Salary } from "../models/Salary.model.js"
import { SalarySet } from "../models/SalarySet.model.js"

export const HandleCreateSalary = async (req, res) => {
    try {
        const { employeeID, currency, salarySets } = req.body

        if (!employeeID || !currency || !Array.isArray(salarySets)) {
            return res.status(400).json({ success: false, message: "employeeID, currency and salarySets are required" })
        }

        const employee = await Employee.findById(employeeID)

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" })
        }

        let bonuses = 0
        let deductions = 0
        let computedBasicPay = 0
        let usedSets = []
        if (Array.isArray(salarySets) && salarySets.length > 0) {
            const ids = salarySets.map(s => s.id)
            const sets = await SalarySet.find({ _id: { $in: ids }, organizationID: req.ORGID, isActive: true })
            const idToInput = new Map(salarySets.map(s => [String(s.id), Number(s.value) || 0]))
            for (const set of sets) {
                const inputValue = idToInput.get(String(set._id)) || 0
                // find base for percentage as Basic Pay input (by name)
                if (/^basic\s*pay$/i.test(set.name)) {
                    computedBasicPay = set.calcType === 'Percentage' ? 0 : inputValue
                    // if percentage for basic pay (rare), treat as flat using provided input
                }
            }
            // second pass to accumulate
            for (const set of sets) {
                const inputValue = idToInput.get(String(set._id)) || 0
                const base = computedBasicPay || 0
                const amount = set.calcType === 'Percentage' ? (base * inputValue) / 100 : inputValue
                usedSets.push({ set: set._id, value: inputValue, amount })
                if (set.type === 'Earning') {
                    if (/^basic\s*pay$/i.test(set.name)) {
                        // already counted as basic pay
                    } else {
                        bonuses += amount
                    }
                } else {
                    deductions += amount
                }
            }
            if (computedBasicPay === 0) {
                // try fallback: if there is an earning named Basic Salary
                const candidate = sets.find(s => /^basic\s*(salary|pay)$/i.test(s.name))
                if (candidate) computedBasicPay = idToInput.get(String(candidate._id)) || 0
            }
        }
        if (computedBasicPay === 0) {
            return res.status(400).json({ success: false, message: "Basic Pay is required in salarySets" })
        } else {
            // no-op
        }
        const netpay = (computedBasicPay + bonuses) - deductions

        const salarycheck = await Salary.findOne({
            employee: employeeID,
            basicpay: computedBasicPay,
            bonuses: bonuses,
            deductions: deductions,
            netpay: netpay,
            currency: currency,
            organizationID: req.ORGID
        })

        if (salarycheck) {
            return res.status(400).json({ success: false, message: "Particular salary record already exists for this employee" })
        }

        const salary = await Salary.create({
            employee: employeeID,
            basicpay: computedBasicPay,
            bonuses: bonuses,
            deductions: deductions,
            netpay: netpay,
            currency: currency,
            salarySets: usedSets,
            organizationID: req.ORGID
        })

        employee.salary.push(salary._id)
        await employee.save()

        return res.status(200).json({ success: true, message: "Salary created successfully", data: salary })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const HandleAllSalary = async (req, res) => {
    try {
        const salary = await Salary.find({ organizationID: req.ORGID })
            .populate("employee", "firstname lastname department")
            .populate({ path: 'salarySets.set', select: 'name type calcType' })
        return res.status(200).json({ success: true, message: "All salary records retrieved successfully", data: salary })

    } catch (error) {
        return res.status(500).json({ success: false, error: error, message: "Internal Server Error" })
    }
}

export const HandleSalary = async (req, res) => {
    try {
        const { salaryID } = req.params
        const salary = await Salary.findOne({ _id: salaryID, organizationID: req.ORGID })
            .populate("employee", "firstname lastname department")
            .populate({ path: 'salarySets.set', select: 'name type calcType' })
        return res.status(200).json({ success: true, message: "salary found", data: salary })
    } catch (error) {
        return res.status(500).json({ success: false, error: error, message: "Internal Server Error" })
    }
}

export const HandleUpdateSalary = async (req, res) => {
    const { salaryID, currency, status, salarySets } = req.body
    try {

        let bonuses = 0
        let deductions = 0
        let computedBasicPay = 0
        if (Array.isArray(salarySets) && salarySets.length > 0) {
            const ids = salarySets.map(s => s.id)
            const sets = await SalarySet.find({ _id: { $in: ids }, organizationID: req.ORGID, isActive: true })
            const idToInput = new Map(salarySets.map(s => [String(s.id), Number(s.value) || 0]))
            for (const set of sets) {
                if (/^basic\s*pay$/i.test(set.name)) {
                    computedBasicPay = set.calcType === 'Percentage' ? 0 : (idToInput.get(String(set._id)) || 0)
                }
            }
            for (const set of sets) {
                const inputValue = idToInput.get(String(set._id)) || 0
                const base = computedBasicPay || 0
                const amount = set.calcType === 'Percentage' ? (base * inputValue) / 100 : inputValue
                usedSets.push({ set: set._id, value: inputValue, amount })
                if (set.type === 'Earning') {
                    if (!/^basic\s*pay$/i.test(set.name)) bonuses += amount
                } else {
                    deductions += amount
                }
            }
        }
        if (computedBasicPay === 0) {
            return res.status(400).json({ success: false, message: "Basic Pay is required in salarySets" })
        } else {
            // no-op
        }
        const netpay = (computedBasicPay + bonuses) - deductions

        const salary = await Salary.findByIdAndUpdate(salaryID, {
            basicpay: computedBasicPay,
            bonuses: bonuses,
            deductions: deductions,
            netpay: netpay,
            currency: currency,
            status: status,
            salarySets: usedSets
        }, { new: true })

        if (!salary) {
            return res.status(404).send({ success: false, message: "Salary record does not found" })
        }

        return res.status(200).json({ success: true, message: "Salary updated successfully", data: salary })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Something went wrong", error: error })
    }
}

export const HandleDeleteSalary = async (req, res) => {
    try {
        const { salaryID } = req.params
        const salary = await Salary.findOne({ _id: salaryID, organizationID: req.ORGID })

        if (!salary) {
            return res.status(404).json({ success: false, message: "Salary record not found" })
        }

        const employee = await Employee.findById(salary.employee)
        employee.salary.splice(employee.salary.indexOf(salaryID), 1)

        await employee.save()
        await salary.deleteOne()

        return res.status(200).json({ success: true, message: "Salary deleted successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: error, message: "Error deleting" })
    }
}