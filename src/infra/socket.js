import { Server } from "socket.io";
import logger from "../shared/logger.js";

export default function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // mapa de usuários online
  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    logger.info("Novo cliente conectado ao WebSocket");

    socket.on("register", (userId) => {
      socket.userId = userId;

      if (!onlineUsers.has(userId)) onlineUsers.set(userId, []);
      onlineUsers.get(userId).push(socket.id);
      logger.info(`Usuário registrado no socket: ${userId}`);
    });

    socket.on("disconnect", () => {
      if (socket.userId && onlineUsers.has(socket.userId)) {
        const sockets = onlineUsers
          .get(socket.userId)
          .filter((id) => id !== socket.id);
        if (sockets.length > 0) onlineUsers.set(socket.userId, sockets);
        else onlineUsers.delete(socket.userId);
      }
      logger.info("Cliente desconectado:", socket.id);
    });
  });

  return {io, onlineUsers};
}
