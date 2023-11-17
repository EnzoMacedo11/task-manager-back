import { Router } from "express";
import { CreateCompany, DeleteCompany, GetAll,GetByCode } from "../../controller/company-controller";

const companyRouter = Router();

companyRouter.post("/create",CreateCompany)
companyRouter.post("/remove",DeleteCompany)
companyRouter.get("/getall",GetAll)
companyRouter.get("/getbycode",GetByCode)

export default companyRouter