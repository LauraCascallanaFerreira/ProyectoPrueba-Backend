import { Router } from "express";
import { AuthController } from "../controllers/auth.controllers";
import {registerValidation, loginValidation} from "../middlewares/validators.middleware"
import {ValidationMiddleware} from "../middlewares/validation.middleware"


const router = Router()

router.post('/register', loginValidation, ValidationMiddleware, AuthController.register)
router.post('/login', registerValidation, ValidationMiddleware, AuthController.login)

export default router