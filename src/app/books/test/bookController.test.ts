import request from "supertest";
import app from "../routes";


describe("BookController", () => {
    it("You should get all the books", async() => {
        const response = await request(app).get("/api/books");
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
    })

    it("Must have a book for your ID", async () => {
        const bookId = "ID_DEL_LIBRO";
        const response = await request(app).get(`/api/books/${bookId}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(bookId);
    })

    it("You must a new book", async() => {
        const newBook = {
            title: "New book",
            author: "Author test",
            genre: "Test",
            numPages: 200,
            publishedDate: "2023-09-20",
            photo: "Url",
            description: "Book of test"
        };

        const response = await request(app)
        .post("/api/books")
        .send(newBook);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Successfully created book");
    })

    it("You must update an existing book", async () => {
        const bookId = "ID_DEL_LIBRO";

        const updatedBook = {
            title: "Book updated",
            author: "New author",
            genre: "Updated",
            numPages: 250,
            publishedDate: "2023-09-25",
            photo: "Updated",
            description: "Book updated"
        };

        const response = await request(app)
        .put(`/api/books/${bookId}`)
        .send(updatedBook);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Book successfully updated");
    })

    it("You must delete a book by its ID", async () => {
        const bookId = "ID_DEL_LIBRO";
        const response = await request(app).delete(`/api/books/${bookId}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Book successfully deleted");
    })
})