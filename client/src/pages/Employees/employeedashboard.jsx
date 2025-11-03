import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HandleGetEmployeeSelf } from "@/redux/Thunks/EmployeeSelfThunk";
import { Loading } from "@/components/common/loading";
import { EmployeeCreateLeaveDialogBox, EmployeeCreateRequestDialogBox } from "@/components/common/Dashboard/dialogboxes";
import { Link } from "react-router-dom";
import { HandleUpdateHRAttendance, HandleCreateHRAttendance } from "@/redux/Thunks/HRAttendanceThunk";
import { formatDateTimeDDMMYYYYatHHMM } from "@/utils/commonhandler";
import { KeyDetailsBox } from "@/components/common/Dashboard/keydetailboxes";
import { DataTable } from "@/components/common/Dashboard/datatable";
import { User, Mail, Building2, Clock, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EmployeeDashboard = () =>{
    const dispatch = useDispatch();
    const { data, isLoading, error } = useSelector((state) => state.EmployeeSelfReducer);
    
    useEffect(() => {
        dispatch(HandleGetEmployeeSelf());
    }, [dispatch]);

    if (isLoading) return <Loading />;

    const ensureAttendanceAndUpdate = async (status) => {
        const currentdate = new Date().toISOString().split("T")[0]
        let attendanceID = data?.attendance && (typeof data.attendance === 'object' ? data.attendance._id : data.attendance)
        if (!attendanceID && data?._id) {
            const res = await dispatch(HandleCreateHRAttendance({ data: { employeeID: data._id } })).unwrap().catch(() => null)
            attendanceID = res?.data?._id
        }
        if (attendanceID) {
            await dispatch(HandleUpdateHRAttendance({ data: { attendanceID, status, currentdate } }))
            dispatch(HandleGetEmployeeSelf())
        }
    }

    const handleCheckIn = () => { ensureAttendanceAndUpdate("Present") }
    const handleCheckOut = () => { ensureAttendanceAndUpdate("Checkout") }

    const DataArray = [
        { icon: Clock, dataname: "Attendance", data: data?.attendance?.status ? 1 : 0, path: null },
        { icon: Calendar, dataname: "Leaves", data: data?.leaverequest?.length || 0, path: "/employee/dashboard/leaves" },
        { icon: FileText, dataname: "Requests", data: data?.generaterequest?.length || 0, path: "/employee/dashboard/requests" },
    ]

    return(
        <>
            <div className="flex items-end justify-between mb-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
                    <p className="text-sm text-gray-500">Your personal workspace</p>
                </div>
                <div className="flex items-center gap-2">
                    <EmployeeCreateLeaveDialogBox />
                    <EmployeeCreateRequestDialogBox />
                </div>
            </div>
            <div className="key-details-box-content grid min-[250px]:grid-cols-1 sm:grid-cols-2 min-[1000px]:grid-cols-3 gap-2 my-2">
                {DataArray.map((item) => (
                    item.path ? (
                        <Link key={item.dataname} to={item.path}>
                            <KeyDetailsBox icon={item.icon} dataname={item.dataname} data={item.data} />
                        </Link>
                    ) : (
                        <KeyDetailsBox key={item.dataname} icon={item.icon} dataname={item.dataname} data={item.data} />
                    )
                ))}
            </div>
            <div className="grid min-[250px]:grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
                <div className="rounded-2xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur p-3">
                    <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold">Profile Information</p>
                    </div>
                    {data ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="inline-flex items-center justify-center rounded-xl bg-blue-50 ring-1 ring-blue-100 p-2">
                                    <User className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium">{data.firstname} {data.lastname}</p>
                                    <p className="text-sm text-gray-500">Full Name</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="inline-flex items-center justify-center rounded-xl bg-blue-50 ring-1 ring-blue-100 p-2">
                                    <Mail className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium">{data.email}</p>
                                    <p className="text-sm text-gray-500">Email Address</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="inline-flex items-center justify-center rounded-xl bg-blue-50 ring-1 ring-blue-100 p-2">
                                    <Building2 className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium">{data.department?.name || "-"}</p>
                                    <p className="text-sm text-gray-500">Department</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-sm text-gray-500">No profile data.</div>
                    )}
                </div>
                <div className="rounded-2xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur p-3">
                    <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold">Attendance Status</p>
                    </div>
                    {data?.attendance ? (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="inline-flex items-center justify-center rounded-xl bg-blue-50 ring-1 ring-blue-100 p-2">
                                        <Clock className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className={`font-medium px-2 py-1 rounded text-sm ${
                                            data.attendance?.status === "Present" ? "bg-green-100 text-green-700" :
                                            "bg-gray-100 text-gray-700"
                                        }`}>
                                            {data.attendance?.status || "Not Specified"}
                                        </p>
                                        <p className="text-sm text-gray-500">Current Status</p>
                                    </div>
                                </div>
                                {data?.attendance?.status === "Present" ? (
                                    <Button variant="secondary" size="default" onClick={handleCheckOut}>
                                        Check Out
                                    </Button>
                                ) : (
                                    <Button variant="default" size="default" onClick={handleCheckIn}>
                                        Check In
                                    </Button>
                                )}
                            </div>
                            {data?.attendance?.updatedAt && (
                                <div className="text-xs text-gray-500 pl-14">
                                    Last Update: {formatDateTimeDDMMYYYYatHHMM(data.attendance.updatedAt)}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <div className="text-sm text-gray-500">No attendance record.</div>
                            <Button variant="default" size="default" onClick={handleCheckIn}>
                                Check In
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <div className="grid min-[250px]:grid-cols-1 gap-3 mt-3">
                <div className="rounded-2xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur p-3">
                    <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold">Recent Notices</p>
                    </div>
                    <DataTable noticedata={data} />
                </div>
            </div>
            {error?.status && (
                <div className="mt-3 p-3 text-red-600 rounded-lg bg-red-50">{error.message}</div>
            )}
        </>
    )
}