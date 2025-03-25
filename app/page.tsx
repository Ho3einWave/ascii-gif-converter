"use client";

import { useRef, useEffect, RefObject } from "react";
import Link from "next/link";
import AsciiConverterHeader from "@/components/ascii-converter/header";
import ControlsSection from "@/components/ascii-converter/controls-section";
import SlidersSection from "@/components/ascii-converter/sliders-section";
import PreviewSection from "@/components/ascii-converter/preview-section";
import CodeSnippetSection from "@/components/ascii-converter/code-snippet-section";
import SubmitToCommunityCTA from "@/components/ascii-converter/submit-to-community-cta";
import SubmitModal from "@/components/ascii-converter/submit-modal";
import { useAsciiConverterStore } from "@/lib/store/ascii-converter-store";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export default function AsciiGifConverter() {
    const {
        frames,
        currentFrame,
        isPlaying,
        fps,
        setCurrentFrame,
        isSubmitModalOpen,
        setIsSubmitModalOpen,
    } = useAsciiConverterStore();

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Animation effect
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isPlaying && frames.length > 0) {
            interval = setInterval(() => {
                setCurrentFrame((currentFrame + 1) % frames.length);
            }, 1000 / fps);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isPlaying, frames, fps, currentFrame, setCurrentFrame]);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono">
            <AsciiConverterHeader>
                <Link href="/community">
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 rounded-none"
                    >
                        <Users className="h-4 w-4 mr-2" />
                        COMMUNITY
                    </Button>
                </Link>
            </AsciiConverterHeader>

            <main className="max-w-5xl mx-auto">
                <ControlsSection
                    fileInputRef={fileInputRef as RefObject<HTMLInputElement>}
                />

                <SlidersSection />

                <PreviewSection />

                {frames.length > 0 && (
                    <SubmitToCommunityCTA
                        onSubmit={() => setIsSubmitModalOpen(true)}
                    />
                )}

                <CodeSnippetSection />
            </main>

            <SubmitModal
                isOpen={isSubmitModalOpen}
                onClose={() => setIsSubmitModalOpen(false)}
            />
        </div>
    );
}
