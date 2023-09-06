import { Request, Response } from "express";
import { BookService } from "../service/book.service";

const bookService = new BookService();

export class BookController {

    async getBooks(req: Request, res: Response){
        try{
            const books = bookService.getAllBooks();
            res.status(200).json(books);
        }
        catch(error){
            res.status(500).json({ message: "Error getting book" });
        }
    }

    async getBookById(req: Request, res: Response){
        const id  = parseInt(req.params.id);
        try{
            const book = await bookService.getBookById(id);
            if(book){
                res.status(200).json(book);
            }else{
                res.status(404).json({ message: "Book not found" });
            }
        }
        catch(error){
            res.status(500).json({ message: "Error getting book" });
        }
    }

    async createBook(req: Request, res: Response){
        try{
            const book = req.body;
            const createdBook = await bookService.createBook(book);
            res.status(201).json(createdBook);
        }
        catch(error){
            res.status(500).json({ message: "Error creating book" });
        }
    }

    async updateBook(req: Request, res: Response){
        try{
            const id = parseInt(req.params.id);
            const book = req.body;
            const updatedBook = await bookService.updateBook(id, book);
            if(updatedBook){
                res.status(200).json(updatedBook);
            }else{
                res.status(404).json({ message: "Book not found" });
            }
        }
        catch(error){
            res.status(500).json({ message: "Error updating book" });
        }
    }

    async deleteBook(req: Request, res: Response): Promise<void>{
        try{
            const id = parseInt(req.params.id);
            await bookService.deleteBook(id);
            res.status(204).send();
        }
        catch(error){
            res.status(500).json({ message: "Error deleting book" });
        }
    }
}