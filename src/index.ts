import express from "express";
import bodyParser from "body-parser";
import bookRouter from "./routes/bookRoutes";
import logger from "./utils/logger";

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.use("/books", bookRouter);

app.listen(port, () => {
    logger.info(`Server is running on the port ${port}`);
})