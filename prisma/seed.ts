import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient
import bcrypt from "bcrypt";

async function main(){

    const hashedPassword1 = await bcrypt.hash("180498", 10);
    const hashedPassword2 = await bcrypt.hash("180211", 10);
    const hashedPassword3 = await bcrypt.hash("123456789", 10);

    await prisma.company.create({data:{
        name:"Admin",
        code:123,
    }
    })
    await prisma.user.createMany({
        data:[
            {
                name: "Admin",
                enrolment:"180498",
                password:hashedPassword1,
                admin:true,
                active:true,
                companyCode:123,
            },
            {
                name: "Admin2",
                enrolment:"180211",
                password:hashedPassword2,
                admin:true,
                active:true,
                companyCode:123,
            },
            {
                name: "Admin3",
                enrolment:"123456789",
                password:hashedPassword3,
                admin:true,
                active:true,
                companyCode:123,
            },


            
        ]
    })
}

main()
  .then(() => {
    console.log("Registro Feito");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
