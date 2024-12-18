import { Application } from "express";
import userRouter from "./user";
import storageRouter from "./storage";
import { verifyToken } from "../middleware/verifyToken";

export const routers = (app: Application) => {
  app.use("/auth", userRouter);
  app.use(verifyToken);
  app.use("/storage", storageRouter);
};
