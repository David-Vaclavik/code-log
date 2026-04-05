import express from "express";
import cors from "cors";

const app = express();

//! Allow CORS for specific origins (e.g., your frontend applications)
app.use(
  cors({
    origin: ["http://localhost:3001", "http://localhost:3002"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;
