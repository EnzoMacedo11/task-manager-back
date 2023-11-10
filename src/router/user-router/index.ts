import { Router } from "express";
import { CreateUser, GetUser, Login } from "../../controller/user-contoller";

const userRouter = Router();

userRouter.post("/create",CreateUser)
userRouter.post("/login",Login)
userRouter.get("/getuser",GetUser)


export default userRouter