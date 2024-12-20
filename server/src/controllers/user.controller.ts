import { Request, Response } from "express";
import UserService from "../services/user.service";
import { getAccessToken } from "../utils/getAccessToken";
import UserModel from "../models/UserModel";
import { EncodedPassowrd } from "../utils/EncodedPassword";
import { generatorRandomText } from "../utils/generatorRandomText";
import { ObjectId } from "mongodb";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  register = async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      const newUser = await this.userService.createUser({
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
      const isChecked: any = await this.userService.checkByEmailAndPass({
        email,
        password,
      });

      if (!isChecked.checked) {
        res.status(400).json({
          message:
            "Tài khoản đăng nhập không đúng. Vui lòng kiểm tra lại password hoặc email",
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

  loginWithGoogle = async (req: Request, res: Response) => {
    const body = req.body;
    const { email, name } = body;
    try {
      const user: any = await UserModel.findOne({ email });
      if (user) {
        const token = await getAccessToken({
          _id: user._id,
          email: user.email,
          rule: user.rule ?? 1,
        });

        const userData = {
          username: user.username,
          email: user.email,
          token
        }
        res.status(200).json({
          message: "Login successfully",
          data: {
            ...userData,
          },
        });
        return;
      }

      const encodePassword = await EncodedPassowrd(generatorRandomText(6));
      body.password = encodePassword;
      const newUser: any = new UserModel(body);
      await newUser.save();
      res.status(201).json({
        message: "User created successfully",
        data: newUser,
      });
      return;
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  refreshToken = async (req: Request, res: Response) => {
    const id = req.query.id as string;
    if (!id) {
       res.status(400).json({
          message: 'User ID is required',
      });
      return;
  }

    try {
      const user = await UserModel.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      const token = await getAccessToken({
        _id: new ObjectId(id),
        email: String(user?.email),
        rule: Number(user?.rule)
      })

      res.status(200).json({
        message: 'fuuf',
        data: token,
      })
    } catch (error: any) {
      res.status(404).json({
        message: error.message
      })
    }
  }
}
export default UserController;
