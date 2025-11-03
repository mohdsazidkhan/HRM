import express from "express"
import { HandleCreateDesignation, HandleAllDesignations, HandleDesignation, HandleUpdateDesignation, HandleDeleteDesignation } from "../controllers/Designation.controller.js"
import { VerifyhHRToken } from "../middlewares/Auth.middleware.js"
import { RoleAuthorization } from "../middlewares/RoleAuth.middleware.js"

const router = express.Router()

router.post("/create-designation", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleCreateDesignation)
router.get("/all", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleAllDesignations)
router.get("/:designationID", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleDesignation)
router.patch("/update-designation", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleUpdateDesignation)
router.delete("/delete-designation", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleDeleteDesignation)

export default router


