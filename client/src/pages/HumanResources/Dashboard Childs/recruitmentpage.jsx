import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "@/components/common/loading";
import { HandleGetHRRecruitments } from "@/redux/Thunks/HRRecruitmentThunk";
import { CreateRecruitmentDialogBox } from "@/components/common/Dashboard/dialogboxes";
import { CardShell } from "@/components/common/Dashboard/CardShell";
import { HRRecruitmentsTable } from "@/components/common/Dashboard/HRRecruitmentsTable";

export const HRRecruitmentPage = () => {
    const dispatch = useDispatch();
    const { data, isLoading, fetchData, error } = useSelector((state) => state.HRRecruitmentReducer);

    useEffect(() => {
        dispatch(HandleGetHRRecruitments());
    }, [dispatch]);

    useEffect(() => {
        if (fetchData) dispatch(HandleGetHRRecruitments());
    }, [dispatch, fetchData]);

    if (isLoading) return <Loading />;

    return (
        <div className="h-full w-full p-0 space-y-3">
            <CardShell title="Recruitments" actions={<CreateRecruitmentDialogBox />}>
                <div className="text-xs text-gray-500">Manage open and recent recruitment postings</div>
            </CardShell>
            <HRRecruitmentsTable recruitments={Array.isArray(data) ? data : []} />
            {error?.status && (
                <div className="p-3 text-red-600 rounded-lg bg-red-50">{error.message || "Failed to load recruitments"}</div>
            )}
        </div>
    );
};


