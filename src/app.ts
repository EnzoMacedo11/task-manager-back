import "reflect-metadata";
import express, { Express } from "express";
import cors from "cors";

import { loadEnv, connectDb, disconnectDB } from "./config";
import companyRouter from "./router/company-router";
import userRouter from "./router/user-router";
import groupRouter from "./router/group-router";
import linkRouter from "./router/links-router";

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .use("/company",companyRouter)
  .use("/user",userRouter)
  .use("/group",groupRouter)
  .use("/link", linkRouter)


export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
