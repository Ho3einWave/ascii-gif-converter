import httpClient from "../httpClient";

type SubmitArtProps = {
    title: string;
    tags: string[];
    asciiFrame: string[];
    metadata: {
        fps: number;
        width: number;
        height: number;
        asciiChars: string;
    };
    creator_email: string;
};

type CreateArtResponse = {
    success: boolean;
    message?: string;
    id?: string;
};

export const createArt = async (
    art: SubmitArtProps
): Promise<CreateArtResponse> => {
    try {
        const response = await httpClient.post<CreateArtResponse>(
            "/v1/ascii-art/create-ascii-art",
            art
        );
        return {
            success: response.data.success,
            message: response.data.message,
            id: response.data.id,
        };
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "Unknown error" };
    }
};
