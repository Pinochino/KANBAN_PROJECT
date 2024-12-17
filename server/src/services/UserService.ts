import { BadRequestError } from "../exceptions/exceptions";
import UserModel from "../models/UserModel";
import { EncodedPassowrd } from "../utils/EncodedPassword";

class UserService {
    
  async createUser(data: {username: string, email: string, password: string}) {
    try {
        const encodePassword = await EncodedPassowrd(data.password);
      const user = await UserModel.create({ ...data, password: encodePassword });
      return user;
    } catch (error: any) {
      throw new BadRequestError({ message: `Error: ${error.message}` });
    }
  }

  async checkByEmailAndPass(data: {email: string, password:string}): Promise<boolean> {
    try {
      const user = await UserModel.findOne({ email: data.email }).exec();
      if (!user) {
        throw new Error("User have not been created");
      }

      if (user.password !== data.password) {
        return false;
      }

      return true;
    } catch (error: any) {
      throw new BadRequestError({ message: `Error: ${error.message}` });
    }
  }
}

export default UserService;
