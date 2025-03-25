import { parseGIF, decompressFrames, ParsedFrame } from "gifuct-js";

export async function processGifImage(
    file: File,
    width: number,
    height: number,
    asciiChars: string,
    invert: boolean
): Promise<string[]> {
    // Reset frames

    // Create a new image to load the GIF
    const arrayBuffer = await file.arrayBuffer();
    const gif = parseGIF(arrayBuffer);
    const decodedFrames = decompressFrames(gif, true);

    console.log("Decoded Frames: ", decodedFrames);

    const asciiFrames = decodedFrames.map((frame) =>
        imageToAscii(width, height, asciiChars, invert, frame)
    );

    return asciiFrames;
}

export function imageToAscii(
    width: number,
    height: number,
    asciiChars: string,
    invert: boolean,
    frame: ParsedFrame
): string {
    // Calculate aspect ratio
    // Calculate aspect ratio
    console.log(frame);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.width = frame.dims.width;
    canvas.height = frame.dims.height;
    const imageData = new ImageData(
        new Uint8ClampedArray(frame.patch),
        frame.dims.width,
        frame.dims.height
    );
    ctx.putImageData(imageData, 0, 0);

    const asciiCanvas = document.createElement("canvas")!;
    const asciiCtx = asciiCanvas.getContext("2d")!;

    // Ensure the ASCII always fills the space
    asciiCanvas.width = width;
    asciiCanvas.height = height;
    asciiCtx.drawImage(canvas, 0, 0, width, height);

    const pixelData = asciiCtx.getImageData(0, 0, width, height).data;
    let asciiStr = "";

    // Calculate the aspect ratio correction
    // Characters are typically taller than they are wide in monospace fonts
    const aspectCorrection = 2; // Characters are roughly twice as tall as they are wide

    for (let y = 0; y < height; y++) {
        let row = "";
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            const avgBrightness =
                (pixelData[i] + pixelData[i + 1] + pixelData[i + 2]) / 3;

            // Normalize brightness to prevent "@" from appearing randomly
            const brightnessLevel = Math.floor(
                (avgBrightness / 255) * (asciiChars.length - 1)
            );
            const charIndex = invert
                ? asciiChars.length - 1 - brightnessLevel
                : brightnessLevel;
            const char =
                asciiChars[
                    Math.min(Math.max(charIndex, 0), asciiChars.length - 1)
                ];

            // Repeat each character to correct for aspect ratio
            for (let j = 0; j < aspectCorrection; j++) {
                row += char;
            }
        }
        asciiStr += row + "\n";
    }

    return asciiStr;
}
