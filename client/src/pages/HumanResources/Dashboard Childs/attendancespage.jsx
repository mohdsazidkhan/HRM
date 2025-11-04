import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "@/components/common/loading";
import { HandleGetHRAttendance } from "@/redux/Thunks/HRAttendanceThunk";
import { CardShell } from "@/components/common/Dashboard/CardShell";
import { HRAttendancesTable } from "@/components/common/Dashboard/HRAttendancesTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchEmployeesIDs } from "@/redux/Thunks/EmployeesIDsThunk";

export const HRAttendancesPage = () => {
  const dispatch = useDispatch();
  const { data, isLoading, fetchData, error } = useSelector(
    (state) => state.HRAttendanceReducer
  );
  const { data: employeesList } = useSelector(
    (state) => state.EMployeesIDReducer
  );

  const [filters, setFilters] = useState({
    employeeID: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  useEffect(() => {
    dispatch(HandleGetHRAttendance(filters));
    dispatch(fetchEmployeesIDs({ apiroute: "GETALL" }));
  }, [dispatch]);

  useEffect(() => {
    if (fetchData) {
      dispatch(HandleGetHRAttendance(filters));
    }
  }, [dispatch, fetchData]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    dispatch(HandleGetHRAttendance(filters));
  };

  const handleResetFilters = () => {
    const resetFilters = {
      employeeID: "",
      startDate: "",
      endDate: "",
      status: "",
    };
    setFilters(resetFilters);
    dispatch(HandleGetHRAttendance(resetFilters));
  };

  if (isLoading && !data) return <Loading />;

  return (
    <div className="p-3 space-y-3">
      <CardShell title="Attendance Management">
        <div className="text-xs text-gray-500">
          Track employee attendance with check-in/check-out logs and working hours
        </div>
      </CardShell>

      {/* Filters Section */}
      <div className="rounded-2xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">Filters</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="text-xs"
            >
              Reset
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleApplyFilters}
              className="text-xs"
            >
              Apply Filters
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Employee</label>
            <select
              value={filters.employeeID}
              onChange={(e) => handleFilterChange("employeeID", e.target.value)}
              className="w-full h-9 rounded-md border px-2 text-sm"
            >
              <option value="">All Employees</option>
              {Array.isArray(employeesList) &&
                employeesList.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.firstname} {emp.lastname}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Start Date</label>
            <Input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
              className="h-9 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 mb-1 block">End Date</label>
            <Input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
              className="h-9 text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full h-9 rounded-md border px-2 text-sm"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="no check-in">No Check-in</option>
            </select>
          </div>
        </div>
      </div>

      <HRAttendancesTable attendances={Array.isArray(data) ? data : []} />
      {error?.status && (
        <div className="p-3 text-red-600 rounded-lg bg-red-50">
          {error.message || "Failed to load attendance"}
        </div>
      )}
    </div>
  );
};
