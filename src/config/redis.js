import Redis from "ioredis";
import logger from "../shared/logger.js";

const redis = new Redis({
  host: process.env.REDIS_HOST || "redis",
  port: process.env.REDIS_PORT || 6379,
});

redis.on("connect", () => {
  console.log("Conectado ao Redis");
  logger.info("Conectado ao Redis");
});

redis.on("close", () => {
  console.log("Conexão fechada");
  logger.warn('[Redis] Conexão fechada');
});

export default redis;