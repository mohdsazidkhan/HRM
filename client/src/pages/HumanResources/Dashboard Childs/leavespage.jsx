import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "@/components/common/loading";
import { HandleGetHRLeaves } from "@/redux/Thunks/HRLeavesThunk";
import { CreateLeaveDialogBox } from "@/components/common/Dashboard/dialogboxes";
import { CardShell } from "@/components/common/Dashboard/CardShell";
import { HRLeavesTable } from "@/components/common/Dashboard/HRLeavesTable";

export const HRLeavesPage = () => {
    const dispatch = useDispatch();
    const { data, isLoading, fetchData, error } = useSelector((state) => state.HRLeavesReducer);

    useEffect(() => {
        dispatch(HandleGetHRLeaves());
    }, [dispatch]);

    useEffect(() => {
        if (fetchData) dispatch(HandleGetHRLeaves());
    }, [dispatch, fetchData]);

    if (isLoading) return <Loading />;

    return (
        <div className="h-full w-full p-0 space-y-3">
            <CardShell title="Leaves" actions={<CreateLeaveDialogBox />}>
                <div className="text-xs text-gray-500">Manage employee leave requests and approvals</div>
            </CardShell>
            <HRLeavesTable leaves={Array.isArray(data) ? data : []} />
            {error?.status && (
                <div className="p-3 text-red-600 rounded-lg bg-red-50">{error.message || "Failed to load leaves"}</div>
            )}
        </div>
    )
}


