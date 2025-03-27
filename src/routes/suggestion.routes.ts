import { Router } from "express";
import { isAuthenticate } from "../middlewares/auth.middleware";
import {suggestionValidation} from "../middlewares/validators.middleware"
import { ValidationMiddleware } from "../middlewares/validation.middleware";
import { SuggestionController } from "../controllers/suggestion.controller"
import { isAdmin } from "../middlewares/isAdmin.middleware";

const router = Router()

router.get('/', isAuthenticate, SuggestionController.getAll)
router.get('/:id', isAuthenticate, SuggestionController.getById)
router.post('/', isAuthenticate, isAdmin, suggestionValidation, ValidationMiddleware, SuggestionController.create)
router.delete('/:id', isAuthenticate, isAdmin, SuggestionController.delete)
router.put('/:id', isAuthenticate, isAdmin, suggestionValidation, ValidationMiddleware, SuggestionController.update)

export default router