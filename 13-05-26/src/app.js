import express from "express";
import { fruitsRoutes } from "./routes/fruitsRoutes.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "API está funcionando"
    });
});

app.use("/fruits", fruitsRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

export { app };