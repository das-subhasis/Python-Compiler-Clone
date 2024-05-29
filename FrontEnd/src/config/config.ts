import axios, { Axios } from "axios";

export const client: Axios = axios.create(
    {
        baseURL: 'http://127.0.0.1:3000'
    }
);