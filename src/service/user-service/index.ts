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


const userService = {
    CreateUser,GetUser,Login
};

export default userService