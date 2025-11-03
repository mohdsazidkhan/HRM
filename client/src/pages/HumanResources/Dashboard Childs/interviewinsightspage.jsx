import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HandleGetHRInterviewInsights } from "@/redux/Thunks/HRInterviewInsightsThunk";
import { Loading } from "@/components/common/loading";
import { CreateInterviewDialogBox } from "@/components/common/Dashboard/dialogboxes";
import { CardShell } from "@/components/common/Dashboard/CardShell";
import { HRInterviewsTable } from "@/components/common/Dashboard/HRInterviewsTable";

export const HRInterviewInsightsPage = () => {
    const dispatch = useDispatch();
    const { data, isLoading, fetchData, error } = useSelector((state) => state.HRInterviewInsightsReducer);

    useEffect(() => {
        dispatch(HandleGetHRInterviewInsights());
    }, [dispatch]);

    useEffect(() => {
        if (fetchData) dispatch(HandleGetHRInterviewInsights());
    }, [dispatch, fetchData]);

    if (isLoading) return <Loading />;

    return (
        <div className="h-full w-full p-0 space-y-3">
            <CardShell title="Interview Insights" actions={<CreateInterviewDialogBox />}>
                <div className="text-xs text-gray-500">Track and manage interview records</div>
            </CardShell>
            <HRInterviewsTable interviews={Array.isArray(data) ? data : []} />
            {error?.status && (
                <div className="p-3 text-red-600 rounded-lg bg-red-50">{error.message || "Failed to load interview insights"}</div>
            )}
        </div>
    )
}


