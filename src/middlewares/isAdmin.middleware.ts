import { Response, Request, NextFunction } from 'express'

export const isAdmin = (req:Request, res:Response, next: NextFunction): any => {
    const {role} = req.body.user
    try{
        if(role=='admin'){
            next()
        } else {
            res.status(401).json({message: 'Access denied, no adamin'})
        }
    } catch(error){
        res.status(401).json({error: 'Invalid token'})
    }
}