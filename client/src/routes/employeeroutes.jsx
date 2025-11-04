import { EmployeeLogin } from "../pages/Employees/emplyoeelogin.jsx"
import { EmployeeDashboard } from "../pages/Employees/employeedashboard.jsx"
import { EmployeeLayout } from "../pages/Employees/EmployeeLayout.jsx"
import { ProtectedRoutes } from "./protectedroutes.jsx"
import { ForgotPassword } from "../pages/Employees/forgotpassword.jsx"
import { ResetEmailConfirm } from "../pages/Employees/resetemailconfirm.jsx"
import { ResetPassword } from "../pages/Employees/resetpassword.jsx"
import { EntryPage } from "../pages/Employees/EntryPage.jsx"
// import { VerifyEmailPage } from "../pages/common/verifyemailpage.jsx"
import { EmployeeMyLeavesPage } from "../pages/Employees/myleaves.jsx"
import { EmployeeMyRequestsPage } from "../pages/Employees/myrequests.jsx"
import { MyAttendancePage } from "../pages/Employees/myattendance.jsx"

export const EmployeeRoutes = [
    {
        path: "/",
        element: <EntryPage />
    },
    {
        path: "/employee/dashboard",
        element: <ProtectedRoutes><EmployeeLayout /></ProtectedRoutes>,
        children: [
            { index: true, element: <EmployeeDashboard /> },
            { path: "leaves", element: <EmployeeMyLeavesPage /> },
            { path: "requests", element: <EmployeeMyRequestsPage /> },
            { path: "attendance", element: <MyAttendancePage /> },
        ]
    },
    {
        path: "/employee/auth/login",
        element: <EmployeeLogin />
    },
    // {
    //     path: "/auth/employee/verify-email", 
    //     element: <VerifyEmailPage />
    // },
    {
        path: "/employee/auth/forgot-password",
        element: <ForgotPassword />
    },
    {
        path: "/employee/auth/reset-email-confirmation",
        element: <ResetEmailConfirm />
    },
    {
        path: "/employee/auth/resetpassword/:token",
        element: <ResetPassword /> 
    },
]

