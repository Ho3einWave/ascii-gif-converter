"use server";

import { auth } from "@/auth";
import httpClient from "../httpClient";
import { isAxiosError } from "axios";

type GetUserLikesResponse = {
    success: boolean;
    message?: string;
    data?: string[];
};

export const getUserLikes = async (): Promise<GetUserLikesResponse> => {
    const session = await auth();
    if (!session) {
        return { success: false, message: "Unauthorized" };
    }
    try {
        const response = await httpClient.get<GetUserLikesResponse>(
            "/v1/ascii-art/get-user-liked-ascii-art",
            {
                params: {
                    email: session.user.email,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (isAxiosError(error)) {
            return { success: false, message: error.response?.data.message };
        }
        return { success: false, message: "Failed to get user likes" };
    }
};
