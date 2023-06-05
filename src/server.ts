import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import prisma from "./prisma-client.js";

import menusRouter from './menus.js';
import platosRouter from './platos.js';
import ingredientesRouter from './ingredientes.js';
import neverasRouter from './neveras.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/menu", menusRouter);
app.use("/plato", platosRouter);
app.use("/ingrediente", ingredientesRouter);
app.use("/nevera", neverasRouter);

app.get("/", async (req, res) => {
  res.send("Welcome to the Menu planner API!");
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`MenuPlannerAPI server listening on : ${process.env.SERVER_PORT}`);
});