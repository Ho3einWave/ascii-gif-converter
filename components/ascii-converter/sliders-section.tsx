"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useAsciiConverterStore } from "@/lib/store/ascii-converter-store";

export default function SlidersSection() {
    const {
        width,
        height,
        fontSize,
        fps,
        setWidth,
        setHeight,
        setFontSize,
        setFps,
        gifFile,
        processGif,
    } = useAsciiConverterStore();

    // Local state for dragging
    const [localWidth, setLocalWidth] = useState(width);
    const [localHeight, setLocalHeight] = useState(height);
    const [localFontSize, setLocalFontSize] = useState(fontSize);
    const [localFps, setLocalFps] = useState(fps);

    // Handle slider commit (when user releases)
    const handleWidthCommit = () => {
        setWidth(localWidth);
        if (gifFile) {
            processGif();
        }
    };

    const handleHeightCommit = () => {
        setHeight(localHeight);
        if (gifFile) {
            processGif();
        }
    };

    const handleFontSizeCommit = () => {
        setFontSize(localFontSize);
    };

    const handleFpsCommit = () => {
        setFps(localFps);
    };

    return (
        <div className="bg-zinc-900 p-4 border-t border-zinc-800">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <Label className="text-xs text-zinc-400 font-bold">
                            WIDTH
                        </Label>
                        <span className="text-xs text-zinc-300">
                            {localWidth}
                        </span>
                    </div>
                    <Slider
                        value={[localWidth]}
                        min={20}
                        max={200}
                        step={1}
                        onValueChange={(value) => setLocalWidth(value[0])}
                        onValueCommit={handleWidthCommit}
                        className="terminal-slider"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <Label className="text-xs text-zinc-400 font-bold">
                            HEIGHT
                        </Label>
                        <span className="text-xs text-zinc-300">
                            {localHeight}
                        </span>
                    </div>
                    <Slider
                        value={[localHeight]}
                        min={10}
                        max={200}
                        step={1}
                        onValueChange={(value) => setLocalHeight(value[0])}
                        onValueCommit={handleHeightCommit}
                        className="terminal-slider"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <Label className="text-xs text-zinc-400 font-bold">
                            FONT
                        </Label>
                        <span className="text-xs text-zinc-300">
                            {localFontSize}px
                        </span>
                    </div>
                    <Slider
                        value={[localFontSize]}
                        min={2}
                        max={16}
                        step={1}
                        onValueChange={(value) => setLocalFontSize(value[0])}
                        onValueCommit={handleFontSizeCommit}
                        className="terminal-slider"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <Label className="text-xs text-zinc-400 font-bold">
                            FPS
                        </Label>
                        <span className="text-xs text-zinc-300">
                            {localFps}
                        </span>
                    </div>
                    <Slider
                        value={[localFps]}
                        min={1}
                        max={60}
                        step={1}
                        onValueChange={(value) => setLocalFps(value[0])}
                        onValueCommit={handleFpsCommit}
                        className="terminal-slider"
                    />
                </div>
            </div>
        </div>
    );
}
