import httpClient from "../httpClient";

export type GetArtByIdResponse = {
    success: boolean;
    data: ASCIIArt;
};

export interface ASCIIArt {
    metadata: Metadata;
    id: string;
    title: string;
    tags: string[];
    asciiFrame: string[];
    previewFrame: string;
    likesCount: number;
    creator: string;
    createdAt: Date;
    updatedAt: Date;
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

export const getArtById = async (id: string) => {
    const res = await httpClient.get<GetArtByIdResponse>(
        `/v1/ascii-art/get-ascii-art/${id}`
    );
    return res.data;
};
