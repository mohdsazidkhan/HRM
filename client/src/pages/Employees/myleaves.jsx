import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "@/components/common/loading";
import { HandleGetEmployeeSelf } from "@/redux/Thunks/EmployeeSelfThunk";
import { HandleGetMyLeaves } from "@/redux/Thunks/EmployeeLeavesThunk";
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
    const myLeaves = useSelector((state) => state.EmployeeLeavesReducer.items);
    const pagination = useSelector((state) => state.EmployeeLeavesReducer.pagination);
    const leavesLoading = useSelector((state) => state.EmployeeLeavesReducer.isLoading);
    const [formdata, setFormData] = useState({ title: "Leave Application", reason: "", startdate: "", enddate: "" })
    const [filters, setFilters] = useState({ search: "", status: "", startDate: "", endDate: "", page: 1, limit: 10 });

    useEffect(() => { dispatch(HandleGetEmployeeSelf()); }, [dispatch]);
    useEffect(() => { dispatch(HandleGetMyLeaves(filters)); }, [dispatch, filters]);

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

            <CardShell title="My Leave Requests (Paginated)">
                <div className="flex flex-wrap items-end gap-2 mb-2">
                    <div className="flex flex-col">
                        <Label>Search</Label>
                        <Input value={filters.search} onChange={(e) => setFilters({ ...filters, page: 1, search: e.target.value })} placeholder="Search title/reason" />
                    </div>
                    <div className="flex flex-col">
                        <Label>Status</Label>
                        <select className="h-10 rounded-md border px-2" value={filters.status} onChange={(e) => setFilters({ ...filters, page: 1, status: e.target.value })}>
                            <option value="">All</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <Label>From</Label>
                        <Input type="date" value={filters.startDate} onChange={(e) => setFilters({ ...filters, page: 1, startDate: e.target.value })} />
                    </div>
                    <div className="flex flex-col">
                        <Label>To</Label>
                        <Input type="date" value={filters.endDate} onChange={(e) => setFilters({ ...filters, page: 1, endDate: e.target.value })} />
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Label>Rows</Label>
                        <select className="h-10 rounded-md border px-2" value={filters.limit} onChange={(e) => setFilters({ ...filters, page: 1, limit: Number(e.target.value) })}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-x-auto rounded-2xl">
                    <LeavesTable leaves={Array.isArray(myLeaves) ? myLeaves : []} onUpdate={updateLeave} disableLocalPagination={true} />
                </div>
                <div className="flex items-center justify-between mt-2">
                    <div className="text-sm text-gray-500">Page {pagination.page} of {pagination.totalPages} (Total {pagination.total})</div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="default" onClick={() => setFilters({ ...filters, page: 1 })} disabled={pagination.page <= 1 || leavesLoading}>First</Button>
                        <Button variant="outline" size="default" onClick={() => setFilters({ ...filters, page: Math.max(1, pagination.page - 1) })} disabled={pagination.page <= 1 || leavesLoading}>Prev</Button>
                        <Button variant="outline" size="default" onClick={() => setFilters({ ...filters, page: Math.min(pagination.totalPages, pagination.page + 1) })} disabled={pagination.page >= pagination.totalPages || leavesLoading}>Next</Button>
                        <Button variant="outline" size="default" onClick={() => setFilters({ ...filters, page: pagination.totalPages })} disabled={pagination.page >= pagination.totalPages || leavesLoading}>Last</Button>
                    </div>
                </div>
            </CardShell>
            {error?.status && (
                <div className="p-3 text-red-600 rounded-lg bg-red-50">{error.message}</div>
            )}
        </div>
    )
}


