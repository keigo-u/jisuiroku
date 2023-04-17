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

export {
    getBooks,
    createBook
}