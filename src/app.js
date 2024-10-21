import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { custom_logs } from "./utils/logger.js";
import { router } from "./routes/router.js";


const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());
app.use(custom_logs);
app.use(router);


export { app };
