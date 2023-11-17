import userRepository from "../../repository/user-repository";

export async function CreateUser(name:string,enrolment:string,password:string,active:boolean,admin:boolean,companyCode:number) {

    return userRepository.CreateUser(name,enrolment,password,active,admin,companyCode)

}
export async function GetUser(id:number) {

    return userRepository.GetUser(id)

}

export async function Login(companyCode:number,enrolment:string,password:string) {

    return userRepository.Login(companyCode,enrolment,password)

}

export async function GetUsersbyCompanyCode(code:number) {

    return userRepository.GetUsersbyCompanyCode(code)

}

export async function AddUserToGroup(userId:number,groupId:number) {
    console.log(userId)
    console.log(groupId)
    return userRepository.AddUserToGroup(userId,groupId)

}


export async function RemoveUserToGroup(userId:number,groupId:number) {
    console.log(userId)
    console.log(groupId)
    return userRepository.RemoveUserToGroup(userId,groupId)

}

export async function DeleteUser(id:number) {
   
    return userRepository.DeleteUser(id)

}


const userService = {
    CreateUser,GetUser,Login,GetUsersbyCompanyCode,AddUserToGroup,RemoveUserToGroup,DeleteUser
};

export default userService