import { Link } from "react-router-dom"
import { ErrorPopup } from "./error-popup"
import { useSelector } from "react-redux"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Lock, KeyRound } from "lucide-react"

export const Reset_Password = ({ handlepasswordsubmit, handlepasswordform, passworderror, targetstate }) => { 
    return (
        <>
            {targetstate.error.status ? <ErrorPopup error={targetstate.error.message} /> : null}
            {passworderror ? <ErrorPopup error={"Password Does Not Match, Please Try Again"} /> : null}
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
                <div className="w-full max-w-4xl">
                    <div className="rounded-2xl shadow-lg ring-1 ring-gray-200/60 bg-white/80 backdrop-blur p-8 md:p-12">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="hidden md:flex flex-col items-center justify-center">
                                <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-8 mb-6 shadow-lg">
                                    <KeyRound className="w-20 h-20 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                                    Reset Password
                                </h2>
                                <p className="text-gray-600 text-center">
                                    Enter your new password to complete the reset process
                                </p>
                            </div>
                            <div className="w-full">
                                <div className="md:hidden flex flex-col items-center mb-6">
                                    <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-6 mb-4 shadow-lg">
                                        <KeyRound className="w-16 h-16 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                                        Reset Password
                                    </h2>
                                </div>
                                <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">
                                    Enter Your New Password
                                </h2>
                                <form className="space-y-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="flex items-center gap-2">
                                            <Lock className="w-4 h-4 text-gray-500" />
                                            Password
                                        </Label>
                                        <Input
                                            id="text"
                                            name="password"
                                            type="password"
                                            required
                                            autoComplete="new-password"
                                            onChange={handlepasswordform}
                                            placeholder="Enter your new password"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="repeatpassword" className="flex items-center gap-2">
                                            <Lock className="w-4 h-4 text-gray-500" />
                                            Repeat Password
                                        </Label>
                                        <Input
                                            id="password"
                                            name="repeatpassword"
                                            type="password"
                                            required
                                            autoComplete="new-password"
                                            onChange={handlepasswordform}
                                            placeholder="Confirm your new password"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                        size="lg"
                                        onClick={handlepasswordsubmit}
                                    >
                                        <KeyRound className="w-4 h-4 mr-2" />
                                        Confirm
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