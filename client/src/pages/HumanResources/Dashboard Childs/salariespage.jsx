import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "@/components/common/loading";
import { HandleGetHRSalary } from "@/redux/Thunks/HRSalaryThunk";
import { CreateSalaryDialogBox, UpdateSalaryDialogBox, DeleteSalaryDialogBox } from "@/components/common/Dashboard/dialogboxes";
import { CardShell } from "@/components/common/Dashboard/CardShell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, IndianRupee, Wallet, TrendingUp, TrendingDown, Eye } from "lucide-react";
;

/* eslint-disable react/prop-types */
const SalaryBreakdownModal = ({ salary }) => {
    const salarySets = Array.isArray(salary.salarySets) ? salary.salarySets : []
    const earnings = salarySets.filter(it => it.set?.type === 'Earning')
    const deductions = salarySets.filter(it => it.set?.type === 'Deduction')

    if (salarySets.length === 0) return <span className="text-gray-400 text-sm">No breakdown</span>

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>View Breakdown</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[500px] lg:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Salary Breakdown</h2>
                    <div className="space-y-4">
                        {earnings.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-3 text-base font-semibold text-green-700">
                                    <TrendingUp className="w-5 h-5" />
                                    <span>Earnings ({earnings.length})</span>
                                </div>
                                <div className="space-y-2 ml-7">
                                    {earnings.map((it) => (
                                        <div key={it.set?._id || it.set} className="flex justify-between items-center py-2 px-3 hover:bg-green-50 rounded-lg border border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-700">{it.set?.name || 'N/A'}</span>
                                                {it.set?.calcType && (
                                                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">{it.set.calcType}</span>
                                                )}
                                            </div>
                                            <span className="text-sm font-semibold text-green-700">+{it.amount} {salary.currency}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {deductions.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-3 text-base font-semibold text-red-700">
                                    <TrendingDown className="w-5 h-5" />
                                    <span>Deductions ({deductions.length})</span>
                                </div>
                                <div className="space-y-2 ml-7">
                                    {deductions.map((it) => (
                                        <div key={it.set?._id || it.set} className="flex justify-between items-center py-2 px-3 hover:bg-red-50 rounded-lg border border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-700">{it.set?.name || 'N/A'}</span>
                                                {it.set?.calcType && (
                                                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">{it.set.calcType}</span>
                                                )}
                                            </div>
                                            <span className="text-sm font-semibold text-red-700">-{it.amount} {salary.currency}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="pt-3 mt-3 border-t-2 border-gray-300">
                            <div className="flex justify-between items-center">
                                <span className="text-base font-bold text-gray-800">Net Pay</span>
                                <span className="text-lg font-bold text-blue-700">{salary.netpay} {salary.currency}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <DialogClose asChild>
                            <Button variant="secondary">Close</Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
/* eslint-enable react/prop-types */

export const HRSalariesPage = () => {
    const dispatch = useDispatch();
    const { data, isLoading, fetchData, error } = useSelector((state) => state.HRSalaryReducer);
    const isMobile = (typeof window !== "undefined" && window.innerWidth < 768) ? "grid" : "table";
    const [viewMode, setViewMode] = useState(isMobile ? "grid" : "table");

    useEffect(() => {
        dispatch(HandleGetHRSalary());
    }, [dispatch]);

    useEffect(() => {
        if (fetchData) dispatch(HandleGetHRSalary());
    }, [dispatch, fetchData]);

    if (isLoading) return <Loading />;

    return (
        <div className="h-full w-full p-0 space-y-3">
            <CardShell title="Salaries" actions={<CreateSalaryDialogBox />}>
                <div className="text-xs text-gray-500">Manage employee salary records and payments</div>
            </CardShell>
            <div className="rounded-2xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur p-3">
                <div className="flex items-center justify-between pb-2 border-b mb-2">
                    <div className="font-medium text-gray-500">Salaries</div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">View:</span>
                        <button className={`px-2 py-1 rounded border text-sm ${viewMode === "list" ? "bg-gray-100" : ""}`} onClick={() => setViewMode("list")}>List</button>
                        <button className={`px-2 py-1 rounded border text-sm ${viewMode === "grid" ? "bg-gray-100" : ""}`} onClick={() => setViewMode("grid")}>Grid</button>
                        <button className={`px-2 py-1 rounded border text-sm ${viewMode === "table" ? "bg-gray-100" : ""}`} onClick={() => setViewMode("table")}>Table</button>
                    </div>
                </div>

                {/* Table view */}
                {Array.isArray(data) && data.length > 0 && viewMode === "table" ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Basic Pay</TableHead>
                                <TableHead>Net Pay</TableHead>
                                <TableHead>Breakdown</TableHead>
                                
                                <TableHead className="text-right w-[180px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((sal) => (
                                <TableRow key={sal._id}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <User className="w-4 h-4 text-gray-500" />
                                        <span>{sal.employee?.firstname} {sal.employee?.lastname}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center gap-1"><Wallet className="w-4 h-4 text-gray-400" />{sal.basicpay} {sal.currency}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center gap-1"><IndianRupee className="w-4 h-4 text-gray-400" />{sal.netpay} {sal.currency}</span>
                                    </TableCell>
                                    <TableCell>
                                        <SalaryBreakdownModal salary={sal} />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <UpdateSalaryDialogBox salary={sal} />
                                            <DeleteSalaryDialogBox salaryID={sal._id} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    viewMode === "table" ? <div className="text-sm text-gray-500 p-3">No salary records.</div> : null
                )}
                {/* List view */}
                {viewMode === "list" && (
                    <div className="divide-y">
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map((sal) => (
                                <div key={sal._id} className="p-3 flex items-center justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="font-medium truncate flex items-center gap-2"><User className="w-4 h-4 text-gray-500" />{sal.employee?.firstname} {sal.employee?.lastname}</div>
                                        <div className="text-xs text-gray-500">Basic: {sal.basicpay} {sal.currency} • Net: {sal.netpay} {sal.currency}</div>
                                    </div>
                                    <div className="shrink-0 flex gap-2">
                                        <SalaryBreakdownModal salary={sal} />
                                        <UpdateSalaryDialogBox salary={sal} />
                                        <DeleteSalaryDialogBox salaryID={sal._id} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-sm text-gray-500 p-3">No salary records.</div>
                        )}
                    </div>
                )}

                {/* Grid view */}
                {viewMode === "grid" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map((sal) => (
                                <div key={sal._id} className="rounded-xl ring-1 ring-gray-200 bg-white p-3 space-y-1">
                                    <div className="font-medium flex items-center gap-2"><User className="w-4 h-4 text-gray-500" />{sal.employee?.firstname} {sal.employee?.lastname}</div>
                                    <div className="text-xs text-gray-500">Basic: {sal.basicpay} {sal.currency}</div>
                                    <div className="text-xs text-gray-500">Net: {sal.netpay} {sal.currency}</div>
                                    <div className="pt-1 flex justify-end gap-2">
                                        <SalaryBreakdownModal salary={sal} />
                                        <UpdateSalaryDialogBox salary={sal} />
                                        <DeleteSalaryDialogBox salaryID={sal._id} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-sm text-gray-500 p-3">No salary records.</div>
                        )}
                    </div>
                )}
            </div>
            {error?.status && (
                <div className="p-3 text-red-600 rounded-lg bg-red-50">{error.message || "Failed to load salaries"}</div>
            )}
        </div>
    )
}


