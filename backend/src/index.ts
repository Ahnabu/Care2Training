import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    service: "caretraining-backend",
    time: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});
