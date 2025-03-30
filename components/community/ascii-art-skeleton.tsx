"use client";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AsciiArtSkeleton() {
    return (
        <Card className="terminal-card">
            <CardHeader className="p-4 pb-2 border-b border-zinc-800">
                <CardTitle className="text-zinc-100 text-base font-mono flex justify-between items-start">
                    <Skeleton className="h-6 w-3/4 bg-zinc-800" />
                    <Skeleton className="h-6 w-10 bg-zinc-800" />
                </CardTitle>
                <Skeleton className="h-4 w-1/3 mt-2 bg-zinc-800" />
            </CardHeader>

            <CardContent className="p-0 relative">
                <div
                    className="bg-black p-2 overflow-hidden flex items-center justify-center"
                    style={{ height: "280px" }}
                >
                    <Skeleton className="h-full w-full bg-zinc-900" />
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-3 flex flex-col items-start gap-3 border-t border-zinc-800">
                <div className="flex flex-wrap gap-1">
                    <Skeleton className="h-5 w-16 bg-zinc-800" />
                    <Skeleton className="h-5 w-20 bg-zinc-800" />
                    <Skeleton className="h-5 w-14 bg-zinc-800" />
                </div>

                <div className="flex justify-between items-center w-full">
                    <Skeleton className="h-4 w-1/3 bg-zinc-800" />
                    <Skeleton className="h-4 w-16 bg-zinc-800" />
                </div>
            </CardFooter>
        </Card>
    );
}
