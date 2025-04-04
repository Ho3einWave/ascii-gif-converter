"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import SignInButton from "../auth/signin-button";

interface AsciiConverterHeaderProps {
    children?: React.ReactNode;
}

export default function AsciiConverterHeader({
    children,
}: AsciiConverterHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-10">
            <div className="max-w-5xl mx-auto px-4 py-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex space-x-2 mr-4">
                            <div className="w-3 h-3 bg-zinc-700 hover:bg-zinc-500 transition-colors"></div>
                            <div className="w-3 h-3 bg-zinc-700 hover:bg-zinc-500 transition-colors"></div>
                            <div className="w-3 h-3 bg-zinc-700 hover:bg-zinc-500 transition-colors"></div>
                        </div>
                        <div className="text-xs text-zinc-400 font-bold tracking-wider">
                            <span className="text-zinc-300">
                                ASCII_CONVERTER.EXE
                            </span>
                        </div>
                    </div>

                    {/* Desktop navigation */}
                    <div className="hidden sm:flex items-center gap-2">
                        {children}
                        <SignInButton />
                    </div>

                    {/* Mobile menu button */}
                    <div className="sm:hidden">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleMenu}
                            className="h-8 w-8 p-0 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                        >
                            {isMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="sm:hidden py-3 border-t border-zinc-800 mt-2 space-y-2">
                        <div className="pt-2 flex  gap-2 flex-wrap ">
                            {children} <SignInButton />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
