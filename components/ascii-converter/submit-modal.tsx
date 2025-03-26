"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { X, AlertCircle } from "lucide-react";
import { useAsciiConverterStore } from "@/lib/store/ascii-converter-store";
import { useSubmitArt } from "@/hooks/use-submit-art";
import { toast } from "sonner";
import {
    MAX_TITLE_LENGTH,
    MAX_DESCRIPTION_LENGTH,
    MAX_TAGS,
    MAX_TAG_LENGTH,
} from "@/constants/submit-form";

interface SubmitModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const formSchema = z.object({
    title: z.string().min(1, "Title is required").max(MAX_TITLE_LENGTH),
});

type FormValues = z.infer<typeof formSchema>;

export default function SubmitModal({ isOpen, onClose }: SubmitModalProps) {
    const {
        frames,
        currentFrame,
        fps,
        width,
        height,
        asciiChars,
        invert,
        reset,
    } = useAsciiConverterStore();
    const router = useRouter();
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    const { mutate: submitArt, isPending } = useSubmitArt({
        onSuccess: (data) => {
            if (data.success) {
                toast.success("Art submitted successfully");
                onClose();
                form.reset();
                setTags([]);
                reset();
                router.push("/community");
            } else {
                toast.error(data.message);
            }
        },
    });

    const handleAddTag = () => {
        if (
            tagInput.trim() &&
            !tags.includes(tagInput.trim()) &&
            tags.length < MAX_TAGS
        ) {
            // Trim tag to max length
            const trimmedTag = tagInput.trim().slice(0, MAX_TAG_LENGTH);
            setTags([...tags, trimmedTag]);
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

    const onSubmit = async (data: FormValues) => {
        if (frames.length === 0) return;

        const submission = {
            title: data.title.trim(),
            tags,
            asciiFrame: frames,
            metadata: {
                fps,
                width,
                height,
                asciiChars,
                invert,
                createdAt: new Date().toISOString(),
            },
        };

        submitArt(submission);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-zinc-900 border-zinc-700 text-zinc-100 rounded-none max-w-2xl p-4 sm:p-6 w-[95vw] sm:w-auto max-h-[90vh] overflow-y-auto">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-zinc-100 font-mono text-lg">
                        SUBMIT_TO_COMMUNITY
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-4 py-2"
                >
                    <div className="grid gap-2">
                        <div className="flex justify-between items-center">
                            <Label
                                htmlFor="title"
                                className="text-xs text-zinc-400 font-bold"
                            >
                                TITLE{" "}
                                <span className="text-zinc-500">
                                    (REQUIRED)
                                </span>
                            </Label>
                            <span className="text-xs text-zinc-500">
                                {form.watch("title")?.length || 0}/
                                {MAX_TITLE_LENGTH}
                            </span>
                        </div>
                        <div className="relative">
                            <Input
                                id="title"
                                {...form.register("title")}
                                className="h-9 bg-zinc-800 border-zinc-700 text-zinc-100 rounded-none"
                                placeholder="Give your ASCII art a name"
                                maxLength={MAX_TITLE_LENGTH}
                            />
                            {form.formState.errors.title && (
                                <div className="text-red-500 text-xs mt-1 flex items-center">
                                    <AlertCircle className="h-3 w-3 mr-1" />
                                    {form.formState.errors.title.message}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <div className="flex justify-between items-center">
                            <Label
                                htmlFor="tags"
                                className="text-xs text-zinc-400 font-bold"
                            >
                                TAGS{" "}
                                <span className="text-zinc-500">
                                    (OPTIONAL)
                                </span>
                            </Label>
                            <span className="text-xs text-zinc-500">
                                {tags.length}/{MAX_TAGS}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Input
                                    id="tags"
                                    value={tagInput}
                                    onChange={(e) =>
                                        setTagInput(
                                            e.target.value.slice(
                                                0,
                                                MAX_TAG_LENGTH
                                            )
                                        )
                                    }
                                    onKeyDown={handleKeyDown}
                                    className="h-9 bg-zinc-800 border-zinc-700 text-zinc-100 rounded-none pr-16"
                                    placeholder="Add tags (press Enter)"
                                    disabled={tags.length >= MAX_TAGS}
                                    maxLength={MAX_TAG_LENGTH}
                                />
                                {tagInput && (
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                                        {tagInput.length}/{MAX_TAG_LENGTH}
                                    </div>
                                )}
                            </div>
                            <Button
                                type="button"
                                onClick={handleAddTag}
                                className="h-9 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 rounded-none whitespace-nowrap"
                                disabled={
                                    tags.length >= MAX_TAGS || !tagInput.trim()
                                }
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

                    <div className="grid gap-2 mt-2">
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

                    <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 rounded-none w-full sm:w-auto"
                        >
                            CANCEL
                        </Button>
                        <Button
                            type="submit"
                            disabled={
                                !form.formState.isValid ||
                                isPending ||
                                frames.length === 0
                            }
                            className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200 hover:text-zinc-900 rounded-none w-full sm:w-auto"
                        >
                            {isPending ? "SUBMITTING..." : "SUBMIT"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
