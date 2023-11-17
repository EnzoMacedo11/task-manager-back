import { Router } from "express";
import { AddUser, CreateGroup, DeleteGroup, GetGroupById, RemoveUser } from "../../controller/group-controller";

const groupRouter = Router();

groupRouter.post("/create",CreateGroup)
groupRouter.post("/remove",DeleteGroup)
groupRouter.post("/adduser",AddUser)
groupRouter.post("/removeuser",RemoveUser)
groupRouter.get("/groupbyid",GetGroupById)

export default groupRouter