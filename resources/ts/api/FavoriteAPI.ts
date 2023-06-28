import axios from "axios";
import { Book } from "../types/Book";

const getFavorites = async () => {
    const { data } = await axios.get<Book[]>("/api/favorites");
    return data['data'];
}

const favorite = async (id: number) => {
    const { data } = await axios.post("api/favorites", {book_id: id})
    return data
}

const unFavorite = async (id: number) => {
    const { data } = await axios.delete(`api/favorites/${id}`)
}

export {
    getFavorites,
    favorite,
    unFavorite
}