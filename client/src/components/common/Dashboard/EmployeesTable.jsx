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
import { EmployeeDetailsDialogBox, UpdateEmployeeDialogBox, DeleteEmployeeDialogBox } from "./dialogboxes";
;

export const EmployeesTable = ({ employees = [] }) => {
    const [query, setQuery] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState("");
    const [sortBy, setSortBy] = useState({ key: "firstname", dir: "asc" });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const initialMode = (typeof window !== "undefined" && window.innerWidth < 768) ? "grid" : "table"
    const [viewMode, setViewMode] = useState(initialMode) // table | list | grid

    const departments = useMemo(() => {
        const depts = new Set();
        (Array.isArray(employees) ? employees : []).forEach((emp) => {
            const dept = emp.department?.name || emp.department?.toString() || "";
            if (dept) depts.add(dept);
        });
        return Array.from(depts).sort();
    }, [employees]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return (Array.isArray(employees) ? employees : [])
            .filter((emp) => (departmentFilter ? (emp.department?.name || emp.department?.toString() || "") === departmentFilter : true))
            .filter((emp) => {
                if (!q) return true;
                return (
                    (emp.firstname || "").toLowerCase().includes(q) ||
                    (emp.lastname || "").toLowerCase().includes(q) ||
                    (emp.email || "").toLowerCase().includes(q) ||
                    (emp.contactnumber || "").includes(q)
                );
            });
    }, [employees, query, departmentFilter]);

    const sorted = useMemo(() => {
        const arr = [...filtered];
        const { key, dir } = sortBy;
        arr.sort((a, b) => {
            let av, bv;
            if (key === "department") {
                av = (a.department?.name || a.department?.toString() || "").toLowerCase();
                bv = (b.department?.name || b.department?.toString() || "").toLowerCase();
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
                    placeholder="Search name/email/contact..."
                    value={query}
                    onChange={(e) => { setPage(1); setQuery(e.target.value); }}
                    className="max-w-xs"
                />
                <select
                    value={departmentFilter}
                    onChange={(e) => { setPage(1); setDepartmentFilter(e.target.value); }}
                    className="h-10 rounded-md border px-2"
                >
                    <option value="">All Departments</option>
                    {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                    ))}
                </select>
                {/* View toggles - placed before size dropdown */}
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

            {/* Desktop table; also used on mobile if table mode selected */}
            <div className={`rounded-2xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur overflow-x-auto ${viewMode !== "table" ? "hidden" : "block"}`}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="cursor-pointer" onClick={() => toggleSort("firstname")}>Name</TableHead>
                            <TableHead className="cursor-pointer" onClick={() => toggleSort("email")}>Email</TableHead>
                            <TableHead className="cursor-pointer" onClick={() => toggleSort("department")}>Department</TableHead>
                            <TableHead className="cursor-pointer" onClick={() => toggleSort("designation")}>Designation</TableHead>
                            <TableHead className="cursor-pointer" onClick={() => toggleSort("contactnumber")}>Contact</TableHead>
                            <TableHead className="text-right w-[200px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pageData.map((emp) => (
                            <TableRow key={emp._id}>
                                <TableCell className="font-medium">{emp.firstname} {emp.lastname}</TableCell>
                                <TableCell>{emp.email || "-"}</TableCell>
                                <TableCell>{emp.department?.name || emp.department?.toString() || "Not Specified"}</TableCell>
                                <TableCell>{emp.designation?.name || emp.designation?.toString() || "Not Specified"}</TableCell>
                                <TableCell>{emp.contactnumber || "-"}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <EmployeeDetailsDialogBox EmployeeID={emp._id} />
                                        <UpdateEmployeeDialogBox employee={emp} />
                                        <DeleteEmployeeDialogBox EmployeeID={emp._id} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile List View */}
            {viewMode === "list" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
                    <div className="divide-y rounded-2xl ring-1 ring-gray-200/60 bg-white/80 backdrop-blur">
                        {pageData.map((emp) => (
                            <div key={emp._id} className="p-3 flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                    <div className="font-medium truncate">{emp.firstname} {emp.lastname}</div>
                                    <div className="text-xs text-gray-500 truncate">{emp.email || "-"}</div>
                                    <div className="text-xs text-gray-500 truncate">{emp.department?.name || emp.department?.toString() || "Not Specified"} • {emp.designation?.name || emp.designation?.toString() || "Not Specified"}</div>
                                    <div className="text-xs text-gray-500 truncate">{emp.contactnumber || "-"}</div>
                                </div>
                                <div className="shrink-0">
                                    <div className="flex justify-end gap-2">
                                        <EmployeeDetailsDialogBox EmployeeID={emp._id} />
                                        <UpdateEmployeeDialogBox employee={emp} />
                                        <DeleteEmployeeDialogBox EmployeeID={emp._id} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Mobile Grid View */}
            {viewMode === "grid" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {pageData.map((emp) => (
                        <div key={emp._id} className="rounded-xl ring-1 ring-gray-200 bg-white p-3 space-y-1">
                            <div className="font-medium">{emp.firstname} {emp.lastname}</div>
                            <div className="text-xs text-gray-500">{emp.email || "-"}</div>
                            <div className="text-xs text-gray-500">{emp.department?.name || emp.department?.toString() || "Not Specified"}</div>
                            <div className="text-xs text-gray-500">{emp.designation?.name || emp.designation?.toString() || "Not Specified"}</div>
                            <div className="text-xs text-gray-500">{emp.contactnumber || "-"}</div>
                            <div className="pt-1 flex justify-end gap-2">
                                <EmployeeDetailsDialogBox EmployeeID={emp._id} />
                                <UpdateEmployeeDialogBox employee={emp} />
                                <DeleteEmployeeDialogBox EmployeeID={emp._id} />
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

