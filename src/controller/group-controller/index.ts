import { Request,Response } from "express";
import httpStatus from "http-status";
import groupService from "../../service/group-service";

export async function CreateGroup(req:Request,res:Response){
    const {name, companyId} = req.body;

    try{
        const result = await groupService.CreateGroup(name,Number(companyId))
        return res.status(httpStatus.OK).send(result)
    }catch(error){
        return res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
}

export async function GetGroupById(req:Request,res:Response){
    const {id} = req.headers;

    try{
        const result = await groupService.GetGroupById(Number(id))
        return res.status(httpStatus.OK).send(result)
    }catch(error){
        return res.status(httpStatus.BAD_REQUEST).send(error.message)
    }    

}

export async function AddUser(req:Request,res:Response) {
    const {enrolment,companyCode,id} = req.body;
    try{
        const result = await groupService.AddUser(enrolment,companyCode,id)
        return res.status(httpStatus.OK).send(result)
    }catch(error){
        return res.status(httpStatus.BAD_REQUEST).send(error.message)
    }    

}

export async function RemoveUser(req:Request,res:Response) {
    const {enrolment,companyCode,id} = req.body;
    try{
        const result = await groupService.RemoveUser(enrolment,companyCode,id)
        return res.status(httpStatus.OK).send(result)
    }catch(error){
        return res.status(httpStatus.BAD_REQUEST).send(error.message)
    }    

}