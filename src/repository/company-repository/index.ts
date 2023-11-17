import { prisma } from "../../config";

export async function CreateCompany(name:string,code:number,userId:number){
    const user = await prisma.user.findUnique({where:{id:userId}})
    console.log(user)
    if(!user){
        throw new Error("Usuário não cadastrado")
    }

    const company = await prisma.company.findUnique({where:{code}})
    console.log("cc",company)
    if(company){
      throw new Error("Este código já está sendo utilizado")
    }

    if(user.admin === true && user.active === true ){
      return  await prisma.company.create({data:{
            name,
            code
        }})

    }else{
        throw new Error("Erro ao criar Empresa")
    }


}

export async function DeleteCompany(id:number){
  const company = await prisma.company.findUnique({where:{id},include:{Group:true,User:true}})
  if(company.User){
    const deleteUsers = await prisma.user.deleteMany({where:{companyCode:company.code}})
  }

  if(!company){
    throw new Error("Empresa não encontrada")
  }

  if(company.Group){
    const groups = await prisma.group.findMany({where:{companyId:id},include:{Links:true}})
    for(let i = 0;i<groups.length;i++){
      const deleteLinks = await prisma.links.deleteMany({where:{groupId:groups[i].id}})
      const deleteGroup = await prisma.group.delete({where:{id:groups[i].id}})
    }
  }
  const DeleteCompany = await prisma.company.delete({where:{id}})
  return DeleteCompany




}

export async function GetAll(userId:number){
    console.log(userId)
    const user = await prisma.user.findUnique({where:{id:userId}})
    console.log(user)
    if(!user){
        throw new Error("Usuário não cadastrado")
    }

    if(user.admin === true && user.active ===true ){
      return await prisma.company.findMany({include:{
        User:true,
        Group:true,
      }})

    }else{
        throw new Error("Erro ao buscar empresa")
    }


}

export async function GetByCode(userId:number,code:number){
    console.log(userId)
    const user = await prisma.user.findUnique({where:{id:userId}})
    console.log(user)
    if(!user){
        throw new Error("Usuário não cadastrado")
    }

    if(user.admin === true && user.active ===true ){
      return await prisma.company.findUnique({
        where: { code },
        include: {
          User: true,
          Group:true
        },
      })

    }else{
        throw new Error("Erro ao buscar empresa")
    }


}


const companyRepository ={
    CreateCompany,GetAll,GetByCode,DeleteCompany

}

export default companyRepository