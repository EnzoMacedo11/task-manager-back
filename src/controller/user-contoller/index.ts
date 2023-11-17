import { Request,Response } from "express";
import httpStatus from "http-status";
import userService from "../../service/user-service";

export async function CreateUser(req:Request,res:Response) {
    const {name,enrolment,password,active,admin,companyCode} = req.body;

    try{
         const result = await userService.CreateUser(name,enrolment,password,active,admin,Number(companyCode))
        return res.status(httpStatus.OK).send(result)
        }
    catch(error){
        return res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
}

export async function DeleteUser(req:Request,res:Response) {
    const {id}= req.body;
    console.log(id)

    try{
         const result = await userService.DeleteUser(Number(id))
        return res.status(httpStatus.OK).send(result)
        }
    catch(error){
        return res.status(httpStatus.NOT_FOUND).send(error.message)
    }
}


export async function Login(req:Request,res:Response) {
    const {companyCode,enrolment,password} = req.body;
  

    try{
        const result = await userService.Login(Number(companyCode),enrolment,password)
        return res.status(httpStatus.OK).send(result)
    }
    catch(error){
        return res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
    
}

export async function GetUser(req:Request,res:Response) {
    const {id} = req.headers;

    try{
        const result = await userService.GetUser(Number(id))
        res.status(httpStatus.OK).send(result)
    }
    catch(error){
        return res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
    
}

export async function GetUsersbyCompanyCode(req:Request,res:Response) {
    const {code} = req.headers;

    try{
        const result = await userService.GetUsersbyCompanyCode(Number(code))
        res.status(httpStatus.OK).send(result)
    }
    catch(error){
        return res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
    
}
export async function AddUserToGroup(req:Request,res:Response) {
    const {userId,groupId} = req.body;
   
    try{
        const result = await userService.AddUserToGroup(Number(userId),groupId)
        res.status(httpStatus.OK).send(result)
    }
    catch(error){
        return res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
    
}

export async function RemoveUserToGroup(req:Request,res:Response) {
    const {userId,groupId} = req.body;
   
    try{
        const result = await userService.RemoveUserToGroup(Number(userId),groupId)
        res.status(httpStatus.OK).send(result)
    }
    catch(error){
        return res.status(httpStatus.BAD_REQUEST).send(error.message)
    }
    
}