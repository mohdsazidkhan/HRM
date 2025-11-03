import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "@/components/common/loading";
import { CardShell } from "@/components/common/Dashboard/CardShell";
import { HandleGetHRNotices } from "@/redux/Thunks/HRNoticesThunk";
import { CreateNoticeDialogBox } from "@/components/common/Dashboard/dialogboxes";
import { HRNoticesTable } from "@/components/common/Dashboard/HRNoticesTable";

export const HRNoticesPage = () => {
    const dispatch = useDispatch();
    const { data, isLoading, fetchData, error } = useSelector((state) => state.HRNoticesReducer);

    useEffect(() => {
        dispatch(HandleGetHRNotices());
    }, [dispatch]);

    useEffect(() => {
        if (fetchData) {
            dispatch(HandleGetHRNotices());
        }
    }, [dispatch, fetchData]);

    if (isLoading) return <Loading />;

    const flatNotices = data?.department_notices || data?.employee_notices ? [
        ...(Array.isArray(data?.department_notices) ? data.department_notices : []),
        ...(Array.isArray(data?.employee_notices) ? data.employee_notices : []),
    ] : (Array.isArray(data) ? data : [])

    return (
        <div className="h-full w-full p-0 space-y-3">
            <CardShell title="Notices" actions={<CreateNoticeDialogBox />}>
                <div className="text-xs text-gray-500">Manage organization notices and announcements</div>
            </CardShell>
            <HRNoticesTable notices={flatNotices} />
            {error?.status && (
                <div className="p-3 text-red-600 rounded-lg bg-red-50">{error.message || "Failed to load notices"}</div>
            )}
        </div>
    );
};


