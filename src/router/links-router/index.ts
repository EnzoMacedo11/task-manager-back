import { Router } from "express";
import CreateLink from "../../controller/links-controller";

const linkRouter = Router();

linkRouter.post("/create",CreateLink)


export default linkRouter
