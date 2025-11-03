import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "@/components/common/loading";
import { HandleGetHRRequests } from "@/redux/Thunks/HRRequestsThunk";
import { CardShell } from "@/components/common/Dashboard/CardShell";
import { HRRequestsTable } from "@/components/common/Dashboard/HRRequestsTable";

export const HRRequestsPage = () => {
    const dispatch = useDispatch();
    const { data, isLoading, fetchData, error } = useSelector((state) => state.HRRequestsReducer);

    useEffect(() => {
        dispatch(HandleGetHRRequests());
    }, [dispatch]);

    useEffect(() => {
        if (fetchData) dispatch(HandleGetHRRequests());
    }, [dispatch, fetchData]);

    if (isLoading) return <Loading />;

    return (
        <div className="h-full w-full p-0 space-y-3">
            <CardShell title="Requests">
                <div className="text-xs text-gray-500">Review and manage employee requests</div>
            </CardShell>
            <HRRequestsTable requests={Array.isArray(data) ? data : []} />
            {error?.status && (
                <div className="p-3 text-red-600 rounded-lg bg-red-50">{error.message || "Failed to load requests"}</div>
            )}
        </div>
    )
}


