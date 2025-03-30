"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ArrowUpRight, Plus, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { CommunityArt } from "@/services/api/getCommunityArts";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useLikeArt } from "@/hooks/community/useLikeArt";
import { useUserLikes } from "@/hooks/community/useUserLikes";
import { cn } from "@/lib/utils";
import { useUnlikeArt } from "@/hooks/community/useUnlikeArt";
interface AsciiArtCardProps {
    submission: CommunityArt;
}

export default function AsciiArtCard({ submission }: AsciiArtCardProps) {
    const { status } = useSession();
    const { data: userLikes } = useUserLikes();
    const router = useRouter();
    const timeAgo = formatDistanceToNow(new Date(submission.createdAt), {
        addSuffix: true,
    });
    const { mutate: likeArt, isPending: isLikePending } = useLikeArt();
    const { mutate: unlikeArt, isPending: isUnlikePending } = useUnlikeArt();
    const MAX_VISIBLE_TAGS = 3;
    const visibleTags = submission.tags.slice(0, MAX_VISIBLE_TAGS);
    const hiddenTagsCount = Math.max(
        0,
        submission.tags.length - MAX_VISIBLE_TAGS
    );

    const handleCardClick = () => {
        router.push(`/community/art/${submission.id}`);
    };

    const handleLikeClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (status === "authenticated") {
            if (isLiked) {
                unlikeArt(submission.id);
            } else {
                likeArt(submission.id);
            }
        } else {
            toast.error("You must be logged in to like art");
        }
    };

    const isLikedButtonDisabled = isLikePending || isUnlikePending;
    const isLiked = userLikes?.includes(submission.id);

    return (
        <Card
            className="terminal-card cursor-pointer group"
            onClick={handleCardClick}
        >
            <CardHeader className="p-4 pb-2 border-b border-zinc-800">
                <CardTitle className="text-zinc-100 text-base font-mono flex justify-between items-start">
                    <span className="truncate group-hover:text-zinc-300 transition-colors">
                        {submission.title}
                    </span>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLikeClick}
                        className={cn(
                            "h-8 p-1 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors rounded-none flex items-center gap-1",
                            isLikePending || isUnlikePending
                                ? "animate-pulse"
                                : "",
                            isLikedButtonDisabled &&
                                "opacity-50 cursor-not-allowed",
                            isLiked && "text-green-500"
                        )}
                        disabled={isLikedButtonDisabled}
                    >
                        {isLikedButtonDisabled ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <ThumbsUp
                                className={`h-4 w-4 ${
                                    isLikePending || isUnlikePending
                                        ? "text-zinc-300 scale-110"
                                        : ""
                                } transition-all`}
                            />
                        )}
                        <span
                            className={`text-xs ${
                                isLikePending || isUnlikePending
                                    ? "text-zinc-300"
                                    : ""
                            } transition-colors`}
                        >
                            {submission.likesCount}
                        </span>
                    </Button>
                </CardTitle>
                {submission.creatorName && (
                    <div className="text-xs text-zinc-500">
                        by {submission.creatorName}
                    </div>
                )}
            </CardHeader>

            <CardContent className="p-0 relative">
                <div
                    className="bg-black p-2 overflow-hidden flex items-center justify-center"
                    style={{ height: "280px" }}
                >
                    <pre
                        style={{
                            fontSize: "5px",
                            lineHeight: 1,
                            whiteSpace: "pre",
                            fontFamily: "monospace",
                            color: submission.metadata.invert ? "#000" : "#fff",
                            backgroundColor: submission.metadata.invert
                                ? "#fff"
                                : "transparent",
                            margin: "0 auto",
                            textAlign: "center",
                        }}
                    >
                        {submission.previewFrame}
                    </pre>
                </div>

                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Badge className="bg-zinc-800 text-zinc-300 rounded-none group-hover:bg-zinc-700">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        VIEW
                    </Badge>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-3 flex flex-col items-start gap-3 border-t border-zinc-800">
                {submission.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {visibleTags.map((tag) => (
                            <Badge
                                key={tag}
                                className="rounded-none bg-zinc-800 text-zinc-400 text-xs hover:bg-zinc-800 hover:text-zinc-300 border-zinc-700 border-[1px]"
                            >
                                {tag}
                            </Badge>
                        ))}
                        {hiddenTagsCount > 0 && (
                            <Badge className="bg-zinc-800 text-zinc-400 text-xs rounded-none flex items-center">
                                <Plus className="h-3 w-3 mr-1" />
                                {hiddenTagsCount} more
                            </Badge>
                        )}
                    </div>
                )}

                <div className="flex justify-between items-center w-full">
                    <div className="text-xs text-zinc-500">
                        {timeAgo} • {submission.metadata.width}x
                        {submission.metadata.height}
                    </div>
                    <div className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        DETAILS
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
