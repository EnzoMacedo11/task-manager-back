import { Request,Response } from "express";
import httpStatus from "http-status";
import linkService from "../../service/link-service";

export default async function CreateLink(req:Request,res:Response){
    const{link,imageUrl,description,groupId} = req.body
    
    try{
        const result = await linkService.CreateLink(link,imageUrl,description,groupId)
        return res.status(httpStatus.OK).send(result)
    }catch(error){
        return res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
}


