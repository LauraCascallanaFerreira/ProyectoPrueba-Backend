import { Paintings} from "@prisma/client";
import { HttpException } from "../exceptions/httpExceptions";
import { prisma } from "@/database/database";



export class PaintingsService{

    static async getById(id: number){
        const findPainting = await prisma.paintings.findUnique({where:{id}})
        if(!findPainting) throw new HttpException(404, 'Painting not found')
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

    static async create(id: number, paintings:Paintings){
        console.log("creando", id)
        console.log(await prisma.user.findMany())
        console.log(await prisma.user.findUnique({where:{id}}))
        return await prisma.paintings.create({
            data: {
                title: paintings.title,
                author: paintings.author,
                description: paintings.description,
                active: paintings.active,
                contactEmail: paintings.contactEmail,
                published: paintings.published,
                expired: paintings.expired,
                idCategory: paintings.idCategory,
                idUserCreator: id
            }
        });
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
          totalRatings: ratingStats._count.value || 0,
          averageRating: ratingStats._avg.value?.toFixed(2) || 0,
        };
      }

      static async getMyRate(idUser: number, idPainting: number) {
        return await prisma.rate.findUnique({
          where: { idUser_idPainting: { idUser, idPainting } },
        });
      }
}