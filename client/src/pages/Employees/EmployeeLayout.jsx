import { SidebarProvider } from "@/components/ui/sidebar"
import { EmployeeSidebar } from "@/components/ui/EmployeeSidebar"
import { Outlet, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Topbar } from "@/components/ui/Topbar"

export const EmployeeLayout = () => {
    const right = (
        <Link to="/employee/dashboard">
            <Button size="default">Dashboard</Button>
        </Link>
    )
    return (
        <div className="min-h-screen bg-gray-50">
            <SidebarProvider>
                <EmployeeSidebar />
            </SidebarProvider>
            <Topbar title="Employee Dashboard" right={right} />
            <div className="mainContent">
                <Outlet />
            </div>
        </div>
    )
}


