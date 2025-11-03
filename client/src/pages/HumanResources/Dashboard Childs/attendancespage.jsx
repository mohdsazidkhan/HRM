import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "@/components/common/loading";
import { HandleGetHRAttendance } from "@/redux/Thunks/HRAttendanceThunk";
import { CreateAttendanceDialogBox } from "@/components/common/Dashboard/dialogboxes";
import { CardShell } from "@/components/common/Dashboard/CardShell";
import { HRAttendancesTable } from "@/components/common/Dashboard/HRAttendancesTable";

export const HRAttendancesPage = () => {
  const dispatch = useDispatch();
  const { data, isLoading, fetchData, error } = useSelector(
    (state) => state.HRAttendanceReducer
  );

  useEffect(() => {
    dispatch(HandleGetHRAttendance());
  }, [dispatch]);

  useEffect(() => {
    if (fetchData) dispatch(HandleGetHRAttendance());
  }, [dispatch, fetchData]);

  if (isLoading) return <Loading />;

  return (
    <div className="p-3 space-y-3">
      <CardShell title="Attendances" actions={<CreateAttendanceDialogBox />}> 
        <div className="text-xs text-gray-500">Track attendance logs with timestamps</div>
      </CardShell>
      <HRAttendancesTable attendances={Array.isArray(data) ? data : []} />
      {error?.status && (
        <div className="p-3 text-red-600">
          {error.message || "Failed to load attendance"}
        </div>
      )}
    </div>
  );
};
