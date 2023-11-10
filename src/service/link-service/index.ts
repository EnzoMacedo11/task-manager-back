import linkRepository from "../../repository/link-repository"

export async function CreateLink(link:string,imageUrl:string,description:string,groupId:number) {
    return linkRepository.CreateLink(link,imageUrl,description,groupId)

}


const linkService = {
    CreateLink
}

export default linkService