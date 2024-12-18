import { Request, Response } from "express";
import UserService from "../services/UserService";
import { getAccessToken } from "../utils/getAccessToken";

const userService = new UserService();
class UserController {
  register = async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      const newUser = await userService.createUser({
        username,
        email,
        password,
      });

      if (!newUser) {
        res.status(400).json({
          message: "fail to register",
        });
      }

      const userResponse: any = newUser.toObject
        ? newUser.toObject()
        : { ...newUser };
      delete userResponse.password;

      res.status(200).json({
        message: "Register successfully",
        data: {
          ...userResponse,
          token: await getAccessToken({
            _id: newUser._id,
            email: String(newUser.email),
            rule: 1,
          }),
        },
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const isChecked: any = await userService.checkByEmailAndPass({
        email,
        password,
      });

      if (!isChecked.checked) {
        res.status(400).json({
          message: "Tài khoản đăng nhập không đúng. Vui lòng kiểm tra lại password hoặc email",
        });
      }
      const user = isChecked.data;
      const userResponse: any = user.toObject ? user.toObject() : { ...user };
      delete userResponse.password;

      res.status(200).json({
        message: "Login successfully",
        data: {
          ...userResponse,
          token: await getAccessToken({
            _id: user._id,
            email: String(user.email),
            rule: user.rule ?? 1,
          }),
        },
      });
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
}
export default UserController;
