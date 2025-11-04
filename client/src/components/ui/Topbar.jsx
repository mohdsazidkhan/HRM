import { Link } from "react-router-dom"
import { SidebarTrigger } from "@/components/ui/sidebar"

export const Topbar = ({ title = "Employee Management System", right = null, showSidebarToggle = false }) => {
    return (
        <div className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur border-b z-50 flex items-center px-4 justify-between">
            <div className="flex items-center gap-3">
                {showSidebarToggle && (
                    <SidebarTrigger className="h-8 w-8" />
                )}
                {/* <img src="/favicon.ico" alt="" className="w-6 h-6" /> */}
                <p className="font-semibold text-base sm:text-lg truncate">{title}</p>
            </div>
            <div className="flex items-center gap-2">
                {right}
            </div>
        </div>
    )
}


