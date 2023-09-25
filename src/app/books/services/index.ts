import { db } from "../../config/config";
import { Book } from "../model";

export class BookService {
    async getAllBooks(): Promise<Book[]> {
        let dataBooks: Book[] = [];
        const snapshot = await db.collection("book").get();
        snapshot.forEach((doc) => {
            dataBooks.push({
                id: doc.id,
                title: doc.data().title,
                author: doc.data().author,
                genre: doc.data().genre,
                numPages: doc.data().numPages,
                photo: doc.data().photo,
                publishedDate: doc.data().publishedDate,
                description: doc.data().description
            })
        });
        return dataBooks;
    }

    async getBookById(id: string): Promise<Book[] | undefined> {
        let queryBook: Book[] = [];
        const bookRef = db.collection("book").doc(id);
        const doc = await bookRef.get();
        if(!doc.exists){
            console.log("No such document!")
        }else{
            queryBook.push({ id: doc.id, ...doc.data() } as Book)
        }

        return queryBook;
    }

    async createBook(newBook: Book): Promise<string> {
        const docRef = await db.collection("book").add(newBook);
        return docRef.id;
    }

    async updateBook(id: string, updatedBook: Book): Promise<void> {
        const bookRef = db.collection("book").doc(id);
        await bookRef.update({ ...updatedBook });
    }

    async deleteBook(id: string): Promise<void>{
        await db.collection("book").doc(id).delete();
    }

    //     books.splice(isDeleted, 1);
    //     return true;
    // }
}