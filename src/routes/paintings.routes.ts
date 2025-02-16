import { Router } from "express";
import { paintingValidation, rateValidation, registerValidation } from "../middlewares/validators.middleware";
import { ValidationMiddleware } from "../middlewares/validation.middleware";
import { PaintingsController } from "../controllers/paintings.controller";
import { isAuthenticate } from "@/middlewares/auth.middleware";
import { isAdmin } from "@/middlewares/isAdmin.middleware";

const router = Router()

router.get('/', isAuthenticate, PaintingsController.getAll)
router.get('/:id', isAuthenticate, PaintingsController.getById)
router.post('/', isAuthenticate, isAdmin, paintingValidation, ValidationMiddleware, PaintingsController.create)
router.delete('/:id',isAuthenticate,isAdmin, PaintingsController.delete)
router.put('/:id',isAuthenticate,isAdmin, paintingValidation, ValidationMiddleware, PaintingsController.update)   
router.post('/:id/rate/',isAuthenticate, rateValidation, PaintingsController.rate)  
router.get('/:id/rate/', isAuthenticate, PaintingsController.getRate)

export default router