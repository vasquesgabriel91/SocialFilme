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
}
export default new AuthUseCase();