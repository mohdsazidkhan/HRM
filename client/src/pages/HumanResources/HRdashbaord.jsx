import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { HRdashboardSidebar } from "../../components/ui/HRsidebar.jsx"
import { Outlet, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Topbar } from "@/components/ui/Topbar"

export const HRDashbaord = () => {
    const right = (
        <Link to="/admin/dashboard/dashboard-data">
            <Button size="default">Dashboard</Button>
        </Link>
    )
    return (
        <div className="min-h-screen bg-gray-50">
            <SidebarProvider>
                <HRdashboardSidebar />
                <Topbar title="HR Admin" right={right} showSidebarToggle={true} />
                <SidebarInset className="mainContent">
                    <Outlet />
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}