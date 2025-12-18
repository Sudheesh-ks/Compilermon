import express from "express";
import cors from "cors";
import compilerRoutes from "./routes/compilerRoutes";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is working.....");
});

app.use("/api", compilerRoutes);

app.listen(PORT, () => {
  console.log(`Server connected successfully on ${PORT}`);
});
