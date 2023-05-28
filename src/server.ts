import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import linksRouter from "./links.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/links", linksRouter);

const { SERVER_PORT } = process.env;
app.listen(SERVER_PORT, () => {
  console.log(`Links API listening on :${SERVER_PORT}`);
});
