import { Router } from "express";
import { AddLinkToUser, CreateLink, GetAll, RemoveLink, RemoveLinkToUser } from "../../controller/links-controller";

const linkRouter = Router();

linkRouter.post("/create",CreateLink)
linkRouter.post("/remove",RemoveLink)
linkRouter.post("/addlinktouser",AddLinkToUser)
linkRouter.post("/removelinktouser",RemoveLinkToUser)
linkRouter.get("/getall", GetAll)


export default linkRouter
