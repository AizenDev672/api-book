import { Book } from "../model/book.model";

export class BookService {
    books: Book[] = [];


    getAllBooks(){
        return this.books;
    }

    getBookById(id: number){
        return this.books.find((book) => book.id === id);
    }

    createBook(newBook: Book){
        this.books.push(newBook);
        return newBook;
    }

    updateBook(id: number, updatedBook: Book){
        const index = this.books.findIndex((book) => book.id === id);
        if(index !== -1){
            this.books[index] = updatedBook;
            return updatedBook;
        }

        return undefined;
    }

    deleteBook(id: number){
        const initialLength = this.books.length;
        this.books = this.books.filter((book) => book.id !== id);
        return initialLength !== this.books.length;
    }
}