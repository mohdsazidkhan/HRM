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

export const RequestsTable = ({ requests = [], onUpdate }) => {
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [sortBy, setSortBy] = useState({ key: "createdAt", dir: "desc" });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return (Array.isArray(requests) ? requests : [])
            .filter((r) => (statusFilter ? (r.status || "").toLowerCase() === statusFilter : true))
            .filter((r) => {
                if (!q) return true;
                return (
                    (r.requesttitle || "").toLowerCase().includes(q) ||
                    (r.requestconent || "").toLowerCase().includes(q)
                );
            });
    }, [requests, query, statusFilter]);

    const sorted = useMemo(() => {
        const arr = [...filtered];
        const { key, dir } = sortBy;
        arr.sort((a, b) => {
            const av = key === "createdAt" ? new Date(a[key] || 0).getTime() : (a[key] || "").toString().toLowerCase();
            const bv = key === "createdAt" ? new Date(b[key] || 0).getTime() : (b[key] || "").toString().toLowerCase();
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
                    placeholder="Search title/content..."
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
                            <TableHead className="w-[80px] cursor-pointer" onClick={() => toggleSort("createdAt")}>Date</TableHead>
                            <TableHead className="cursor-pointer" onClick={() => toggleSort("requesttitle")}>Title</TableHead>
                            <TableHead>Content</TableHead>
                            <TableHead className="w-[120px] cursor-pointer" onClick={() => toggleSort("status")}>Status</TableHead>
                            <TableHead className="text-right w-[120px]">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pageData.map((rq) => (
                            <TableRow key={rq._id}>
                                <TableCell>{rq.createdAt ? new Date(rq.createdAt).toLocaleString() : "-"}</TableCell>
                                <TableCell className="font-medium">{rq.requesttitle || "-"}</TableCell>
                                <TableCell className="max-w-[420px] truncate" title={rq.requestconent || "-"}>{rq.requestconent || "-"}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                        rq.status === "Approved" ? "bg-green-100 text-green-700" :
                                        rq.status === "Rejected" ? "bg-red-100 text-red-700" :
                                        "bg-yellow-100 text-yellow-700"
                                    }`}>
                                        {rq.status || "Pending"}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="default" onClick={() => onUpdate && onUpdate(rq)}>Update</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

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


