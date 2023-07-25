import axios from "axios";
import { Record } from "../types/Record";

const getRecords = async (id: number, page: number) => {
    const { data }  = await axios.get(`/api/books/${id}?page=${page}`);
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
      const url = `/api/books/${recordObj.book_id}`
    const { data } = await axios.post(url, input, config)
    return data
}

const updateRecord = async (input) => {
    const recordJson = input.get('record')
    const recordObj = JSON.parse(recordJson)
    const config = {
        method: 'patch',
        headers: {
          'content-type': 'multipart/form-data'
        }
    };
    const url = `/api/books/${recordObj.book_id}/${recordObj.id}` + '?_method=PATCH'
    console.log('input', input);
    console.log('url:',url)
    const { data } = await axios.post(url, input, config)
    return data
}

export {
    getRecords,
    createRecord,
    updateRecord
}