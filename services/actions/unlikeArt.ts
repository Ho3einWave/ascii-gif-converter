"use server";
import { auth } from "@/auth";
import httpClient from "../httpClient";

type UnlikeArtResponse = {
    success: boolean;
    message?: string;
};

export const unlikeArt = async (artId: string): Promise<UnlikeArtResponse> => {
    const session = await auth();
    if (!session) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        const response = await httpClient.post(
            "/v1/ascii-art/unlike-ascii-art",
            {
                id: artId,
                email: session.user.email,
            }
        );
        return {
            success: response.data.success,
            message: response.data.message,
        };
    } catch (error) {
        return { success: false, message: "Failed to unlike art" };
    }
};
