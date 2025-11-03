import logger from "../shared/logger.js";
import AuthUseCase from "./AuthUseCase.js";

class AuthController {
  async authenticate(req, res) {
    const userData = req.body;

    try {
      const result = await AuthUseCase.execute({ userData });
      logger.info("Usuário autenticado com sucesso");
      return res.status(200).json(result);
    } catch (error) {
      logger.warn(error.message);
      return res.status(401).json({ error: error.message });
    }
  }
  async logout(req, res) {
    const userId = req.user.id;
    try {
      const logout = await AuthUseCase.logout(userId);
      logger.info("Usuário deslogado com sucesso");
      return res.status(200).json(logout);
    } catch (error) {
      logger.warn(error.message);
      return res.status(400).json({ error: error.message });
    }
  }
}
export default new AuthController();
