import { Request,Response } from "express";
import httpStatus from "http-status";
import userService from "../../service/user-service";

export async function CreateUser(req:Request,res:Response) {
    const {name,enrolment,password,active,admin,companyCode} = req.body;

    try{
         const result = await userService.CreateUser(name,enrolment,password,active,admin,companyCode)
        return res.status(httpStatus.OK).send(result)
        }
    catch(error){
        return res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
}

export async function GetUser(req:Request,res:Response) {
    const {enrolment,companycode} = req.headers;

    try{
        const result = await userService.GetUser(String(enrolment),Number(companycode))
        res.status(httpStatus.OK).send(result)
    }
    catch(error){
        return res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
    
}
