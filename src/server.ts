import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/links", async (req, res) => {
  try {
    const result = await prisma.link.findMany({});
    res.status(200).json(result);
  } catch (e) {
    res.status(500).send({ type: e.constructor.name, message: e.toString() });
  }
});

const { SERVER_PORT } = process.env;
app.listen(SERVER_PORT, () => {
  console.log(`Links API listening on :${SERVER_PORT}`);
});
