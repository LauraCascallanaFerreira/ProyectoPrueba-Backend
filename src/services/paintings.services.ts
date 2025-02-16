import { Paintings, PrismaClient} from "@prisma/client";
import { HttpException } from "../exceptions/httpExceptions";

const prisma = new PrismaClient()

export class PaintingsService{

    static async getById(id: number){
        const findPainting = await prisma.paintings.findUnique({where:{id}})
        if(!findPainting) throw new HttpException(404, 'User not found')
        return findPainting
    }

    static async getAll(title: string=''){

        return await prisma.paintings.findMany({
            where: {
                ...(title &&{
                    title: {
                        contains: title,
                    }
                })
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 100,
            include: {
                category: {
                    select: {
                        name:true
                    }
                }
            }
        });
    }

    static async create(idUser: number, paintings:Paintings){
        console.log('creando', idUser)
        return await prisma.paintings.create({
            data: {
                ...paintings,
                idUserCreator: idUser
            }
        })
    }

    static async update(id:number, paintings: Paintings){
        const findPaintings = await prisma.paintings.findUnique({where:{id}})
        if(!findPaintings) throw new HttpException(404, 'Painting doesnt exist')
        
        return await prisma.paintings.update({
            where:{id},
            data: {
                ...paintings,
            }
        })
    }

    static async delete(id:number){
        try{
            return await prisma.paintings.delete({where: {id}});
        } catch (error) {
            throw new HttpException(404, 'paintings not found')
        }
    }

    static async rate(idPainting: number, idUser: number, value: number): Promise<void> {

        if (value < 0 || value > 5) {
          throw new Error("Rating must be between 0 and 5.");
        }

        const painting = await prisma.paintings.findUnique({ where: { id: idPainting } });
        if (!painting) {
          throw new Error("Painting not found.");
        }
 
        await prisma.rate.upsert({
            where: {idUser_idPainting: {idUser, idPainting}},
            update: {value},
            create: {idUser, idPainting, value},
        })
      }

      static async getRate(idPainting: number) {
        const ratingStats = await prisma.rate.aggregate({
          where: { idPainting },
          _avg: { value: true },
          _count: { value: true },
        });
        return {
          totalRatings: ratingStats._count.value,
          averageRating: ratingStats._avg.value?.toFixed(2)
        }
      }
}