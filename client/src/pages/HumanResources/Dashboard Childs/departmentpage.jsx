import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CreateDepartmentDialogBox, UpdateDepartmentDialogBox, DeleteDepartmentDialogBox } from "../../../components/common/Dashboard/dialogboxes"
import { CardShell } from "../../../components/common/Dashboard/CardShell"
import { HandleGetHRDepartments } from "../../../redux/Thunks/HRDepartmentPageThunk.js"

export const HRDepartmentPage = () => {
    const dispatch = useDispatch()
    const { data, isLoading, fetchData, error } = useSelector((state) => state.HRDepartmentPageReducer)

    useEffect(() => { dispatch(HandleGetHRDepartments({ apiroute: "GETALL" })) }, [dispatch])
    useEffect(() => { if (fetchData) dispatch(HandleGetHRDepartments({ apiroute: "GETALL" })) }, [dispatch, fetchData])

    return (
        <div className="h-full w-full p-3 space-y-3">
            <CardShell title="Departments" actions={<CreateDepartmentDialogBox />}>
                <div className="text-xs text-gray-500">Manage departments and their employees</div>
            </CardShell>

            <div className="rounded-2xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur p-3">
                <div className="grid grid-cols-12 font-medium text-gray-500 border-b pb-2">
                    <div className="col-span-3">Name</div>
                    <div className="col-span-6">Description</div>
                    <div className="col-span-3 text-right">Actions</div>
                </div>
                <div className="divide-y">
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((dp) => (
                            <div key={dp._id} className="grid grid-cols-12 items-center py-2">
                                <div className="col-span-3 font-medium">{dp.name}</div>
                                <div className="col-span-6 text-sm text-gray-700">{dp.description}</div>
                                <div className="col-span-3 flex justify-end gap-2">
                                    <UpdateDepartmentDialogBox department={dp} />
                                    <DeleteDepartmentDialogBox departmentID={dp._id} departmentName={dp.name} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-3 text-sm text-gray-500">No departments.</div>
                    )}
                </div>
            </div>
            {error?.status && (
                <div className="p-3 text-red-600 rounded-lg bg-red-50">{error.message || "Failed to load departments"}</div>
            )}
        </div>
    )
}