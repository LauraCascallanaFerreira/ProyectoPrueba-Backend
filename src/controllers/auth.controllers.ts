import {Request, Response, NextFunction} from 'express'
import { AuthService } from '../services/auth.services'

export class AuthController{

    static async register(req: Request, res: Response, next: NextFunction){

        try {
            const userData = req.body
            console.log(userData)
            AuthService.register(userData)
            res.status(201).json({message: 'User registered succesfully'})
        } catch (error) {
            next(error)
        }
    }

    static async login(req: Request, res:Response, next: NextFunction){
        try {
            const userData = req.body
            const token = await AuthService.login(userData.email, userData.password)
            res.cookie('token', token,{
                maxAge:60*60*100,
                httpOnly:true,
                sameSite:'strict'
            })
            res.status(201).json({message:'User loged succesfully', token})
        } catch (error) {
            next(error)
        }
    }
}