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
}
export default new UserController();