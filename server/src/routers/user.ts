import { Router } from "express";
import UserController from "../controllers/user.controller";

const userRouter = Router();
const userController = new UserController();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.post('/google-login', userController.loginWithGoogle);
userRouter.get('/refresh-token',  userController.refreshToken);

export default userRouter;