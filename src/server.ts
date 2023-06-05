import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import prisma from "./prisma-client.js";

import menusRouter from './menus.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/menu", menusRouter);

app.get("/", async (req, res) => {
  res.send("Welcome to the Menu planner API!");
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`MenuPlannerAPI server listening on : ${process.env.SERVER_PORT}`);
});

/*app.get("/menus", async (req, res) => {
  try {
    const result = await prisma.menu.findMany({});
    res.status(200).json({ menus: result, ok: true });
  } catch (e) {
    res.status(500).json({
      type: e.constructor.name,
      message: e.toString(),
    });
  }
});*/

app.get("/platos", async (req, res) => {
  try {
    const result = await prisma.plato.findMany({});
    res.status(200).json({ platos: result, ok: true });
  } catch (e) {
    res.status(500).json({
      type: e.constructor.name,
      message: e.toString(),
    });
  }
});

app.get("/menus/id/platos", async (req, res) => {
  try {
    const result = await prisma.plato.findMany({});
    res.status(200).json({ platos: result, ok: true });
  } catch (e) {
    res.status(500).json({
      type: e.constructor.name,
      message: e.toString(),
    });
  }
});