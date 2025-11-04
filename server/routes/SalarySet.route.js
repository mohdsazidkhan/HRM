import express from 'express'
import { VerifyhHRToken } from '../middlewares/Auth.middleware.js'
import { RoleAuthorization } from '../middlewares/RoleAuth.middleware.js'
import { HandleActiveSalarySets, HandleAllSalarySets, HandleCreateSalarySet, HandleDeleteSalarySet, HandleUpdateSalarySet } from '../controllers/SalarySet.controller.js'

const router = express.Router()

router.post('/create', VerifyhHRToken, RoleAuthorization('HR-Admin'), HandleCreateSalarySet)
router.get('/all', VerifyhHRToken, RoleAuthorization('HR-Admin'), HandleAllSalarySets)
router.get('/active', VerifyhHRToken, RoleAuthorization('HR-Admin'), HandleActiveSalarySets)
router.patch('/update', VerifyhHRToken, RoleAuthorization('HR-Admin'), HandleUpdateSalarySet)
router.delete('/delete/:id', VerifyhHRToken, RoleAuthorization('HR-Admin'), HandleDeleteSalarySet)

export default router


