import { ErrorPopup } from "./error-popup"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft, KeyRound } from "lucide-react"

export const ForgotPassowrd = ({ handleforgotpasswordsubmit, handlesforgotpasswordform, targetState, redirectpath }) => {
    const EmplyoeeState = useSelector((state) => state.employeereducer)
    return (
        <>
            {targetState.error.status ? <ErrorPopup error={targetState.error.message} /> : null}
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
                <div className="w-full max-w-4xl">
                    <div className="rounded-2xl shadow-lg ring-1 ring-gray-200/60 bg-white/80 backdrop-blur p-8 md:p-12">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="hidden md:flex flex-col items-center justify-center">
                                <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-8 mb-6 shadow-lg">
                                    <KeyRound className="w-20 h-20 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                                    Forgot Password?
                                </h2>
                                <p className="text-gray-600 text-center">
                                    No worries, we'll send you reset instructions
                                </p>
                            </div>
                            <div className="w-full">
                                <div className="md:hidden flex flex-col items-center mb-6">
                                    <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-6 mb-4 shadow-lg">
                                        <KeyRound className="w-16 h-16 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                                        Forgot Password?
                                    </h2>
                                </div>
                                <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">
                                    Enter Your Email Address
                                </h2>
                                <form className="space-y-5" onSubmit={handleforgotpasswordsubmit}>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-gray-500" />
                                            Email address
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            autoComplete="email"
                                            onChange={handlesforgotpasswordform}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                            size="lg"
                                        >
                                            <KeyRound className="w-4 h-4 mr-2" />
                                            Get Reset Email
                                        </Button>
                                        <Link to={redirectpath}>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="w-full"
                                                size="lg"
                                            >
                                                <ArrowLeft className="w-4 h-4 mr-2" />
                                                Back to Login
                                            </Button>
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}