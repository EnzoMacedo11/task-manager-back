import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient

async function main(){
    await prisma.company.create({data:{
        name:"Test",
        code:123,
    }
    })
    await prisma.user.createMany({
        data:[
            {
                name: "admin",
                enrolment:"180498",
                password:"180498",
                admin:true,
                active:true,
                companyCode:123,
            },
            
        ]
    })
}