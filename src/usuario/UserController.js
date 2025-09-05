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

  async getUser(req, res) {
    const userId = req.user.id;
    try {
      const getUser = await UserUseCase.getUserById(userId);
      return res.status(200).json(getUser);
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
}
export default new UserController();
