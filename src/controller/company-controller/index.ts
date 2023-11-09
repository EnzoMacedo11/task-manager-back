import { Request, Response } from "express";
import httpStatus from "http-status";
import companyService from "../../service/company-service";

export async function CreateCompany(req:Request,res:Response){
    const {name, code, userId} = req.body;

    try{
        const result = await companyService.CreateCompany(name,code,userId)
        return res.status(httpStatus.OK).send(result)
    }catch(error){
       return res.status(httpStatus.BAD_REQUEST).send(error.message)
    }

}


export async function GetAll(req:Request,res:Response){
    const {id} = req.headers;
    console.log("a",id)

    try{
        const result = await companyService.GetAll(Number(id))
        return res.status(httpStatus.OK).send(result)
    }catch(error){
       return res.status(httpStatus.BAD_REQUEST).send(error.message)
    }

}

export async function GetByCode(req:Request,res:Response){
    const {id,code} = req.headers;
   
    try{
        const result = await companyService.GetByCode(Number(id),Number(code))
        return res.status(httpStatus.OK).send(result)
    }catch(error){
       return res.status(httpStatus.BAD_REQUEST).send(error.message)
    }

}