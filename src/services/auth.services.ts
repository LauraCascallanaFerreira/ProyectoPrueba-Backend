import { User } from "@prisma/client";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { prisma } from "../database/database";

const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || 'pass'

export class AuthService{

    static async register(user:User){

        const findUser = await prisma.user.findUnique({where:{email:user.email}})
        if(findUser) throw new Error('Invalid user')

        const passwordEncrypted = await bcrypt.hash(user.password,10)

        return await prisma.user.create({
            data:{
                ...user,
                password:passwordEncrypted,
                role:null
            },
            omit:{
                password:true
            }
        })
    }

    static async login(email:string, password:string){

        const findUser = await prisma.user.findUnique({where:{email:email}})
        if(!findUser) throw new Error('Invalid user or password')

        const isPasswordCorrect = await bcrypt.compare(password, findUser.password)
        if(!isPasswordCorrect) throw new Error('Invalid user or password')

        const token = jwt.sign(
            {
                id:findUser.id,
                email:findUser.email,
                role:findUser.role
            },
                TOKEN_PASSWORD,
                {expiresIn:"1h"}
        )

        return token
    }
}