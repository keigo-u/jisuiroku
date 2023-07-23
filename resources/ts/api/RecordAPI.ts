import axios from "axios";
import { Record } from "../types/Record";

const getRecords = async (id: number, page: number) => {
    const { data }  = await axios.get(`/api/books/${id}?page=${page}`);
    console.log(data)
    return data
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