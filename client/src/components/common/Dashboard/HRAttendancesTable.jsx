import { useMemo, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { DeleteAttendanceDialogBox } from "./dialogboxes";
import { Dialog, DialogContent, DialogClose, DialogTrigger } from "@/components/ui/dialog";
;

export const HRAttendancesTable = ({ attendances = [] }) => {
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [sortBy, setSortBy] = useState({ key: "date", dir: "desc" });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const isMobile = (typeof window !== "undefined" && window.innerWidth < 768) ? "grid" : "table";
    const [viewMode, setViewMode] = useState(isMobile ? "grid" : "table");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return (Array.isArray(attendances) ? attendances : [])
            .filter((at) => {
                if (statusFilter) {
                    const status = (at.status || "").toLowerCase();
                    return status === statusFilter.toLowerCase();
                }
                return true;
            })
            .filter((at) => {
                if (!q) return true;
                const empName = `${at.employee?.firstname || ""} ${at.employee?.lastname || ""}`.toLowerCase();
                return empName.includes(q);
            });
    }, [attendances, query, statusFilter]);

    const sorted = useMemo(() => {
        const arr = [...filtered];
        const { key, dir } = sortBy;
        arr.sort((a, b) => {
            let av, bv;
            if (key === "date") {
                av = new Date(a.date || a.createdAt || 0).getTime();
                bv = new Date(b.date || b.createdAt || 0).getTime();
            } else if (key === "employee") {
                av = `${a.employee?.firstname || ""} ${a.employee?.lastname || ""}`.toLowerCase();
                bv = `${b.employee?.firstname || ""} ${b.employee?.lastname || ""}`.toLowerCase();
            } else if (key === "totalWorkingHours") {
                av = a.totalWorkingHours || 0;
                bv = b.totalWorkingHours || 0;
            } else {
                av = (a[key] || "").toString().toLowerCase();
                bv = (b[key] || "").toString().toLowerCase();
            }
            if (av < bv) return dir === "asc" ? -1 : 1;
            if (av > bv) return dir === "asc" ? 1 : -1;
            return 0;
        });
        return arr;
    }, [filtered, sortBy]);

    const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const pageData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return sorted.slice(start, start + pageSize);
    }, [sorted, currentPage, pageSize]);

    const toggleSort = (key) => {
        setSortBy((prev) => {
            if (prev.key !== key) return { key, dir: "asc" };
            return { key, dir: prev.dir === "asc" ? "desc" : "asc" };
        });
    };

    const formatDate = (date) => {
        if (!date) return "-";
        const d = new Date(date);
        return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const formatHours = (hours) => {
        if (!hours || hours === 0) return "0h";
        const h = Math.floor(hours);
        const m = Math.round((hours - h) * 60);
        return m > 0 ? `${h}h ${m}m` : `${h}h`;
    };

    const formatTime = (date) => {
        if (!date) return "-";
        const d = new Date(date);
        return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
    };

    const calcDuration = (inTs, outTs) => {
        if (!inTs || !outTs) return "-";
        const diffMs = Math.max(0, new Date(outTs) - new Date(inTs));
        const totalMin = Math.round(diffMs / 60000);
        const h = Math.floor(totalMin / 60);
        const m = totalMin % 60;
        return `${h}h ${m}m`;
    };

    const openLogsDialog = (record) => {
        setSelectedRecord(record);
        setDialogOpen(true);
    };

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
                <Input
                    placeholder="Search employee..."
                    value={query}
                    onChange={(e) => { setPage(1); setQuery(e.target.value); }}
                    className="max-w-xs"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => { setPage(1); setStatusFilter(e.target.value); }}
                    className="h-10 rounded-md border px-2"
                >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="no check-in">No Check-in</option>
                </select>
                {/* View toggles before size dropdown */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">View:</span>
                    <button className={`px-2 py-1 rounded border text-sm ${viewMode === "list" ? "bg-gray-100" : ""}`} onClick={() => setViewMode("list")}>List</button>
                    <button className={`px-2 py-1 rounded border text-sm ${viewMode === "grid" ? "bg-gray-100" : ""}`} onClick={() => setViewMode("grid")}>Grid</button>
                    <button className={`px-2 py-1 rounded border text-sm ${viewMode === "table" ? "bg-gray-100" : ""}`} onClick={() => setViewMode("table")}>Table</button>
                </div>

                <div className="ml-auto flex items-center gap-2">
                    <span className="text-sm text-gray-500">Rows</span>
                    <select
                        value={pageSize}
                        onChange={(e) => { setPage(1); setPageSize(Number(e.target.value) || 10); }}
                        className="h-9 rounded-md border px-2"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </div>

            <div className={`rounded-2xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur overflow-x-auto ${viewMode !== "table" ? "hidden" : "block"}`}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="cursor-pointer" onClick={() => toggleSort("employee")}>
                                Employee
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => toggleSort("date")}>
                                Date
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => toggleSort("totalWorkingHours")}>
                                Total Hours
                            </TableHead>
                            <TableHead>Check-ins</TableHead>
                            <TableHead className="cursor-pointer" onClick={() => toggleSort("status")}>
                                Status
                            </TableHead>
                            <TableHead className="text-right w-[180px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pageData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                                    No attendance records found
                                </TableCell>
                            </TableRow>
                        ) : (
                            pageData.map((at) => (
                                <TableRow key={at._id}>
                                    <TableCell className="font-medium">
                                        {at.employee?.firstname} {at.employee?.lastname || "-"}
                                    </TableCell>
                                    <TableCell>{formatDate(at.date || at.createdAt)}</TableCell>
                                    <TableCell>{formatHours(at.totalWorkingHours || 0)}</TableCell>
                                    <TableCell>
                                        <button
                                            type="button"
                                            className="underline text-blue-600 hover:text-blue-700"
                                            onClick={() => openLogsDialog(at)}
                                        >
                                            {at.checkInCount || 0}
                                        </button>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                            at.status === "Active" ? "bg-blue-100 text-blue-700" :
                                            at.status === "Completed" ? "bg-green-100 text-green-700" :
                                            "bg-gray-100 text-gray-700"
                                        }`}>
                                            {at.status || "-"}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <DeleteAttendanceDialogBox attendanceID={at._id} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {viewMode === "list" && (
                <div className="divide-y rounded-2xl ring-1 ring-gray-200/60 bg-white/80 backdrop-blur">
                    {pageData.map((at) => (
                        <div key={at._id} className="p-3 space-y-1">
                            <div className="font-medium">{at.employee?.firstname} {at.employee?.lastname || "-"}</div>
                            <div className="text-xs text-gray-500">{formatDate(at.date || at.createdAt)}</div>
                            <div className="text-xs text-gray-500">Check-ins: {at.checkInCount || 0} • Hours: {formatHours(at.totalWorkingHours || 0)}</div>
                            <div className="pt-1 flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="underline text-blue-600 hover:text-blue-700"
                                    onClick={() => openLogsDialog(at)}
                                >
                                    View Logs
                                </button>
                                <DeleteAttendanceDialogBox attendanceID={at._id} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {viewMode === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pageData.map((at) => (
                        <div key={at._id} className="rounded-xl ring-1 ring-gray-200 bg-white p-3 space-y-1">
                            <div className="font-medium">{at.employee?.firstname} {at.employee?.lastname || "-"}</div>
                            <div className="text-xs text-gray-500">{formatDate(at.date || at.createdAt)}</div>
                            <div className="text-xs text-gray-500">Check-ins: {at.checkInCount || 0}</div>
                            <div className="text-xs text-gray-500">Hours: {formatHours(at.totalWorkingHours || 0)}</div>
                            <div className="pt-1 flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="underline text-blue-600 hover:text-blue-700"
                                    onClick={() => openLogsDialog(at)}
                                >
                                    View Logs
                                </button>
                                <DeleteAttendanceDialogBox attendanceID={at._id} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages} (Total {sorted.length})
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        className="px-3 py-1.5 rounded-md border text-sm disabled:opacity-50 disabled:cursor-not-allowed" 
                        onClick={() => setPage(1)} 
                        disabled={currentPage === 1}
                    >
                        First
                    </button>
                    <button 
                        className="px-3 py-1.5 rounded-md border text-sm disabled:opacity-50 disabled:cursor-not-allowed" 
                        onClick={() => setPage((p) => Math.max(1, p - 1))} 
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <button 
                        className="px-3 py-1.5 rounded-md border text-sm disabled:opacity-50 disabled:cursor-not-allowed" 
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))} 
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                    <button 
                        className="px-3 py-1.5 rounded-md border text-sm disabled:opacity-50 disabled:cursor-not-allowed" 
                        onClick={() => setPage(totalPages)} 
                        disabled={currentPage === totalPages}
                    >
                        Last
                    </button>
                </div>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-[95vw] sm:max-w-[700px]">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm text-gray-500">Employee</div>
                                <div className="font-medium">
                                    {selectedRecord?.employee?.firstname} {selectedRecord?.employee?.lastname}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-500">Date</div>
                                <div className="font-medium">{formatDate(selectedRecord?.date || selectedRecord?.createdAt)}</div>
                            </div>
                        </div>
                        <div className="rounded-lg border bg-white">
                            <div className="p-3 text-sm font-semibold border-b">Logs</div>
                            <div className="max-h-[50vh] overflow-y-auto divide-y">
                                {Array.isArray(selectedRecord?.logs) && selectedRecord.logs.length > 0 ? (
                                    [...selectedRecord.logs]
                                        .sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn))
                                        .map((log, idx) => (
                                            <div key={idx} className="p-3 flex items-center justify-between">
                                                <div>
                                                    <div className="text-sm font-medium">
                                                        {formatTime(log.checkIn)} - {log.checkOut ? formatTime(log.checkOut) : "Active"}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {log.checkOut ? `Duration: ${calcDuration(log.checkIn, log.checkOut)}` : "Currently checked in"}
                                                    </div>
                                                    {log.location && (
                                                        <div className="text-xs text-gray-400 mt-1">Location: {log.location}</div>
                                                    )}
                                                    {log.device && (
                                                        <div className="text-xs text-gray-400">Device: {log.device}</div>
                                                    )}
                                                </div>
                                                {log.checkOut && (
                                                    <div className="text-[11px] text-green-600 font-medium">Completed</div>
                                                )}
                                            </div>
                                        ))
                                ) : (
                                    <div className="p-3 text-sm text-gray-500">No logs found for this date.</div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <DialogClose asChild>
                                <button className="px-3 py-1.5 rounded-md border text-sm">Close</button>
                            </DialogClose>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
