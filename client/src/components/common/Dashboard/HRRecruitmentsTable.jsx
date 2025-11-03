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
import { UpdateRecruitmentDialogBox, DeleteRecruitmentDialogBox } from "./dialogboxes";

export const HRRecruitmentsTable = ({ recruitments = [] }) => {
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [sortBy, setSortBy] = useState({ key: "title", dir: "asc" });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return (Array.isArray(recruitments) ? recruitments : [])
            .filter((r) => (statusFilter ? (r.status || "").toLowerCase() === statusFilter : true))
            .filter((r) => {
                if (!q) return true;
                return (
                    (r.title || "").toLowerCase().includes(q) ||
                    (r.department || "").toLowerCase().includes(q)
                );
            });
    }, [recruitments, query, statusFilter]);

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
                    placeholder="Search title/department..."
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
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                </select>
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

            <div className="rounded-2xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="cursor-pointer" onClick={() => toggleSort("title")}>Title</TableHead>
                            <TableHead className="cursor-pointer" onClick={() => toggleSort("department")}>Department</TableHead>
                            <TableHead className="w-[120px] cursor-pointer" onClick={() => toggleSort("status")}>Status</TableHead>
                            <TableHead className="text-right w-[180px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pageData.map((rec) => (
                            <TableRow key={rec._id}>
                                <TableCell className="font-medium">{rec.title || "-"}</TableCell>
                                <TableCell>{rec.department || "-"}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                        rec.status === "Open" ? "bg-green-100 text-green-700" :
                                        rec.status === "Closed" ? "bg-red-100 text-red-700" :
                                        "bg-gray-100 text-gray-700"
                                    }`}>
                                        {rec.status || "-"}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <UpdateRecruitmentDialogBox recruitment={rec} />
                                        <DeleteRecruitmentDialogBox recruitmentID={rec._id} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

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

