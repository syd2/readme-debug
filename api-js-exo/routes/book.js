const express = require("express")
const auth = require("../middleware/auth")
const bookCtr = require("../controllers/book")

const router = express.Router()

router.post("/add", auth.isUserAdmin, bookCtr.addBook)

router.patch("/", auth.isUserAdmin, bookCtr.modifyBook)

router.delete("/", auth.isUserAdmin, bookCtr.deleteBook)

router.get("/", bookCtr.getBooks)

router.get("/book/:id", bookCtr.getBook)

router.get("/category/:name", bookCtr.getBookWithCategory)

router.get("/search/:name", bookCtr.searchBook)

router.post("/bookinator", bookCtr.bookinator)

module.exports = router
