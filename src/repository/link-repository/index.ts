import { prisma } from "../../config";

export async function CreateLink(link:string,imageUrl:string,description:string,groupId:number) {
    const group = await prisma.group.findUnique({where:{id:groupId},include:{Links:true}})
    if(!group){
        throw new Error("Grupo não identificado")
    }
    const linkInGroup = group.Links.find((l)=> l.link === link)
    if(linkInGroup){
        throw new Error("Link já cadastrado");
    }
    const result = await prisma.links.create({data:{
        link,
        imageUrl,
        description,
        groupId
    }})
    console.log(result)
    return (`Link id:${result.id} criado com sucesso`)
}

export async function RemoveLink(id: number) {
    const link = await prisma.links.findUnique({ where: { id } });

    if (!link) {
        throw new Error("Link não encontrado");
    }

    const result = await prisma.links.delete({ where: { id } });

    console.log(result);

    return (`Link id:${id} removido com sucesso`);
}

export async function AddLinkToUser(id:number,userId:number) {
    const user = await prisma.user.findUnique({where:{id:userId},include:{Links:true}})
    
    if(!user){
        throw new Error("Usuário não encontrado")
    };
    const link = await prisma.links.findUnique({where:{id}})

    if(!link){
        throw new Error("Link não encontrado")
    };
 
    const linkInUser = user.Links.find((l)=> l.id === id)
    if(linkInUser){
        throw new Error("Link já cadastrado")
    }

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          Links: {
            connect: { id: link.id }
          }
        }
      });

      if(updatedUser){
        return (`Link id:${id} adicionado ao usuário: ${user.name}`)
      }

}

export async function RemoveLinkToUser(id:number,userId:number) {
    const user = await prisma.user.findUnique({where:{id:userId},include:{Links:true}})
    
    if(!user){
        throw new Error("Usuário não encontrado")
    }
    const link = await prisma.links.findUnique({where:{id}})

    if(!link){
        throw new Error("Link não encontrado")
    };
 
    const linkInUser = user.Links.find((l)=> l.id === id)
    if(!linkInUser){
        throw new Error("Este usuário não tem acesso a esse link")
    }

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          Links: {
            disconnect: { id: link.id }
          }
        }
      });

      if(updatedUser){
        return (`Link id:${id} removido do usuário: ${user.name}`)
      }

}


const linkRepository = {
    CreateLink,RemoveLink,AddLinkToUser,RemoveLinkToUser
}

export default linkRepository