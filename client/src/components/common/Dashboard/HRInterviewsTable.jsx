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
import { UpdateInterviewDialogBox, DeleteInterviewDialogBox } from "./dialogboxes";

export const HRInterviewsTable = ({ interviews = [] }) => {
    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState({ key: "applicant", dir: "asc" });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return (Array.isArray(interviews) ? interviews : []).filter((iv) => {
            if (!q) return true;
            const applicantName = `${iv.applicant?.firstname || ""} ${iv.applicant?.lastname || ""}`.toLowerCase();
            const interviewerName = `${iv.interviewer?.firstname || ""} ${iv.interviewer?.lastname || ""}`.toLowerCase();
            return (
                applicantName.includes(q) ||
                interviewerName.includes(q) ||
                (iv.applicant?.email || "").toLowerCase().includes(q) ||
                (iv.interviewer?.email || "").toLowerCase().includes(q)
            );
        });
    }, [interviews, query]);

    const sorted = useMemo(() => {
        const arr = [...filtered];
        const { key, dir } = sortBy;
        arr.sort((a, b) => {
            let av, bv;
            if (key === "applicant") {
                av = `${a.applicant?.firstname || ""} ${a.applicant?.lastname || ""}`.toLowerCase();
                bv = `${b.applicant?.firstname || ""} ${b.applicant?.lastname || ""}`.toLowerCase();
            } else if (key === "interviewer") {
                av = `${a.interviewer?.firstname || ""} ${a.interviewer?.lastname || ""}`.toLowerCase();
                bv = `${b.interviewer?.firstname || ""} ${b.interviewer?.lastname || ""}`.toLowerCase();
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

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
                <Input
                    placeholder="Search applicant/interviewer..."
                    value={query}
                    onChange={(e) => { setPage(1); setQuery(e.target.value); }}
                    className="max-w-xs"
                />
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
                            <TableHead className="cursor-pointer" onClick={() => toggleSort("applicant")}>Applicant</TableHead>
                            <TableHead>Applicant Email</TableHead>
                            <TableHead className="cursor-pointer" onClick={() => toggleSort("interviewer")}>Interviewer</TableHead>
                            <TableHead>Interviewer Email</TableHead>
                            <TableHead className="text-right w-[180px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pageData.map((iv) => (
                            <TableRow key={iv._id}>
                                <TableCell className="font-medium">{iv.applicant?.firstname} {iv.applicant?.lastname || "-"}</TableCell>
                                <TableCell>{iv.applicant?.email || "-"}</TableCell>
                                <TableCell>{iv.interviewer?.firstname} {iv.interviewer?.lastname || "-"}</TableCell>
                                <TableCell>{iv.interviewer?.email || "-"}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <UpdateInterviewDialogBox interview={iv} />
                                        <DeleteInterviewDialogBox interviewID={iv._id} />
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

