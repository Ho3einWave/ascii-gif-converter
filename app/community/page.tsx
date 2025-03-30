"use client";

import Link from "next/link";
import { Suspense } from "react";
import AsciiConverterHeader from "@/components/ascii-converter/header";
import CommunityFilters from "@/components/community/community-filters";
import AsciiArtCard from "@/components/community/ascii-art-card";
import AsciiArtSkeleton from "@/components/community/ascii-art-skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Terminal } from "lucide-react";
import useGetAsciiArts from "@/hooks/community/useGetAsciiArts";
import { useGetAllTags } from "@/hooks/community/useGetAllTags";
import Pagination from "@/components/community/pagination";
import { useQueryParams } from "@/hooks/community/useQueryParams";

function CommunityContent() {
    const [queryParams, setQueryParams] = useQueryParams();

    const handlePageChange = (page: number) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        setQueryParams({ offset: page }, { history: "push" });
    };

    const { data: allTags, isLoading: isTagsLoading } = useGetAllTags();
    const { data: submissions, isFetching: isSubmissionsLoading } =
        useGetAsciiArts(queryParams);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono">
            <AsciiConverterHeader>
                <Link href="/">
                    <Button
                        variant="outline"
                        size="sm"
                        className="terminal-btn h-8"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        CONVERTER
                    </Button>
                </Link>
            </AsciiConverterHeader>

            <main className="max-w-6xl mx-auto p-4" id="community-page">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Terminal className="h-5 w-5 text-zinc-400" />
                        <h1 className="text-xl font-bold text-zinc-100">
                            ASCII_ART_COMMUNITY
                        </h1>
                    </div>
                    <div className="text-xs text-zinc-500">
                        {submissions?.data?.length}{" "}
                        {submissions?.data?.length === 1
                            ? "SUBMISSION"
                            : "SUBMISSIONS"}
                    </div>
                </div>

                <CommunityFilters
                    allTags={allTags || []}
                    isLoading={isTagsLoading}
                />

                {!isSubmissionsLoading && submissions?.data?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[400px] text-zinc-500 border border-zinc-800 p-8">
                        <div className="text-center mb-2 font-bold">
                            NO_SUBMISSIONS_FOUND
                        </div>
                        <div className="text-xs text-center max-w-md">
                            {submissions?.data?.length === 0
                                ? "Be the first to submit your ASCII art to the community!"
                                : "No submissions match your current filters. Try adjusting your search or filters."}
                        </div>
                        {submissions.data?.length === 0 && (
                            <Link href="/" className="mt-4">
                                <Button className="terminal-btn">
                                    CREATE_ASCII_ART
                                </Button>
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {isSubmissionsLoading
                            ? Array(9)
                                  .fill(0)
                                  .map((_, index) => (
                                      <AsciiArtSkeleton
                                          key={`skeleton-${index}`}
                                      />
                                  ))
                            : submissions?.data?.map((submission, index) => (
                                  <AsciiArtCard
                                      key={`${submission.title}-${index}`}
                                      submission={submission}
                                  />
                              ))}
                    </div>
                )}
                {!isSubmissionsLoading &&
                    (submissions?.totalCount ?? 0) > queryParams.limit && (
                        <Pagination
                            currentPage={queryParams.offset}
                            totalPages={submissions?.totalPages ?? 0}
                            onPageChange={handlePageChange}
                        />
                    )}

                {!isSubmissionsLoading && (
                    <div className="text-center text-xs text-zinc-500 mt-2">
                        Showing{" "}
                        {Math.min(
                            submissions?.totalCount ?? 0,
                            (queryParams.offset - 1) * queryParams.limit + 1
                        )}
                        -
                        {Math.min(
                            submissions?.totalCount ?? 0,
                            queryParams.offset * queryParams.limit
                        )}{" "}
                        of {submissions?.totalCount} submissions
                    </div>
                )}
            </main>
        </div>
    );
}

export default function CommunityPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono">
                    <AsciiConverterHeader>
                        <Link href="/">
                            <Button
                                variant="outline"
                                size="sm"
                                className="terminal-btn h-8"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                CONVERTER
                            </Button>
                        </Link>
                    </AsciiConverterHeader>
                    <main className="max-w-6xl mx-auto p-4">
                        <div className="flex items-center gap-2 mb-6">
                            <Terminal className="h-5 w-5 text-zinc-400" />
                            <h1 className="text-xl font-bold text-zinc-100">
                                ASCII_ART_COMMUNITY
                            </h1>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Array(9)
                                .fill(0)
                                .map((_, index) => (
                                    <AsciiArtSkeleton
                                        key={`skeleton-${index}`}
                                    />
                                ))}
                        </div>
                    </main>
                </div>
            }
        >
            <CommunityContent />
        </Suspense>
    );
}
