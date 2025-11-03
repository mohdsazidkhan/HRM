import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "@/components/common/loading";
import { HandleGetHRProfiles } from "@/redux/Thunks/HRProfilesThunk";
import { CardShell } from "@/components/common/Dashboard/CardShell";
import { HRProfilesTable } from "@/components/common/Dashboard/HRProfilesTable";

export const HRProfilesPage = () => {
    const dispatch = useDispatch();
    const { data, isLoading, fetchData, error } = useSelector((state) => state.HRProfilesReducer);

    useEffect(() => {
        dispatch(HandleGetHRProfiles());
    }, [dispatch]);

    useEffect(() => {
        if (fetchData) dispatch(HandleGetHRProfiles());
    }, [dispatch, fetchData]);

    if (isLoading) return <Loading />;

    return (
        <div className="h-full w-full p-0 space-y-3">
            <CardShell title="HR Profiles">
                <div className="text-xs text-gray-500">Manage HR team member profiles</div>
            </CardShell>
            <HRProfilesTable profiles={Array.isArray(data) ? data : []} />
            {error?.status && (
                <div className="p-3 text-red-600 rounded-lg bg-red-50">{error.message || "Failed to load HR profiles"}</div>
            )}
        </div>
    )
}


