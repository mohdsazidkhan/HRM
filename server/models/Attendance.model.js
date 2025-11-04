import mongoose from 'mongoose'
import { Schema } from "mongoose";


const AttendanceSchema = new Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Employee"
    },
    date: {
        type: Date,
        required: true,
        // Store only date part (YYYY-MM-DD), ignore time
        set: function(date) {
            const d = new Date(date);
            d.setHours(0, 0, 0, 0);
            return d;
        }
    },
    logs: [
        {
            checkIn: {
                type: Date,
                required: true
            },
            checkOut: {
                type: Date,
                default: null
            },
            location: {
                type: String,
                default: null
            },
            device: {
                type: String,
                default: null
            }
        }
    ],
    organizationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization"
    }
}, { timestamps: true });

// Compound index to ensure one document per employee per day
AttendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

export const Attendance = mongoose.model("Attendance", AttendanceSchema)