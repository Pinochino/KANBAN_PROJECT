import { Application } from "express";
import userRouter from "./user";

export const routers = (app: Application) => {
    app.use('/', userRouter);
}