export const APIsEndPoints = {
    LOGIN: "/api/auth/employee/login",
    CHECKELOGIN: "/api/auth/employee/check-login",
    FORGOT_PASSWORD: "/api/auth/employee/forgot-password",
    RESET_PASSWORD: (token) => `/api/auth/employee/reset-password/${token}`,
    LOGOUT: "/api/auth/employee/logout",
}

export const HREndPoints = {
    SIGNUP: "/api/auth/HR/signup",
    CHECKLOGIN: "/api/auth/HR/check-login",
    LOGIN: "/api/auth/HR/login",
    VERIFY_EMAIL: "/api/auth/HR/verify-email",
    CHECK_VERIFY_EMAIL: "/api/auth/HR/check-verify-email",
    RESEND_VERIFY_EMAIL: "/api/auth/HR/resend-verify-email",
    FORGOT_PASSWORD: "/api/auth/HR/forgot-password",
    RESET_PASSWORD: (token) => `/api/auth/HR/reset-password/${token}` ,
    LOGOUT: "/api/auth/HR/logout"
}

export const EmployeeSelfEndPoints = {
    BY_EMPLOYEE: "/api/v1/employee/by-employee",
}

export const DashboardEndPoints = {
    GETDATA: "/api/v1/dashboard/HR-dashboard"
}

export const HREmployeesPageEndPoints = {
    GETALL: "/api/v1/employee/all",
    ADDEMPLOYEE: "/api/auth/employee/signup",
    GETONE: (EMID) => `/api/v1/employee/by-HR/${EMID}`,
    DELETE: (EMID) => `/api/v1/employee/delete-employee/${EMID}`,
    UPDATE: "/api/v1/employee/update-employee",
}

export const HRDepartmentPageEndPoints = {
    GETALL: "/api/v1/department/all",
    CREATE: "/api/v1/department/create-department",
    UPDATE: "/api/v1/department/update-department",
    DELETE: "/api/v1/department/delete-department"
}

export const HRDesignationPageEndPoints = {
    GETALL: "/api/v1/designation/all",
    CREATE: "/api/v1/designation/create-designation",
    UPDATE: "/api/v1/designation/update-designation",
    DELETE: "/api/v1/designation/delete-designation"
}

export const EmployeesIDsEndPoints = {
    GETALL: "/api/v1/employee/all-employees-ids",
} 

export const HRNoticePageEndPoints = {
    GETALL: "/api/v1/notice/all/",
    CREATE: "/api/v1/notice/create-notice",
    GETONE: (noticeID) => `/api/v1/notice/${noticeID}`,
    UPDATE: "/api/v1/notice/update-notice",
    DELETE: (noticeID) => `/api/v1/notice/delete-notice/${noticeID}`,
}

export const HRRecruitmentPageEndPoints = {
    GETALL: "/api/v1/recruitment/all",
    CREATE: "/api/v1/recruitment/create-recruitment",
    GETONE: (recruitmentID) => `/api/v1/recruitment/${recruitmentID}`,
    UPDATE: "/api/v1/recruitment/update-recruitment",
    DELETE: (recruitmentID) => `/api/v1/recruitment/delete-recruitment/${recruitmentID}`,
}

export const HRInterviewInsightsPageEndPoints = {
    GETALL: "/api/v1/interview-insights/all",
    CREATE: "/api/v1/interview-insights/create-interview",
    GETONE: (interviewID) => `/api/v1/interview-insights/${interviewID}`,
    UPDATE: "/api/v1/interview-insights/update-interview",
    DELETE: (interviewID) => `/api/v1/interview-insights/delete-interview/${interviewID}`,
}

export const HRSalaryPageEndPoints = {
    GETALL: "/api/v1/salary/all",
    CREATE: "/api/v1/salary/create-salary",
    GETONE: (salaryID) => `/api/v1/salary/${salaryID}`,
    UPDATE: "/api/v1/salary/update-salary",
    DELETE: (salaryID) => `/api/v1/salary/delete-salary/${salaryID}`,
}

export const HRLeavesPageEndPoints = {
    GETALL: "/api/v1/leave/all",
    CREATE: "/api/v1/leave/create-leave",
    GETONE: (leaveID) => `/api/v1/leave/${leaveID}`,
    UPDATE_BY_EMPLOYEE: "/api/v1/leave/employee-update-leave",
    UPDATE_BY_HR: "/api/v1/leave/HR-update-leave",
    DELETE: (leaveID) => `/api/v1/leave/delete-leave/${leaveID}`,
}

export const HRAttendancePageEndPoints = {
    GETALL: "/api/v1/attendance/all",
    CREATE: "/api/v1/attendance/initialize",
    GETONE: (attendanceID) => `/api/v1/attendance/${attendanceID}`,
    UPDATE: "/api/v1/attendance/update-attendance",
    DELETE: (attendanceID) => `/api/v1/attendance/delete-attendance/${attendanceID}`,
}

export const HRRequestsPageEndPoints = {
    GETALL: "/api/v1/generate-request/all",
    CREATE: "/api/v1/generate-request/create-request",
    GETONE: (requestID) => `/api/v1/generate-request/${requestID}`,
    UPDATE_CONTENT: "/api/v1/generate-request/update-request-content",
    UPDATE_STATUS: "/api/v1/generate-request/update-request-status",
    DELETE: (requestID) => `/api/v1/generate-request/delete-request/${requestID}`,
}

export const HRProfilesPageEndPoints = {
    GETALL: "/api/v1/HR/all",
    GETONE: (HRID) => `/api/v1/HR/${HRID}`,
    UPDATE: "/api/v1/HR/update-HR",
    DELETE: (HRID) => `/api/v1/HR/delete-HR/${HRID}`,
}

export const HRCalendarPageEndPoints = {
    GETALL: "/api/v1/corporate-calendar/all",
    CREATE: "/api/v1/corporate-calendar/create-event",
    GETONE: (eventID) => `/api/v1/corporate-calendar/${eventID}`,
    UPDATE: "/api/v1/corporate-calendar/update-event",
    DELETE: (eventID) => `/api/v1/corporate-calendar/delete-event/${eventID}`,
}

export const HRBalancePageEndPoints = {
    GETALL: "/api/v1/balance/all",
    CREATE: "/api/v1/balance/add-balance",
    GETONE: (balanceID) => `/api/v1/balance/${balanceID}`,
    UPDATE: "/api/v1/balance/update-balance",
    DELETE: (balanceID) => `/api/v1/balance/delete-balance/${balanceID}`,
}

export const HRApplicantsPageEndPoints = {
    GETALL: "/api/v1/applicant/all",
    CREATE: "/api/v1/applicant/create-applicant",
    GETONE: (applicantID) => `/api/v1/applicant/${applicantID}`,
    UPDATE: "/api/v1/applicant/update-applicant",
    DELETE: (applicantID) => `/api/v1/applicant/delete-applicant/${applicantID}`,
}