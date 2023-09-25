import express from "express";
import { Request, Response } from "express-serve-static-core";
import { BookController } from "../controllers";
import { validateBookCreation } from "../../utils/validator";

const router = express.Router();
const bookController =  new BookController();

router.get("/books", (req, res) => {
    bookController.getAllBooks(req, res);
})

router.get("/books/:id", (req, res) => {
    bookController.getBookById(req, res);
})

router.post("/books", validateBookCreation, (req: Request, res: Response) => {
    bookController.createBook(req, res);
})

router.put("/books/:id", validateBookCreation, (req: Request, res: Response) => {
    bookController.updateBook(req,res);
})

router.delete("/books/:id", (req, res) => {
    bookController.deleteBook(req, res);
})

export default router;