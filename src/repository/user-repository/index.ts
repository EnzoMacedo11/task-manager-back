import { prisma } from "../../config";
import bcrypt from "bcrypt"

export async function CreateUser(name:string,enrolment:string,password:string,active:boolean,admin:boolean,companyCode:number) {
    const hashedPassword = await bcrypt.hash(password,12);
 
    const company = await prisma.company.findUnique({where:{code:companyCode},include:{User:true}})
    if(!company){
        throw new Error("Empresa não cadastrada")
    }

    if (company.User.find(user => user.enrolment === enrolment)) {
        throw new Error("Matrícula já cadastrada nessa empresa");
    }

    const user = await prisma.user.create({data:{
        name,
        enrolment,
        password:hashedPassword,
        active,
        admin,
        companyCode
    }})
  
    return ({user:user.name,enrolment:user.enrolment,company:user.companyCode})

}

export async function Login(companyCode:number,enrolment:string,password:string) {
    
    
    const company = await prisma.company.findUnique({where:{code:companyCode},include:{User:true}})
    console.log(company)
    if(!company){
        throw new Error("Código de empresa errado")
    }
    const user = await prisma.user.findFirst({where:{enrolment}})
    if(!user){
        throw new Error("Usuário e/ou senha incorreto(s)")
    }
    const userInCompany = company.User.find((u)=> u.enrolment === enrolment)
    if(!userInCompany){
        throw new Error("Usuário não pertence a essa empresa")
    }
    if(user){
        const passwordMatch = await bcrypt.compare(password,user.password)
        if(passwordMatch){
            return({id:user.id,name:user.name,enrolment:user.enrolment,admin:user.admin,active:user.active})
        }
    }
    
}

export async function GetUser(id:number) {
    const user = await prisma.user.findUnique({where:{id},include:{Group:true,Links:true}})
   if(!user){
    throw new Error("Não existe esse usuário nessa empresa")
   }
   else{
    return {
        id:user.id,
        name:user.name,
        active:user.active,
        admin:user.admin,
        enrolment:user.enrolment,
        company:user.companyCode,
        groups:user.Group,
        links:user.Links
    }
   }
}

export async function GetUsersbyCompanyCode(code:number) {
    const company = await prisma.company.findUnique({where:{code},include:{User:true,Group:true}})
   if(!company){
    throw new Error("Empresa não cadastrada")
   }
   else{
    return {users:company.User, companyName:company.name, companyGroups:company.Group}
    
   }
}





const userRepository = {
    CreateUser,GetUser,Login,GetUsersbyCompanyCode
}

export default userRepository