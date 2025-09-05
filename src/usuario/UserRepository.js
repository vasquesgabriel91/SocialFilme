import UserModel from "./UserModel.js";
import Singleton from "../shared/singleton.js";

class UserRepository extends Singleton {
  constructor() {
    super(UserRepository);
  }

  async create(userData) {
    const user = await UserModel.create(userData);
    return user;
  }

  async findByUserName(username) {
    return await UserModel.findOne({ where: { username } });
  }

  async findByEmail(email) {
    return await UserModel.findOne({ where: { email } });
  }

  async findById(id) {
    return await UserModel.findByPk(id, {
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    });
  }

  async update(id, userData) {
    await UserModel.update(userData, { where: { id } });
    return this.findById(id);
  }
}

export default new UserRepository();
