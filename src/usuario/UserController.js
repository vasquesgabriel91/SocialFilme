import UserUseCase from "./UserUseCase.js";
import Singleton from "../shared/singleton.js";
import e from "express";

class UserController {
  async createUser(req, res) {
    try {
      const userData = req.body;

      const createUser = await UserUseCase.execute(userData);

      return res.status(201).json({
        message: "Usuário criado com sucesso",
        user: createUser.username,
        email: createUser.email,
        token: createUser.token,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getUserById(req, res) {
    const idParam = req.params.id;
    const userId = req.user.id;
    try {
      const getUserById = await UserUseCase.getUserById(userId, idParam);
      return res.status(200).json(getUserById);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const userId = req.user.id;
      const idParam = req.params.id;
      const userData = req.body;
      const updatedUser = await UserUseCase.updateUser(
        userId,
        idParam,
        userData
      );

      return res.status(200).json({
        message: "Usuário atualizado com sucesso",
        user: updatedUser,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async followUser(req, res) {
    const userId = req.user.id;
    const usernameToFollow = req.params.username;
    
    try {
      const followResult = await UserUseCase.followUser(userId, usernameToFollow);
      return res.status(200).json({
        follow: followResult,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
export default new UserController();
