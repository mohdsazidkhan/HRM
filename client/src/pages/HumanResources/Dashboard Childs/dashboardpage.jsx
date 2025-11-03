import { KeyDetailsBox } from "../../../components/common/Dashboard/keydetailboxes.jsx"
import { Link } from "react-router-dom"
import { SalaryChart } from "../../../components/common/Dashboard/salarychart.jsx"
import { DataTable } from "../../../components/common/Dashboard/datatable.jsx"
import { useEffect } from "react"
import { HandleGetDashboard } from "../../../redux/Thunks/DashboardThunk.js"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetHRAttendance } from "@/redux/Thunks/HRAttendanceThunk.js"
import { Users, Building2, ClipboardList, BriefcaseBusiness, Clock } from "lucide-react"
 
import { Loading } from "../../../components/common/loading.jsx"
export const HRDashboardPage = () => {
    console.log("Reloaded")
    const DashboardState = useSelector((state) => state.dashboardreducer)
    const HRAttendanceState = useSelector((state) => state.HRAttendanceReducer)
    console.log(HRAttendanceState, 'HRAttendanceState')
    const dispatch = useDispatch()
    const DataArray = [
        { icon: Users, dataname: "employees", path: "/admin/dashboard/employees" },
        { icon: Building2, dataname: "departments", path: "/admin/dashboard/departments" },
        { icon: ClipboardList, dataname: "leaves", path: "/admin/dashboard/leaves" },
        { icon: BriefcaseBusiness, dataname: "requestes", path: "/admin/dashboard/requests" },
    ]

    useEffect(() => {
        dispatch(HandleGetDashboard({ apiroute: "GETDATA" }))
        dispatch(HandleGetHRAttendance())
    },[dispatch])

    if (DashboardState.isLoading) { 
        return (
            <Loading />
        )
    }


    return (
        <>
            <div className="flex items-end justify-between mb-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
                    <p className="text-sm text-gray-500">Snapshot of your organization</p>
                </div>
            </div>
            <div className="key-details-box-content grid min-[250px]:grid-cols-1 sm:grid-cols-2 min-[1000px]:grid-cols-5 gap-2 my-2">
                {DataArray.map((item) => (
                    <Link key={item.dataname} to={item.path}>
                        <KeyDetailsBox icon={item.icon} dataname={item.dataname} data={DashboardState.data ? DashboardState.data[item["dataname"]] : ""} />
                    </Link>
                ))}
                <KeyDetailsBox icon={Clock} dataname={"Attendance"} data={Array.isArray(HRAttendanceState.data) ? HRAttendanceState.data.length : 0} />
            </div>
            <div className="grid min-[250px]:grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
                <div className="rounded-2xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur p-3">
                    <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold">Salary Overview</p>
                    </div>
                    <SalaryChart balancedata={DashboardState.data} />
                </div>
                <div className="rounded-2xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur p-3">
                    <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold">Recent Notices</p>
                    </div>
                    <DataTable noticedata={DashboardState.data} />
                </div>
            </div>
        </>
    )
}