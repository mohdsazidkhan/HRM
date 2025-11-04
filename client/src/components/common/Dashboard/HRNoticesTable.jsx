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
import { UpdateNoticeDialogBox, DeleteNoticeDialogBox } from "./dialogboxes";
;

export const HRNoticesTable = ({ notices = [] }) => {
    const [query, setQuery] = useState("");
    const [audienceFilter, setAudienceFilter] = useState("");
    const [sortBy, setSortBy] = useState({ key: "title", dir: "asc" });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const isMobile = (typeof window !== "undefined" && window.innerWidth < 768) ? "grid" : "table";
    const [viewMode, setViewMode] = useState(isMobile ? "grid" : "table");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return (Array.isArray(notices) ? notices : [])
            .filter((n) => (audienceFilter ? (n.audience || "").toLowerCase() === audienceFilter : true))
            .filter((n) => {
                if (!q) return true;
                const createdBy = n.createdby ? `${n.createdby.firstname || ""} ${n.createdby.lastname || ""}`.toLowerCase() : "";
                return (
                    (n.title || "").toLowerCase().includes(q) ||
                    createdBy.includes(q)
                );
            });
    }, [notices, query, audienceFilter]);

    const sorted = useMemo(() => {
        const arr = [...filtered];
        const { key, dir } = sortBy;
        arr.sort((a, b) => {
            const av = (a[key] || "").toString().toLowerCase();
            const bv = (b[key] || "").toString().toLowerCase();
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
                    placeholder="Search title/creator..."
                    value={query}
                    onChange={(e) => { setPage(1); setQuery(e.target.value); }}
                    className="max-w-xs"
                />
                <select
                    value={audienceFilter}
                    onChange={(e) => { setPage(1); setAudienceFilter(e.target.value); }}
                    className="h-10 rounded-md border px-2"
                >
                    <option value="">All Audience</option>
                    <option value="all">All</option>
                    <option value="employees">Employees</option>
                    <option value="departments">Departments</option>
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
                            <TableHead className="cursor-pointer" onClick={() => toggleSort("audience")}>Audience</TableHead>
                            <TableHead>Created By</TableHead>
                            <TableHead className="text-right w-[180px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pageData.map((n) => {
                            const createdBy = n.createdby ? `${n.createdby.firstname || ""} ${n.createdby.lastname || ""}`.trim() : "System";
                            return (
                                <TableRow key={n._id}>
                                    <TableCell className="font-medium">{n.title || "-"}</TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-100 px-2 py-[2px] text-xs">
                                            {n.audience || "All"}
                                        </span>
                                    </TableCell>
                                    <TableCell>{createdBy}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <UpdateNoticeDialogBox notice={n} />
                                            <DeleteNoticeDialogBox noticeID={n._id} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            {viewMode === "list" && (
                <div className="divide-y rounded-2xl ring-1 ring-gray-200/60 bg-white/80 backdrop-blur">
                    {pageData.map((n) => {
                        const createdBy = n.createdby ? `${n.createdby.firstname || ""} ${n.createdby.lastname || ""}`.trim() : "System";
                        return (
                            <div key={n._id} className="p-3 space-y-1">
                                <div className="font-medium">{n.title || "-"}</div>
                                <div className="text-xs text-gray-500">Audience: {n.audience || "All"}</div>
                                <div className="text-xs text-gray-500">By: {createdBy}</div>
                                <div className="pt-1 flex justify-end gap-2">
                                    <UpdateNoticeDialogBox notice={n} />
                                    <DeleteNoticeDialogBox noticeID={n._id} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {viewMode === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pageData.map((n) => {
                        const createdBy = n.createdby ? `${n.createdby.firstname || ""} ${n.createdby.lastname || ""}`.trim() : "System";
                        return (
                            <div key={n._id} className="rounded-xl ring-1 ring-gray-200 bg-white p-3 space-y-1">
                                <div className="font-medium">{n.title || "-"}</div>
                                <div className="text-xs text-gray-500">{n.audience || "All"}</div>
                                <div className="text-xs text-gray-500">{createdBy}</div>
                                <div className="pt-1 flex justify-end gap-2">
                                    <UpdateNoticeDialogBox notice={n} />
                                    <DeleteNoticeDialogBox noticeID={n._id} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">Page {currentPage} of {totalPages} (Total {sorted.length})</div>
                <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 rounded-md border text-sm" onClick={() => setPage(1)} disabled={currentPage === 1}>First</button>
                    <button className="px-3 py-1.5 rounded-md border text-sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>Prev</button>
                    <button className="px-3 py-1.5 rounded-md border text-sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</button>
                    <button className="px-3 py-1.5 rounded-md border text-sm" onClick={() => setPage(totalPages)} disabled={currentPage === totalPages}>Last</button>
                </div>
            </div>
        </div>
    );
};

