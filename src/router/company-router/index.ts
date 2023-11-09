import { Router } from "express";
import { CreateCompany, GetAll,GetByCode } from "../../controller/company-controller";

const companyRouter = Router();

companyRouter.post("/create",CreateCompany)
companyRouter.get("/getall",GetAll)
companyRouter.get("/getbycode",GetByCode)

export default companyRouter