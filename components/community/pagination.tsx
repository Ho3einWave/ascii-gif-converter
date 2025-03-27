"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    // Calculate which page numbers to show
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            // Show all pages if there are fewer than maxPagesToShow
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            // Calculate start and end of page range
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            // Adjust if we're at the beginning
            if (currentPage <= 2) {
                end = Math.min(totalPages - 1, 4);
            }

            // Adjust if we're at the end
            if (currentPage >= totalPages - 1) {
                start = Math.max(2, totalPages - 3);
            }

            // Add ellipsis if needed
            if (start > 2) {
                pages.push(-1); // -1 represents ellipsis
            }

            // Add middle pages
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            // Add ellipsis if needed
            if (end < totalPages - 1) {
                pages.push(-2); // -2 represents ellipsis
            }

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex flex-col items-center justify-center mt-8 mb-4 gap-3">
            <div className="text-xs text-zinc-500 mb-1">PAGE_NAVIGATION</div>

            <div className="flex items-center justify-center gap-1">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="terminal-btn h-8 px-2"
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous page</span>
                </Button>

                {getPageNumbers().map((page, index) => {
                    if (page < 0) {
                        // Render ellipsis
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="text-xs text-zinc-500 px-2"
                            >
                                ...
                            </span>
                        );
                    }

                    return (
                        <Button
                            key={page}
                            variant={
                                currentPage === page ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => onPageChange(page)}
                            className={
                                currentPage === page
                                    ? "terminal-btn-primary h-8 w-8 p-0"
                                    : "terminal-btn h-8 w-8 p-0"
                            }
                        >
                            {page}
                        </Button>
                    );
                })}

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="terminal-btn h-8 px-2"
                >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next page</span>
                </Button>
            </div>
        </div>
    );
}
