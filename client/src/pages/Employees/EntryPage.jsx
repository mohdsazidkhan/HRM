import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Users, Shield } from "lucide-react"

export const EntryPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex justify-center items-center p-4">
            <div className="w-full max-w-2xl">
                <div className="rounded-2xl shadow-lg ring-1 ring-gray-200/60 bg-white/80 backdrop-blur p-8 md:p-12">
                    <div className="flex flex-col justify-center items-center mb-10">
                        <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-6 mb-6 shadow-lg">
                            <Users className="w-16 h-16 text-white" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
                            Welcome To Employee Management System
                        </h1>
                        <p className="text-gray-600 text-center text-sm md:text-base">
                            Please Select Your Role to Proceed Further
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 mt-8">
                        <Link to={"/employee/auth/login"} className="block">
                            <div className="rounded-xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur p-6 hover:shadow-md transition-all hover:ring-blue-300 cursor-pointer border-2 border-transparent hover:border-blue-200">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="inline-flex items-center justify-center rounded-xl bg-blue-50 ring-1 ring-blue-100 p-3">
                                        <Users className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-900">Employee</h2>
                                    <p className="text-sm text-gray-500 text-center">Access your personal dashboard</p>
                                </div>
                            </div>
                        </Link>
                        <Link to={"/admin/auth/signup"} className="block">
                            <div className="rounded-xl shadow-sm ring-1 ring-gray-200/60 bg-white/80 backdrop-blur p-6 hover:shadow-md transition-all hover:ring-purple-300 cursor-pointer border-2 border-transparent hover:border-purple-200">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="inline-flex items-center justify-center rounded-xl bg-purple-50 ring-1 ring-purple-100 p-3">
                                        <Shield className="w-8 h-8 text-purple-600" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-900">HR-Admin</h2>
                                    <p className="text-sm text-gray-500 text-center">Manage your organization</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}