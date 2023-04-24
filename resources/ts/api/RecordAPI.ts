import axios from "axios";
import { Record } from "../types/Record";

const getRecords = async (id: number) => {
    const { data }  = await axios.get<Record[]>(`/api/books/${id}`);
    return data
}

const createRecord = async (input) => {
    const recordJson = input.get('record') as string
    const recordObj = JSON.parse(recordJson)
    const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
    const { data } = await axios.post(`api/books/${recordObj.book_id}`, input, config)
    return data
}

export {
    getRecords,
    createRecord
}