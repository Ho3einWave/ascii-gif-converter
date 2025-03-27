import httpClient from "../httpClient";

export type GetCommunityArtsParams = {
    limit: number | null;
    offset: number | null;
    sort: string | null;
    sortBy: string | null;
    search: string | null;
    tags: string[] | null;
    creator_email: string | null;
};

export interface CommunityArt {
    id: string;
    title: string;
    tags: string[];
    previewFrame: string;
    metadata: Metadata;
    createdAt: Date;
    likesCount: number;
    creatorName: string;
    creatorImage: string;
}

export interface Metadata {
    fps: number;
    width: number;
    height: number;
    asciiChars: string;
    invert: boolean;
}

export type GetCommunityArtsResponse = {
    data: CommunityArt[];
    totalCount: number;
    totalPages: number;
    success: boolean;
};

export const getCommunityArts = async (
    queryParams: GetCommunityArtsParams
): Promise<GetCommunityArtsResponse> => {
    const res = await httpClient.get<GetCommunityArtsResponse>(
        "/v1/ascii-art/get-ascii-art",
        {
            params: queryParams,
        }
    );
    return res.data;
};
