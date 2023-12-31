import companyRepository from "../../repository/company-repository"

export async function CreateCompany(name:string,code:number,userId:number) {
    console.log(userId)
    return companyRepository.CreateCompany(name,code,userId)
}

export async function DeleteCompany(id:number,userId:number) {
    console.log(id)
    return companyRepository.DeleteCompany(id,userId)
}
export async function GetAll(userId:number) {
    return companyRepository.GetAll(userId)
}

export async function GetByCode(userId:number,code:number) {
    return companyRepository.GetByCode(userId,code)
}


const companyService ={
    CreateCompany,GetAll,GetByCode,DeleteCompany
}

export default companyService