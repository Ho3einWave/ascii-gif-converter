"use server";

import { auth } from "@/auth";
import httpClient from "../httpClient";
import { isAxiosError } from "axios";
type GetUserArtsError = {
    success: false;
    message: string;
};

type GetUserArtsSuccess = {
    success: true;
    message: string;
    id: string;
};

type GetUserArtsResponse = GetUserArtsError | GetUserArtsSuccess;
export const deleteArtById = async (
    id: string
): Promise<GetUserArtsResponse> => {
    const session = await auth();
    if (!session) {
        return { success: false, message: "Unauthorized" };
    }

    try {
        const res = await httpClient.post<GetUserArtsResponse>(
            "/v1/ascii-art/delete-ascii-art",
            {
                email: session.user.email,
                id,
            }
        );

        return res.data;
    } catch (error) {
        if (isAxiosError(error)) {
            return {
                success: false,
                message:
                    error.response?.data.message ?? "Something wen't wrong",
            };
        }
        return { success: false, message: "Something wen't wrong" };
    }
};
