import AuthService from "./AuthService.js";

class AuthUseCase {
  async execute({ userData }) {
    try {
      const result = await AuthService.login(userData);
      return result;
    } catch (error) {
      throw new Error(`Erro na autenticação: ${error.message}`);
    }
  }
  async logout(userId) {
    try {
      await AuthService.logout(userId);
      return { message: "Logout realizado com sucesso" };
    } catch (error) {
      throw new Error(`Erro ao fazer logout: ${error.message}`);
    }
  }
}
export default new AuthUseCase();
