import { useState, useEffect } from "react";

interface AsciiPreviewProps {
    frames: string[];
    fps: number;
    fontSize?: number;
    invert?: boolean;
    width?: number;
    height?: number;
    className?: string;
}

export function AsciiPreview({
    frames,
    fps,
    fontSize = 8,
    invert = false,
    width,
    height,
    className = "",
}: AsciiPreviewProps) {
    const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

    useEffect(() => {
        if (frames.length <= 1 || fps <= 0) return;

        const intervalId = setInterval(() => {
            setCurrentFrameIndex((prevIndex) =>
                prevIndex === frames.length - 1 ? 0 : prevIndex + 1
            );
        }, 1000 / fps);

        return () => clearInterval(intervalId);
    }, [frames, fps]);

    if (frames.length === 0) {
        return (
            <div
                className={`flex items-center justify-center bg-black ${className}`}
            >
                <p className="text-zinc-500 text-xs">No frames to display</p>
            </div>
        );
    }

    return (
        <div
            className={`bg-black flex items-center justify-center ${className}`}
        >
            <pre
                style={{
                    fontSize: `${fontSize}px`,
                    lineHeight: 1,
                    whiteSpace: "pre",
                    fontFamily: "monospace",
                    color: invert ? "#000" : "#fff",
                    backgroundColor: invert ? "#fff" : "transparent",
                    margin: "0 auto",
                    textAlign: "center",
                    width: width ? `${width}px` : "auto",
                    height: height ? `${height}px` : "auto",
                }}
            >
                {frames[currentFrameIndex]}
            </pre>
        </div>
    );
}
