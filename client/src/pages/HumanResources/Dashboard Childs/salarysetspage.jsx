import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loading } from "@/components/common/loading"
import { CardShell } from "@/components/common/Dashboard/CardShell"
import { HandleGetHRSalarySets } from "@/redux/Thunks/HRSalarySetPageThunk"
import { CreateSalarySetDialogBox, UpdateSalarySetDialogBox, DeleteSalarySetDialogBox } from "@/components/common/Dashboard/dialogboxes"


export const HRSalarySetsPage = () => {
    const dispatch = useDispatch()
    const { data, isLoading, fetchData, error } = useSelector((state) => state.HRSalarySetPageReducer)
    const initialMode = (typeof window !== "undefined" && window.innerWidth < 768) ? "grid" : "table"
    const [viewMode, setViewMode] = useState(initialMode)

    useEffect(() => { dispatch(HandleGetHRSalarySets({ apiroute: 'GETALL' })) }, [dispatch])
    useEffect(() => { if (fetchData) dispatch(HandleGetHRSalarySets({ apiroute: 'GETALL' })) }, [dispatch, fetchData])

    if (isLoading) return <Loading />

    return (
        <div className="h-full w-full p-0 space-y-3">
            <CardShell title="Salary Sets" actions={<CreateSalarySetDialogBox />}>
                <div className="text-xs text-gray-500">Create reusable earning/deduction sets and toggle active.</div>
            </CardShell>
            <div className="rounded-2xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur p-3">
                <div className="flex items-center justify-between pb-2 border-b mb-2">
                    <div className="font-medium text-gray-500">Salary Sets</div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">View:</span>
                        <button className={`px-2 py-1 rounded border text-sm ${viewMode === "list" ? "bg-gray-100" : ""}`} onClick={() => setViewMode("list")}>List</button>
                        <button className={`px-2 py-1 rounded border text-sm ${viewMode === "grid" ? "bg-gray-100" : ""}`} onClick={() => setViewMode("grid")}>Grid</button>
                        <button className={`px-2 py-1 rounded border text-sm ${viewMode === "table" ? "bg-gray-100" : ""}`} onClick={() => setViewMode("table")}>Table</button>
                    </div>
                </div>

                {/* Table view */}
                <div className={`${viewMode !== "table" ? "hidden" : "block"}`}>
                    <div className="grid grid-cols-12 font-medium text-gray-500 border-b pb-2">
                        <div className="col-span-3">Name</div>
                        <div className="col-span-3">Type</div>
                        <div className="col-span-3">Calc Type</div>
                        <div className="col-span-1">Active</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>
                    <div className="divide-y">
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map((s) => (
                                <div key={s._id} className="grid grid-cols-12 items-center py-2">
                                    <div className="col-span-3 font-medium">{s.name}</div>
                                    <div className="col-span-3 text-sm text-gray-700">{s.type}</div>
                                    <div className="col-span-3 text-sm text-gray-700">{s.calcType}</div>
                                    <div className="col-span-1 text-sm">{s.isActive ? 'Yes' : 'No'}</div>
                                    <div className="col-span-2 flex justify-end gap-2">
                                        <UpdateSalarySetDialogBox salarySet={s} />
                                        <DeleteSalarySetDialogBox salarySetID={s._id} salarySetName={s.name} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-3 text-sm text-gray-500">No salary sets.</div>
                        )}
                    </div>
                </div>

                {/* List view */}
                {viewMode === "list" && (
                    <div className="divide-y">
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map((s) => (
                                <div key={s._id} className="p-3 flex items-center justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="font-medium truncate">{s.name}</div>
                                        <div className="text-xs text-gray-500 truncate">{s.type} • {s.calcType}</div>
                                    </div>
                                    <div className="shrink-0 flex gap-2">
                                        <span className="text-xs text-gray-500">{s.isActive ? 'Active' : 'Inactive'}</span>
                                        <UpdateSalarySetDialogBox salarySet={s} />
                                        <DeleteSalarySetDialogBox salarySetID={s._id} salarySetName={s.name} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-3 text-sm text-gray-500">No salary sets.</div>
                        )}
                    </div>
                )}

                {/* Grid view */}
                {viewMode === "grid" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map((s) => (
                                <div key={s._id} className="rounded-xl ring-1 ring-gray-200 bg-white p-3 space-y-1">
                                    <div className="font-medium">{s.name}</div>
                                    <div className="text-xs text-gray-500">{s.type} • {s.calcType}</div>
                                    <div className="text-xs text-gray-500">{s.isActive ? 'Active' : 'Inactive'}</div>
                                    <div className="pt-1 flex justify-end gap-2">
                                        <UpdateSalarySetDialogBox salarySet={s} />
                                        <DeleteSalarySetDialogBox salarySetID={s._id} salarySetName={s.name} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-3 text-sm text-gray-500">No salary sets.</div>
                        )}
                    </div>
                )}
            </div>
            {error?.status && (
                <div className="p-3 text-red-600 rounded-lg bg-red-50">{error.message || "Failed to load salary sets"}</div>
            )}
        </div>
    )
}


