import { Request, Response, NextFunction } from "express";
import { ReviewService } from "../services/review.service";

export class ReviewController {
  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { comment, score, idPainting } = req.body;
      const idUser = req.user?.id;

      const newReview = await ReviewService.create({
        comment,
        rating: Number(score),
        userId: Number(idUser),
      });

      res.status(201).json(newReview);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reviews = await ReviewService.getAll();
      res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  }

  static async getByUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idUser = req.user?.id;
      const reviews = await ReviewService.getByUser(idUser);
      res.status(200).json(reviews);
    } catch (error) {
      next(error);
    }
  }
}
