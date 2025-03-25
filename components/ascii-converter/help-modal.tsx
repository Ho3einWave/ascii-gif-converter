"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-zinc-900 border-zinc-700 text-zinc-100 rounded-none max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-zinc-100 font-mono text-lg">
                        FIX_BUGGY_GIF
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <p className="text-sm text-zinc-300">
                        If your GIF is displaying incorrectly or producing buggy
                        ASCII art, it may be due to an optimized GIF format.
                    </p>

                    <div className="space-y-2">
                        <h3 className="text-xs text-zinc-400 font-bold">
                            FOLLOW_THESE_STEPS:
                        </h3>
                        <ol className="text-sm text-zinc-300 space-y-2 list-decimal pl-5">
                            <li>
                                Go to{" "}
                                <a
                                    href="https://ezgif.com/repair"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-100 underline hover:text-zinc-300"
                                >
                                    ezgif.com/repair
                                </a>
                            </li>
                            <li>Upload your GIF</li>
                            <li>
                                Select the{" "}
                                <span className="bg-zinc-800 px-1 py-0.5 rounded text-xs">
                                    ImageMagick coalesce (unoptimize)
                                </span>{" "}
                                option
                            </li>
                            <li>Process the GIF</li>
                            <li>Download the fixed GIF</li>
                            <li>Use the fixed GIF in this ASCII converter</li>
                        </ol>
                    </div>

                    <div className="bg-zinc-800 p-3 text-xs text-zinc-400 border-l-2 border-zinc-600">
                        <p>
                            <strong>WHY THIS WORKS:</strong> Optimized GIFs may
                            have frames that only contain the changed pixels,
                            which can cause issues when converting to ASCII.
                            Unoptimizing the GIF ensures each frame contains the
                            complete image.
                        </p>
                    </div>
                </div>

                <DialogFooter className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 rounded-none"
                    >
                        CLOSE
                    </Button>
                    <Button
                        onClick={() =>
                            window.open("https://ezgif.com/repair", "_blank")
                        }
                        className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200 hover:text-zinc-900 rounded-none"
                    >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        OPEN_REPAIR_TOOL
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
