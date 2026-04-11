import express from "express";
import { runSeed } from "../controllers/seedController.js";

const router = express.Router();

router.post("/", runSeed);

export default router;
