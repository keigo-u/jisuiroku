import React from "react";
import axios from "axios";
import { Contact } from "../types/Contact";

const postContact = async (params: Contact) => {
    const { data } = await axios.post("/api/contacts", params)
    return data
}

export {
    postContact
}