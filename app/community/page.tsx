"use client";

import { useEffect } from "react";
import Link from "next/link";
import AsciiConverterHeader from "@/components/ascii-converter/header";
import CommunityFilters from "@/components/community/community-filters";
import AsciiArtCard from "@/components/community/ascii-art-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Terminal } from "lucide-react";
import { useCommunityStore } from "@/lib/store/community-store";

export default function CommunityPage() {
    const {
        submissions,
        filteredSubmissions,
        allTags,
        loadSubmissions,
        likeSubmission,
    } = useCommunityStore();

    useEffect(() => {
        loadSubmissions();
    }, [loadSubmissions]);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono">
            <AsciiConverterHeader>
                <Link href="/" className="hidden sm:block">
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
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Terminal className="h-5 w-5 text-zinc-400" />
                        <h1 className="text-xl font-bold text-zinc-100">
                            ASCII_ART_COMMUNITY
                        </h1>
                    </div>
                    <div className="text-xs text-zinc-500">
                        {filteredSubmissions.length}{" "}
                        {filteredSubmissions.length === 1
                            ? "SUBMISSION"
                            : "SUBMISSIONS"}
                    </div>
                </div>

                <CommunityFilters allTags={allTags} />

                {filteredSubmissions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[400px] text-zinc-500 border border-zinc-800 p-8">
                        <div className="text-center mb-2 font-bold">
                            NO_SUBMISSIONS_FOUND
                        </div>
                        <div className="text-xs text-center max-w-md">
                            {submissions.length === 0
                                ? "Be the first to submit your ASCII art to the community!"
                                : "No submissions match your current filters. Try adjusting your search or filters."}
                        </div>
                        {submissions.length === 0 && (
                            <Link href="/" className="mt-4">
                                <Button className="terminal-btn">
                                    CREATE_ASCII_ART
                                </Button>
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredSubmissions.map((submission, index) => (
                            <AsciiArtCard
                                key={`${submission.title}-${index}`}
                                submission={submission}
                                onLike={() => likeSubmission(index)}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
