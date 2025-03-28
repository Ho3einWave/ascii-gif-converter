import { ASCIIArt } from "@/types/ascii-art";
import httpClient from "../httpClient";

export type GetArtByIdSuccessResponse = {
    success: true;
    data: ASCIIArt;
};

export type GetArtByIdErrorResponse = {
    success: false;
    message: string;
};

export type GetArtByIdResponse =
    | GetArtByIdSuccessResponse
    | GetArtByIdErrorResponse;

export const getArtById = async (id: string): Promise<GetArtByIdResponse> => {
    try {
        const res = await httpClient.get<GetArtByIdResponse>(
            `/v1/ascii-art/get-ascii-art/${id}`
        );
        return res.data;
    } catch (error) {
        return { success: false, message: "Failed to get art by id" };
    }
};
