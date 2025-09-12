import UserService from "./UserService.js";

class UserUseCase {
  async execute(userData) {
    try {
      const result = await UserService.userCreate(userData);
      return result;
    } catch (error) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }
  async getUserById(userId) {
    try {
      const result = await UserService.getUserById(userId);
      return result;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  }
  async updateUser(userId, idParam, userData) {
    try {
      const result = await UserService.updateUser(userId, idParam, userData);
      return result;
    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  }
  async followUser(userId, usernameToFollow) {
    try {
      const result = await UserService.followUser(userId, usernameToFollow);
      return result;
    } catch (error) {
      throw new Error(`Erro ao seguir usuário: ${error.message}`);
    }
  }
}

export default new UserUseCase();
