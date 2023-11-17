import { Request, Response } from "express";
import httpStatus from "http-status";
import companyService from "../../service/company-service";

export async function CreateCompany(req:Request,res:Response){
    const {name, code, userId} = req.body;
    console.log(code);

    try{
        const result = await companyService.CreateCompany(name,Number(code),Number(userId))
        return res.status(httpStatus.OK).send(result)
    }catch(error){
       return res.status(httpStatus.BAD_REQUEST).send(error.message)
    }

}
export async function DeleteCompany(req:Request,res:Response){
   const {id} = req.body
    console.log(id);

    try{
        const result = await companyService.DeleteCompany(Number(id))
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