import { error } from "console";
import jwt from "jsonwebtoken";
import UserRepository from "../usuario/UserRepository.js";
import bcrypt from "bcryptjs";
import appConfig from "../config/app.js";

class AuthService {
  constructor() {
    this.secret = appConfig.jwt.secret;
    this.expiresIn = appConfig.jwt.expiresIn;
  }
  generateToken(user) {
    const payload = { id: user.id, username: user.username };
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.secret);
    } catch {
      return { valid: false, message: error.message };
    }
  }

  async login(userData) {
    const { username, password } = userData;
    const user = await UserRepository.findByUserName(username);
    if (!user) throw new Error("Usuário não encontrado");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Senha inválida");

    const token = this.generateToken({ id: user.id, username: user.username });

    return { token, user: { id: user.id, username: user.username } };
  }
}

export default new AuthService();
