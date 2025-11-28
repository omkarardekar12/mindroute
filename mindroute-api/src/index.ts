import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`MindRoute Server is Listening to PORT: ${PORT}`);
});
