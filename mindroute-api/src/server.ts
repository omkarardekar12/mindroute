import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes";

dotenv.config();

const app: Application = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/todos", todoRoutes);

const PORT: number = Number(process.env.PORT) || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to MindRoute");
});

app.listen(PORT, () => {
  console.log(`MindRoute Server is Listening to PORT: ${PORT}`);
});
