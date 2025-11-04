import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const SalarySetSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ["Earning","Deduction"],
        default: "Earning"
    },
    calcType: { 
        type: String, 
        enum: ["Percentage","Flat"], 
        required: true, 
        default: "Flat"
    },
    description: {
        type: String,
        default: ""
    },
    isActive: {
        type: Boolean,
        default: true
    },
    organizationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    }
}, { timestamps: true })

export const SalarySet = mongoose.model('SalarySet', SalarySetSchema)

