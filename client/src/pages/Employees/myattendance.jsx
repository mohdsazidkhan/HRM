import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "@/components/common/loading";
import {
  HandleCheckIn,
  HandleCheckOut,
  HandleGetTodayAttendance,
  HandleGetMyAttendance,
} from "@/redux/Thunks/EmployeeAttendanceThunk";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { formatDateTimeDDMMYYYYatHHMM } from "@/utils/commonhandler";
import { Clock, CheckCircle, XCircle, Calendar } from "lucide-react";

export const MyAttendancePage = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { todayData, myAttendanceData, isLoading, error } = useSelector(
    (state) => state.EmployeeAttendanceReducer
  );

  const todayStr = new Date().toISOString().slice(0, 10);
  const [dateRange, setDateRange] = useState({
    startDate: todayStr,
    endDate: todayStr,
  });

  useEffect(() => {
    dispatch(HandleGetTodayAttendance());
  }, [dispatch]);

  useEffect(() => {
    if (dateRange.startDate || dateRange.endDate) {
      dispatch(HandleGetMyAttendance(dateRange));
    }
  }, [dispatch, dateRange.startDate, dateRange.endDate]);

  const handleCheckIn = async () => {
    try {
      // Try to get location (optional)
      let location = null;
      let device = navigator.userAgent || "Unknown";

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            location = `${position.coords.latitude}, ${position.coords.longitude}`;
          },
          () => {
            // Location access denied or failed
            location = null;
          }
        );
      }

      const result = await dispatch(
        HandleCheckIn({ location, device })
      ).unwrap();

      if (result.success) {
        toast({
          title: "Check-in Successful",
          description: "You have been checked in successfully.",
        });
        dispatch(HandleGetTodayAttendance());
      }
    } catch (error) {
      toast({
        title: "Check-in Failed",
        description: error.message || "Failed to check in. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCheckOut = async () => {
    try {
      const result = await dispatch(HandleCheckOut()).unwrap();

      if (result.success) {
        toast({
          title: "Check-out Successful",
          description: "You have been checked out successfully.",
        });
        dispatch(HandleGetTodayAttendance());
      }
    } catch (error) {
      toast({
        title: "Check-out Failed",
        description: error.message || "Failed to check out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const hasActiveCheckIn = todayData?.logs?.some((log) => !log.checkOut);
  const todayLogsSorted = Array.isArray(todayData?.logs)
    ? [...todayData.logs].sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn))
    : [];

  const formatTime = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const calculateHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return "-";
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    if (isNaN(inDate) || isNaN(outDate)) return "-";
    const diffMs = Math.max(0, outDate - inDate);
    const totalMinutes = Math.round(diffMs / 60000); // round to nearest minute to avoid seconds drift
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  if (isLoading && !todayData) return <Loading />;

  return (
    <div className="p-0 space-y-4">
      <div className="flex items-end justify-between mb-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Attendance</h2>
          <p className="text-sm text-gray-500">Track your check-in and check-out times</p>
        </div>
      </div>

      {/* Today's Attendance Card */}
      <div className="rounded-2xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur p-4">
        <div className="flex items-center justify-between mb-0">
          <h3 className="font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Today's Attendance
          </h3>
            {todayData && (
              <div className="text-sm text-gray-600">
                Total Hours:{" "}
                <span className="font-semibold">
                  {todayData.totalWorkingHours
                    ? `${Math.floor(todayData.totalWorkingHours)}h ${Math.round((todayData.totalWorkingHours % 1) * 60)}m`
                    : "0h"}
                </span>
              </div>
            )}
            {!hasActiveCheckIn ? (
              <Button
                onClick={handleCheckIn}
                className="flex-1 sm:flex-none"
                disabled={isLoading}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Check In
              </Button>
            ) : (
              <Button
                onClick={handleCheckOut}
                variant="secondary"
                className="flex-1 sm:flex-none"
                disabled={isLoading}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Check Out
              </Button>
            )}
          </div>

        {!todayData ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">No attendance record for today.</p>
            <Button onClick={handleCheckIn} className="w-full sm:w-auto">
              <CheckCircle className="w-4 h-4 mr-2" />
              Check In
            </Button>
          </div>
        ) : (
          null
        )}
      </div>

      {/* Attendance History */}
      <div className="rounded-2xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Attendance History</h3>
          <div className="flex gap-2">
            <Input
              type="date"
              value={dateRange.startDate}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, startDate: e.target.value }))
              }
              className="h-9 text-sm"
              placeholder="Start Date"
            />
            <Input
              type="date"
              value={dateRange.endDate}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, endDate: e.target.value }))
              }
              className="h-9 text-sm"
              placeholder="End Date"
            />
          </div>
        </div>

        {myAttendanceData && Array.isArray(myAttendanceData) && myAttendanceData.length > 0 ? (
          <div className="space-y-3">
            {myAttendanceData.map((record) => (
              <div
                key={record._id}
                className="p-3 rounded-lg bg-gray-50 border"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{formatDate(record.date)}</div>
                  <div className="text-sm text-gray-600">
                    Total: {record.totalWorkingHours
                      ? `${Math.floor(record.totalWorkingHours)}h ${Math.round((record.totalWorkingHours % 1) * 60)}m`
                      : "0h"}
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Check-ins: {record.checkInCount || 0}
                </div>
                {Array.isArray(record.logs) && record.logs.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {[...record.logs]
                      .sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn))
                      .map((log, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-md bg-white border">
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-full ${log.checkOut ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>
                            <Clock className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">
                              {formatTime(log.checkIn)} - {log.checkOut ? formatTime(log.checkOut) : "Active"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {log.checkOut ? `Duration: ${calculateHours(log.checkIn, log.checkOut)}` : "Currently checked in"}
                            </div>
                            {log.location && (
                              <div className="text-xs text-gray-400 mt-1">Location: {log.location}</div>
                            )}
                          </div>
                        </div>
                        {log.checkOut && (
                          <div className="text-[11px] text-green-600 font-medium">Completed</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            {dateRange.startDate || dateRange.endDate
              ? "No attendance records found for the selected date range."
              : "Select a date range to view attendance history."}
          </p>
        )}
      </div>

      {error?.status && (
        <div className="p-3 text-red-600 rounded-lg bg-red-50">
          {error.message || "An error occurred"}
        </div>
      )}
    </div>
  );
};

