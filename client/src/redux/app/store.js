import { configureStore } from '@reduxjs/toolkit'
import EmployeeReducer from "../Slices/EmployeeSlice.js"
import HRReducer from '../Slices/HRSlice.js'
import DashbaordReducer from "../Slices/DashboardSlice.js"
import HREmployeesPageReducer from '../Slices/HREmployeesPageSlice.js'
import HRDepartmentPageReducer from '../Slices/HRDepartmentPageSlice.js'
import HRDesignationPageReducer from '../Slices/HRDesignationPageSlice.js'
import HRNoticesReducer from '../Slices/HRNoticesSlice.js'
import HRRecruitmentReducer from '../Slices/HRRecruitmentSlice.js'
import HRInterviewInsightsReducer from '../Slices/HRInterviewInsightsSlice.js'
import HRSalaryReducer from '../Slices/HRSalarySlice.js'
import HRLeavesReducer from '../Slices/HRLeavesSlice.js'
import HRAttendanceReducer from '../Slices/HRAttendanceSlice.js'
import HRRequestsReducer from '../Slices/HRRequestsSlice.js'
import HRProfilesReducer from '../Slices/HRProfilesSlice.js'
import EMployeesIDReducer from '../Slices/EmployeesIDsSlice.js'
import EmployeeSelfReducer from '../Slices/EmployeeSelfSlice.js'
import HRCalendarReducer from '../Slices/HRCalendarSlice.js'
import HRBalanceReducer from '../Slices/HRBalanceSlice.js'
import HRApplicantsReducer from '../Slices/HRApplicantsSlice.js'

export const store = configureStore({
    reducer: {
        employeereducer: EmployeeReducer,
        HRReducer: HRReducer,
        dashboardreducer: DashbaordReducer,
        HREmployeesPageReducer : HREmployeesPageReducer,
        HRDepartmentPageReducer : HRDepartmentPageReducer,
        HRDesignationPageReducer : HRDesignationPageReducer,
        EMployeesIDReducer : EMployeesIDReducer,
        HRNoticesReducer: HRNoticesReducer,
        HRRecruitmentReducer: HRRecruitmentReducer,
        HRInterviewInsightsReducer: HRInterviewInsightsReducer,
        HRSalaryReducer: HRSalaryReducer,
        HRLeavesReducer: HRLeavesReducer,
        HRAttendanceReducer: HRAttendanceReducer,
        HRRequestsReducer: HRRequestsReducer,
        HRProfilesReducer: HRProfilesReducer,
        EmployeeSelfReducer: EmployeeSelfReducer,
        HRCalendarReducer: HRCalendarReducer,
        HRBalanceReducer: HRBalanceReducer,
        HRApplicantsReducer: HRApplicantsReducer
    }
})