import { useQuery } from "@tanstack/react-query";
import * as api from "../api/RecordAPI"

const useRecords = (id: number) => {
    return useQuery(['records'], () => api.getRecords(id));
}

export {
    useRecords
}