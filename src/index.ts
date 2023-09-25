import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import BookRoutes from "./app/books/routes";
import { requestLogger, errorlogger, corsLogger } from "./app/utils/logger";
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());


app.use(requestLogger);
app.use(errorlogger);
app.use(corsLogger);
app.use("/api", BookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})