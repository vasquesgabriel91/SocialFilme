import UserRepository from "./UserRepository.js";
import Singleton from "../shared/singleton.js";
import AuthService from "../auth/AuthService.js";
import validatePassword from "../helpers/passwordValidator.js";
import bcrypt from "bcryptjs";
import appConfig from "../config/app.js";

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
    const output = {
      ...user.toJSON(),
      link: `${appConfig.baseUrl}/api/v1/update/${user.id}`,
    };
    return output;
  }

  async updateUser(userId, idParam, userData) {
    if (userId.toString() !== idParam) 
      throw new Error( "Acesso negado: ID do usuário não corresponde ao ID do token" );

    const allowedFields = ["username", "email", "bio"];
    try {
      const filteredData = Object.keys(userData)
        .filter((key) => allowedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = userData[key];
          return obj;
        }, {});

        if (Object.keys(filteredData).length === 0) throw new Error("Nenhum selecionado para atualizar");

      const updatedUser = await UserRepository.update(idParam, filteredData);

      return updatedUser;
    } catch (error) {}
  }
  async followUser( userId, usernameToFollow ) {
    const userToFollow = await UserRepository.getIdByUserName(usernameToFollow);
   
    if (!userToFollow) throw new Error("Usuário a seguir não encontrado");
    if (userToFollow === userId) throw new Error("Você não pode seguir você mesmo");

    const userToFollowId = userToFollow.id;
    try {
      const followingUser = await UserRepository.followUser(userId, userToFollowId);
      return followingUser;
    } catch (error) {
      throw new Error(`Erro ao seguir usuário: ${error.message}`);
    }
  }
}
export default new UserService();
