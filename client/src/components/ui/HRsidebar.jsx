import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavLink } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";
import { useDispatch } from "react-redux";
import { HandlePostHumanResources } from "@/redux/Thunks/HRThunk";
import {
  LayoutDashboard,
  Users,
  Building2,
  Megaphone,
  ClipboardList,
  Clock,
  BriefcaseBusiness,
  Wallet,
  IdCard,
} from "lucide-react";

export function HRdashboardSidebar() {
  const dispatch = useDispatch();
  const { state, isMobile, openMobile, setOpenMobile } = useSidebar();
  const isOpen = isMobile ? openMobile : state === "expanded";

  const onNavClick = () => {
    if (isMobile) setOpenMobile(false);
  }
  const handleLogout = async () => {
    try {
      await dispatch(HandlePostHumanResources({ apiroute: "LOGOUT" })).unwrap();
    } catch {
      // ignore; proceed to redirect
    } finally {
      window.location.replace("/");
    }
  };
  return (
    <div className={`fixed inset-y-0 left-0 z-40 flex flex-col ${isOpen ? "border-r bg-white w-64" : "border-none bg-transparent w-0"}`}>
      <Sidebar className="flex-1">
        <SidebarContent className="h-full flex flex-col">
          <SidebarGroup className="flex-1 overflow-y-auto">
            {/* <SidebarGroupLabel>HR-Dashboard EMS</SidebarGroupLabel> */}
            <SidebarGroupContent>
              <SidebarMenu className="gap-3 p-0">
                <NavLink
                  to={"/admin/dashboard/dashboard-data"}
                  onClick={onNavClick}
                  className={({ isActive }) => {
                    return isActive
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                      : "";
                  }}
                >
                  <SidebarMenuItem className="flex gap-3 items-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 hover:text-white p-2">
                    <LayoutDashboard className="w-5 h-5 ms-2" />
                    <span className="text-[16px]">Dashboard</span>
                  </SidebarMenuItem>
                </NavLink>

                <NavLink
                  to={"/admin/dashboard/departments"}
                  onClick={onNavClick}
                  className={({ isActive }) => {
                    return isActive
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                      : "";
                  }}
                >
                  <SidebarMenuItem className="flex gap-3 items-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 hover:text-white p-2">
                    <Building2 className="w-5 h-5 ms-2" />
                    <span className="text-[16px]">Departments</span>
                  </SidebarMenuItem>
                </NavLink>

                <NavLink
                  to={"/admin/dashboard/designations"}
                  onClick={onNavClick}
                  className={({ isActive }) => {
                    return isActive
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                      : "";
                  }}
                >
                  <SidebarMenuItem className="flex gap-3 items-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 hover:text-white p-2">
                    <IdCard className="w-5 h-5 ms-2" />
                    <span className="text-[16px]">Designations</span>
                  </SidebarMenuItem>
                </NavLink>

                <NavLink
                  to={"/admin/dashboard/salary-sets"}
                  onClick={onNavClick}
                  className={({ isActive }) => {
                    return isActive
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                      : "";
                  }}
                >
                  <SidebarMenuItem className="flex gap-3 items-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 hover:text-white my-1 p-2">
                    <Wallet className="w-5 h-5 ms-2" />
                    <span className="text-[16px]">Salary Sets</span>
                  </SidebarMenuItem>
                </NavLink>

                <NavLink
                  to={"/admin/dashboard/employees"}
                  onClick={onNavClick}
                  className={({ isActive }) => {
                    return isActive
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                      : "";
                  }}
                >
                  <SidebarMenuItem className="flex gap-3 items-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 hover:text-white p-2">
                    <Users className="w-5 h-5 ms-2" />
                    <span className="text-[16px]">Employees</span>
                  </SidebarMenuItem>
                </NavLink>

                <NavLink
                  to={"/admin/dashboard/salaries"}
                  onClick={onNavClick}
                  className={({ isActive }) => {
                    return isActive
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                      : "";
                  }}
                >
                  <SidebarMenuItem className="flex gap-3 items-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 hover:text-white my-1 p-2">
                    <Wallet className="w-5 h-5 ms-2" />
                    <span className="text-[16px]">Salaries</span>
                  </SidebarMenuItem>
                </NavLink>

                <NavLink
                  to={"/admin/dashboard/attendances"}
                  onClick={onNavClick}
                  className={({ isActive }) => {
                    return isActive
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                      : "";
                  }}
                >
                  <SidebarMenuItem className="flex gap-3 items-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 hover:text-white my-1 p-2">
                    <Clock className="w-5 h-5 ms-2" />
                    <span className="text-[16px]">Attendances</span>
                  </SidebarMenuItem>
                </NavLink>

                <NavLink
                  to={"/admin/dashboard/requests"}
                  onClick={onNavClick}
                  className={({ isActive }) => {
                    return isActive
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                      : "";
                  }}
                >
                  <SidebarMenuItem className="flex gap-3 items-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 hover:text-white my-1 p-2">
                    <BriefcaseBusiness className="w-5 h-5 ms-2" />
                    <span className="text-[16px]">Requests</span>
                  </SidebarMenuItem>
                </NavLink>

                <NavLink
                  to={"/admin/dashboard/leaves"}
                  onClick={onNavClick}
                  className={({ isActive }) => {
                    return isActive
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                      : "";
                  }}
                >
                  <SidebarMenuItem className="flex gap-3 items-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 hover:text-white my-1 p-2">
                    <ClipboardList className="w-5 h-5 ms-2" />
                    <span className="text-[16px]">Leaves</span>
                  </SidebarMenuItem>
                </NavLink>

                <NavLink
                  to={"/admin/dashboard/notices"}
                  onClick={onNavClick}
                  className={({ isActive }) => {
                    return isActive
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                      : "";
                  }}
                >
                  <SidebarMenuItem className="flex gap-3 items-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 hover:text-white my-1 p-2">
                    <Megaphone className="w-5 h-5 ms-2" />
                    <span className="text-[16px]">Issue Notices</span>
                  </SidebarMenuItem>
                </NavLink>

                <NavLink
                  to={"/admin/dashboard/hr-profiles"}
                  onClick={onNavClick}
                  className={({ isActive }) => {
                    return isActive
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                      : "";
                  }}
                >
                  <SidebarMenuItem className="flex gap-3 items-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 hover:text-white my-1 p-2">
                    <IdCard className="w-5 h-5 ms-2" />
                    <span className="text-[16px]">HR Profiles</span>
                  </SidebarMenuItem>
                </NavLink>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <div className="p-2 border-t">
            <button
              className="w-full text-left px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
