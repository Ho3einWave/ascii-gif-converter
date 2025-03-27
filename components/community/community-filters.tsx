"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, ThumbsUp, ChevronDown, ChevronUp } from "lucide-react";
import { useCommunityStore } from "@/lib/store/community-store";
import {
    parseAsInteger,
    parseAsString,
    parseAsArrayOf,
    parseAsStringLiteral,
    useQueryStates,
} from "nuqs";
interface CommunityFiltersProps {
    allTags: string[];
}

export default function CommunityFilters({ allTags }: CommunityFiltersProps) {
    const [queryParams, setQueryParams] = useQueryStates({
        limit: parseAsInteger.withDefault(9),
        offset: parseAsInteger.withDefault(1),
        sort: parseAsStringLiteral(["asc", "desc"]).withDefault("desc"),
        sortBy: parseAsStringLiteral([
            "createdAt",
            "updatedAt",
            "likes",
        ]).withDefault("createdAt"),
        search: parseAsString,
        tags: parseAsArrayOf(parseAsString),
        creator_email: parseAsString,
    });

    const [showAllTags, setShowAllTags] = useState(false);
    const MAX_VISIBLE_TAGS = 10;

    const visibleTags = showAllTags
        ? allTags
        : allTags.slice(0, MAX_VISIBLE_TAGS);
    const hasMoreTags = allTags.length > MAX_VISIBLE_TAGS;

    const toggleTag = (tag: string) => {
        if (queryParams.tags?.includes(tag)) {
            setQueryParams({
                tags: queryParams.tags?.filter((t) => t !== tag),
            });
        } else {
            setQueryParams({ tags: [...(queryParams.tags || []), tag] });
        }
    };

    return (
        <div className="mb-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <Input
                        value={queryParams.search ?? ""}
                        onChange={(e) =>
                            setQueryParams({ search: e.target.value })
                        }
                        placeholder="Search submissions..."
                        className="terminal-input pl-10 h-10 w-full"
                    />
                </div>

                <div className="flex gap-2">
                    <Button
                        variant={
                            queryParams.sortBy === "createdAt"
                                ? "default"
                                : "outline"
                        }
                        onClick={() => setQueryParams({ sortBy: "createdAt" })}
                        className={
                            queryParams.sortBy === "createdAt"
                                ? "terminal-btn-primary"
                                : "terminal-btn"
                        }
                    >
                        <Clock className="h-4 w-4 mr-2" />
                        NEWEST
                    </Button>
                    <Button
                        variant={
                            queryParams.sortBy === "likes"
                                ? "default"
                                : "outline"
                        }
                        onClick={() => setQueryParams({ sortBy: "likes" })}
                        className={
                            queryParams.sortBy === "likes"
                                ? "terminal-btn-primary"
                                : "terminal-btn"
                        }
                    >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        POPULAR
                    </Button>
                </div>
            </div>

            {allTags.length > 0 && (
                <div className="space-y-2 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-zinc-500 self-center">
                            FILTER_BY_TAGS:
                        </span>
                        {visibleTags.map((tag) => (
                            <Badge
                                key={tag}
                                variant={
                                    queryParams.tags?.includes(tag)
                                        ? "default"
                                        : "outline"
                                }
                                className={
                                    queryParams.tags?.includes(tag)
                                        ? "terminal-tag-selected"
                                        : "terminal-tag"
                                }
                                onClick={() => toggleTag(tag)}
                            >
                                {tag}
                            </Badge>
                        ))}

                        {hasMoreTags && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowAllTags(!showAllTags)}
                                className="h-6 text-xs text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-none"
                            >
                                {showAllTags ? (
                                    <>
                                        <ChevronUp className="h-3 w-3 mr-1" />
                                        SHOW_LESS
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="h-3 w-3 mr-1" />
                                        SHOW_MORE (
                                        {allTags.length - MAX_VISIBLE_TAGS})
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                    {(queryParams.tags?.length ?? 0) > 0 && (
                        <Button
                            variant="link"
                            onClick={() => setQueryParams({ tags: [] })}
                            className="text-xs text-zinc-500 hover:text-zinc-300 p-0 h-auto"
                        >
                            CLEAR_ALL
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
