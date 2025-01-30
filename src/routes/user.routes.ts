import { Router } from "express";
import { UserController } from "../controllers/user.controllers";
import {isAuthenticated} from "../middlewares/auth.middleware"
import { isAdmin } from "@/middlewares/isAdmin.middleware";

const router = Router()

router.get('/', isAuthenticated, isAdmin, UserController.getAll)
router.get('/profile', isAuthenticated, UserController.profile)

export default router