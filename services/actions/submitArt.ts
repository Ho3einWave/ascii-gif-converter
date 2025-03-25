"use server";

import { auth } from "@/auth";

export type SubmitArtProps = {
    title: string;
    description: string;
    tags: string[];
    asciiFrame: string[];
    metadata: {
        fps: number;
        width: number;
        height: number;
        asciiChars: string;
        invert: boolean;
        createdAt: string;
    };
};

type SubmitArtSuccess = {
    success: true;
    message: string;
    data: {
        id: string;
    };
};

type SubmitArtError = {
    success: false;
    message: string;
};

export type SubmitArtResult = SubmitArtSuccess | SubmitArtError;

export async function submitArt({
    title,
    description,
    tags,
    asciiFrame,
    metadata,
}: SubmitArtProps) {
    const session = await auth();
    if (!session) {
        return {
            success: false,
            message: "You must be logged in to submit art",
        } satisfies SubmitArtError;
    }

    return {
        success: true,
        message: "Art submitted successfully",
        data: {
            id: "123",
        },
    } satisfies SubmitArtSuccess;
}
