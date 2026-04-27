import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";
import seedRoutes from "./routes/seed.js";

const app = express();

//! Allow CORS for specific origins (e.g., your frontend applications client and admin)
const origin1 = process.env.CORS_ORIGIN_1 || "http://localhost:3001";
const origin2 = process.env.CORS_ORIGIN_2 || "http://localhost:3002";

app.use(
  cors({
    origin: [origin1, origin2],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/posts", postsRoutes);

if (process.env.NODE_ENV !== "production") {
  app.use("/seed", seedRoutes);
}

app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;
