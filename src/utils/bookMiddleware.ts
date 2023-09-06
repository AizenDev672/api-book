import { Request, Response, NextFunction } from "express";
import { Book } from "../model/book.model";
import { BookService } from "../service/book.service";

const bookService = new BookService();

export class BookMiddleware {
    existingBook(req: Request, res: Response, next: NextFunction){
        const { id } = req.params;
        const book = bookService.getBookById(Number(id));
        if(book){
            req.body = book;
            next();
        }else{
            res.status(404).json({ error: "Book not found" });
        }
    }

    validationCreate(req: Request, res: Response, next: NextFunction){
        const newBook: Book = req.body;
        if(!newBook.title || !newBook.author || !newBook.description){
            res.status(400).json({ error: "Required fields are missing" });
        }else{
            next();
        }
    }

    createBook(req: Request, res: Response, next: NextFunction){
        const newBook: Book = req.body;
        const createdBook = bookService.createBook(newBook);
        res.status(201).json(createdBook);
    }

    updateBook(req: Request, res: Response, next: NextFunction){
        const { id } = req.params;
        const updatedBookData: Book = req.body;

        const existingBook = bookService.getBookById(Number(id));

        if(!existingBook){
            res.status(404).json({ error: "book not found" });
            return;
        }

        if(!updatedBookData.title || !updatedBookData.author || !updatedBookData.description){
            res.status(400).json({ error: "Incomplete book data" });
        }

        const updatedBook = bookService.updateBook(Number(id), updatedBookData);

        if(!updatedBook){
            res.status(500).json({ error: "Error updating the book" });
            return;
        }

        res.json(updatedBook);
    }
}