import redis from "../config/redis.js";
import logger from "../shared/logger.js";

class redisSubscriber {
  async setupRedisSubscriber(io, onlineUsers) {
    const subscriber = new redis.constructor();

    subscriber.subscribe("user:notifications", (err, count) => {
      if (err)
        logger.error("Erro ao se inscrever no canal Redis:", err.message);
      else {
        logger.info("Inscrito no canal user:notifications");
        console.log("Inscrito no canal user:notifications");
      }
    });

    subscriber.on("message", (channel, message) => {
      const data = JSON.parse(message);
      const { userToFollowId } = data;

      if (onlineUsers.has(userToFollowId)) {
        onlineUsers.get(userToFollowId).forEach((socketId) => {
          io.to(socketId).emit("new_follower", data);
          logger.info(`Notificação enviada para o usuário ${userToFollowId}`);
        });
      }
    });
  }
}
export default redisSubscriber;
