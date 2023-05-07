import axios from "axios";
import { Book } from "../types/Book";

const getBooks = async () => {
    const { data } = await axios.get<Book[]>("/api/books");
    return data;
}

const createBook = async (book: Book) => {
    book['user_id'] = 1;
    const { data } = await axios.post<Book>('api/books', book)
    return data
}

const updateBook = async (book: Book) => {
    const { data } = await axios.put<Book>(`api/books/${book.id}`, book)
    return data
}

const deleteBook = async (id: number) => {
    const { data } = await axios.delete<Book>(`api/books/${id}`)
    return data
}

export {
    getBooks,
    createBook,
    updateBook,
    deleteBook,
}