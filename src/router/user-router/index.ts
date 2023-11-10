import { Router } from "express";
import { CreateUser, GetUser } from "../../controller/user-contoller";

const userRouter = Router();

userRouter.post("/create",CreateUser)
userRouter.get("/getuser",GetUser)


export default userRouter