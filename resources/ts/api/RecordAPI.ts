import axios from "axios";
import { Record } from "../types/Record";

const getRecords = async (id: number) => {
    const { data }  = await axios.get<Record[]>(`/api/books/${id}`);
    return data
}

export {
    getRecords
}