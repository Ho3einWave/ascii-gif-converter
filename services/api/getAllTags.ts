import httpClient from "../httpClient";

export type GetAllTagsResponse = {
    data: string[];
    success: boolean;
};

export const getAllTags = async (): Promise<GetAllTagsResponse> => {
    const res = await httpClient.get<GetAllTagsResponse>(
        "/v1/ascii-art/get-all-tags"
    );
    return res.data;
};
