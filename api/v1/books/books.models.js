const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    book_id: {
        type: String,
        required: [true, "Book id is required"],
    },
    title: {
        type: String,
        required: [true, "Book title is required"],
    },
    author: {
        type: String,
        required: [true, "Author name is required"],
    },
    genre: {
        type: String,
        required: [true, "genre of book is required"],
    },
    summary: {
        type: String,
        required: [true, "summary of book is required"],
    },
    publication_date: {
        type: Date,
        required: [true, "Publication date of book is required"],
    },
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
