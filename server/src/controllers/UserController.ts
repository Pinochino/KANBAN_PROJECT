import { Request, Response } from "express";
import UserService from "../services/UserService";
import bcrypt from 'bcrypt';

const userService = new UserService();
class UserController {
  register = async (req: Request, res: Response) => {
    try {
      const {username, email, password} = req.body;
      const user = await userService.createUser({username, email, password});
      if (!user) {
        res.status(400).json({
          message: "fail to register",
        });
      }
      res.status(200).json({
        message: "success",
        user,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const isChecked = await userService.checkByEmailAndPass({email, password});
        if (!isChecked) {
             res.status(400).json({
                message: "fail to login",
              });
        }
          res.status(200).json({
            message: "login successfully",
          });
    } catch (error: any) {
         res.status(500).json({
            message: error.message,
          });
    }
  }
}
export default UserController;
