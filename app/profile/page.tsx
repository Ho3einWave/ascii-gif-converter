"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AsciiConverterHeader from "@/components/ascii-converter/header";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    User,
    Trash2,
    Calendar,
    Eye,
    ThumbsUp,
    PlusCircle,
    Users,
    ArrowLeft,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { useGetUserArts } from "@/hooks/profile/useGetUserArts";
import { useDeleteArtById } from "@/hooks/profile/useDeleteArtById";

export default function ProfilePage() {
    const router = useRouter();
    const { mutateAsync: deleteArt } = useDeleteArtById();
    const { data: userArts } = useGetUserArts();
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const handleDeleteSubmission = (id: string) => {
        setDeleteId(id);
        setIsAlertOpen(true);
    };

    const confirmDelete = () => {
        if (deleteId) {
            setDeleteId(null);
            deleteArt(deleteId);
        }
        setIsAlertOpen(false);
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono">
            <AsciiConverterHeader>
                <Link href="/">
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 rounded-none"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        CONVERTER
                    </Button>
                </Link>
                <Link href="/community">
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 rounded-none"
                    >
                        <Users className="h-4 w-4 mr-2" />
                        COMMUNITY
                    </Button>
                </Link>
            </AsciiConverterHeader>

            <main className="max-w-5xl mx-auto p-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-zinc-400" />
                        <h1 className="text-xl font-bold text-zinc-100">
                            MY_SUBMISSIONS
                        </h1>
                    </div>
                    <div className="text-xs text-zinc-500">
                        {[].length}{" "}
                        {[].length === 1 ? "SUBMISSION" : "SUBMISSIONS"}
                    </div>
                </div>

                {userArts?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[300px] text-zinc-500 border border-zinc-800 p-8">
                        <div className="text-center mb-2 font-bold">
                            NO_SUBMISSIONS_FOUND
                        </div>
                        <div className="text-xs text-center max-w-md mb-4">
                            You haven't created any ASCII art submissions yet.
                        </div>
                        <Button
                            onClick={() => router.push("/")}
                            className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 rounded-none"
                        >
                            <PlusCircle className="h-4 w-4 mr-2" />
                            CREATE_ASCII_ART
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userArts?.map((submission) => (
                            <Card
                                key={submission.id}
                                className="bg-zinc-900 border-zinc-800 rounded-none hover:border-zinc-700 transition-colors"
                            >
                                <CardHeader className="p-4 pb-2 border-b border-zinc-800 flex flex-row items-start justify-between">
                                    <div>
                                        <CardTitle className="text-zinc-100 text-base font-mono">
                                            {submission.title}
                                        </CardTitle>
                                        <div className="flex items-center text-xs text-zinc-500 mt-1">
                                            <Calendar className="h-3.5 w-3.5 mr-1" />
                                            {format(
                                                new Date(submission.createdAt),
                                                "PPP"
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-zinc-800 text-zinc-400 text-xs rounded-none">
                                            <ThumbsUp className="h-3 w-3 mr-1" />
                                            {submission.likesCount}
                                        </Badge>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                handleDeleteSubmission(
                                                    submission.id
                                                )
                                            }
                                            className="h-8 w-8 p-0 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors rounded-none"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">
                                                Delete
                                            </span>
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0 flex flex-col sm:flex-row">
                                    <div
                                        className="bg-black p-2 overflow-hidden flex items-center justify-center sm:w-1/3"
                                        style={{ height: "120px" }}
                                    >
                                        <pre
                                            style={{
                                                fontSize: "4px",
                                                lineHeight: 1,
                                                whiteSpace: "pre",
                                                fontFamily: "monospace",
                                                color: submission.metadata
                                                    .invert
                                                    ? "#000"
                                                    : "#fff",
                                                backgroundColor: submission
                                                    .metadata.invert
                                                    ? "#fff"
                                                    : "transparent",
                                                margin: "0 auto",
                                                textAlign: "center",
                                            }}
                                        >
                                            {submission.previewFrame}
                                        </pre>
                                    </div>
                                    <div className="p-4 sm:w-2/3">
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {submission.tags.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    className="bg-zinc-800 text-zinc-400 text-xs rounded-none"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="text-xs text-zinc-500">
                                            Dimensions:{" "}
                                            {submission.metadata.width}x
                                            {submission.metadata.height} • FPS:{" "}
                                            {submission.metadata.fps} •
                                            {submission.metadata.invert
                                                ? " Inverted"
                                                : " Normal"}
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-3 border-t border-zinc-800">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            router.push(`/art/${submission.id}`)
                                        }
                                        className="h-8 text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-none ml-auto"
                                    >
                                        <Eye className="h-3.5 w-3.5 mr-1" />
                                        VIEW_DETAILS
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </main>

            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent className="bg-zinc-900 border-zinc-700 text-zinc-100 rounded-none">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Delete ASCII Art Submission
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-zinc-400">
                            Are you sure you want to delete this submission?
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 rounded-none">
                            CANCEL
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-red-600 text-white hover:bg-red-700 rounded-none"
                        >
                            DELETE
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
