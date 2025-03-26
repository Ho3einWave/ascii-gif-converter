"use server";

import { auth } from "@/auth";
import { createArt } from "../api/createArt";

export type SubmitArtProps = {
    title: string;
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
    id: string;
};

type SubmitArtError = {
    success: false;
    message: string;
};

export type SubmitArtResult = SubmitArtSuccess | SubmitArtError;

export async function submitArt({
    title,
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

    const response = await createArt({
        title,
        tags,
        asciiFrame,
        metadata,
        creator_email: session.user.email,
    });

    if (!response.success) {
        return {
            success: false,
            message: response.message!,
        } satisfies SubmitArtError;
    }

    return {
        success: true,
        message: "Art submitted successfully",
        id: response.id!,
    } satisfies SubmitArtSuccess;
}
