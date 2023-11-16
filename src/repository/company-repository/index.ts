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
    CreateCompany,GetAll,GetByCode

}

export default companyRepository