import { Router } from "express";
import { CreateUser, GetUser, GetUsersbyCompanyCode, Login } from "../../controller/user-contoller";

const userRouter = Router();

userRouter.post("/create",CreateUser)
userRouter.post("/login",Login)
userRouter.get("/getuser",GetUser)
userRouter.get("/getusersbycompanycode",GetUsersbyCompanyCode)


export default userRouter