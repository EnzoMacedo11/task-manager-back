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

const linkRepository = {
    CreateLink
}

export default linkRepository