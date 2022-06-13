import express, { json } from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import router from "./routers/index.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(json());
app.use(router);

const port = process.env.PORT || 4000;
app.listen(port, console.log(chalk.bold.blue(` Servidor rodando na porta ${port}`)));