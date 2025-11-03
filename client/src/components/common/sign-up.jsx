import { ErrorPopup } from "./error-popup"
import { useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus, User, Mail, Phone, Building2, Globe, FileText, Lock } from "lucide-react"


export const SignUP = ({ handlesignupform, handlesubmitform, stateformdata, errorpopup }) => {
    const employeestate = useSelector((state) => state.HRReducer)
    return (
        <>
            {employeestate.error.status ? <ErrorPopup error={employeestate.error.message} /> : null}
            {errorpopup ? <ErrorPopup error={"Password does not match, Please try again"} /> : null}
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
                <div className="w-full max-w-6xl">
                    <div className="rounded-2xl shadow-lg ring-1 ring-gray-200/60 bg-white/80 backdrop-blur p-6 md:p-10">
                        <div className="grid min-[900px]:grid-cols-2 gap-8 items-center">
                            <div className="hidden min-[900px]:flex flex-col items-center justify-center">
                                <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-8 mb-6 shadow-lg">
                                    <UserPlus className="w-20 h-20 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                                    Join Us Today!
                                </h2>
                                <p className="text-gray-600 text-center">
                                    Create your HR-Admin account and start managing your organization
                                </p>
                            </div>
                            <div className="w-full">
                                <div className="min-[900px]:hidden flex flex-col items-center mb-6">
                                    <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-6 mb-4 shadow-lg">
                                        <UserPlus className="w-16 h-16 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
                                        Join Us Today!
                                    </h2>
                                </div>
                                <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">
                                    Create Your Account
                                </h2>
                                <form onSubmit={handlesubmitform} className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstname" className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-gray-500" />
                                                First Name
                                            </Label>
                                            <Input
                                                id="firstname"
                                                name="firstname"
                                                type="text"
                                                required
                                                autoComplete="given-name"
                                                value={stateformdata.firstname}
                                                onChange={handlesignupform}
                                                placeholder="Enter your first name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastname" className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-gray-500" />
                                                Last Name
                                            </Label>
                                            <Input
                                                id="lastname"
                                                name="lastname"
                                                type="text"
                                                required
                                                autoComplete="family-name"
                                                value={stateformdata.lastname}
                                                onChange={handlesignupform}
                                                placeholder="Enter your last name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-gray-500" />
                                                Email
                                            </Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                autoComplete="email"
                                                value={stateformdata.email}
                                                onChange={handlesignupform}
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="contactnumber" className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-gray-500" />
                                                Contact Number
                                            </Label>
                                            <Input
                                                id="contactnumber"
                                                name="contactnumber"
                                                type="tel"
                                                required
                                                autoComplete="tel"
                                                value={stateformdata.contactnumber}
                                                onChange={handlesignupform}
                                                placeholder="Enter contact number"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="textpassword" className="flex items-center gap-2">
                                                <Lock className="w-4 h-4 text-gray-500" />
                                                Password
                                            </Label>
                                            <Input
                                                id="textpassword"
                                                name="textpassword"
                                                type="password"
                                                required
                                                autoComplete="new-password"
                                                value={stateformdata.textpassword}
                                                onChange={handlesignupform}
                                                placeholder="Enter password"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="password" className="flex items-center gap-2">
                                                <Lock className="w-4 h-4 text-gray-500" />
                                                Confirm Password
                                            </Label>
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                required
                                                autoComplete="new-password"
                                                value={stateformdata.password}
                                                onChange={handlesignupform}
                                                placeholder="Confirm password"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="flex items-center gap-2">
                                                <Building2 className="w-4 h-4 text-gray-500" />
                                                Organization Name
                                            </Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                autoComplete="organization"
                                                value={stateformdata.name}
                                                onChange={handlesignupform}
                                                placeholder="Enter organization name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="description" className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-gray-500" />
                                                Organization Description
                                            </Label>
                                            <Input
                                                id="description"
                                                name="description"
                                                type="text"
                                                required
                                                value={stateformdata.description}
                                                onChange={handlesignupform}
                                                placeholder="Enter organization description"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="OrganizationURL" className="flex items-center gap-2">
                                                <Globe className="w-4 h-4 text-gray-500" />
                                                Organization URL
                                            </Label>
                                            <Input
                                                id="OrganizationURL"
                                                name="OrganizationURL"
                                                type="url"
                                                required
                                                autoComplete="url"
                                                value={stateformdata.OrganizationURL}
                                                onChange={handlesignupform}
                                                placeholder="https://example.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="OrganizationMail" className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-gray-500" />
                                                Organization Mail
                                            </Label>
                                            <Input
                                                id="OrganizationMail"
                                                name="OrganizationMail"
                                                type="email"
                                                required
                                                autoComplete="email"
                                                value={stateformdata.OrganizationMail}
                                                onChange={handlesignupform}
                                                placeholder="org@example.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                                        <Button
                                            type="submit"
                                            className="w-full sm:w-auto"
                                        >
                                            <UserPlus className="w-4 h-4 mr-2" />
                                            Sign Up
                                        </Button>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm text-gray-600">Already Have an Account?</p>
                                            <Link to={"/admin/auth/login"}>
                                                <Button>
                                                    Sign In
                                                </Button>
                                            </Link>
                                        </div>
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