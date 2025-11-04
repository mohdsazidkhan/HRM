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
import { UpdateHRProfileDialogBox, DeleteHRProfileDialogBox } from "./dialogboxes";
;

export const HRProfilesTable = ({ profiles = [] }) => {
    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState({ key: "firstname", dir: "asc" });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const isMobile = (typeof window !== "undefined" && window.innerWidth < 768) ? "grid" : "table";
    const [viewMode, setViewMode] = useState(isMobile ? "grid" : "table");

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return (Array.isArray(profiles) ? profiles : []).filter((p) => {
            if (!q) return true;
            return (
                (p.firstname || "").toLowerCase().includes(q) ||
                (p.lastname || "").toLowerCase().includes(q) ||
                (p.email || "").toLowerCase().includes(q) ||
                (p.department?.name || "").toLowerCase().includes(q)
            );
        });
    }, [profiles, query]);

    const sorted = useMemo(() => {
        const arr = [...filtered];
        const { key, dir } = sortBy;
        arr.sort((a, b) => {
            const av = key === "department" ? (a.department?.name || "").toLowerCase() : (a[key] || "").toString().toLowerCase();
            const bv = key === "department" ? (b.department?.name || "").toLowerCase() : (b[key] || "").toString().toLowerCase();
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
                    placeholder="Search name/email/department..."
                    value={query}
                    onChange={(e) => { setPage(1); setQuery(e.target.value); }}
                    className="max-w-xs"
                />
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
                            <TableHead className="cursor-pointer" onClick={() => toggleSort("firstname")}>Name</TableHead>
                            <TableHead className="cursor-pointer" onClick={() => toggleSort("email")}>Email</TableHead>
                            <TableHead className="cursor-pointer" onClick={() => toggleSort("department")}>Department</TableHead>
                            <TableHead className="text-right w-[180px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pageData.map((hr) => (
                            <TableRow key={hr._id}>
                                <TableCell className="font-medium">{hr.firstname} {hr.lastname}</TableCell>
                                <TableCell>{hr.email || "-"}</TableCell>
                                <TableCell>{hr.department?.name || hr.department?.toString() || "-"}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <UpdateHRProfileDialogBox profile={hr} />
                                        <DeleteHRProfileDialogBox HRID={hr._id} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {viewMode === "list" && (
                <div className="divide-y rounded-2xl ring-1 ring-gray-200/60 bg-white/80 backdrop-blur">
                    {pageData.map((hr) => (
                        <div key={hr._id} className="p-3 space-y-1">
                            <div className="font-medium">{hr.firstname} {hr.lastname}</div>
                            <div className="text-xs text-gray-500">{hr.email || "-"}</div>
                            <div className="text-xs text-gray-500">{hr.department?.name || "-"}</div>
                            <div className="pt-1 flex justify-end gap-2">
                                <UpdateHRProfileDialogBox profile={hr} />
                                <DeleteHRProfileDialogBox HRID={hr._id} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {viewMode === "grid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pageData.map((hr) => (
                        <div key={hr._id} className="rounded-xl ring-1 ring-gray-200 bg-white p-3 space-y-1">
                            <div className="font-medium">{hr.firstname} {hr.lastname}</div>
                            <div className="text-xs text-gray-500">{hr.email || "-"}</div>
                            <div className="text-xs text-gray-500">{hr.department?.name || "-"}</div>
                            <div className="pt-1 flex justify-end gap-2">
                                <UpdateHRProfileDialogBox profile={hr} />
                                <DeleteHRProfileDialogBox HRID={hr._id} />
                            </div>
                        </div>
                    ))}
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

