import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "@/components/common/loading";
import { HandleGetEmployeeSelf } from "@/redux/Thunks/EmployeeSelfThunk";
import { HandleCreateHRLeave, HandleUpdateHRLeaveByEmployee } from "@/redux/Thunks/HRLeavesThunk";
import { DeleteLeaveDialogBox } from "@/components/common/Dashboard/dialogboxes";
import { CardShell } from "@/components/common/Dashboard/CardShell";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LeavesTable } from "@/components/common/Dashboard/LeavesTable";

export const EmployeeMyLeavesPage = () => {
    const dispatch = useDispatch();
    const { data, isLoading, error } = useSelector((state) => state.EmployeeSelfReducer);
    const [formdata, setFormData] = useState({ title: "Leave Application", reason: "", startdate: "", enddate: "" })

    useEffect(() => { dispatch(HandleGetEmployeeSelf()); }, [dispatch]);

    if (isLoading) return <Loading />;

    const onChange = (e) => setFormData({ ...formdata, [e.target.name]: e.target.value })
    const createLeave = () => {
        if (!data?._id) return;
        dispatch(HandleCreateHRLeave({ data: { employeeID: data._id, ...formdata } }))
        setFormData({ title: "Leave Application", reason: "", startdate: "", enddate: "" })
    }

    const updateLeave = (leave) => {
        const UpdatedData = { title: leave.title, reason: leave.reason, startdate: leave.startdate, enddate: leave.enddate }
        dispatch(HandleUpdateHRLeaveByEmployee({ data: { leaveID: leave._id, UpdatedData } }))
    }

    return (
        <div className="h-full w-full p-0 space-y-3">
            <CardShell title="My Leaves">
                <div className="text-xs text-gray-500">Manage your leave requests and track their status</div>
            </CardShell>

            <CardShell title="Create New Leave Request">
                <div className="grid sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" value={formdata.title} onChange={onChange} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="reason">Reason</Label>
                        <Input id="reason" name="reason" value={formdata.reason} onChange={onChange} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="startdate">Start Date</Label>
                        <Input type="date" id="startdate" name="startdate" value={formdata.startdate} onChange={onChange} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="enddate">End Date</Label>
                        <Input type="date" id="enddate" name="enddate" value={formdata.enddate} onChange={onChange} />
                    </div>
                    <div className="sm:col-span-2">
                        <Button 
                            onClick={createLeave} 
                            disabled={!formdata.reason || !formdata.startdate || !formdata.enddate}
                        >
                            Create Leave
                        </Button>
                    </div>
                </div>
            </CardShell>

            <LeavesTable leaves={Array.isArray(data?.leaverequest) ? data.leaverequest : []} onUpdate={updateLeave} />
            {error?.status && (
                <div className="p-3 text-red-600 rounded-lg bg-red-50">{error.message}</div>
            )}
        </div>
    )
}


