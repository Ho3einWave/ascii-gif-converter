"use server";

import { auth } from "@/auth";
import httpClient from "../httpClient";
import { isAxiosError } from "axios";

type LikeArtResponse = {
    success: boolean;
    message?: string;
};

export const likeArt = async (artId: string) => {
    const session = await auth();
    if (!session) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        const response = await httpClient.post<LikeArtResponse>(
            "/v1/ascii-art/like-ascii-art",
            {
                id: artId,
                email: session.user.email,
            }
        );

        if (!response.data.success) {
            return { success: false, message: response.data.message };
        }

        return { success: true, message: "Art liked successfully" };
    } catch (error) {
        if (isAxiosError(error)) {
            return { success: false, message: error.response?.data.message };
        }
        return { success: false, message: "Failed to like art" };
    }
};
