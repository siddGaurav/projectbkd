import { NextFunction,Response,Request } from "express";
import { User } from "../model/authModel";



export async function signUp(request:Request,response:Response,next:NextFunction) {
    try{
        const {name,email,message} = request.body;
        

   const user = await User.create({
    name,
    email,
    message
   })


   if(user){
    response.status(200).json({
        status:"success",
        message:"Within 12 hours, our team at Qubnix will contact you.",
        data:name

    })
   }else{
    response.status(400).json({
        status:"failed",
        message:"Pleace submit the all requird feilds",

    })
   }

    }catch(err){
        response.status(500).json({
        status:"failed",
        message:"Server Error inSignup",err,

    })
    }   
}