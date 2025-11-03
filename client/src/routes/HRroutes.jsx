import { HRSignupPage } from "../pages/HumanResources/HRSignup"
import { HRLogin } from "../pages/HumanResources/HRlogin"
import { HRDashbaord } from "../pages/HumanResources/HRdashbaord"
import { VerifyEmailPage } from "../pages/HumanResources/verifyemailpage.jsx"
// import { ResetEmailConfirm } from "../pages/Employees/resetemailconfirm.jsx"
// import { ResetEmailVerification } from "../pages/HumanResources/resendemailverificaiton.jsx"
import { HRForgotPasswordPage } from "../pages/HumanResources/forgotpassword.jsx"
import { ResetMailConfirmPage } from "../pages/HumanResources/resetmailconfirm.jsx"
import { ResetHRPasswordPage } from "../pages/HumanResources/resetpassword.jsx"
import { ResetHRVerifyEmailPage } from "../pages/HumanResources/resetemail.jsx"
import { HRDashboardPage } from "../pages/HumanResources/Dashboard Childs/dashboardpage.jsx"
import { HRProtectedRoutes } from "./HRprotectedroutes.jsx"
import { Navigate } from "react-router-dom"
import { HREmployeesPage } from "../pages/HumanResources/Dashboard Childs/employeespage.jsx"
import { HRDepartmentPage } from "../pages/HumanResources/Dashboard Childs/departmentpage.jsx"
import { HRDesignationPage } from "../pages/HumanResources/Dashboard Childs/designationpage.jsx"
import { HRNoticesPage } from "../pages/HumanResources/Dashboard Childs/noticespage.jsx"
import { HRRecruitmentPage } from "../pages/HumanResources/Dashboard Childs/recruitmentpage.jsx"
import { HRSalariesPage } from "../pages/HumanResources/Dashboard Childs/salariespage.jsx"
import { HRLeavesPage } from "../pages/HumanResources/Dashboard Childs/leavespage.jsx"
import { HRAttendancesPage } from "../pages/HumanResources/Dashboard Childs/attendancespage.jsx"
import { HRInterviewInsightsPage } from "../pages/HumanResources/Dashboard Childs/interviewinsightspage.jsx"
import { HRRequestsPage } from "../pages/HumanResources/Dashboard Childs/requestspage.jsx"
import { HRProfilesPage } from "../pages/HumanResources/Dashboard Childs/hrprofilespage.jsx"
import { HRCorporateCalendarPage } from "../pages/HumanResources/Dashboard Childs/corporatecalendarpage.jsx"
import { HRBalancePage } from "../pages/HumanResources/Dashboard Childs/balancepage.jsx"
import { HRApplicantsPage } from "../pages/HumanResources/Dashboard Childs/applicantspage.jsx"
export const HRRoutes = [
    {
        path: "/admin/auth/signup",
        element: <HRSignupPage />
    },
    {
        path: "/admin/auth/login",
        element: <HRLogin />
    },
    {
        path: "/admin/dashboard",
        element: (
            <HRProtectedRoutes>
                <HRDashbaord />
            </HRProtectedRoutes>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="dashboard-data" replace />
            },
            {
                path: "dashboard-data",
                element: <HRDashboardPage />
            },
            {
                path: "employees",
                element: <HREmployeesPage />
            },
            {
                path: "departments",
                element: <HRDepartmentPage />
            },
            {
                path: "designations",
                element: <HRDesignationPage />
            },
            {
                path: "notices",
                element: <HRNoticesPage />
            },
            {
                path: "recruitment",
                element: <HRRecruitmentPage />
            },
            {
                path: "salaries",
                element: <HRSalariesPage />
            },
            {
                path: "leaves",
                element: <HRLeavesPage />
            },
            {
                path: "attendances",
                element: <HRAttendancesPage />
            },
            {
                path: "interview-insights",
                element: <HRInterviewInsightsPage />
            },
            {
                path: "requests",
                element: <HRRequestsPage />
            },
            {
                path: "hr-profiles",
                element: <HRProfilesPage />
            },
            {
                path: "calendar",
                element: <HRCorporateCalendarPage />
            },
            {
                path: "balance",
                element: <HRBalancePage />
            },
            {
                path: "applicants",
                element: <HRApplicantsPage />
            }
        ]
    },
    {
        path: "/admin/auth/verify-email",
        element: <VerifyEmailPage />
    },
    {
        path: "/admin/auth/reset-email-validation",
        element: <ResetHRVerifyEmailPage />
    },
    {
        path: "/admin/auth/forgot-password",
        element: <HRForgotPasswordPage />
    },
    {
        path: "/admin/auth/reset-email-confirmation",
        element: <ResetMailConfirmPage />
    },
    {
        path: "/admin/auth/resetpassword/:token",
        element: <ResetHRPasswordPage />
    },
]