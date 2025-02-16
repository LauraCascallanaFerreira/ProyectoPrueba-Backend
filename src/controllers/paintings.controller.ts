import { HttpException } from "../exceptions/httpExceptions";
import { PaintingsService } from "../services/paintings.services";
import {Response, Request, NextFunction} from 'express'

export class PaintingsController{

    static async getById(req:Request, res:Response, next:NextFunction){
        try{
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid painting ID");

            const painting = await PaintingsService.getById(id)
            res.status(200).json(painting)
        }catch(error){
            next(error)
        }
    }

    static async getAll(req:Request, res:Response, next: NextFunction){
        try{
            const { title } = req.query;
            const user = await PaintingsService.getAll(title as string)
            res.status(200).json(user)
        }catch(error){
            next(error)
        }
    }

    static async create(req:Request, res:Response, next: NextFunction){
        try{
            const paintingData = req.body
            const userId = req.user?.id
            if (!userId) throw new HttpException(400, "User creator ID is required");

            const newPainting = await PaintingsService.create(userId, paintingData)
            res.status(200).json(newPainting)
        }catch(error){
            next(error)
        }
    }
    
    static async update(req:Request, res:Response, next: NextFunction){
        try{
            const paintingData = req.body
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid painting ID");

            const updatedPainting = await PaintingsService.update(id, paintingData)
            res.status(200).json(updatedPainting)
        }catch(error){
            next(error)
        }
    }

    static async delete(req:Request, res:Response, next: NextFunction){
        try{
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid painting ID");

            const deletedPainting = await PaintingsService.delete(id)
            res.status(200).json(deletedPainting)
        }catch(error){
            next(error)
        }
    }

    static async rate(req:Request, res:Response, next: NextFunction){
        try{
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid painting ID");

            const {value} = req.body
            const userId = req.user?.id
            if(!userId) throw new HttpException(400, "User creator ID is required");

            await PaintingsService.rate(userId, id, value)
            res.status(200).json({message: 'Painting rate successfully'})
        }catch(error){
            next(error)
        }
    }

    static async getRate(req:Request, res:Response, next: NextFunction){
        try{
            const id = Number.parseInt(req.params.id)
            if (isNaN(id)) throw new HttpException(400, "Invalid painting ID");

            await PaintingsService.getRate(id)
            res.status(200).json({message: 'Painting rate successfully'})
        }catch(error){
            next(error)
        }
    }
}