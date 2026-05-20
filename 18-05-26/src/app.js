import express from "express";
import { BebidasRoutes } from "./routes/BebidasRoutes.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from 'cors'

const app = express();

app.use(express.json());

app.use(cors())

app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "API está funcionando"
    });
});

app.use("/bebidas", BebidasRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

export { app };