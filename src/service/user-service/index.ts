import userRepository from "../../repository/user-repository";

export async function CreateUser(name:string,enrolment:string,password:string,active:boolean,admin:boolean,companyCode:number) {

    return userRepository.CreateUser(name,enrolment,password,active,admin,companyCode)

}
export async function GetUser(enrolment:string,companyCode:number) {

    return userRepository.GetUser(enrolment,companyCode)

}


const userService = {
    CreateUser,GetUser
};

export default userService