import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loading } from "@/components/common/loading"
import { CardShell } from "@/components/common/Dashboard/CardShell"
import { HandleGetHRDesignations } from "@/redux/Thunks/HRDesignationPageThunk"
import { CreateDesignationDialogBox, UpdateDesignationDialogBox, DeleteDesignationDialogBox } from "@/components/common/Dashboard/dialogboxes"


export const HRDesignationPage = () => {
    const dispatch = useDispatch()
    const { data, isLoading, fetchData, error } = useSelector((state) => state.HRDesignationPageReducer)
    const initialMode = (typeof window !== "undefined" && window.innerWidth < 768) ? "grid" : "table"
    const [viewMode, setViewMode] = useState(initialMode)

    useEffect(() => { dispatch(HandleGetHRDesignations({ apiroute: "GETALL" })) }, [dispatch])
    useEffect(() => { if (fetchData) dispatch(HandleGetHRDesignations({ apiroute: "GETALL" })) }, [dispatch, fetchData])

    if (isLoading) return <Loading />

    return (
        <div className="h-full w-full p-0 space-y-3">
            <CardShell title="Designations" actions={<CreateDesignationDialogBox />}>
                <div className="text-xs text-gray-500">Manage designations similar to departments</div>
            </CardShell>
            <div className="rounded-2xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur p-3">
                <div className="flex items-center justify-between pb-2 border-b mb-2">
                    <div className="font-medium text-gray-500">Designations</div>
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
                        <div className="col-span-6">Description</div>
                        <div className="col-span-3 text-right">Actions</div>
                    </div>
                    <div className="divide-y">
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map((dg) => (
                                <div key={dg._id} className="grid grid-cols-12 items-center py-2">
                                    <div className="col-span-3 font-medium">{dg.name}</div>
                                    <div className="col-span-6 text-sm text-gray-700">{dg.description}</div>
                                    <div className="col-span-3 flex justify-end gap-2">
                                        <UpdateDesignationDialogBox designation={dg} />
                                        <DeleteDesignationDialogBox designationID={dg._id} designationName={dg.name} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-3 text-sm text-gray-500">No designations.</div>
                        )}
                    </div>
                </div>

                {/* List view */}
                {viewMode === "list" && (
                    <div className="divide-y">
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map((dg) => (
                                <div key={dg._id} className="p-3 flex items-center justify-between gap-3">
                                    <div className="min-w-0">
                                        <div className="font-medium truncate">{dg.name}</div>
                                        <div className="text-xs text-gray-500 truncate">{dg.description}</div>
                                    </div>
                                    <div className="shrink-0 flex gap-2">
                                        <UpdateDesignationDialogBox designation={dg} />
                                        <DeleteDesignationDialogBox designationID={dg._id} designationName={dg.name} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-3 text-sm text-gray-500">No designations.</div>
                        )}
                    </div>
                )}

                {/* Grid view */}
                {viewMode === "grid" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map((dg) => (
                                <div key={dg._id} className="rounded-xl ring-1 ring-gray-200 bg-white p-3 space-y-1">
                                    <div className="font-medium">{dg.name}</div>
                                    <div className="text-xs text-gray-500">{dg.description}</div>
                                    <div className="pt-1 flex justify-end gap-2">
                                        <UpdateDesignationDialogBox designation={dg} />
                                        <DeleteDesignationDialogBox designationID={dg._id} designationName={dg.name} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-3 text-sm text-gray-500">No designations.</div>
                        )}
                    </div>
                )}
            </div>
            {error?.status && (
                <div className="p-3 text-red-600 rounded-lg bg-red-50">{error.message || "Failed to load designations"}</div>
            )}
        </div>
    )
}


