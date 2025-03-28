export interface ASCIIArtPreview {
    metadata: Metadata;
    previewFrame: string;
    id: string;
    title: string;
    tags: string[];
    likesCount: number;
    creator: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Metadata {
    fps: number;
    width: number;
    height: number;
    asciiChars: string;
    invert: boolean;
}

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
