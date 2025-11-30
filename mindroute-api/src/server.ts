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
  res.send(`
    <html>
      <body style="font-family: Arial; background-color: #111; color: #fff; text-align: center; padding-top: 50px;">
        <h1>Welcome to MindRoute API</h1>
        <p>Click below to visit the MindRoute App</p>
        <a 
          href="https://mindroute.vercel.app" 
          target="_blank"
          style="color: #00E0FF; font-size: 20px; text-decoration: none;"
        >
          Go to MindRoute &rarr;
        </a>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`MindRoute Server is Listening to PORT: ${PORT}`);
});
