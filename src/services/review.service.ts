import { prisma } from "../database/database";

interface CreateReviewDTO {
  comment: string;
  rating: number;
  userId: number;
}

export class ReviewService {
  static async create({ comment, rating, userId }: CreateReviewDTO) {
    return await prisma.review.create({
      data: {
        comment,
        rating,
        userId,
      },
    });
  }

  static async getAll() {
    return await prisma.review.findMany({
      include: {
        user: {
          select: { name: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async getByUser(userId: number) {
    return await prisma.review.findMany({
      where: {
        userId,
      },
      include: {
        user: {
          select: { name: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}
