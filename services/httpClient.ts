import axios from "axios";

const httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ART_API_KEY,
    },
});

export default httpClient;
