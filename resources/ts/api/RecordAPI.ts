import axios from "axios";
import { Record } from "../types/Record";

const getRecords = async (id: number, page: number) => {
    console.log(`/api/books/${id}?page=${page}`)
    const { data }  = await axios.get<Record[]>(`/api/books/${id}?page=${page}`);
    return data['data'][0] as Record
}

const createRecord = async (input) => {
    const recordJson = input.get('record')
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