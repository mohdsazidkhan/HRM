import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { HandlePostEmployees } from "@/redux/Thunks/EmployeeThunk"
import { LayoutDashboard, ClipboardList, BriefcaseBusiness } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"

export function EmployeeSidebar() {
    const dispatch = useDispatch()
    const { state, isMobile, openMobile, setOpenMobile } = useSidebar()
    const isOpen = isMobile ? openMobile : state === "expanded"

    const onNavClick = () => {
        if (isMobile) setOpenMobile(false)
    }
    const handleLogout = async () => {
        try {
            await dispatch(HandlePostEmployees({ apiroute: "LOGOUT" })).unwrap()
        } catch {
            // ignore; proceed to redirect
        } finally {
            window.location.replace("/")
        }
    }
    return (
        <div className={`fixed inset-y-0 left-0 z-40 flex flex-col ${isOpen ? "border-r bg-white w-64" : "border-none bg-transparent w-0"}`}>
        <Sidebar className="flex-1">
            <SidebarContent className="h-full flex flex-col">
                <SidebarGroup className="flex-1 overflow-y-auto">
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-3 p-0">
                            <NavLink to={"/employee/dashboard"} end onClick={onNavClick} className={({ isActive }) => { return isActive ? "bg-blue-200" : "" }}>
                                <SidebarMenuItem className="flex gap-3 items-center hover:bg-blue-200 p-2">
                                    <LayoutDashboard className="w-5 h-5 ms-2" />
                                    <span className="text-[16px]">Dashboard</span>
                                </SidebarMenuItem>
                            </NavLink>

                            <NavLink to={"/employee/dashboard/leaves"} onClick={onNavClick} className={({ isActive }) => { return isActive ? "bg-blue-200" : "" }}>
                                <SidebarMenuItem className="flex gap-3 items-center hover:bg-blue-200 my-1 p-2">
                                    <ClipboardList className="w-5 h-5 ms-2" />
                                    <span className="text-[16px]">My Leaves</span>
                                </SidebarMenuItem>
                            </NavLink>

                            <NavLink to={"/employee/dashboard/requests"} onClick={onNavClick} className={({ isActive }) => { return isActive ? "bg-blue-200" : "" }}>
                                <SidebarMenuItem className="flex gap-3 items-center hover:bg-blue-200 my-1 p-2">
                                    <BriefcaseBusiness className="w-5 h-5 ms-2" />
                                    <span className="text-[16px]">My Requests</span>
                                </SidebarMenuItem>
                            </NavLink>

                            <NavLink to={"/employee/dashboard/attendance"} onClick={onNavClick} className={({ isActive }) => { return isActive ? "bg-blue-200" : "" }}>
                                <SidebarMenuItem className="flex gap-3 items-center hover:bg-blue-200 my-1 p-2">
                                    <ClipboardList className="w-5 h-5 ms-2" />
                                    <span className="text-[16px]">My Attendance</span>
                                </SidebarMenuItem>
                            </NavLink>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="p-2 border-t">
                    <button className="w-full text-left px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700" onClick={handleLogout}>Logout</button>
                </div>
            </SidebarContent>
        </Sidebar>
        </div>
    )
}


