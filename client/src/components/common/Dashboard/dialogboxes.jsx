/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { HandleCreateHRSalary, HandleDeleteHRSalary, HandleUpdateHRSalary } from "../../../redux/Thunks/HRSalaryThunk.js"
import { HandleDeleteHRAttendance } from "../../../redux/Thunks/HRAttendanceThunk.js"
import { HandleCreateHRRequest, HandleUpdateHRRequestContent, HandleUpdateHRRequestStatus, HandleDeleteHRRequest } from "../../../redux/Thunks/HRRequestsThunk.js"
import { HandleUpdateHRProfile, HandleDeleteHRProfile } from "../../../redux/Thunks/HRProfilesThunk.js"
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { CommonStateHandler } from "../../../utils/commonhandler.js"
import { useDispatch, useSelector } from "react-redux"
import { FormSubmitToast } from "./Toasts.jsx"
import { Loading } from "../loading.jsx"
import { HandleDeleteHREmployees } from "../../../redux/Thunks/HREmployeesThunk.js"
import { HandleUpdateHREmployee } from "../../../redux/Thunks/HREmployeesThunk.js"
import { HandlePostHRDepartments, HandlePatchHRDepartments, HandleDeleteHRDepartments } from "../../../redux/Thunks/HRDepartmentPageThunk.js"
import { HandlePostHRDesignations, HandlePatchHRDesignations, HandleDeleteHRDesignations, HandleGetHRDesignations } from "../../../redux/Thunks/HRDesignationPageThunk.js"
import { useToast } from "../../../hooks/use-toast.js"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { fetchEmployeesIDs } from "../../../redux/Thunks/EmployeesIDsThunk.js"
import { HandleGetHRDepartments } from "../../../redux/Thunks/HRDepartmentPageThunk.js"
import { HandleCreateHRNotice, HandleDeleteHRNotice, HandleUpdateHRNotice } from "../../../redux/Thunks/HRNoticesThunk.js"
import { HandleCreateHRLeave, HandleDeleteHRLeave, HandleUpdateHRLeaveByHR } from "../../../redux/Thunks/HRLeavesThunk.js"
import { useSelector as useAppSelector } from "react-redux"
import { HandleGetHRSalarySets, HandlePostHRSalarySets, HandlePatchHRSalarySets, HandleDeleteHRSalarySets } from "../../../redux/Thunks/HRSalarySetPageThunk.js"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"


