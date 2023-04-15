import axios from "axios";
import { Book } from "../types/Book";

const getBooks = async () => {
    const { data } = await axios.get<Book[]>("/api/books");
    return data;
}

export {
    getBooks
}