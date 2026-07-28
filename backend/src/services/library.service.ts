import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all books
export const getAllBooks = async () => {
    return await prisma.library_books.findMany({
        orderBy: {
            book_title: "asc"
        }
    });
};

// Get book by ID
export const getBookById = async (id: number) => {
    return await prisma.library_books.findUnique({
        where: {
            book_id: id
        }
    });
};

// Add new book
export const createBook = async (data: any) => {
    return await prisma.library_books.create({
        data
    });
};

// Update book
export const updateBook = async (
    id: number,
    data: any
) => {
    return await prisma.library_books.update({
        where: {
            book_id: id
        },
        data
    });
};

// Delete book
export const deleteBook = async (id: number) => {
    return await prisma.library_books.delete({
        where: {
            book_id: id
        }
    });
};