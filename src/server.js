import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import http from 'http'; // necessário
import sequelize from './database/database.js';
import AuthRoutes from './routes/AuthRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
import CommunityRoutes from './routes/CommunityRoutes.js';
import logger from './shared/logger.js';
import appConfig from './config/app.js';
import initializeSocket from './infra/socket.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/v1', AuthRoutes);
app.use('/api/v1', UserRoutes);
app.use('/api/v1', CommunityRoutes);

app.get("/", (req, res) => res.send("API rodando!"));

// Conexão com banco
sequelize.authenticate()
    .then(() => logger.info("Banco conectado com sucesso!"))
    .catch(err => logger.error(`Erro ao conectar ao banco: ${err.message}`));

//servidor HTTP com Express
const server = http.createServer(app);

//inicializa o socket
initializeSocket(server);

const PORT = appConfig.port || 3000;
server.listen(PORT, '0.0.0.0', () => {
  logger.info(`Servidor rodando na porta ${PORT} 🚀`);
});
