import { error } from "console";
import jwt from "jsonwebtoken";
import UserRepository from "../usuario/UserRepository.js";
import bcrypt from "bcryptjs";
import appConfig from "../config/app.js";
import redisClient from "../config/redis.js";

class AuthService {
  constructor() {
    this.secret = appConfig.jwt.secret;
    this.expiresIn = appConfig.jwt.expiresIn;
    this.refreshSecret = appConfig.jwt.refreshSecret;
    this.refreshExpiresIn = appConfig.jwt.refreshExpiresIn;
  }
  generateToken(user) {
    const payload = { id: user.id, username: user.username };
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  refreshSecretIn(user) {
    const payload = { id: user.id, username: user.username };
    return jwt.sign(payload, this.refreshSecret, {
      expiresIn: this.refreshExpiresIn,
    });
  }

  async saveRefreshToken(userId, refreshToken) {
    return await redisClient.set( `refreshToken:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60 );
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
    
    const refreshToken = this.refreshSecretIn({
      id: user.id,
      username: user.username,
    });
    await this.saveRefreshToken(user.id, refreshToken);

    return {
      token,
      refreshToken,
      user: { id: user.id, username: user.username },
    };
  }
  async refreshToken(oldRefreshToken) {
    try {
      const decoded = jwt.verify(oldRefreshToken, this.refreshSecret);
      const storedRefreshToken = await redisClient.get(
        `refreshToken:${decoded.id}`
      );

      if (storedRefreshToken !== oldRefreshToken) {
        throw new Error("Token de atualização inválido");
      }

      const newToken = this.generateToken({
        id: decoded.id,
        username: decoded.username,
      });
      return { token: newToken };
    } catch (error) {
      throw new Error("Token de atualização inválido");
    }
  }
  async logout(userId) {
    await redisClient.del(`refreshToken:${userId}`);
  }
}

export default new AuthService();
