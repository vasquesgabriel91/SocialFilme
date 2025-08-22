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
}

export default new UserUseCase();