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

export const createArt = async (
    art: SubmitArtProps
): Promise<{ status: boolean; message: string; id?: string }> => {
    try {
        const response = await httpClient.post(
            "/v1/ascii-art/create-ascii-art",
            art
        );
        return {
            status: response.data.status,
            message: response.data.message,
            id: response.data.id,
        };
    } catch (error) {
        if (error instanceof Error) {
            return { status: false, message: error.message };
        }
        return { status: false, message: "Unknown error" };
    }
};
