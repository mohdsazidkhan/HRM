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
import { HandlePostHumanResources } from "@/redux/Thunks/HRThunk"
import { LayoutDashboard, Users, Building2, Megaphone, CalendarDays, ClipboardList, Clock, BriefcaseBusiness, FileText, Wallet, UserRoundPlus, IdCard } from "lucide-react"

export function HRdashboardSidebar() {
    const dispatch = useDispatch()
    const handleLogout = async () => {
        try {
            await dispatch(HandlePostHumanResources({ apiroute: "LOGOUT" })).unwrap()
        } catch {
            // ignore; proceed to redirect
        } finally {
            window.location.replace("/")
        }
    }
    return (
        <div className="fixed inset-y-0 left-0 w-64 border-r bg-white z-40 flex flex-col">
        <Sidebar className="flex-1">
            <SidebarContent className="h-full flex flex-col">
                <SidebarGroup className="flex-1 overflow-y-auto">
                    {/* <SidebarGroupLabel>HR-Dashboard EMS</SidebarGroupLabel> */}
                    <SidebarGroupContent>

                        <SidebarMenu className="gap-3 p-2">


                            <NavLink to={"/admin/dashboard/dashboard-data"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

                                <SidebarMenuItem className="flex gap-3 items-center hover:bg-blue-200 rounded-lg p-2">
                                    <LayoutDashboard className="w-5 h-5 ms-2" />
                                    <span className="text-[16px]">Dashboard</span>
                                </SidebarMenuItem>

                            </NavLink>


                            <NavLink to={"/admin/dashboard/employees"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

                                <SidebarMenuItem className="flex gap-3 items-center hover:bg-blue-200 rounded-lg p-2">
                                    <Users className="w-5 h-5 ms-2" />
                                    <span className="text-[16px]">Employees</span>
                                </SidebarMenuItem>

                            </NavLink>



                            <NavLink to={"/admin/dashboard/departments"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

                                <SidebarMenuItem className="flex gap-3 items-center hover:bg-blue-200 rounded-lg p-2">
                                    <Building2 className="w-5 h-5 ms-2" />
                                    <span className="text-[16px]">Departments</span>

                                </SidebarMenuItem>

                            </NavLink>

                            <NavLink to={"/admin/dashboard/designations"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

                                <SidebarMenuItem className="flex gap-3 items-center hover:bg-blue-200 rounded-lg p-2">
                                    <IdCard className="w-5 h-5 ms-2" />
                                    <span className="text-[16px]">Designations</span>
                                </SidebarMenuItem>

                            </NavLink>

					<NavLink to={("/admin/dashboard/salaries")} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

						<SidebarMenuItem className="flex gap-3 items-center hover:bg-blue-200 rounded-lg my-1 p-2">
							<Wallet className="w-5 h-5 ms-2" />
							<span className="text-[16px]">Salaries</span>
						</SidebarMenuItem>

					</NavLink>

					<NavLink to={("/admin/dashboard/notices")} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

						<SidebarMenuItem className="flex gap-3 items-center hover:bg-blue-200 rounded-lg my-1 p-2">
							<Megaphone className="w-5 h-5 ms-2" />
							<span className="text-[16px]">Issue Notices</span>
						</SidebarMenuItem>

					</NavLink>

					<NavLink to={("/admin/dashboard/leaves")} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

						<SidebarMenuItem className="flex gap-3 items-center hover:bg-blue-200 rounded-lg my-1 p-2">
							<ClipboardList className="w-5 h-5 ms-2" />
							<span className="text-[16px]">Leaves</span>
						</SidebarMenuItem>

					</NavLink>

					<NavLink to={("/admin/dashboard/attendances")} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

						<SidebarMenuItem className="flex gap-3 items-center hover:bg-blue-200 rounded-lg my-1 p-2">
							<Clock className="w-5 h-5 ms-2" />
							<span className="text-[16px]">Attendances</span>
						</SidebarMenuItem>

					</NavLink>

					<NavLink to={("/admin/dashboard/recruitment")} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

						<SidebarMenuItem className="flex gap-3 items-center hover:bg-blue-200 rounded-lg my-1 p-2">
							<UserRoundPlus className="w-5 h-5 ms-2" />
							<span className="text-[16px]">Recruitment</span>
						</SidebarMenuItem>

					</NavLink>

					<NavLink to={("/admin/dashboard/interview-insights")} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

						<SidebarMenuItem className="flex gap-3 items-center hover:bg-blue-200 rounded-lg my-1 p-2">
							<FileText className="w-5 h-5 ms-2" />
							<span className="text-[16px]">Interview Insights</span>
						</SidebarMenuItem>

					</NavLink>

					<NavLink to={("/admin/dashboard/requests")} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

						<SidebarMenuItem className="flex gap-3 items-center hover:bg-blue-200 rounded-lg my-1 p-2">
							<BriefcaseBusiness className="w-5 h-5 ms-2" />
							<span className="text-[16px]">Requests</span>
						</SidebarMenuItem>

					</NavLink>

					<NavLink to={("/admin/dashboard/hr-profiles")} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

						<SidebarMenuItem className="flex gap-3 items-center hover:bg-blue-200 rounded-lg my-1 p-2">
							<IdCard className="w-5 h-5 ms-2" />
							<span className="text-[16px]">HR Profiles</span>
						</SidebarMenuItem>

					</NavLink>

					<NavLink to={("/admin/dashboard/calendar")} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

						<SidebarMenuItem className="flex gap-3 items-center hover:bg-blue-200 rounded-lg my-1 p-2">
							<CalendarDays className="w-5 h-5 ms-2" />
							<span className="text-[16px]">Calendar</span>
						</SidebarMenuItem>

					</NavLink>

					<NavLink to={("/admin/dashboard/balance")} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

						<SidebarMenuItem className="flex gap-3 items-center hover:bg-blue-200 rounded-lg my-1 p-2">
							<Wallet className="w-5 h-5 ms-2" />
							<span className="text-[16px]">Balance</span>
						</SidebarMenuItem>

					</NavLink>

					<NavLink to={("/admin/dashboard/applicants")} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>

						<SidebarMenuItem className="flex gap-3 items-center hover:bg-blue-200 rounded-lg my-1 p-2">
							<UserRoundPlus className="w-5 h-5 ms-2" />
							<span className="text-[16px]">Applicants</span>
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
