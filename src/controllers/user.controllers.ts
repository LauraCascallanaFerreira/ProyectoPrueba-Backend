import { Response, Request, NextFunction } from 'express'
import {UserService} from "../services/user.services"

export class UserController{
    static async profile(req:Request, res:Response, next: NextFunction){
        try {
            const email = req.body.user.email
            const user = await UserService.getUserByEmail(email)
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
        
    }

    static async getAll (req:Request, res:Response){
        try{
            const user = await UserService.getAll()
            res.status(200).json(user)
        } catch(error){
            res.status(409).json({message: 'User list error '+error})
        }
    }
}