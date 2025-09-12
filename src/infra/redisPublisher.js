import redis from "../config/redis.js";
import logger from "../shared/logger.js";
class RedisPublisher {
  async publishNotification(channel, payload) {

    try {
      await redis.publish(channel, JSON.stringify(payload));

        console.log(`Mensagem publicada no canal ${channel}`);
        logger.info(`Mensagem publicada no canal ${channel}`);
    } catch (error) {
        console.error(`Erro ao publicar mensagem no canal ${channel}:`, error);
        logger.error(`Erro ao publicar mensagem no canal ${channel}: ${error.message}`);
    }
    
  }
}
 export default new RedisPublisher();