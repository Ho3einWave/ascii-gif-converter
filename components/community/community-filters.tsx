"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, ThumbsUp, ChevronDown, ChevronUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryParams } from "@/hooks/community/useQueryParams";

// Fixed widths for skeletons to avoid hydration errors
const SKELETON_WIDTHS = [45, 60, 80, 55, 70, 50];
const MAX_VISIBLE_TAGS = 10;

interface CommunityFiltersProps {
    allTags: string[];
    isLoading?: boolean;
}

export default function CommunityFilters({
    allTags,
    isLoading = false,
}: CommunityFiltersProps) {
    const [queryParams, setQueryParams] = useQueryParams();
    const [showAllTags, setShowAllTags] = useState(false);

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

    const handleSearchChange = (value: string) => {
        setQueryParams({ search: value });
    };

    const handleSortChange = (sortBy: "createdAt" | "updatedAt" | "likes") => {
        setQueryParams({ sortBy });
    };

    const clearAllTags = () => {
        setQueryParams({ tags: [] });
    };

    return (
        <div className="mb-6 space-y-4">
            <SearchAndSortControls
                search={queryParams.search ?? ""}
                sortBy={queryParams.sortBy ?? "createdAt"}
                onSearchChange={handleSearchChange}
                onSortChange={handleSortChange}
            />
            <TagsFilter
                visibleTags={visibleTags}
                selectedTags={queryParams.tags || []}
                hasMoreTags={hasMoreTags}
                showAllTags={showAllTags}
                isLoading={isLoading}
                totalTags={allTags.length}
                onToggleTag={toggleTag}
                onToggleShowAll={() => setShowAllTags(!showAllTags)}
                onClearAll={clearAllTags}
            />
        </div>
    );
}

// Search and Sort Controls Component
interface SearchAndSortControlsProps {
    search: string;
    sortBy: "createdAt" | "updatedAt" | "likes";
    onSearchChange: (value: string) => void;
    onSortChange: (sortBy: "createdAt" | "updatedAt" | "likes") => void;
}

function SearchAndSortControls({
    search,
    sortBy,
    onSearchChange,
    onSortChange,
}: SearchAndSortControlsProps) {
    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search submissions..."
                    className="terminal-input pl-10 h-10 w-full"
                />
            </div>

            <div className="flex gap-2">
                <Button
                    variant={sortBy === "createdAt" ? "default" : "outline"}
                    onClick={() => onSortChange("createdAt")}
                    className={
                        sortBy === "createdAt"
                            ? "terminal-btn-primary"
                            : "terminal-btn"
                    }
                >
                    <Clock className="h-4 w-4 mr-2" />
                    NEWEST
                </Button>
                <Button
                    variant={sortBy === "likes" ? "default" : "outline"}
                    onClick={() => onSortChange("likes")}
                    className={
                        sortBy === "likes"
                            ? "terminal-btn-primary"
                            : "terminal-btn"
                    }
                >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    POPULAR
                </Button>
            </div>
        </div>
    );
}

// Skeleton loader for tags
function TagSkeletons() {
    return (
        <>
            {SKELETON_WIDTHS.map((width, index) => (
                <Skeleton
                    key={`tag-skeleton-${index}`}
                    className="h-6 bg-zinc-800 rounded-full"
                    style={{ width: `${width}px` }}
                />
            ))}
        </>
    );
}

// Tags Filter Component
interface TagsFilterProps {
    visibleTags: string[];
    selectedTags: string[];
    hasMoreTags: boolean;
    showAllTags: boolean;
    isLoading: boolean;
    totalTags: number;
    onToggleTag: (tag: string) => void;
    onToggleShowAll: () => void;
    onClearAll: () => void;
}

function TagsFilter({
    visibleTags,
    selectedTags,
    hasMoreTags,
    showAllTags,
    isLoading,
    totalTags,
    onToggleTag,
    onToggleShowAll,
    onClearAll,
}: TagsFilterProps) {
    return (
        <div className="space-y-2 flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap gap-2">
                <span className="text-xs text-zinc-500 self-center">
                    FILTER_BY_TAGS:
                </span>

                {isLoading ? (
                    <TagSkeletons />
                ) : (
                    totalTags > 0 && (
                        <>
                            {visibleTags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant={
                                        selectedTags.includes(tag)
                                            ? "default"
                                            : "outline"
                                    }
                                    className={
                                        selectedTags.includes(tag)
                                            ? "terminal-tag-selected"
                                            : "terminal-tag"
                                    }
                                    onClick={() => onToggleTag(tag)}
                                >
                                    {tag}
                                </Badge>
                            ))}

                            {hasMoreTags && (
                                <ShowMoreButton
                                    showAllTags={showAllTags}
                                    hiddenCount={totalTags - MAX_VISIBLE_TAGS}
                                    onClick={onToggleShowAll}
                                />
                            )}
                        </>
                    )
                )}
            </div>
            {!isLoading && selectedTags.length > 0 && (
                <Button
                    variant="link"
                    onClick={onClearAll}
                    className="text-xs text-zinc-500 hover:text-zinc-300 p-0 h-auto"
                >
                    CLEAR_ALL
                </Button>
            )}
        </div>
    );
}

// Show More Button Component
interface ShowMoreButtonProps {
    showAllTags: boolean;
    hiddenCount: number;
    onClick: () => void;
}

function ShowMoreButton({
    showAllTags,
    hiddenCount,
    onClick,
}: ShowMoreButtonProps) {
    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={onClick}
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
                    SHOW_MORE ({hiddenCount})
                </>
            )}
        </Button>
    );
}
