"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useAsciiConverterStore } from "@/lib/store/ascii-converter-store";
import { useCommunityStore } from "@/lib/store/community-store";

interface SubmitModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SubmitModal({ isOpen, onClose }: SubmitModalProps) {
    const router = useRouter();
    const { frames, currentFrame, fps, width, height, asciiChars, invert } =
        useAsciiConverterStore();
    const { addSubmission } = useCommunityStore();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const handleRemoveTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleSubmit = async () => {
        if (!title.trim() || frames.length === 0) return;

        setIsSubmitting(true);

        const submission = {
            title,
            description,
            author,
            tags,
            asciiFrame: frames[currentFrame],
            metadata: {
                fps,
                width,
                height,
                asciiChars,
                invert,
                createdAt: new Date().toISOString(),
            },
            id: "nanoid",
            likes: 0,
        };

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Add to store
        const newSubmission = addSubmission(submission);

        setIsSubmitting(false);
        onClose();

        // Reset form
        setTitle("");
        setDescription("");
        setAuthor("");
        setTags([]);

        // Navigate to community page
        router.push("/community");
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-zinc-900 border-zinc-700 text-zinc-100 rounded-none max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-zinc-100 font-mono text-lg">
                        SUBMIT_TO_COMMUNITY
                    </DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label
                            htmlFor="title"
                            className="text-xs text-zinc-400 font-bold"
                        >
                            TITLE{" "}
                            <span className="text-zinc-500">(REQUIRED)</span>
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="h-9 bg-zinc-800 border-zinc-700 text-zinc-100 rounded-none"
                            placeholder="Give your ASCII art a name"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label
                            htmlFor="description"
                            className="text-xs text-zinc-400 font-bold"
                        >
                            DESCRIPTION{" "}
                            <span className="text-zinc-500">(OPTIONAL)</span>
                        </Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-zinc-800 border-zinc-700 text-zinc-100 rounded-none min-h-[80px]"
                            placeholder="Tell the community about your ASCII art"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label
                            htmlFor="author"
                            className="text-xs text-zinc-400 font-bold"
                        >
                            AUTHOR{" "}
                            <span className="text-zinc-500">(OPTIONAL)</span>
                        </Label>
                        <Input
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="h-9 bg-zinc-800 border-zinc-700 text-zinc-100 rounded-none"
                            placeholder="Your name or handle"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label
                            htmlFor="tags"
                            className="text-xs text-zinc-400 font-bold"
                        >
                            TAGS{" "}
                            <span className="text-zinc-500">(OPTIONAL)</span>
                        </Label>
                        <div className="flex gap-2">
                            <Input
                                id="tags"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="h-9 bg-zinc-800 border-zinc-700 text-zinc-100 rounded-none"
                                placeholder="Add tags (press Enter)"
                            />
                            <Button
                                type="button"
                                onClick={handleAddTag}
                                className="h-9 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 rounded-none"
                            >
                                ADD
                            </Button>
                        </div>

                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 rounded-none"
                                    >
                                        {tag}
                                        <button
                                            onClick={() => handleRemoveTag(tag)}
                                            className="ml-2 text-zinc-400 hover:text-zinc-200"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label className="text-xs text-zinc-400 font-bold">
                            PREVIEW
                        </Label>
                        <div className="bg-black p-2 overflow-auto max-h-[200px] flex items-center justify-center">
                            <pre
                                style={{
                                    fontSize: "8px",
                                    lineHeight: 1,
                                    whiteSpace: "pre",
                                    fontFamily: "monospace",
                                    color: invert ? "#000" : "#fff",
                                    backgroundColor: invert
                                        ? "#fff"
                                        : "transparent",
                                    margin: "0 auto",
                                    textAlign: "center",
                                }}
                            >
                                {frames[currentFrame] || ""}
                            </pre>
                        </div>
                        <div className="text-xs text-zinc-500 mt-1">
                            Metadata: {width}x{height}, {fps} FPS,{" "}
                            {invert ? "Inverted" : "Normal"}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 rounded-none"
                    >
                        CANCEL
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={
                            !title.trim() || isSubmitting || frames.length === 0
                        }
                        className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200 hover:text-zinc-900 rounded-none"
                    >
                        {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
