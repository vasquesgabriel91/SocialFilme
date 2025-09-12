import UserModel from "./UserModel.js";
import Singleton from "../shared/singleton.js";
import FollowersModel from "../followers/FollowersModel.js";

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

  async getIdByUserName(usernameToFollow) {
    const id = await UserModel.findOne({
      where: { username: usernameToFollow },
      attributes: ["id"],
    });
    return id;
  }

  async followUser(userId, userToFollowId) {
    console.log(userId, userToFollowId);
    const followingUser = await FollowersModel.create({
      followerId: userId,
      followingId: userToFollowId,
    });
    return followingUser;
  }
}

export default new UserRepository();
