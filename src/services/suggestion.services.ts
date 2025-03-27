import { Suggestion } from "@prisma/client";
import { HttpException } from "../exceptions/httpExceptions";
import { prisma } from "../database/database";

export class SuggestionService{

    static async getById(id: number){
        const findSuggestion = await prisma.suggestion.findUnique({where:{id}})
        if(!findSuggestion) throw new HttpException(404, 'Suggestion not found')
        
        return findSuggestion
    }

    static async getAll(message: string=''){

        return await prisma.suggestion.findMany({
            where:{
                ...(message &&{
                    message: {
                        contains: message,
                    }
                })
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 100,
            include:{
                painting:{
                    select:{
                        title:true
                    }
                }
            }
        })
    }

    static async create(id: number, suggestions:Suggestion){
        console.log("creando", id)
        return await prisma.suggestion.create({
            data:{
                ...suggestions,
                idUserCreator:id
            }
        })
    }

    static async update(id: number, suggestions: Suggestion){
        const findSuggestion = await prisma.suggestion.findUnique({where:{id}})
        if(!findSuggestion) throw new HttpException(404, 'Suggestion not found')
        
        return await prisma.suggestion.update({
            where:{id},
            data:{
                ...suggestions
            }
        })
    }

    static async delete(id: number){
        try{
            return await prisma.suggestion.delete({where:{id}});
        } catch (error){
            throw new HttpException(404, 'Suggestion not found')
        }
    } 
}