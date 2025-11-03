import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "@/components/common/loading";
import { HandleGetHRApplicants } from "@/redux/Thunks/HRApplicantsThunk";
import { CreateApplicantDialogBox } from "@/components/common/Dashboard/dialogboxes";
import { CardShell } from "@/components/common/Dashboard/CardShell";
import { HRApplicantsTable } from "@/components/common/Dashboard/HRApplicantsTable";

export const HRApplicantsPage = () => {
    const dispatch = useDispatch();
    const { data, isLoading, fetchData, error } = useSelector((state) => state.HRApplicantsReducer);

    useEffect(() => { dispatch(HandleGetHRApplicants()); }, [dispatch]);
    useEffect(() => { if (fetchData) dispatch(HandleGetHRApplicants()); }, [dispatch, fetchData]);
    if (isLoading) return <Loading />;

    return (
        <div className="h-full w-full p-0 space-y-3">
            <CardShell title="Applicants" actions={<CreateApplicantDialogBox />}>
                <div className="text-xs text-gray-500">Manage job applicants and their information</div>
            </CardShell>
            <HRApplicantsTable applicants={Array.isArray(data) ? data : []} />
            {error?.status && <div className="p-3 text-red-600 rounded-lg bg-red-50">{error.message || "Failed to load applicants"}</div>}
        </div>
    )
}


