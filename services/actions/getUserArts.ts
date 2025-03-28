"use server";

import { auth } from "@/auth";
import httpClient from "../httpClient";
import { ASCIIArtPreview } from "@/types/ascii-art";

type GetUserArtsError = {
    success: false;
    message: string;
};

type GetUserArtsSuccess = {
    success: true;
    data: ASCIIArtPreview[];
};

type GetUserArtsResponse = GetUserArtsError | GetUserArtsSuccess;

export const getUserArts = async (): Promise<GetUserArtsResponse> => {
    const session = await auth();
    if (!session) {
        return {
            success: false,
            message: "Unauthorized",
        };
    }

    try {
        const res = await httpClient.get<GetUserArtsResponse>(
            "/v1/ascii-art/get-user-arts",
            {
                params: {
                    email: session.user.email,
                },
            }
        );

        if (res.data.success) {
            console.log(JSON.stringify(res.data.data));
            return { success: true, data: res.data.data };
        } else {
            return { success: false, message: res.data.message };
        }
    } catch (error) {
        return { success: false, message: "Something wen't wrong" };
    }
};
