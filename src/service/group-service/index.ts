import groupRepository from "../../repository/group-repository"

export async function CreateGroup(name:string,companyId:number) {
        return groupRepository.CreateGroup(name,companyId)

}

export async function GetGroupById(id:number) {
    return groupRepository.GetGroupById(id)

}

export async function AddUser(enrolment:string,companyCode:number,id:number) {
    return groupRepository.AddUser(enrolment,companyCode,id)

}

export async function RemoveUser(enrolment:string,companyCode:number,id:number) {
    return groupRepository.RemoveUser(enrolment,companyCode,id)

}


const groupService={
    CreateGroup,GetGroupById,AddUser,RemoveUser
}

export default groupService