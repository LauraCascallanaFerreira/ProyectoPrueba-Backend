import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";
import { isAuthenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", isAuthenticate, ReviewController.create);
router.get("/", ReviewController.getAll);
router.get("/my", isAuthenticate, ReviewController.getByUser);

export default router;
