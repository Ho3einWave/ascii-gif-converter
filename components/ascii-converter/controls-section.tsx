"use client";

import type React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Upload, Play, Pause, RefreshCw, AlertCircle } from "lucide-react";
import { useAsciiConverterStore } from "@/lib/store/ascii-converter-store";
import { useState } from "react";
import HelpModal from "./help-modal";
import { toast } from "sonner";

interface ControlsSectionProps {
    fileInputRef: React.RefObject<HTMLInputElement>;
}

export default function ControlsSection({
    fileInputRef,
}: ControlsSectionProps) {
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

    const {
        gifFile,
        isPlaying,
        frames,
        asciiChars,
        invert,
        setGifFile,
        togglePlayback,
        setAsciiChars,
        toggleInvert,
        processGif,
    } = useAsciiConverterStore();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
        const file = e.target.files?.[0];
        if (file && file.type === "image/gif") {
            setGifFile(file);
            processGif();
        } else {
            toast.error("Please upload a valid GIF file");
        }
    };

    const handleClearInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleReprocess = () => {
        if (gifFile) {
            processGif();
        }
    };

    return (
        <div className="bg-zinc-900 p-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-4 flex items-center gap-2">
                    <Input
                        ref={fileInputRef}
                        id="file-upload"
                        type="file"
                        accept="image/gif"
                        onClick={handleClearInput}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <Button
                        variant="outline"
                        className="flex-1 bg-zinc-100 text-zinc-900 hover:bg-zinc-200 hover:text-zinc-900 rounded-none"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload className="mr-2 h-4 w-4" />
                        UPLOAD_GIF
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={togglePlayback}
                        disabled={frames.length === 0}
                        className="h-10 w-10 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 rounded-none"
                    >
                        {isPlaying ? (
                            <Pause className="h-4 w-4" />
                        ) : (
                            <Play className="h-4 w-4" />
                        )}
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleReprocess}
                        disabled={!gifFile}
                        className="h-10 w-10 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 rounded-none"
                    >
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                </div>

                <div className="md:col-span-5 flex items-center gap-3">
                    <Label
                        htmlFor="ascii-chars"
                        className="text-xs text-zinc-400 whitespace-nowrap font-bold"
                    >
                        CHARS:
                    </Label>
                    <Input
                        id="ascii-chars"
                        value={asciiChars}
                        onChange={(e) => setAsciiChars(e.target.value)}
                        className="h-10 bg-zinc-800 border-zinc-700 text-zinc-100 text-xs rounded-none"
                        placeholder="ASCII characters"
                    />
                </div>

                <div className="md:col-span-3 flex items-center justify-end gap-2">
                    <Label
                        htmlFor="invert"
                        className="text-xs text-zinc-400 font-bold"
                    >
                        INVERT:
                    </Label>
                    <Switch
                        id="invert"
                        checked={invert}
                        onCheckedChange={toggleInvert}
                        className="data-[state=checked]:bg-zinc-500"
                    />
                    <div className="ml-auto ">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsHelpModalOpen(true)}
                            className="h-8 text-xs text-zinc-500 hover:text-zinc-300 hover:bg-transparent"
                        >
                            <AlertCircle className="h-3.5 w-3.5 mr-1" />
                            BUGGY ART?
                        </Button>
                    </div>
                </div>
            </div>
            <HelpModal
                isOpen={isHelpModalOpen}
                onClose={() => setIsHelpModalOpen(false)}
            />
        </div>
    );
}
