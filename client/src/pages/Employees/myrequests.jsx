import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "@/components/common/loading";
import { HandleGetEmployeeSelf } from "@/redux/Thunks/EmployeeSelfThunk";
import { HandleCreateHRRequest, HandleUpdateHRRequestContent } from "@/redux/Thunks/HRRequestsThunk";
import { CardShell } from "@/components/common/Dashboard/CardShell";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RequestsTable } from "@/components/common/Dashboard/RequestsTable";

export const EmployeeMyRequestsPage = () => {
    const dispatch = useDispatch();
    const { data, isLoading, error } = useSelector((state) => state.EmployeeSelfReducer);
    const [formdata, setFormData] = useState({ requesttitle: "", requestconent: "" })

    useEffect(() => { dispatch(HandleGetEmployeeSelf()); }, [dispatch]);

    if (isLoading) return <Loading />;

    const onChange = (e) => setFormData({ ...formdata, [e.target.name]: e.target.value })
    const createRequest = () => {
        if (!data?._id) return;
        dispatch(HandleCreateHRRequest({ data: { ...formdata, employeeID: data._id } }))
        setFormData({ requesttitle: "", requestconent: "" })
    }

    const updateRequest = (rq) => {
        dispatch(HandleUpdateHRRequestContent({ data: { requestID: rq._id, requesttitle: rq.requesttitle, requestconent: rq.requestconent } }))
    }

    return (
        <div className="h-full w-full p-0 space-y-3">
            <CardShell title="My Requests">
                <div className="text-xs text-gray-500">Create and manage your requests to HR</div>
            </CardShell>

            <CardShell title="Create New Request">
                <div className="grid gap-3">
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="requesttitle">Title</Label>
                        <Input id="requesttitle" name="requesttitle" value={formdata.requesttitle} onChange={onChange} placeholder="Enter request title" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="requestconent">Content</Label>
                        <Textarea 
                            id="requestconent" 
                            name="requestconent" 
                            value={formdata.requestconent} 
                            onChange={onChange} 
                            placeholder="Enter request details"
                            className="h-[120px]"
                        />
                    </div>
                    <div>
                        <Button 
                            onClick={createRequest} 
                            disabled={!formdata.requesttitle.trim() || !formdata.requestconent.trim()}
                        >
                            Create Request
                        </Button>
                    </div>
                </div>
            </CardShell>

            <RequestsTable requests={Array.isArray(data?.generaterequest) ? data.generaterequest : []} onUpdate={updateRequest} />
            {error?.status && (
                <div className="p-3 text-red-600 rounded-lg bg-red-50">{error.message}</div>
            )}
        </div>
    )
}


