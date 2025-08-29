import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import sequelize from './database/database.js';
import AuthRoutes from './routes/AuthRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
import logger from './shared/logger.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/v1', AuthRoutes);
app.use('/api/v1', UserRoutes);

app.get("/", (req, res) => res.send("API rodando!"));

// Conexão com banco
sequelize.authenticate()
    .then(() => logger.info("Banco conectado com sucesso!"))
    .catch(err => logger.error(`Erro ao conectar ao banco: ${err.message}`));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Servidor rodando na porta ${PORT}`));
