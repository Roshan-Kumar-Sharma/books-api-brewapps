const router = require("express").Router();
const crypto = require("crypto")
const isbn = require("node-isbn")
const Book = require("./books.models");
const TEST_DATA = require("../../../test_data.json")

router.get("/get_book_by_id/:book_id", async (req, res, next) => {
    let invalidISBN = true
    try {
        const { book_id } = req.params;

        if (!book_id) {
            throw new Error("Please give proper book id");
        }

        let book = await Book.findOne({ book_id }).select("-_id -__v");

        if(!book) {
            book = await isbn.resolve(book_id)
            invalidISBN = false
        }

        res.status(200).json({
            status: true,
            message: "Found the book",
            data: book
        });
    } catch (err) {
        let message = invalidISBN ? "Invalid ISBN number" : err.message
        return next(new Error(message));
    }
});

router.get("/get_books", async (req, res, next) => {
    try {
        let { title, author, genre, date_field, s_date, e_date, sort_field, sort_type, limit, offset } = req.query

        limit = parseInt(limit)
        offset = parseInt(offset)

        if (isNaN(limit) || isNaN(offset)) throw new Error("Invalid payload")

        let query = {}
        let sort = 1

        let payload = Object.assign({}, { title, author, genre })

        Object.entries(payload).forEach(([key, value]) => {
            if (value) query[key] = {
                $regex: value,
                $options: "i"
            }
        })

        console.log(s_date, e_date)

        if(date_field && ["publication_date", "createdAt", "updatedAt"].includes(date_field)) {
            if(s_date && e_date) {
                query[date_field] = {
                    $gte: s_date,
                    $lte: e_date
                }
            } else if (s_date) {
                query[date_field] = {
                    $gte: s_date
                }
            } else if (e_date) {
                query[date_field] = {
                    $lte: e_date
                }
            }
        }

        sort_field = ["title", "author", "genre", "publication_date", "createdAt", "updatedAt"].includes(sort_field) ? sort_field : "_id";

        if (sort_type === "desc") sort = { [sort_field]: -1 }
        else sort = { [sort_field]: 1 }

        console.log(query, sort)

        let books = await Book.find(query, "-_id -__v").sort(sort)

        let totalCount = books.length
        books = books.slice(offset, offset + limit)

        res.status(200).json({
            status: true,
            message: "Fetched all books",
            limit,
            offset,
            totalCount,
            data: books
        })
    } catch (err) {
        console.log(err)
        res.status(err.status || 500).json({
            status: false,
            message: err.message || "Something broke. Try again later."
        })
    }
});

router.post("/add_books", async (req, res, next) => {
    try {
        let books = req.body

        if(!Array.isArray(books)) books = [books]

        let stringFields = ["title", "author", "genre"]

        books = books.map(book => {
            Object.keys(book).forEach(field => {
                if(stringFields.includes(field)) {
                    book[field] = book[field].charAt(0).toUpperCase() + book[field].slice(1)
                } 
            })
            book.book_id = crypto.randomBytes(8).toString("hex")
            return book
        })

        const doc = await Book.insertMany(books);

        res.status(200).json({
            status: true,
            message: "Book(s) added.",
            totalCount: doc.length,
            data: doc
        });
    } catch (err) {
        return next(new Error(err.message));
    }
});

router.post("/populate_db", async (req, res, next) => {
    try {
        const formattedData = TEST_DATA.map(book => {
            book.publication_date = new Date(book.publication_date)
            book.book_id = crypto.randomBytes(8).toString("hex")
            return book
        })

        const doc = await Book.insertMany(formattedData);

        res.status(200).json({
            status: true,
            message: "Database populated",
            totalCount: doc.length,
            data: doc
        });
    } catch (err) {
        return next(new Error(err.message));
    }
})

router.put("/update_book/:book_id", async (req, res, next) => {
    try {
        const { book_id } = req.params
        const update = req.body;

        if (!book_id || (!update.title && !update.author && !update.genre)) {
            throw new Error("Invalid data");
        }

        let stringFields = ["title", "author", "genre"]
        Object.keys(update).forEach(field => {
            if(stringFields.includes(field)) {
                update[field] = update[field].charAt(0).toUpperCase() + update[field].slice(1)
            } 
        })

        console.log(update)

        const updatedDoc = await Book.findOneAndUpdate({book_id}, update, {
            new: true,
        });

        if(!updatedDoc) throw new Error("Book not found")

        res.status(200).json({
            status: true,
            message: "Book updated.",
            data: updatedDoc
        });
    } catch (err) {
        return next(new Error(err.message));
    }
});

router.delete("/delete_book/:book_id", async (req, res, next) => {
    try {
        const { book_id } = req.params;

        if (!book_id) {
            throw new Error("Please give proper book id");
        }

        const deleteAck = await Book.findOneAndDelete({book_id});

        const isDel = !!deleteAck;

        if (!isDel) {
            throw new Error("Book not found");
        }

        res.status(200).json({
            status: true,
            message: "Book deleted",
            data: deleteAck,
        });
    } catch (err) {
        return next(new Error(err.message));
    }
});

module.exports = router;
