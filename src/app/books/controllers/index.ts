import { Request, Response } from "express";
import { Book } from "../model";
import { BookService } from "../services";

export class BookController {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    async getAllBooks(req: Request, res: Response) {
        try {
            const books = await this.bookService.getAllBooks();
            res.json(books);

        } catch (error) {
            res.status(500).json({ message: "Error in obtaining books" });
        }
    }

    async getBookById(req: Request, res: Response) {
        const bookId = req.params.id;
        try {
            const book = await this.bookService.getBookById(bookId);
            if (book) {
                res.json(book);
            } else {
                res.status(404).json({ message: "Not found book" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error getting the book" })
        }
    }

    async createBook(req: Request, res: Response) {
        const newBook: Book = req.body;
        try {
            const createdBook = await this.bookService.createBook(newBook);
            res.status(201).json({ message: "Successfully created book", book: createdBook });

        } catch (error) {
            res.status(500).json({ message: "Error creating the book" });
        }
    }

    async updateBook(req: Request, res: Response) {
        const bookId = req.params.id;
        const updatedBook: Book = req.body;
        try {
            await this.bookService.updateBook(bookId, updatedBook);
            res.json({ message: "Book successfully updated" });
        } catch (error) {
            res.status(500).json({ message: "Error updating the book" });
        }
    }

    async deleteBook(req: Request, res: Response) {
        const bookId = req.params.id;
        try {
            await this.bookService.deleteBook(bookId);
            res.json({ message: "Book successfully deleted" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting the book" });
        }
    }
}