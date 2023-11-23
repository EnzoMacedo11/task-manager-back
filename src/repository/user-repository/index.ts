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
  
    return ({id:user.id,name:user.name,enrolment:user.enrolment,company:user.companyCode,active:user.active})

}

export async function Login(companyCode:number,enrolment:string,password:string) {
  
  
    const company = await prisma.company.findUnique({where:{code:companyCode},include:{User:true}})
    
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
            console.log(user)
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

export async function AddUserToGroup(userId:number,groupId:number) {
    const group = await prisma.group.findUnique({where:{id:groupId},include:{User:true,Links:true}})
    const user = await prisma.user.findUnique({where:{id:userId},include:{Links:true}})

    const userInGroup = group.User.find(u => u.id === userId)
    if(userInGroup){
        throw new Error("Usuário já pertence ao grupo")
    }
    await prisma.group.update({
        where: { id: groupId },
        data: {
            User: {
                connect: {
                    id: userId,
                },
            },
        },
    });

    return (`Usuário ${user.name} adicionado ao grupo ${group.name}`)


}

export async function RemoveUserToGroup(userId:number,groupId:number) {
    const group = await prisma.group.findUnique({where:{id:groupId},include:{User:true,Links:true}})
    const user = await prisma.user.findUnique({where:{id:userId},include:{Links:true}})
    console.log(group)
    console.log(user)

    const userInGroup = group.User.find(u => u.id === userId)
    if(!userInGroup){
        throw new Error("Usuário não pertence ao grupo")
    }
    await prisma.group.update({
        where: { id: groupId },
        data: {
            User: {
                disconnect: {
                    id: userId,
                },
            },
        },
    });
  
    const updatedUserLinks = user.Links.filter((link) => link.groupId !== groupId);

  
    const linkIds = updatedUserLinks.map((link) => ({ id: link.id }));


    await prisma.user.update({
        where: { id: userId },
        data: {
            Links: {
                set: linkIds,
            },
        },
    });
    return (`Usuário ${user.name} removido do grupo ${group.name}`)


}

export async function DeleteUser(id:number){
    const user = await prisma.user.findUnique({where:{id}})
    if(user){
        const deleteUser = await prisma.user.delete({where:{id}})
    }
    else{
        throw new Error("Usuário não existe")
    }
    return(`Usuário ${user.name} deletado`)
    
}

export async function ActiveUser(id:number,userId:number){
    if(id === userId){
        throw new Error("Você não pode se Ativar")
    }
    
    const user = await prisma.user.findUnique({where:{id}})
    console.log(user)
    if(!user){
        throw new Error("Usuário não encontrado")
    }

    if(user.active === false){
        const newUser =  await prisma.user.update({
            where: { id },
            data: {
                active:true
            },
        });
        return newUser
    }
 
    
}

export async function DisableUser(id:number,userId:number){
    if(id === userId){
        throw new Error("Você não pode se Desativar")
    }
    const user = await prisma.user.findUnique({where:{id}})
    console.log(user)
    if(!user){
        throw new Error("Usuário não encontrado")
    }
    if(user.active === true){
        const newUser = await prisma.user.update({
            where: { id },
            data: {
                active:false
            },
        });
        return newUser
    }
  
}



const userRepository = {
    CreateUser,GetUser,Login,GetUsersbyCompanyCode,AddUserToGroup,RemoveUserToGroup,DeleteUser,ActiveUser,DisableUser
}



export default userRepository