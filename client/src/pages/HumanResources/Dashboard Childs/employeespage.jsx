import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetHREmployees } from "../../../redux/Thunks/HREmployeesThunk.js"
import { Loading } from "../../../components/common/loading.jsx"
import { AddEmployeesDialogBox } from "../../../components/common/Dashboard/dialogboxes.jsx"
import { CardShell } from "../../../components/common/Dashboard/CardShell"
import { EmployeesTable } from "../../../components/common/Dashboard/EmployeesTable"

export const HREmployeesPage = () => {
    const dispatch = useDispatch()
    const HREmployeesState = useSelector((state) => state.HREmployeesPageReducer)

    useEffect(() => {
        if (HREmployeesState.fetchData) {
            dispatch(HandleGetHREmployees({ apiroute: "GETALL" }))
        }
    }, [HREmployeesState.fetchData])

    useEffect(() => {
        dispatch(HandleGetHREmployees({ apiroute: "GETALL" }))
    }, [])

    if (HREmployeesState.isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="h-full w-full p-0 space-y-3">
            <CardShell title="Employees" actions={<AddEmployeesDialogBox />} />
            <EmployeesTable employees={Array.isArray(HREmployeesState.data) ? HREmployeesState.data : []} />
        </div>
    )
}