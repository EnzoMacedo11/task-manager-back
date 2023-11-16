import { Request,Response } from "express";
import httpStatus from "http-status";
import linkService from "../../service/link-service";

export  async function CreateLink(req:Request,res:Response){
    const{link,imageUrl,description,groupId} = req.body
    
    try{
        const result = await linkService.CreateLink(link,imageUrl,description,groupId)
        return res.status(httpStatus.OK).send(result)
    }catch(error){
        return res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
}

export async function RemoveLink(req:Request,res:Response){
    const{id} = req.body
    
    try{
        const result = await linkService.RemoveLink(id)
        return res.status(httpStatus.OK).send(result)
    }catch(error){
        return res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
}

export  async function AddLinkToUser(req:Request,res:Response){
    const{id,userId} = req.body
    
    try{
        const result = await linkService.AddLinkToUser(id,userId)
        return res.status(httpStatus.OK).send(result)
    }catch(error){
        return res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
}

export  async function RemoveLinkToUser(req:Request,res:Response){
    const{id,userId} = req.body
    
    try{
        const result = await linkService.RemoveLinkToUser(id,userId)
        return res.status(httpStatus.OK).send(result)
    }catch(error){
        return res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
}


export  async function GetAll(req:Request,res:Response){
    const{id} = req.headers
    console.log(id)
    
    try{
        const result = await linkService.GetAll(Number(id))
        return res.status(httpStatus.OK).send(result)
    }catch(error){
        return res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
}
