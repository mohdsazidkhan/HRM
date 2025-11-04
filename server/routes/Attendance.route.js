import express from 'express'
import {
    HandleCheckIn,
    HandleCheckOut,
    HandleGetAttendanceByEmployee,
    HandleGetAllAttendance,
    HandleGetAttendance,
    HandleGetTodayAttendance,
    HandleDeleteAttendance
} from '../controllers/Attendance.controller.js'
import { VerifyEmployeeToken, VerifyhHRToken, VerifyEmployeeOrHRToken } from '../middlewares/Auth.middleware.js'
import { RoleAuthorization } from '../middlewares/RoleAuth.middleware.js'

const router = express.Router()

// Employee routes - Check in/out and get own attendance (must come before /:attendanceID)
router.post("/check-in", VerifyEmployeeToken, HandleCheckIn)
router.post("/check-out", VerifyEmployeeToken, HandleCheckOut)
router.get("/today", VerifyEmployeeToken, HandleGetTodayAttendance)
router.get("/my-attendance", VerifyEmployeeToken, HandleGetAttendanceByEmployee)

// HR/Admin routes - Get all attendance with filters (must come before /:attendanceID)
router.get("/all", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleGetAllAttendance)

// HR routes - Get attendance by employee (must come before /:attendanceID)
router.get("/employee/:employeeID/attendance", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleGetAttendanceByEmployee)

// Common routes - Get specific attendance record (must come last)
router.get("/:attendanceID", VerifyEmployeeOrHRToken, HandleGetAttendance)

// HR routes - Delete attendance
router.delete("/:attendanceID", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleDeleteAttendance)

export default router
