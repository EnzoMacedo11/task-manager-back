import { Router } from "express";
import { AddUserToGroup, CreateUser, DeleteUser, GetUser, GetUsersbyCompanyCode, Login, RemoveUserToGroup } from "../../controller/user-contoller";

const userRouter = Router();

userRouter.post("/create",CreateUser)
userRouter.post("/remove",DeleteUser)
userRouter.post("/login",Login)
userRouter.get("/getuser",GetUser)
userRouter.get("/getusersbycompanycode",GetUsersbyCompanyCode)
userRouter.post("/addusertogroup",AddUserToGroup)
userRouter.post("/removeusertogroup",RemoveUserToGroup)

export default userRouter