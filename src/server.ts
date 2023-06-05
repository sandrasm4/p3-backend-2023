import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", async (req, res) => {
  res.send("Welcome to the Menu planner API!");
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`MenuPlannerAPI server listening on : ${process.env.SERVER_PORT}`);
});