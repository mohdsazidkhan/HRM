import { ErrorPopup } from "./error-popup"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Mail, Lock, LogIn } from "lucide-react"

export const SignIn = ({ image, handlesigninform, handlesigninsubmit, targetedstate, statevalue, redirectpath }) => {
    return (
        <>
            {targetedstate.error.status ? <ErrorPopup error={targetedstate.error.message} /> : null}
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
                <div className="w-full max-w-4xl">
                    <div className="rounded-2xl shadow-lg ring-1 ring-gray-200/60 bg-white/80 backdrop-blur p-8 md:p-12">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="hidden md:flex flex-col items-center justify-center">
                                <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-8 mb-6 shadow-lg">
                                    <LogIn className="w-20 h-20 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                                    Welcome Back!
                                </h2>
                                <p className="text-gray-600 text-center">
                                    Sign in to access your account
                                </p>
                            </div>
                            <div className="w-full">
                                <div className="md:hidden flex flex-col items-center mb-6">
                                    <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-6 mb-4 shadow-lg">
                                        <LogIn className="w-16 h-16 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                                        Welcome Back!
                                    </h2>
                                </div>
                                <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">
                                    Sign in to your account
                                </h2>
                                <form className="space-y-5" onSubmit={handlesigninsubmit}>
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
                                            value={statevalue.email}
                                            onChange={handlesigninform}
                                            placeholder="Enter your email"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password" className="flex items-center gap-2">
                                                <Lock className="w-4 h-4 text-gray-500" />
                                                Password
                                            </Label>
                                            <Link to={redirectpath} className="text-sm font-semibold text-blue-600 hover:text-blue-500">
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            autoComplete="current-password"
                                            value={statevalue.password}
                                            onChange={handlesigninform}
                                            placeholder="Enter your password"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full"
                                    >
                                        <LogIn className="w-4 h-4 mr-2" />
                                        Sign in
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}