import express from "express";
import { BookController } from "../controller/book.controller";
import { BookMiddleware } from "../utils/bookMiddleware";

const bookController =  new BookController();
const bookMiddleware = new BookMiddleware();
const router = express.Router();


router.get("/", bookController.getBooks);
router.get("/:id", bookController.getBookById);
router.post("/", bookController.createBook, bookMiddleware.createBook);
router.put("/:id",bookController.updateBook);
router.delete("/:id", bookMiddleware.updateBook, bookController.deleteBook);

export default router;