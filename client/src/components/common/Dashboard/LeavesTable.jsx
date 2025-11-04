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
import { Button } from "@/components/ui/button";
;
import { DeleteLeaveDialogBox } from "./dialogboxes";

export const LeavesTable = ({ leaves = [], onUpdate }) => {
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [sortBy, setSortBy] = useState({ key: "startdate", dir: "desc" });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const isMobile = (typeof window !== "undefined" && window.innerWidth < 768) ? "grid" : "table";
    const [viewMode, setViewMode] = useState(isMobile ? "grid" : "table");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return (Array.isArray(leaves) ? leaves : [])
            .filter((l) => (statusFilter ? (l.status || "").toLowerCase() === statusFilter : true))
            .filter((l) => {
                if (!q) return true;
                return (
                    (l.title || "").toLowerCase().includes(q) ||
                    (l.reason || "").toLowerCase().includes(q)
                );
            });
    }, [leaves, query, statusFilter]);

    const sorted = useMemo(() => {
        const arr = [...filtered];
        const { key, dir } = sortBy;
        arr.sort((a, b) => {
            const isDate = key === "startdate" || key === "enddate";
            const av = isDate ? new Date(a[key] || 0).getTime() : (a[key] || "").toString().toLowerCase();
            const bv = isDate ? new Date(b[key] || 0).getTime() : (b[key] || "").toString().toLowerCase();
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

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
                <Input
                    placeholder="Search title/reason..."
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
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="pending">Pending</option>
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
                            <TableHead className="cursor-pointer" onClick={() => toggleSort("title")}>Title</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead className="cursor-pointer" onClick={() => toggleSort("startdate")}>Start</TableHead>
                            <TableHead className="cursor-pointer" onClick={() => toggleSort("enddate")}>End</TableHead>
                            <TableHead className="w-[120px]">Status</TableHead>
                            <TableHead className="text-right w-[120px]">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pageData.map((lv) => (
                            <TableRow key={lv._id}>
                                <TableCell className="font-medium">{lv.title || "-"}</TableCell>
                                <TableCell className="max-w-[420px] truncate" title={lv.reason || "-"}>{lv.reason || "-"}</TableCell>
                                <TableCell>{lv.startdate ? new Date(lv.startdate).toLocaleDateString() : "-"}</TableCell>
                                <TableCell>{lv.enddate ? new Date(lv.enddate).toLocaleDateString() : "-"}</TableCell>
                                <TableCell>
                                    {lv.status && (
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                            lv.status === "Approved" ? "bg-green-100 text-green-700" :
                                            lv.status === "Rejected" ? "bg-red-100 text-red-700" :
                                            "bg-yellow-100 text-yellow-700"
                                        }`}>
                                            {lv.status}
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="outline" size="default" onClick={() => onUpdate && onUpdate(lv)}>Update</Button>
                                        <DeleteLeaveDialogBox leaveID={lv._id} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {viewMode === "list" && (
                <div className="divide-y rounded-2xl ring-1 ring-gray-200/60 bg-white/80 backdrop-blur">
                    {pageData.map((lv) => (
                        <div key={lv._id} className="p-3 space-y-1">
                            <div className="font-medium">{lv.title || "-"}</div>
                            <div className="text-xs text-gray-500 truncate">{lv.reason || "-"}</div>
                            <div className="text-xs text-gray-500">{lv.startdate ? new Date(lv.startdate).toLocaleDateString() : "-"} → {lv.enddate ? new Date(lv.enddate).toLocaleDateString() : "-"}</div>
                            <div className="text-xs text-gray-500">{lv.status || "Pending"}</div>
                            <div className="pt-1 flex justify-end gap-2">
                                <Button variant="outline" size="default" onClick={() => onUpdate && onUpdate(lv)}>Update</Button>
                                <DeleteLeaveDialogBox leaveID={lv._id} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {viewMode === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pageData.map((lv) => (
                        <div key={lv._id} className="rounded-xl ring-1 ring-gray-200 bg-white p-3 space-y-1">
                            <div className="font-medium">{lv.title || "-"}</div>
                            <div className="text-xs text-gray-500">{lv.startdate ? new Date(lv.startdate).toLocaleDateString() : "-"} → {lv.enddate ? new Date(lv.enddate).toLocaleDateString() : "-"}</div>
                            <div className="text-xs text-gray-500">{lv.status || "Pending"}</div>
                            <div className="pt-1 flex justify-end gap-2">
                                <Button variant="outline" size="default" onClick={() => onUpdate && onUpdate(lv)}>Update</Button>
                                <DeleteLeaveDialogBox leaveID={lv._id} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Page {currentPage} of {totalPages} (Total {sorted.length})</div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="default" onClick={() => setPage(1)} disabled={currentPage === 1}>First</Button>
                    <Button variant="outline" size="default" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>Prev</Button>
                    <Button variant="outline" size="default" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</Button>
                    <Button variant="outline" size="default" onClick={() => setPage(totalPages)} disabled={currentPage === totalPages}>Last</Button>
                </div>
            </div>
        </div>
    );
};


