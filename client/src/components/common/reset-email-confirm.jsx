import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Mail, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react"

export const ResetEmailConfirmaction = ({ redirectpath }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                <div className="rounded-2xl shadow-lg ring-1 ring-gray-200/60 bg-white/80 backdrop-blur p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="hidden md:flex flex-col items-center justify-center">
                            <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-8 mb-6 shadow-lg">
                                <Mail className="w-20 h-20 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                                Email Sent!
                            </h2>
                            <p className="text-gray-600 text-center">
                                Check your inbox for reset instructions
                            </p>
                        </div>
                        <div className="w-full">
                            <div className="md:hidden flex flex-col items-center mb-6">
                                <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-6 mb-4 shadow-lg">
                                    <Mail className="w-16 h-16 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                                    Email Sent!
                                </h2>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 border border-green-200">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <p className="text-green-700 font-medium">
                                        We have successfully sent you a reset email. Click on the reset password link to reset your password.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
                                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                                    <p className="text-red-700 font-medium">
                                        Please do not forward the reset password email to anyone for security reasons.
                                    </p>
                                </div>
                                <div className="pt-4">
                                    <Link to={redirectpath}>
                                        <Button
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                            size="lg"
                                        >
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            Back to Login
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}