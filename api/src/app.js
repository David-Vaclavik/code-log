import "dotenv/config";
import express from "express";
import cors from "cors";
import postsRoutes from "./routes/posts.js";
import seedRoutes from "./routes/seed.js";

const app = express();

//! Allow CORS for specific origins (e.g., your frontend applications)
app.use(
  cors({
    origin: ["http://localhost:3001", "http://localhost:3002"],
  })
);

app.use(express.json());
app.use("/posts", postsRoutes);

if (process.env.NODE_ENV !== "production") {
  app.use("/seed", seedRoutes);
}

app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;
