import UserRepository from "./UserRepository.js";
import Singleton from "../shared/singleton.js";
import AuthService from "../auth/AuthService.js";
import validatePassword from "../helpers/passwordValidator.js";
import bcrypt from "bcryptjs";

class UserService extends Singleton {
  constructor() {
    super(UserService);
  }

  async isPasswordValid(password) {
    return validatePassword(password);
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  async validateUsernameUnique(username) {
    const existingUserName = await UserRepository.findByUserName(username);
    if (existingUserName) throw new Error("Username já existe");
  }

  async validateEmailUnique(email) {
    const existingEmail = await UserRepository.findByEmail(email);
    if (existingEmail) throw new Error("Email já existe");
  }

  async userCreate(userData) {
    const { username, email, password } = userData;
    await this.validateEmailUnique(email);
    await this.validateUsernameUnique(username);
    await this.isPasswordValid(password);

    const hashedPassword = await this.hashPassword(password);

    const createUser = await UserRepository.create({
      ...userData,
      password: hashedPassword,
    });

    const token = AuthService.generateToken({
      id: createUser.id,
      username: createUser.username,
    });

    const output = {
      id: createUser.id,
      username: createUser.username,
      email: createUser.email,
      token,
    };

    return output;
  }
  async getUserById(userId) {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error("Usuário não encontrado");
    return user;
  }
}
export default new UserService();
