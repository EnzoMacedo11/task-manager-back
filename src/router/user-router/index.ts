import { Router } from "express";
import { ActiveUser, AddUserToGroup, CreateUser, DeleteUser, DisableUser, GetUser, GetUsersbyCompanyCode, Login, RemoveUserToGroup } from "../../controller/user-contoller";

const userRouter = Router();

userRouter.post("/create",CreateUser)
userRouter.post("/remove",DeleteUser)
userRouter.post("/login",Login)
userRouter.get("/getuser",GetUser)
userRouter.get("/getusersbycompanycode",GetUsersbyCompanyCode)
userRouter.post("/addusertogroup",AddUserToGroup)
userRouter.post("/removeusertogroup",RemoveUserToGroup)
userRouter.post("/active",ActiveUser)
userRouter.post("/disable",DisableUser)

export default userRouter