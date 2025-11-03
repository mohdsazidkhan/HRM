import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const DesignationSchema = new Schema({
    name: { type: String, required: true, unique: false },
    description: { type: String, required: true },
    organizationID: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", required: true },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
}, { timestamps: true })

export const Designation = mongoose.model('Designation', DesignationSchema)


