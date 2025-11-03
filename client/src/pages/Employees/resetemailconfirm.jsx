import { ResetEmailConfirmaction } from "../../components/common/reset-email-confirm.jsx"
export const ResetEmailConfirm = () => { 
    return (
        <>
            <ResetEmailConfirmaction redirectpath={"/employee/auth/login"} />
        </>
    )
}