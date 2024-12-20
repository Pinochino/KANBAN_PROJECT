import { BadRequestError } from "../exceptions/exceptions";
import UserModel from "../models/UserModel";
import { CompareEncode, EncodedPassowrd } from "../utils/EncodedPassword";
import { generatorRandomText } from "../utils/generatorRandomText";
import { getAccessToken } from "../utils/getAccessToken";

class UserService {
  async createUser(data: {
    username: string;
    email: string;
    password: string;
  }) {
    try {
      const oldUser = await UserModel.findOne({ email: data.email });

      if (oldUser) {
        throw new Error("This account have already been existed");
      }

      const encodePassword = await EncodedPassowrd(data.password);
      const user = await UserModel.create({
        ...data,
        password: encodePassword,
      });

      return user;
    } catch (error: any) {
      throw new BadRequestError({ message: `Error: ${error.message}` });
    }
  }

  async checkByEmailAndPass(data: { email: string; password: string }) {
    try {
      const user = await UserModel.findOne({ email: data.email }).exec();
      if (!user) {
        throw new Error("Your account have not been existed");
      }
      const isEqual = await CompareEncode(data.password, String(user.password));

      if (!isEqual) {
        return false;
      }

      return {
        checked: true,
        data: user,
      };
    } catch (error: any) {
      throw new BadRequestError({ message: `Error: ${error.message}` });
    }
  }

  async loginWithGoogle(data: { email: string; username: string }) {
    try {
      const oldUser = await UserModel.findOne({ email: data.email });
      if (oldUser) {
        const { password, ...userObj } = oldUser.toObject();

        const token = await getAccessToken({
          _id: oldUser._id,
          email: String(oldUser.email),
          rule: Number(oldUser.rule) ?? 1,
        });
        return {
          user: userObj,
          token,
        };
      }

      // Nếu người dùng chưa tồn tại, tạo mới
      const encodedPassword = await EncodedPassowrd(generatorRandomText(6));
      const newUser = new UserModel({
        ...data,
        password: encodedPassword,
      });
      await newUser.save();

      const token = await getAccessToken({
        _id: newUser._id,
        email: String(newUser.email),
        rule: Number(newUser.rule) ?? 1,
      });

      return {
        user: newUser,
        token,
      };
    } catch (error: any) {
      throw new BadRequestError({ message: `Error: ${error.message}` });
    }
  }
}

export default UserService;