export const AddEmployeesDialogBox = () => {
    const HREmployeesState = useSelector((state) => state.HREmployeesPageReducer)
    const DepartmentsState = useSelector((state) => state.HRDepartmentPageReducer)
    const DesignationsState = useSelector((state) => state.HRDesignationPageReducer)
    const dispatch = useDispatch()
    const [formdata, setformdata] = useState({
        firstname: "",
        lastname: "",
        email: "",
        contactnumber: "",
        textpassword: "",
        password: "",
        departmentID: "",
        designationID: "",
    })

    const handleformchange = (event) => {
        CommonStateHandler(formdata, setformdata, event)
    }

    useEffect(() => {
        if (!DepartmentsState?.data) {
            dispatch(HandleGetHRDepartments({ apiroute: "GETALL" }))
        }
        if (!DesignationsState?.data) {
            dispatch(HandleGetHRDesignations({ apiroute: "GETALL" }))
        }
    }, [])

    return (
        <div className="AddEmployees-content">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Create Employee</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[315px] sm:max-w-[50vw] 2xl:max-w-[45vw]">
                    <div className="add-employees-container flex flex-col gap-5">
                        <div className="heading">
                            <h1 className="font-bold text-2xl">Add Employee Info</h1>
                        </div>
                        <div className="form-container grid md:grid-cols-2 min-[250px]:grid-cols-1 gap-4">
                            <div className="form-group flex flex-col gap-3">
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="firstname" className="md:text-md lg:text-lg font-bold">First Name</label>
                                    <input type="text"
                                        id="firstname"
                                        className="border-2 border-gray-700 rounded px-2 py-1"
                                        name="firstname"
                                        value={formdata.firstname}
                                        onChange={handleformchange} />
                                </div>
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="lastname" className="md:text-md lg:text-lg font-bold">Last Name</label>
                                    <input type="text"
                                        id="lastanme"
                                        className="border-2 border-gray-700 rounded px-2 py-1"
                                        name="lastname"
                                        value={formdata.lastname}
                                        onChange={handleformchange} />
                                </div>
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="email" className="md:text-md lg:text-lg font-bold">Email</label>
                                    <input type="email"
                                        id="email" required={true} className="border-2 border-gray-700 rounded px-2 py-1"
                                        name="email"
                                        value={formdata.email}
                                        onChange={handleformchange} />
                                </div>
                                
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="text-password" className="md:text-md lg:text-lg font-bold">Password</label>
                                    <input type="text"
                                        id="text-password" className="border-2 border-gray-700 rounded px-2 py-1"
                                        name="textpassword"
                                        value={formdata.textpassword}
                                        onChange={handleformchange} />
                                </div>
                            </div>
                            <div className="form-group flex flex-col gap-3">
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="contactnumber" className="md:text-md lg:text-lg font-bold">Contact Number</label>
                                    <input type="number"
                                        id="contactnumber" className="border-2 border-gray-700 rounded px-2 py-1"
                                        name="contactnumber"
                                        value={formdata.contactnumber}
                                        onChange={handleformchange} />
                                </div>
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="departmentID" className="md:text-md lg:text-lg font-bold">Department</label>
                                    <select id="departmentID" name="departmentID" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.departmentID} onChange={handleformchange}>
                                        <option value="">Select department</option>
                                        {Array.isArray(DepartmentsState?.data) && DepartmentsState.data.map((d) => (
                                            <option key={d._id} value={d._id}>{d.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="designationID" className="md:text-md lg:text-lg font-bold">Designation</label>
                                    <select id="designationID" name="designationID" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.designationID || ""} onChange={handleformchange}>
                                        <option value="">Select designation</option>
                                        {Array.isArray(DesignationsState?.data) && DesignationsState.data.map((d) => (
                                            <option key={d._id} value={d._id}>{d.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="label-input-field flex flex-col gap-1">
                                    <label htmlFor="password" className="md:text-md lg:text-lg font-bold">Confirm Password</label>
                                    <input type="password"
                                        id="password" required={true} className="border-2 border-gray-700 rounded px-2 py-1"
                                        name="password"
                                        value={formdata.password}
                                        onChange={handleformchange} />
                                </div>
                            </div>
                        </div>
                        <div className="add-button flex items-center justify-center">
                            <FormSubmitToast formdata={formdata} />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export const EmployeeDetailsDialogBox = ({ EmployeeID }) => {
    const HREmployeesState = useSelector((state) => state.HREmployeesPageReducer)
    const FetchEmployeeData = (EmID) => {
        const employee = HREmployeesState.data.find((item) => item._id === EmID)
        return employee
    }
    const employeeData = FetchEmployeeData(EmployeeID)
    return (
        <div className="Employees-Details-container">
            <Dialog>
                <div>
                    <DialogTrigger asChild>
                        <Button>View</Button>
                    </DialogTrigger>
                </div>
                <DialogContent className="max-w-[315px] lg:max-w-[55vw] 2xl:max-w-[45vw]">
                    <div className="employee-data-container flex flex-col gap-4">
                        <div className="employee-profile-logo flex items-center gap-3">
                            <div className="logo border-2 border-blue-800 rounded-[50%] flex justify-center items-center">
                                <p className="font-bold text-2xl text-blue-700 p-2">{`${employeeData.firstname.slice(0, 1).toUpperCase()} ${employeeData.lastname.slice(0, 1).toUpperCase()}`}</p>
                            </div>
                            <div className="employee-fullname">
                                <p className="font-bold text-2xl">{`${employeeData.firstname} ${employeeData.lastname}`}</p>
                            </div>
                        </div>
                        <div className="employees-all-details grid lg:grid-cols-2 min-[250px]:gap-2 lg:gap-10">
                            <div className="details-group-1 flex flex-col gap-3">
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">First Name :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.firstname}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Last Name :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.lastname}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Email :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.email}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Contact Number :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.contactnumber}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Department :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.department ? employeeData.department.name : "Not Specified"}</p>
                                </div>
                            </div>
                            <div className="details-group-1 flex flex-col gap-3">
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Notices :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.notice.length}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Salary Records :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.salary.length}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Leave Requests :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.leaverequest.length}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Requests :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.generaterequest.length}</p>
                                </div>
                                <div className="label-value-pair flex items-center gap-2">
                                    <label className="font-bold md:text-sm xl:text-lg">Email Verify :</label>
                                    <p className="md:text-sm xl:text-lg">{employeeData.isverified ? "Verified" : "Not Verified"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}


export const DeleteEmployeeDialogBox = ({ EmployeeID }) => {
    const dispatch = useDispatch()
    const DeleteEmployee = (EMID) => {
        dispatch(HandleDeleteHREmployees({ apiroute: `DELETE.${EMID}` }))
    }
    return (
        <div className="delete-employee-dialog-container">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Delete</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <p className="text-lg font-bold min-[250px]:text-center">Are you sure you want to delete this employee?</p>
                        <div className="delete-employee-button-group flex gap-2">
                            <DialogClose asChild>
                                <Button variant="destructive" size="default" onClick={() => DeleteEmployee(EmployeeID)}>Delete</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button variant="secondary" size="default">Cancel</Button>
                            </DialogClose>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export const UpdateEmployeeDialogBox = ({ employee }) => {
    const dispatch = useDispatch()
    const DepartmentsState = useSelector((state) => state.HRDepartmentPageReducer)
    const DesignationsState = useSelector((state) => state.HRDesignationPageReducer)
    useEffect(() => {
        if (!DepartmentsState?.data) {
            dispatch(HandleGetHRDepartments({ apiroute: "GETALL" }))
        }
        if (!DesignationsState?.data) {
            dispatch(HandleGetHRDesignations({ apiroute: "GETALL" }))
        }
    }, [])
    const [formdata, setformdata] = useState({
        employeeId: employee?._id,
        updatedEmployee: {
            firstname: employee?.firstname || "",
            lastname: employee?.lastname || "",
            contactnumber: employee?.contactnumber || "",
            department: (employee?.department && employee.department._id) ? employee.department._id : employee?.department || "",
            designation: (employee?.designation && employee.designation._id) ? employee.designation._id : employee?.designation || "",
        }
    })
    const onChange = (e) => setformdata({ ...formdata, updatedEmployee: { ...formdata.updatedEmployee, [e.target.name]: e.target.value } })
    const submit = () => dispatch(HandleUpdateHREmployee({ data: formdata }))
    return (
        <div className="update-employee">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Edit</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                    <div className="grid gap-3">
                        <div className="flex flex-col gap-1"><label className="font-bold">First Name</label><input name="firstname" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.updatedEmployee.firstname} onChange={onChange} /></div>
                        <div className="flex flex-col gap-1"><label className="font-bold">Last Name</label><input name="lastname" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.updatedEmployee.lastname} onChange={onChange} /></div>
                        <div className="flex flex-col gap-1"><label className="font-bold">Contact Number</label><input name="contactnumber" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.updatedEmployee.contactnumber} onChange={onChange} /></div>
                        <div className="flex flex-col gap-1"><label className="font-bold">Department</label>
                            <select name="department" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.updatedEmployee.department} onChange={onChange}>
                                <option value="">Select department</option>
                                {Array.isArray(DepartmentsState?.data) && DepartmentsState.data.map((d) => (
                                    <option key={d._id} value={d._id}>{d.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1"><label className="font-bold">Designation</label>
                            <select name="designation" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.updatedEmployee.designation} onChange={onChange}>
                                <option value="">Select designation</option>
                                {Array.isArray(DesignationsState?.data) && DesignationsState.data.map((d) => (
                                    <option key={d._id} value={d._id}>{d.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-center"><DialogClose asChild><Button variant="default" size="default" onClick={submit}>Save</Button></DialogClose></div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}



export const CreateDepartmentDialogBox = () => {
    const { toast } = useToast()
    const dispatch = useDispatch()
    const [formdata, setformdata] = useState({
        name: "",
        description: ""
    })

    const handleformchange = (event) => {
        CommonStateHandler(formdata, setformdata, event)
    }

    const CreateDepartment = () => {
        dispatch(HandlePostHRDepartments({ apiroute: "CREATE", data: formdata }))
        setformdata({
            name: "",
            description: ""
        })
    }

    const ShowToast = () => {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: `All Fields are required to create a department`,
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Department</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                <div className="create-department-container flex flex-col gap-4">
                    <div className="create-department-heading">
                        <h1 className="font-bold text-2xl">Create Department</h1>
                    </div>
                    <div className="create-department-form flex flex-col gap-4">
                        <div className="form-group flex flex-col gap-3">
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="departmentname" className="md:text-md lg:text-lg font-bold">Department Name</label>
                                <input type="text"
                                    id="departmentname"
                                    name="name"
                                    value={formdata.name}
                                    onChange={handleformchange}
                                    placeholder="Enter Department Name"
                                    className="border-2 border-gray-700 rounded px-2 py-1" />
                            </div>
                            <div className="label-input-field flex flex-col gap-1">
                                <label htmlFor="departmentdescription" className="md:text-md lg:text-lg font-bold">Department Description</label>
                                <textarea
                                    id="departmentdescription"
                                    name="description"
                                    value={formdata.description}
                                    onChange={handleformchange}
                                    className="border-2 border-gray-700 rounded px-2 py-1 h-[100px]"
                                    placeholder="Write Your Department Description Here"></textarea>
                            </div>
                        </div>
                        <div className="create-department-button flex justify-center items-center">
                            {
                                (formdata.name.trim().length === 0 || formdata.description.trim().length === 0) ? <Button variant="default" size="default" onClick={() => ShowToast()}>Create</Button> :
                                    <DialogClose asChild>
                                        <Button variant="default" size="default" onClick={() => CreateDepartment()}>Create</Button>
                                    </DialogClose>
                            }
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const UpdateDepartmentDialogBox = ({ department }) => {
    const dispatch = useDispatch()
    const [formdata, setformdata] = useState({ departmentID: department?._id, UpdatedDepartment: { name: department?.name || "", description: department?.description || "" } })
    const onChange = (e) => setformdata({ ...formdata, UpdatedDepartment: { ...formdata.UpdatedDepartment, [e.target.name]: e.target.value } })
    const submit = () => dispatch(HandlePatchHRDepartments({ apiroute: "UPDATE", data: formdata }))
    return (
        <div className="update-department">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Edit</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                    <div className="grid gap-3">
                        <div className="flex flex-col gap-1"><label className="font-bold">Name</label><input name="name" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.UpdatedDepartment.name} onChange={onChange} /></div>
                        <div className="flex flex-col gap-1"><label className="font-bold">Description</label><input name="description" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.UpdatedDepartment.description} onChange={onChange} /></div>
                        <div className="flex justify-center"><DialogClose asChild><Button variant="default" size="default" onClick={submit}>Save</Button></DialogClose></div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export const DeleteDepartmentDialogBox = ({ departmentID, departmentName }) => {
    const dispatch = useDispatch()
    const onDelete = () => dispatch(HandleDeleteHRDepartments({ apiroute: "DELETE", data: { departmentID, action: "delete-department" } }))
    return (
        <div className="delete-department">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Delete</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <p className="text-lg font-bold min-[250px]:text-center">{`Are you sure you want to delete ${departmentName} department?`}</p>
                        <div className="flex gap-2">
                            <DialogClose asChild><Button variant="destructive" size="default" onClick={onDelete}>Delete</Button></DialogClose>
                            <DialogClose asChild><Button variant="secondary" size="default">Cancel</Button></DialogClose>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}


export const CreateDesignationDialogBox = () => {
    const { toast } = useToast()
    const dispatch = useDispatch()
    const [formdata, setformdata] = useState({ name: "", description: "" })
    const handleformchange = (event) => { CommonStateHandler(formdata, setformdata, event) }
    const CreateDesignation = () => {
        dispatch(HandlePostHRDesignations({ apiroute: "CREATE", data: formdata }))
        setformdata({ name: "", description: "" })
    }
    const ShowToast = () => {
        toast({
            title: `Missing Fields`,
            description: `All Fields are required to create a designation`,
        })
    }
    return (
        <div className="create-designation">
            <Dialog>
            <DialogTrigger asChild>
                <Button>Create Designation</Button>
            </DialogTrigger>
                <DialogContent className="max-w-[315px] sm:max-w-[50vw] 2xl:max-w-[45vw]">
                    <div className="grid gap-3">
                        <div className="flex flex-col gap-1"><label className="font-bold">Designation Name</label><input id="designationname" name="name" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.name} onChange={handleformchange} /></div>
                        <div className="flex flex-col gap-1"><label className="font-bold">Designation Description</label><input id="designationdescription" name="description" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.description} onChange={handleformchange} /></div>
                        <div className="flex justify-center">
                            {(formdata.name.trim().length === 0 || formdata.description.trim().length === 0) ? (
                                <Button variant="default" size="default" onClick={() => ShowToast()}>Create</Button>
                            ) : (
                                <DialogClose asChild><Button variant="default" size="default" onClick={CreateDesignation}>Create</Button></DialogClose>
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export const UpdateDesignationDialogBox = ({ designation }) => {
    const dispatch = useDispatch()
    const [formdata, setformdata] = useState({ designationID: designation?._id, UpdatedDesignation: { name: designation?.name || "", description: designation?.description || "" } })
    const onChange = (e) => setformdata({ ...formdata, UpdatedDesignation: { ...formdata.UpdatedDesignation, [e.target.name]: e.target.value } })
    const submit = () => dispatch(HandlePatchHRDesignations({ apiroute: "UPDATE", data: formdata }))
    return (
        <div className="update-designation">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Edit</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                    <div className="grid gap-3">
                        <div className="flex flex-col gap-1"><label className="font-bold">Name</label><input name="name" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.UpdatedDesignation.name} onChange={onChange} /></div>
                        <div className="flex flex-col gap-1"><label className="font-bold">Description</label><input name="description" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.UpdatedDesignation.description} onChange={onChange} /></div>
                        <div className="flex justify-center"><DialogClose asChild><Button variant="default" size="default" onClick={submit}>Save</Button></DialogClose></div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export const DeleteDesignationDialogBox = ({ designationID, designationName }) => {
    const dispatch = useDispatch()
    const onDelete = () => dispatch(HandleDeleteHRDesignations({ apiroute: "DELETE", data: { designationID, action: "delete-designation" } }))
    return (
        <div className="delete-designation">
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Delete</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <p className="text-lg font-bold min-[250px]:text-center">{`Are you sure you want to delete ${designationName} designation?`}</p>
                        <div className="flex gap-2">
                            <DialogClose asChild><Button variant="destructive" size="default" onClick={onDelete}>Delete</Button></DialogClose>
                            <DialogClose asChild><Button variant="secondary" size="default">Cancel</Button></DialogClose>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}



export const EmployeesIDSDialogBox = ({ DepartmentID }) => {
    console.log("this is Department ID", DepartmentID)
    const EmployeesIDState = useSelector((state) => state.EMployeesIDReducer)
    const dispatch = useDispatch()
    const [SelectedEmployeesData, Set_selectedEmployeesData] = useState({
        departmentID: DepartmentID,
        employeeIDArray: [],
    })

    const SelectEmployees = (EMID) => {
        if (SelectedEmployeesData.employeeIDArray.includes(EMID)) {
            Set_selectedEmployeesData({ ...SelectedEmployeesData, employeeIDArray: SelectedEmployeesData.employeeIDArray.filter((item) => item !== EMID) })
        }
        else if (!SelectedEmployeesData.employeeIDArray.includes(EMID)) {
            Set_selectedEmployeesData({ ...SelectedEmployeesData }, SelectedEmployeesData.employeeIDArray.push(EMID))
        }
    }

    const ClearSelectedEmployeesData = () => {
        Set_selectedEmployeesData({
            departmentID: DepartmentID,
            employeeIDArray: []
        })
    }

    const SetEmployees = () => {
        dispatch(HandlePatchHRDepartments({ apiroute: "UPDATE", data: SelectedEmployeesData }))
        ClearSelectedEmployeesData()
    }

    console.log(SelectedEmployeesData)

    useEffect(() => {
        Set_selectedEmployeesData(
            {
                departmentID: DepartmentID,
                employeeIDArray: [],
            }
        )
    }, [DepartmentID])

    return (
        <div className="employeeIDs-box-container">
            <Dialog>
                <DialogTrigger asChild>
                    <Button onClick={() => dispatch(fetchEmployeesIDs({ apiroute: "GETALL" }))}>Create Employee</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                    {EmployeesIDState.isLoading ? <Loading height={"h-auto"} /> : <div className="employeeID-checkbox-container flex flex-col gap-4">
                        <div>
                            <h1 className="font-bold text-2xl">Select Employees</h1>
                        </div>
                        <div className="employeeID-checkbox-group">
                            <Command className="rounded-lg border shadow-md w-full">
                                <CommandInput placeholder="Type a Employee Name..." />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    <CommandGroup heading="All Employees">
                                        {EmployeesIDState.data ? EmployeesIDState.data.map((item, index) => <CommandItem key={index}>
                                            <div className="employeeID-checkbox flex justify-center items-center gap-2">
                                                <input type="checkbox" id={`EmployeeID-${index + 1}`} className="border-2 border-gray-700 w-4 h-4" onClick={() => SelectEmployees(item._id)} checked={SelectedEmployeesData.employeeIDArray.includes(item._id)} disabled={item.department ? true : false} />
                                                <label htmlFor={`EmployeeID-${index + 1}`} className="text-lg">{`${item.firstname} ${item.lastname}`} <span className="text-xs mx-0.5 overflow-hidden text-ellipsis">{item.department ? `(${item.department.name})` : null}</span> </label>
                                            </div>
                                        </CommandItem>) : null}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </div>
                        <div className="employeeID-checkbox-button-group flex justify-center items-center gap-2">
                            <Button variant="default" size="default" onClick={() => SetEmployees()}>Add</Button>
                            <DialogClose asChild>
                                <Button variant="secondary" size="default" onClick={() => ClearSelectedEmployeesData()}>Cancel</Button>
                            </DialogClose>
                        </div>
                    </div>}

                </DialogContent>
            </Dialog>
        </div>
    )
}

export const CreateNoticeDialogBox = () => {
    const dispatch = useDispatch()
    const DepartmentsState = useSelector((state) => state.HRDepartmentPageReducer)
    const EmployeesIDState = useSelector((state) => state.EMployeesIDReducer)
    const [formdata, setformdata] = useState({
        title: "",
        content: "",
        audience: "Department-Specific",
        department: "",
        employee: "",
    })

    useEffect(() => {
        if (!DepartmentsState.data) dispatch(HandleGetHRDepartments({ apiroute: "GETALL" }))
    }, [])

    const onChange = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value })
    }

    const loadEmployees = () => dispatch(fetchEmployeesIDs({ apiroute: "GETALL" }))

    const canSubmit = () => {
        if (formdata.title.trim().length === 0 || formdata.content.trim().length === 0) return false
        if (formdata.audience === "Department-Specific" && !formdata.department) return false
        if (formdata.audience === "Employee-Specific" && !formdata.employee) return false
        return true
    }

    const submit = () => {
        const payload = {
            title: formdata.title,
            content: formdata.content,
            audience: formdata.audience,
            ...(formdata.audience === "Department-Specific" ? { departmentID: formdata.department } : {}),
            ...(formdata.audience === "Employee-Specific" ? { employeeID: formdata.employee } : {}),
        }
        dispatch(HandleCreateHRNotice({ data: payload }))
        setformdata({ title: "", content: "", audience: "Department-Specific", department: "", employee: "" })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Notice</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[315px] lg:max-w-[45vw] 2xl:max-w-[40vw]">
                <div className="flex flex-col gap-4">
                    <h1 className="font-bold text-2xl">Create Notice</h1>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="font-bold">Title</label>
                            <input className="border-2 border-gray-700 rounded px-2 py-1" name="title" value={formdata.title} onChange={onChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold">Audience</label>
                            <select className="border-2 border-gray-700 rounded px-2 py-1" name="audience" value={formdata.audience} onChange={onChange} onClick={() => formdata.audience === "Employee-Specific" ? loadEmployees() : null}>
                                <option value="Department-Specific">Department-Specific</option>
                                <option value="Employee-Specific">Employee-Specific</option>
                            </select>
                        </div>
                        <div className="sm:col-span-2 flex flex-col gap-1">
                            <label className="font-bold">Content</label>
                            <textarea className="border-2 border-gray-700 rounded px-2 py-1 h-[120px]" name="content" value={formdata.content} onChange={onChange} />
                        </div>
                        {formdata.audience === "Department-Specific" && (
                            <div className="flex flex-col gap-1">
                                <label className="font-bold">Department</label>
                                <select className="border-2 border-gray-700 rounded px-2 py-1" name="department" value={formdata.department} onChange={onChange}>
                                    <option value="">Select department</option>
                                    {Array.isArray(DepartmentsState.data) && DepartmentsState.data.map((d) => (
                                        <option key={d._id} value={d._id}>{d.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {formdata.audience === "Employee-Specific" && (
                            <div className="flex flex-col gap-1">
                                <label className="font-bold">Employee</label>
                                <select className="border-2 border-gray-700 rounded px-2 py-1" name="employee" value={formdata.employee} onChange={onChange}>
                                    <option value="">Select employee</option>
                                    {Array.isArray(EmployeesIDState.data) && EmployeesIDState.data.map((e) => (
                                        <option key={e._id} value={e._id}>{e.firstname} {e.lastname}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center">
                        {canSubmit() ? (
                            <DialogClose asChild>
                                <Button variant="default" size="default" onClick={submit}>Create</Button>
                            </DialogClose>
                        ) : (
                            <Button variant="secondary" size="default" disabled>Fill required fields</Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const DeleteNoticeDialogBox = ({ noticeID }) => {
    const dispatch = useDispatch()
    const onDelete = () => dispatch(HandleDeleteHRNotice({ noticeID }))
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Delete</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-lg font-bold min-[250px]:text-center">Are you sure you want to delete this notice?</p>
                    <div className="flex gap-2">
                        <DialogClose asChild>
                            <Button variant="destructive" size="default" onClick={onDelete}>Delete</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button variant="secondary" size="default">Cancel</Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const UpdateNoticeDialogBox = ({ notice }) => {
    const dispatch = useDispatch()
    const DepartmentsState = useSelector((state) => state.HRDepartmentPageReducer)
    const EmployeesIDState = useSelector((state) => state.EMployeesIDReducer)
    const [formdata, setformdata] = useState({
        noticeID: notice?._id,
        UpdatedData: {
            title: notice?.title || "",
            content: notice?.content || "",
            audience: notice?.audience || "Department-Specific",
            department: notice?.department?._id || "",
            employee: notice?.employee?._id || "",
        }
    })

    useEffect(() => {
        if (!DepartmentsState.data) dispatch(HandleGetHRDepartments({ apiroute: "GETALL" }))
    }, [])

    const onChange = (e) => setformdata({ ...formdata, UpdatedData: { ...formdata.UpdatedData, [e.target.name]: e.target.value } })

    const loadEmployees = () => dispatch(fetchEmployeesIDs({ apiroute: "GETALL" }))

    const submit = () => {
        const payload = {
            noticeID: formdata.noticeID,
            UpdatedData: {
                title: formdata.UpdatedData.title,
                content: formdata.UpdatedData.content,
                audience: formdata.UpdatedData.audience,
                ...(formdata.UpdatedData.audience === "Department-Specific" ? { department: formdata.UpdatedData.department } : {}),
                ...(formdata.UpdatedData.audience === "Employee-Specific" ? { employee: formdata.UpdatedData.employee } : {}),
            }
        }
        dispatch(HandleUpdateHRNotice({ data: payload }))
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Update</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[315px] lg:max-w-[45vw] 2xl:max-w-[40vw]">
                <div className="flex flex-col gap-4">
                    <h1 className="font-bold text-2xl">Update Notice</h1>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="font-bold">Title</label>
                            <input className="border-2 border-gray-700 rounded px-2 py-1" name="title" value={formdata.UpdatedData.title} onChange={onChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold">Audience</label>
                            <select className="border-2 border-gray-700 rounded px-2 py-1" name="audience" value={formdata.UpdatedData.audience} onChange={onChange} onClick={() => formdata.UpdatedData.audience === "Employee-Specific" ? loadEmployees() : null}>
                                <option value="Department-Specific">Department-Specific</option>
                                <option value="Employee-Specific">Employee-Specific</option>
                            </select>
                        </div>
                        <div className="sm:col-span-2 flex flex-col gap-1">
                            <label className="font-bold">Content</label>
                            <textarea className="border-2 border-gray-700 rounded px-2 py-1 h-[120px]" name="content" value={formdata.UpdatedData.content} onChange={onChange} />
                        </div>
                        {formdata.UpdatedData.audience === "Department-Specific" && (
                            <div className="flex flex-col gap-1">
                                <label className="font-bold">Department</label>
                                <select className="border-2 border-gray-700 rounded px-2 py-1" name="department" value={formdata.UpdatedData.department} onChange={onChange}>
                                    <option value="">Select department</option>
                                    {Array.isArray(DepartmentsState.data) && DepartmentsState.data.map((d) => (
                                        <option key={d._id} value={d._id}>{d.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {formdata.UpdatedData.audience === "Employee-Specific" && (
                            <div className="flex flex-col gap-1">
                                <label className="font-bold">Employee</label>
                                <select className="border-2 border-gray-700 rounded px-2 py-1" name="employee" value={formdata.UpdatedData.employee} onChange={onChange}>
                                    <option value="">Select employee</option>
                                    {Array.isArray(EmployeesIDState.data) && EmployeesIDState.data.map((e) => (
                                        <option key={e._id} value={e._id}>{e.firstname} {e.lastname}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <DialogClose asChild>
                            <Button onClick={submit}>Save</Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}


export const CreateLeaveDialogBox = () => {
    const dispatch = useDispatch()
    const EmployeesIDState = useSelector((state) => state.EMployeesIDReducer)
    const [formdata, setformdata] = useState({
        employeeID: "",
        title: "Leave Application",
        reason: "",
        startdate: "",
        enddate: "",
    })

    const onChange = (e) => setformdata({ ...formdata, [e.target.name]: e.target.value })

    const canSubmit = () => formdata.employeeID && formdata.reason.trim() && formdata.startdate && formdata.enddate

    const submit = () => {
        dispatch(HandleCreateHRLeave({ data: formdata }))
        setformdata({ employeeID: "", title: "Leave Application", reason: "", startdate: "", enddate: "" })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button onClick={() => dispatch(fetchEmployeesIDs({ apiroute: "GETALL" }))}>Create Leave</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[315px] lg:max-w-[45vw] 2xl:max-w-[40vw]">
                <div className="flex flex-col gap-4">
                    <h1 className="font-bold text-2xl">Create Leave</h1>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="font-bold">Employee</label>
                            <select className="border-2 border-gray-700 rounded px-2 py-1" name="employeeID" value={formdata.employeeID} onChange={onChange}>
                                <option value="">Select employee</option>
                                {Array.isArray(EmployeesIDState.data) && EmployeesIDState.data.map((e) => (
                                    <option key={e._id} value={e._id}>{e.firstname} {e.lastname}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold">Title</label>
                            <input className="border-2 border-gray-700 rounded px-2 py-1" name="title" value={formdata.title} onChange={onChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold">Start Date</label>
                            <input type="date" className="border-2 border-gray-700 rounded px-2 py-1" name="startdate" value={formdata.startdate} onChange={onChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold">End Date</label>
                            <input type="date" className="border-2 border-gray-700 rounded px-2 py-1" name="enddate" value={formdata.enddate} onChange={onChange} />
                        </div>
                        <div className="sm:col-span-2 flex flex-col gap-1">
                            <label className="font-bold">Reason</label>
                            <textarea className="border-2 border-gray-700 rounded px-2 py-1 h-[120px]" name="reason" value={formdata.reason} onChange={onChange} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        {canSubmit() ? (
                            <DialogClose asChild>
                                <Button onClick={submit}>Create</Button>
                            </DialogClose>
                        ) : (
                            <Button disabled>Fill required fields</Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const EmployeeCreateLeaveDialogBox = () => {
    const dispatch = useDispatch()
    const SelfState = useAppSelector((state) => state.EmployeeSelfReducer)
    const [formdata, setformdata] = useState({
        title: "Leave Application",
        reason: "",
        startdate: "",
        enddate: "",
    })

    const onChange = (e) => setformdata({ ...formdata, [e.target.name]: e.target.value })
    const canSubmit = () => SelfState?.data?._id && formdata.reason.trim() && formdata.startdate && formdata.enddate

    const submit = () => {
        dispatch(HandleCreateHRLeave({ data: { employeeID: SelfState.data._id, ...formdata } }))
        setformdata({ title: "Leave Application", reason: "", startdate: "", enddate: "" })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Leave</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[315px] lg:max-w-[45vw] 2xl:max-w-[40vw]">
                <div className="flex flex-col gap-4">
                    <h1 className="font-bold text-2xl">Create Leave</h1>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="font-bold">Title</label>
                            <input className="border-2 border-gray-700 rounded px-2 py-1" name="title" value={formdata.title} onChange={onChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold">Start Date</label>
                            <input type="date" className="border-2 border-gray-700 rounded px-2 py-1" name="startdate" value={formdata.startdate} onChange={onChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold">End Date</label>
                            <input type="date" className="border-2 border-gray-700 rounded px-2 py-1" name="enddate" value={formdata.enddate} onChange={onChange} />
                        </div>
                        <div className="sm:col-span-2 flex flex-col gap-1">
                            <label className="font-bold">Reason</label>
                            <textarea className="border-2 border-gray-700 rounded px-2 py-1 h-[120px]" name="reason" value={formdata.reason} onChange={onChange} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        {canSubmit() ? (
                            <DialogClose asChild>
                                <Button onClick={submit}>Create</Button>
                            </DialogClose>
                        ) : (
                            <Button disabled>Fill required fields</Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const UpdateLeaveStatusDialogBox = ({ leaveID, currentStatus }) => {
    const dispatch = useDispatch()
    const [status, setStatus] = useState(currentStatus || "Pending")
    const submit = () => dispatch(HandleUpdateHRLeaveByHR({ data: { leaveID, UpdatedData: { status } } }))
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Update</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[315px] lg:max-w-[30vw] 2xl:max-w-[25vw]">
                <div className="flex flex-col gap-3">
                    <label className="font-bold">Status</label>
                    <select className="border-2 border-gray-700 rounded px-2 py-1" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    <div className="flex gap-2 justify-center">
                        <DialogClose asChild>
                            <Button onClick={submit}>Save</Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const DeleteLeaveDialogBox = ({ leaveID }) => {
    const dispatch = useDispatch()
    const onDelete = () => dispatch(HandleDeleteHRLeave({ leaveID }))
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Delete</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-lg font-bold min-[250px]:text-center">Are you sure you want to delete this leave?</p>
                    <div className="flex gap-2">
                        <DialogClose asChild>
                            <Button onClick={onDelete}>Delete</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button>Cancel</Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const CreateSalaryDialogBox = () => {
    const dispatch = useDispatch()
    const EmployeesIDState = useSelector((state) => state.EMployeesIDReducer)
    const [formdata, setformdata] = useState({
        employeeID: "",
        basicpay: "",
        bonusePT: "0",
        deductionPT: "0",
        duedate: "",
        currency: "INR",
    })

    const onChange = (e) => setformdata({ ...formdata, [e.target.name]: e.target.value })
    const canSubmit = () => formdata.employeeID && formdata.basicpay && formdata.duedate && formdata.currency
    const submit = () => {
        const payload = {
            ...formdata,
            basicpay: Number(formdata.basicpay),
            bonusePT: Number(formdata.bonusePT),
            deductionPT: Number(formdata.deductionPT),
        }
        dispatch(HandleCreateHRSalary({ data: payload }))
        setformdata({ employeeID: "", basicpay: "", bonusePT: "0", deductionPT: "0", duedate: "", currency: "INR" })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button onClick={() => dispatch(fetchEmployeesIDs({ apiroute: "GETALL" }))}>Create Salary</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[315px] lg:max-w-[45vw] 2xl:max-w-[40vw]">
                <div className="flex flex-col gap-4">
                    <h1 className="font-bold text-2xl">Create Salary</h1>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="font-bold">Employee</label>
                            <select className="border-2 border-gray-700 rounded px-2 py-1" name="employeeID" value={formdata.employeeID} onChange={onChange}>
                                <option value="">Select employee</option>
                                {Array.isArray(EmployeesIDState.data) && EmployeesIDState.data.map((e) => (
                                    <option key={e._id} value={e._id}>{e.firstname} {e.lastname}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold">Basic Pay</label>
                            <input className="border-2 border-gray-700 rounded px-2 py-1" name="basicpay" value={formdata.basicpay} onChange={onChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold">Bonus %</label>
                            <input className="border-2 border-gray-700 rounded px-2 py-1" name="bonusePT" value={formdata.bonusePT} onChange={onChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold">Deduction %</label>
                            <input className="border-2 border-gray-700 rounded px-2 py-1" name="deductionPT" value={formdata.deductionPT} onChange={onChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold">Currency</label>
                            <input className="border-2 border-gray-700 rounded px-2 py-1" name="currency" value={formdata.currency} onChange={onChange} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-bold">Due Date</label>
                            <input type="date" className="border-2 border-gray-700 rounded px-2 py-1" name="duedate" value={formdata.duedate} onChange={onChange} />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        {canSubmit() ? (
                            <DialogClose asChild>
                                <Button onClick={submit}>Create</Button>
                            </DialogClose>
                        ) : (
                            <Button disabled>Fill required fields</Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const UpdateSalaryDialogBox = ({ salary }) => {
    const dispatch = useDispatch()
    const [formdata, setformdata] = useState({
        salaryID: salary?._id,
        basicpay: salary?.basicpay || 0,
        bonusePT: salary?.bonusePT || 0,
        deductionPT: salary?.deductionPT || 0,
        duedate: salary?.duedate ? salary.duedate.split('T')[0] : "",
        currency: salary?.currency || "INR",
        status: salary?.status || "Pending",
    })
    const onChange = (e) => setformdata({ ...formdata, [e.target.name]: e.target.value })
    const submit = () => {
        const payload = {
            salaryID: formdata.salaryID,
            basicpay: Number(formdata.basicpay),
            bonusePT: Number(formdata.bonusePT),
            deductionPT: Number(formdata.deductionPT),
            duedate: formdata.duedate,
            currency: formdata.currency,
            status: formdata.status,
        }
        dispatch(HandleUpdateHRSalary({ data: payload }))
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Update</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[315px] lg:max-w-[45vw] 2xl:max-w-[40vw]">
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1"><label className="font-bold">Basic Pay</label><input name="basicpay" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.basicpay} onChange={onChange} /></div>
                    <div className="flex flex-col gap-1"><label className="font-bold">Bonus %</label><input name="bonusePT" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.bonusePT} onChange={onChange} /></div>
                    <div className="flex flex-col gap-1"><label className="font-bold">Deduction %</label><input name="deductionPT" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.deductionPT} onChange={onChange} /></div>
                    <div className="flex flex-col gap-1"><label className="font-bold">Currency</label><input name="currency" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.currency} onChange={onChange} /></div>
                    <div className="flex flex-col gap-1"><label className="font-bold">Due Date</label><input type="date" name="duedate" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.duedate} onChange={onChange} /></div>
                    <div className="flex flex-col gap-1"><label className="font-bold">Status</label>
                        <select name="status" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.status} onChange={onChange}>
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Overdue">Overdue</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-center mt-3">
                    <DialogClose asChild>
                        <Button onClick={submit}>Save</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const DeleteSalaryDialogBox = ({ salaryID }) => {
    const dispatch = useDispatch()
    const onDelete = () => dispatch(HandleDeleteHRSalary({ salaryID }))
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Delete</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-lg font-bold min-[250px]:text-center">Are you sure you want to delete this salary?</p>
                    <div className="flex gap-2">
                        <DialogClose asChild>
                            <Button onClick={onDelete}>Delete</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button>Cancel</Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

// CreateAttendanceDialogBox and UpdateAttendanceDialogBox removed in favor of per-log check-in/out flow

export const DeleteAttendanceDialogBox = ({ attendanceID }) => {
    const dispatch = useDispatch()
    const onDelete = () => dispatch(HandleDeleteHRAttendance({ attendanceID }))
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Delete</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-lg font-bold min-[250px]:text-center">Are you sure you want to delete this attendance?</p>
                    <div className="flex gap-2">
                        <DialogClose asChild>
                            <Button className="btn-sm btn-blue-700 text-md border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-red-700 border-red-700 hover:bg-transparent hover:text-red-700" onClick={onDelete}>Delete</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button className="btn-sm btn-blue-700 text-md border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-green-700 border-green-700 hover:bg-transparent hover:text-green-700">Cancel</Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const UpdateRequestContentDialogBox = ({ request }) => {
    const dispatch = useDispatch()
    const [requesttitle, setTitle] = useState(request?.requesttitle || "")
    const [requestconent, setContent] = useState(request?.requestconent || "")
    const submit = () => dispatch(HandleUpdateHRRequestContent({ data: { requestID: request._id, requesttitle, requestconent } }))
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Update Content</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[315px] lg:max-w-[40vw] 2xl:max-w-[35vw]">
                <div className="flex flex-col gap-3">
                    <input className="border-2 border-gray-700 rounded px-2 py-1" value={requesttitle} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                    <textarea className="border-2 border-gray-700 rounded px-2 py-1 h-[120px]" value={requestconent} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
                    <div className="flex justify-center"><DialogClose asChild><Button onClick={submit} disabled={!requesttitle.trim() || !requestconent.trim()}>Save</Button></DialogClose></div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const UpdateRequestStatusDialogBox = ({ request }) => {
    const dispatch = useDispatch()
    const [status, setStatus] = useState(request?.status || "Pending")
    const submit = () => dispatch(HandleUpdateHRRequestStatus({ data: { requestID: request._id, status } }))
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Update Status</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[315px] lg:max-w-[30vw] 2xl:max-w-[25vw]">
                <div className="flex flex-col gap-3">
                    <select className="border-2 border-gray-700 rounded px-2 py-1" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option>Pending</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                    </select>
                    <div className="flex justify-center"><DialogClose asChild><Button onClick={submit}>Save</Button></DialogClose></div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const DeleteRequestDialogBox = ({ requestID }) => {
    const dispatch = useDispatch()
    const onDelete = () => dispatch(HandleDeleteHRRequest({ requestID }))
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Delete</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-lg font-bold min-[250px]:text-center">Are you sure you want to delete this request?</p>
                    <div className="flex gap-2">
                        <DialogClose asChild>
                            <Button onClick={onDelete}>Delete</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button>Cancel</Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const EmployeeCreateRequestDialogBox = () => {
    const dispatch = useDispatch()
    const SelfState = useAppSelector((state) => state.EmployeeSelfReducer)
    const [formdata, setformdata] = useState({ requesttitle: "", requestconent: "" })
    const onChange = (e) => setformdata({ ...formdata, [e.target.name]: e.target.value })
    const canSubmit = () => SelfState?.data?._id && formdata.requesttitle.trim() && formdata.requestconent.trim()
    const submit = () => {
        const departmentID = (SelfState?.data?.department && typeof SelfState.data.department === 'object') ? SelfState.data.department._id : SelfState?.data?.department
        dispatch(HandleCreateHRRequest({ data: { ...formdata, employeeID: SelfState.data._id, departmentID } }))
        setformdata({ requesttitle: "", requestconent: "" })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Request</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[315px] lg:max-w-[45vw] 2xl:max-w-[40vw]">
                <div className="grid gap-3">
                    <input name="requesttitle" className="border-2 border-gray-700 rounded px-2 py-1" placeholder="Title" value={formdata.requesttitle} onChange={onChange} />
                    <textarea name="requestconent" className="border-2 border-gray-700 rounded px-2 py-1 h-[120px]" placeholder="Content" value={formdata.requestconent} onChange={onChange} />
                    <div className="flex justify-center">
                        {canSubmit() ? (
                            <DialogClose asChild>
                                <Button className="bg-blue-700 border-2 border-blue-700 text-white font-bold hover:bg-white hover:text-blue-700" onClick={submit}>Create</Button>
                            </DialogClose>
                        ) : (
                            <Button className="bg-blue-700 border-2 border-blue-700 text-white font-bold" disabled>Fill required fields</Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const UpdateHRProfileDialogBox = ({ profile }) => {
    const dispatch = useDispatch()
    const [formdata, setformdata] = useState({ HRID: profile?._id, UpdatedData: { firstname: profile?.firstname || "", lastname: profile?.lastname || "" } })
    const onChange = (e) => setformdata({ ...formdata, UpdatedData: { ...formdata.UpdatedData, [e.target.name]: e.target.value } })
    const submit = () => dispatch(HandleUpdateHRProfile({ data: formdata }))
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Update</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                <div className="grid gap-3">
                    <div className="flex flex-col gap-1"><label className="font-bold">First Name</label><input name="firstname" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.UpdatedData.firstname} onChange={onChange} /></div>
                    <div className="flex flex-col gap-1"><label className="font-bold">Last Name</label><input name="lastname" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.UpdatedData.lastname} onChange={onChange} /></div>
                    <div className="flex justify-center"><DialogClose asChild><Button className="bg-blue-700 border-2 border-blue-700 text-white font-bold hover:bg-white hover:text-blue-700" onClick={submit}>Save</Button></DialogClose></div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const DeleteHRProfileDialogBox = ({ HRID }) => {
    const dispatch = useDispatch()
    const onDelete = () => dispatch(HandleDeleteHRProfile({ HRID }))
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Delete</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-lg font-bold min-[250px]:text-center">Are you sure you want to delete this HR profile?</p>
                    <div className="flex gap-2">
                        <DialogClose asChild>
                            <Button className="btn-sm btn-blue-700 text-md border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-red-700 border-red-700 hover:bg-transparent hover:text-red-700" onClick={onDelete}>Delete</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button className="btn-sm btn-blue-700 text-md border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-green-700 border-green-700 hover:bg-transparent hover:text-green-700">Cancel</Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const RemoveEmployeeFromDepartmentDialogBox = ({ DepartmentName, DepartmentID, EmployeeID }) => {
    const dispatch = useDispatch()

    const RemoveEmployee = (EMID) => {
        dispatch(HandleDeleteHRDepartments({ apiroute: "DELETE", data: { departmentID: DepartmentID, employeeIDArray: [EMID], action: "delete-employee" } }))
    }

    return (
        <div className="remove-employee">
            <Dialog>
                <DialogTrigger className="btn-sm btn-blue-700 text-md border-2 border-blue-800 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md hover:bg-blue-800 hover:text-white">Remove</DialogTrigger>
                <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <p className="text-lg font-bold min-[250px]:text-center">{`Are you sure you want to remove this employee from ${DepartmentName} department ?`}</p>
                        <div className="delete-employee-button-group flex gap-2">
                            <DialogClose asChild>
                                <Button className="btn-sm btn-blue-700 text-md border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-red-700 border-red-700 hover:bg-transparent hover:text-red-700" onClick={() => RemoveEmployee(EmployeeID)}>Remove</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button className="btn-sm btn-blue-700 text-md border-2 min-[250px]:px-2 min-[250px]:py-1 sm:px-1 sm:py-0.5 xl:px-2 xl:py-1 rounded-md bg-green-700 border-green-700 hover:bg-transparent hover:text-green-700">Cancel</Button>
                            </DialogClose>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export const CreateSalarySetDialogBox = () => {
    const { toast } = useToast()
    const dispatch = useDispatch()
    const [formdata, setformdata] = useState({ name: "", type: "Earning", calcType: "Flat", description: "", isActive: true })
    const typeOptions = ["Earning","Deduction"]
    const calcTypeOptions = ["Percentage","Flat"]
    const onChange = (e) => {
        const { name, value, type, checked } = e.target
        setformdata((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }))
    }
    const submit = () => {
        if (!formdata.name.trim()) {
            toast({ title: 'Missing Fields', description: 'Name is required' })
            return
        }
        dispatch(HandlePostHRSalarySets({ data: formdata }))
        setformdata({ name: "", type: "Earning", calcType: "Flat", description: "", isActive: true })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Salary Set</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[315px] sm:max-w-[50vw] 2xl:max-w-[45vw]">
                <div className="grid gap-3">
                    <h1 className="font-bold text-2xl">Create Salary Set</h1>
                    <div className="flex flex-col gap-1"><Label htmlFor="name">Name</Label><Input id="name" name="name" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.name} onChange={onChange} /></div>
                    <div className="flex flex-col gap-1"><Label htmlFor="type">Salary Set Type</Label>
                        <select id="type" name="type" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.type} onChange={onChange}>
                            {typeOptions.map((t) => (<option key={t} value={t}>{t}</option>))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1"><Label htmlFor="calcType">Calculation Type</Label>
                        <select id="calcType" name="calcType" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.calcType} onChange={onChange}>
                            {calcTypeOptions.map((t) => (<option key={t} value={t}>{t}</option>))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1"><Label htmlFor="description">Description</Label><Input id="description" name="description" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.description} onChange={onChange} /></div>
                    <label className="inline-flex items-center gap-2"><input type="checkbox" name="isActive" checked={formdata.isActive} onChange={onChange} /><span className="font-medium">Active</span></label>
                    <div className="flex justify-center gap-2">
                        {formdata.name.trim().length > 0 ? (
                            <DialogClose asChild><Button onClick={submit}>Create</Button></DialogClose>
                        ) : (
                            <Button disabled onClick={() => toast({ title: 'Missing Fields', description: 'Name is required' })}>Create</Button>
                        )}
                        <DialogClose asChild>
                            <Button variant="secondary">Cancel</Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const UpdateSalarySetDialogBox = ({ salarySet }) => {
    const dispatch = useDispatch()
    const [formdata, setformdata] = useState({ 
        id: salarySet?._id, 
        name: salarySet?.name || '', 
        type: salarySet?.type || 'Earning', 
        calcType: salarySet?.calcType || 'Flat', 
        description: salarySet?.description || '', 
        isActive: salarySet?.isActive ?? true 
    })
    const typeOptions = ["Earning","Deduction"]
    const calcTypeOptions = ["Percentage","Flat"]
    const onChange = (e) => {
        const { name, value, type, checked } = e.target
        setformdata((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }))
    }
    const submit = () => {
        if (!formdata.name.trim()) return
        dispatch(HandlePatchHRSalarySets({ data: formdata }))
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Update</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[315px] sm:max-w-[50vw] 2xl:max-w-[45vw]">
                <div className="grid gap-3">
                    <h1 className="font-bold text-2xl">Update Salary Set</h1>
                    <div className="flex flex-col gap-1"><Label htmlFor="name">Name</Label><Input id="name" name="name" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.name} onChange={onChange} /></div>
                    <div className="flex flex-col gap-1"><Label htmlFor="type">Salary Set Type</Label>
                        <select id="type" name="type" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.type} onChange={onChange}>
                            {typeOptions.map((t) => (<option key={t} value={t}>{t}</option>))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1"><Label htmlFor="calcType">Calculation Type</Label>
                        <select id="calcType" name="calcType" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.calcType} onChange={onChange}>
                            {calcTypeOptions.map((t) => (<option key={t} value={t}>{t}</option>))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1"><Label htmlFor="description">Description</Label><Input id="description" name="description" className="border-2 border-gray-700 rounded px-2 py-1" value={formdata.description} onChange={onChange} /></div>
                    <label className="inline-flex items-center gap-2"><input type="checkbox" name="isActive" checked={formdata.isActive} onChange={onChange} /><span className="font-medium">Active</span></label>
                    <div className="flex justify-center gap-2">
                        <DialogClose asChild>
                            <Button onClick={submit} disabled={!formdata.name.trim()}>Save</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button variant="secondary">Cancel</Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const DeleteSalarySetDialogBox = ({ salarySetID, salarySetName }) => {
    const dispatch = useDispatch()
    const onDelete = () => dispatch(HandleDeleteHRSalarySets({ id: salarySetID }))
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Delete</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[315px] lg:max-w-[35vw] 2xl:max-w-[30vw]">
                <div className="flex flex-col justify-center items-center gap-4">
                    <p className="text-lg font-bold min-[250px]:text-center">{`Are you sure you want to delete ${salarySetName} set?`}</p>
                    <div className="flex gap-2">
                        <DialogClose asChild><Button variant="destructive" onClick={onDelete}>Delete</Button></DialogClose>
                        <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}