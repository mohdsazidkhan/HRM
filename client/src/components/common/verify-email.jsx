import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { Button } from "@/components/ui/button"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { MailCheck } from "lucide-react"

export const Verify_Email_Component = ({ value, handleCodeValue, handleOTPsubmit }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="rounded-2xl shadow-lg ring-1 ring-gray-200/60 bg-white/80 backdrop-blur p-8 md:p-12">
                    <div className="flex flex-col items-center justify-center gap-6">
                        <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-6 mb-2 shadow-lg">
                            <MailCheck className="w-12 h-12 text-white" />
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Verify Your Email
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Enter Your 6 Digit Verification Code Here
                            </p>
                        </div>
                        <div className="w-full">
                            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} value={value} onChange={(value) => handleCodeValue(value)}>
                                <InputOTPGroup className="flex gap-3 justify-center">
                                    <InputOTPSlot index={0} className="w-12 h-12 text-lg font-bold border-2 border-blue-600 rounded-md" />
                                    <InputOTPSlot index={1} className="w-12 h-12 text-lg font-bold border-2 border-blue-600 rounded-md" />
                                    <InputOTPSlot index={2} className="w-12 h-12 text-lg font-bold border-2 border-blue-600 rounded-md" />
                                    <InputOTPSlot index={3} className="w-12 h-12 text-lg font-bold border-2 border-blue-600 rounded-md" />
                                    <InputOTPSlot index={4} className="w-12 h-12 text-lg font-bold border-2 border-blue-600 rounded-md" />
                                    <InputOTPSlot index={5} className="w-12 h-12 text-lg font-bold border-2 border-blue-600 rounded-md" />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                        <Button
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            size="lg"
                            onClick={handleOTPsubmit}
                        >
                            <MailCheck className="w-4 h-4 mr-2" />
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
