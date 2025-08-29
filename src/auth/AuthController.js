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
      logger.warn(`Erro na autenticação: ${error.message}`);
      return res.status(401).json({ error: error.message });
    }
  }
}
export default new AuthController();
