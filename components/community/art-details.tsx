"use client";

import Link from "next/link";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import AsciiConverterHeader from "@/components/ascii-converter/header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
    ArrowLeft,
    ThumbsUp,
    Copy,
    Check,
    Code,
    Clock,
    Calendar,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { getCodeSnippet } from "@/lib/ascii-converter/code-generator";
import { formatDistanceToNow, format } from "date-fns";
import { ASCIIArt } from "@/services/api/getArtById";
import { AsciiPreview } from "@/components/ascii-converter/ascii-preview";
import { useLikeArt } from "@/hooks/community/useLikeArt";
import { useUnlikeArt } from "@/hooks/community/useUnlikeArt";
import { useUserLikes } from "@/hooks/community/useUserLikes";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useGetArtById } from "@/hooks/community/useGetArtById";

export default function ArtDetailPage({
    artInitialData,
}: {
    artInitialData: ASCIIArt;
}) {
    const { data: art = artInitialData } = useGetArtById(artInitialData.id, {
        placeholderData: artInitialData,
    });

    const router = useRouter();
    const { mutate: likeArt, isPending: isLikePending } = useLikeArt();
    const { mutate: unlikeArt, isPending: isUnlikePending } = useUnlikeArt();
    const { data: userLikes, isLoading: isUserLikesLoading } = useUserLikes();
    const { status } = useSession();
    const isLiked = userLikes?.includes(art.id);
    const isLikedButtonDisabled =
        isLikePending || isUnlikePending || isUserLikesLoading;

    const [copied, setCopied] = useState(false);
    const [language, setLanguage] = useState("javascript");
    const [showAllTags, setShowAllTags] = useState(false);
    const codeRef = useRef<HTMLTextAreaElement>(null);

    const MAX_VISIBLE_TAGS = 10;

    const timeAgo = formatDistanceToNow(new Date(art.createdAt), {
        addSuffix: true,
    });
    const formattedDate = format(new Date(art.createdAt), "PPP");

    const visibleTags = showAllTags
        ? art.tags
        : art.tags.slice(0, MAX_VISIBLE_TAGS);
    const hasMoreTags = art.tags.length > MAX_VISIBLE_TAGS;

    const copyToClipboard = () => {
        if (codeRef.current) {
            codeRef.current.select();
            document.execCommand("copy");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleLike = () => {
        if (status === "authenticated" && !isUserLikesLoading) {
            if (isLiked) {
                unlikeArt(art.id);
            } else {
                likeArt(art.id);
            }
        } else {
            toast.error("Please login to like this art");
        }
    };

    const languages = [
        { id: "javascript", name: "JavaScript" },
        { id: "python", name: "Python" },
        { id: "csharp", name: "C#" },
        { id: "java", name: "Java" },
        { id: "go", name: "Go" },
        { id: "rust", name: "Rust" },
    ];

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono">
            <AsciiConverterHeader>
                <Link href="/community">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push("/community")}
                        className="terminal-btn h-8"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        BACK_TO_COMMUNITY
                    </Button>
                </Link>
            </AsciiConverterHeader>

            <main className="max-w-5xl mx-auto p-4">
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold text-zinc-100">
                            {art.title}
                        </h1>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLike}
                            className={cn(
                                "h-8 p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors rounded-none flex items-center gap-1",
                                isLikePending || isUnlikePending
                                    ? "animate-pulse"
                                    : "",
                                isLikedButtonDisabled &&
                                    "text-zinc-300 scale-110",
                                isLiked && "text-green-500"
                            )}
                        >
                            <ThumbsUp
                                className={`h-4 w-4 ${
                                    isLikePending || isUnlikePending
                                        ? "text-zinc-300 scale-110"
                                        : ""
                                } transition-all`}
                            />
                            <span
                                className={`text-xs ${
                                    isLikePending || isUnlikePending
                                        ? "text-zinc-300"
                                        : ""
                                } transition-colors`}
                            >
                                {art.likesCount}
                            </span>
                        </Button>
                    </div>

                    {art.creator && (
                        <div className="text-sm text-zinc-500 mt-1">
                            by {art.creatorName}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2 mt-4">
                        <div className="flex items-center text-xs text-zinc-500">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            {timeAgo}
                        </div>
                        <div className="flex items-center text-xs text-zinc-500">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            {formattedDate}
                        </div>

                        {art.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 items-center">
                                {visibleTags.map((tag) => (
                                    <Badge
                                        key={tag}
                                        className="rounded-none bg-zinc-800 text-zinc-400 text-xs hover:bg-zinc-800 hover:text-zinc-300 border-zinc-700 border-[1px]"
                                    >
                                        {tag}
                                    </Badge>
                                ))}

                                {hasMoreTags && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            setShowAllTags(!showAllTags)
                                        }
                                        className="h-6 text-xs text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-none p-1"
                                    >
                                        {showAllTags ? (
                                            <ChevronUp className="h-3 w-3" />
                                        ) : (
                                            <ChevronDown className="h-3 w-3" />
                                        )}
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
                        <div className="p-4 border-b border-zinc-800 flex items-center">
                            <Code className="h-4 w-4 text-zinc-400 mr-2" />
                            <h2 className="text-sm font-bold text-zinc-300">
                                ASCII_ART_PREVIEW
                            </h2>
                        </div>
                        <AsciiPreview
                            frames={
                                Array.isArray(art.asciiFrame)
                                    ? art.asciiFrame
                                    : [art.asciiFrame]
                            }
                            fps={art.metadata.fps}
                            fontSize={6}
                            invert={art.metadata.invert}
                            className="p-4 overflow-auto min-h-[400px]"
                        />
                        <div className="p-3 border-t border-zinc-800 text-xs text-zinc-500">
                            Dimensions: {art.metadata.width}x
                            {art.metadata.height} • FPS: {art.metadata.fps} •
                            {art.metadata.invert ? " Inverted" : " Normal"}
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <Tabs defaultValue="javascript" className="w-full">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-sm font-bold text-zinc-300">
                                    CODE_SNIPPETS
                                </h2>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={copyToClipboard}
                                    className="terminal-btn h-8"
                                >
                                    {copied ? (
                                        <Check className="h-3 w-3 mr-1" />
                                    ) : (
                                        <Copy className="h-3 w-3 mr-1" />
                                    )}
                                    {copied ? "COPIED" : "COPY"}
                                </Button>
                            </div>

                            <TabsList className="bg-zinc-900 border border-zinc-800 rounded-none w-full grid grid-cols-3 lg:grid-cols-2 h-auto p-0">
                                {languages.map((lang) => (
                                    <TabsTrigger
                                        key={lang.id}
                                        value={lang.id}
                                        onClick={() => setLanguage(lang.id)}
                                        className="rounded-none data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100 text-xs py-2 hover:bg-zinc-800 hover:text-zinc-300 transition-colors"
                                    >
                                        {lang.name}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {languages.map((lang) => (
                                <TabsContent
                                    key={lang.id}
                                    value={lang.id}
                                    className="mt-0"
                                >
                                    <div className="bg-zinc-950 border border-zinc-800 border-t-0 hover:border-zinc-700 transition-colors">
                                        <Textarea
                                            ref={
                                                lang.id === language
                                                    ? codeRef
                                                    : undefined
                                            }
                                            value={getCodeSnippet(
                                                art.asciiFrame,
                                                lang.id,
                                                art.metadata.fps
                                            )}
                                            readOnly
                                            className="font-mono text-xs bg-transparent border-0 resize-none h-[300px] rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                        />
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </div>
            </main>
        </div>
    );
}
