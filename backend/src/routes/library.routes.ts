import express from "express";

import {
    getBooks,
    getOneBook,
    addBook,
    editBook,
    removeBook
} from "../controllers/library.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

// Get all books
router.get(
    "/",
    authenticate,
    authorize("ADMIN", "FACULTY", "STUDENT"),
    getBooks
);

// Get one book
router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "FACULTY", "STUDENT"),
    getOneBook
);

// Add book
router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    addBook
);

// Update book
router.put(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    editBook
);

// Delete book
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    removeBook
);

export default router;