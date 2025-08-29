import UserService from "./UserService.js";

class UserUseCase {
    async execute(userData) {
        try {
            const result = await UserService.userCreate(userData);
            return result;
        } catch (error) {
            throw new Error(`Erro ao criar usuário: ${error.message}`);
        }
    };
    async getUserById(userId) {
        try {
            const result = await UserService.getUserById(userId);
            return result;
        } catch (error) {
            throw new Error(`Erro ao buscar usuário: ${error.message}`);
        }
 
    }
}

export default new UserUseCase();