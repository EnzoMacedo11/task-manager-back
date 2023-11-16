import { prisma } from "../../config";

export async function CreateGroup(name:string,companyId:number) {
    const company = await prisma.company.findUnique({where:{id:companyId},include:{Group:true}})
    console.log("compa",company)

    const groupInCompany = company.Group.find((g)=> g.name == name)
    console.log("groupInCompanuy",groupInCompany)
    if(groupInCompany){
        throw new Error("Grupo já criado")
    }

    if(company){
        const result = await prisma.group.create({data:{
            name,
            companyId
        }})
        return result
    }else{
        throw new Error("Erro ao criar grupo")
    }


    
}

export async function GetGroupById(id:number) {

    const group = await prisma.group.findUnique({where:{id},include:{User:true,Links:true}})
    console.log(group)
    const company = await prisma.company.findUnique({where:{id:group.id}})
    console.log(company)

    return({id:group.id,name:group.name,companyCode:company.code,users:group.User,links:group.Links})
    
}

export async function AddUser(enrolment:string,companyCode:number,id:number) {
    const company = await prisma.company.findUnique({where:{code:companyCode}})
    console.log("company",company)
    const user = await prisma.user.findFirst({where:{enrolment,companyCode}})
    console.log("user",user)
    const group = await prisma.group.findUnique({where:{id},include:{User:true}})
    console.log("group",group)
    if(!user){
        throw new Error("Usuário não Encontrado")
    }
    if(!company){
        throw new Error("Empresa não Encontrada")
    }
    if(!group){
        throw new Error("Grupo não Encontrado")
    }


    const inGroup = group.User.find((u) => u.enrolment === user.enrolment);
    if(inGroup){
        throw new Error("Usuário já pertence ao grupo")
    }

    const result = await prisma.group.update({
        where: { id },
        data: {
            User: {
                connect: {
                    id: user.id,
                },
            },
        },
        include: { User: true },
    });

    console.log("result",result)

    return(`Matrícula: ${enrolment} adicionada ao Grupo:${group.name}`)
    
    
}


export async function RemoveUser(enrolment:string,companyCode:number,id:number) {
    const company = await prisma.company.findUnique({where:{code:companyCode}})
    //console.log("company",company)
    const user = await prisma.user.findFirst({where:{enrolment,companyCode}})
    //console.log("user",user)
    const group = await prisma.group.findUnique({where:{id},include:{User:true}})
    //console.log("group",group)
    if(!user){
        throw new Error("Usuário não Encontrado")
    }
    if(!company){
        throw new Error("Empresa não Encontrada")
    }
    if(!group){
        throw new Error("Grupo não Encontrado")
    }
    
    const inGroup = group.User.find((u) => u.enrolment === user.enrolment);
    if(!inGroup){
        throw new Error("Usuário não pertence ao grupo")
    }
    const result = await prisma.group.update({
        where: { id },
        data: {
            User: {
                disconnect: {
                    id: user.id,
                },
            },
        },
        include: { User: true },
    });

    console.log("result",result)
    
    return(`Matrícula: ${enrolment} removida do Grupo:${group.name}`)
    
}


const groupRepository = {
    CreateGroup,GetGroupById,AddUser,RemoveUser
}

export default groupRepository