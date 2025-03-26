import { User } from "next-auth";
import httpClient from "../httpClient";

export const createUser = async (user: User) => {
    await httpClient.post("/v1/ascii-art/create-user", {
        email: user.email,
        name: user.name,
        image: user.image,
        username: user.username,
    });
};
