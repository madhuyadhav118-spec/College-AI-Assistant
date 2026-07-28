import { Request, Response } from "express";

import {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} from "../services/library.service";

// Get all books
export const getBooks = async (req: Request, res: Response) => {
    try {

        const books = await getAllBooks();

        res.status(200).json(books);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch books"
        });
    }
};

// Get book by ID
export const getOneBook = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const book = await getBookById(id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json(book);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Add new book
export const addBook = async (req: Request, res: Response) => {
    try {

        const book = await createBook(req.body);

        res.status(201).json({
            message: "Book added successfully",
            book
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to add book",
            error: error instanceof Error ? error.message : error
        });
    }
};

// Update book
export const editBook = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const book = await updateBook(id, req.body);

        res.status(200).json({
            message: "Book updated successfully",
            book
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update book"
        });
    }
};

// Delete book
export const removeBook = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        await deleteBook(id);

        res.status(200).json({
            message: "Book deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete book"
        });
    }
};