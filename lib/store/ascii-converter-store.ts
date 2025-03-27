import { create } from "zustand";
import { processGifImage } from "@/lib/ascii-converter/image-processing";

interface AsciiConverterState {
    // GIF and frames
    gifFile: File | null;
    frames: string[];
    currentFrame: number;
    isPlaying: boolean;

    // Settings
    asciiChars: string;
    width: number;
    height: number;
    fontSize: number;
    fps: number;
    invert: boolean;

    // UI state
    isSubmitModalOpen: boolean;

    // Actions
    setGifFile: (File: File | null) => void;
    setFrames: (frames: string[]) => void;
    setCurrentFrame: (frame: number) => void;
    togglePlayback: () => void;
    setIsPlaying: (isPlaying: boolean) => void;

    setAsciiChars: (chars: string) => void;
    setWidth: (width: number) => void;
    setHeight: (height: number) => void;
    setFontSize: (size: number) => void;
    setFps: (fps: number) => void;
    toggleInvert: () => void;
    setInvert: (invert: boolean) => void;

    setIsSubmitModalOpen: (isOpen: boolean) => void;

    processGif: () => Promise<void>;
    reset: () => void;
}

export const useAsciiConverterStore = create<AsciiConverterState>(
    (set, get) => ({
        // Initial state
        gifFile: null,
        frames: [],
        currentFrame: 0,
        isPlaying: false,

        asciiChars: " .:`'\",;><)(}{[]_|\\/-^~=?+*%$#",
        width: 40,
        height: 40,
        fontSize: 8,
        fps: 20,
        invert: false,

        isSubmitModalOpen: false,

        // Actions
        setGifFile: (file) => set({ gifFile: file }),
        setFrames: (frames) => set({ frames }),
        setCurrentFrame: (frame) => set({ currentFrame: frame }),
        togglePlayback: () => set((state) => ({ isPlaying: !state.isPlaying })),
        setIsPlaying: (isPlaying) => set({ isPlaying }),

        setAsciiChars: (chars) => {
            set({ asciiChars: chars });
            const { gifFile, processGif } = get();
            if (gifFile) {
                processGif();
            }
        },

        setWidth: (width) => set({ width }),
        setHeight: (height) => set({ height }),
        setFontSize: (fontSize) => set({ fontSize }),
        setFps: (fps) => set({ fps }),
        toggleInvert: () => {
            set((state) => ({ invert: !state.invert }));
            const { gifFile, processGif } = get();
            if (gifFile) {
                processGif();
            }
        },
        setInvert: (invert) => {
            set({ invert });
            const { gifFile, processGif } = get();
            if (gifFile) {
                processGif();
            }
        },

        setIsSubmitModalOpen: (isOpen) => set({ isSubmitModalOpen: isOpen }),

        processGif: async () => {
            const { gifFile, width, height, asciiChars, invert } = get();
            if (!gifFile) return;
            const processedFrames = await processGifImage(
                gifFile,
                width,
                height,
                asciiChars,
                invert
            );

            set({
                frames: processedFrames,
                currentFrame: 0,
                isPlaying: true,
            });
        },
        reset: () => {
            set({
                gifFile: null,
                frames: [],
            });
        },
    })
);
