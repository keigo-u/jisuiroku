import { useQuery } from "@tanstack/react-query";
import * as api from "../api/BookAPI";

const useBooks = () => {
    return useQuery(['books'], api.getBooks);
}

export {
    useBooks
}