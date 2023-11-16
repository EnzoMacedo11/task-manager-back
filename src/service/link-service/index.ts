import linkRepository from "../../repository/link-repository"

export async function CreateLink(link:string,imageUrl:string,description:string,groupId:number) {
    return linkRepository.CreateLink(link,imageUrl,description,groupId)

}


export async function RemoveLink(id:number) {
    return linkRepository.RemoveLink(id)

}
export async function AddLinkToUser(id:number,userId:number) {
    return linkRepository.AddLinkToUser(id,userId)

}

export async function RemoveLinkToUser(id:number,userId:number) {
    return linkRepository.RemoveLinkToUser(id,userId)

}

export async function GetAll(id:number) {
    return linkRepository.GetAll(id)

}




const linkService = {
    CreateLink,RemoveLink,AddLinkToUser,RemoveLinkToUser,GetAll
}

export default linkService