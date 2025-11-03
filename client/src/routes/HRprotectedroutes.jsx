import { HandleGetHumanResources } from "../redux/Thunks/HRThunk.js"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Loading } from "../components/common/loading.jsx"

export const HRProtectedRoutes = ({ children }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const HRState = useSelector((state) => state.HRReducer)

    useEffect(() => {
        if (!HRState.isAuthenticated && !HRState.isAuthourized && !HRState.isVerified && !HRState.error.content) {
            dispatch(HandleGetHumanResources({ apiroute: "CHECKLOGIN" }))
            dispatch(HandleGetHumanResources({ apiroute: "CHECK_VERIFY_EMAIL" }))
        }

        if (HRState.isAuthenticated && HRState.isAuthourized && !HRState.isVerified && HRState.error.content) {
            navigate("/admin/auth/reset-email-validation")
        }

        if (!HRState.isAuthenticated && !HRState.isAuthourized && !HRState.isVerified && HRState.error.content) {
            navigate("/admin/auth/signup")
        }
    }, [HRState.isAuthenticated, HRState.isAuthourized, HRState.isVerified, HRState.error.content])

    if (HRState.isLoading) {
        return (
            <Loading />
        )
    }

    return (
        (HRState.isAuthenticated && HRState.isAuthourized) ? children : null
    )
}