"use client";

import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Copy, Check, Code } from "lucide-react";
import { getCodeSnippet } from "@/lib/ascii-converter/code-generator";
import { useAsciiConverterStore } from "@/lib/store/ascii-converter-store";

export default function CodeSnippetSection() {
    const { frames, currentFrame, fps } = useAsciiConverterStore();
    const [language, setLanguage] = useState("javascript");
    const [copied, setCopied] = useState(false);
    const codeRef = useRef<HTMLTextAreaElement>(null);

    const copyToClipboard = () => {
        if (codeRef.current) {
            codeRef.current.select();
            document.execCommand("copy");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="p-4 bg-zinc-900 border-t border-zinc-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-zinc-400" />
                    <h3 className="text-xs text-zinc-400 font-bold">
                        CODE_SNIPPET
                    </h3>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-[180px] h-8 text-xs bg-zinc-900 border-zinc-700 rounded-none">
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-700 rounded-none text-zinc-100">
                            <SelectItem
                                value="javascript"
                                className="text-xs focus:bg-zinc-800 focus:text-zinc-100 rounded-none"
                            >
                                JavaScript
                            </SelectItem>
                            <SelectItem
                                value="python"
                                className="text-xs focus:bg-zinc-800 focus:text-zinc-100 rounded-none"
                            >
                                Python
                            </SelectItem>
                            <SelectItem
                                value="csharp"
                                className="text-xs focus:bg-zinc-800 focus:text-zinc-100 rounded-none"
                            >
                                C#
                            </SelectItem>
                            <SelectItem
                                value="java"
                                className="text-xs focus:bg-zinc-800 focus:text-zinc-100 rounded-none"
                            >
                                Java
                            </SelectItem>
                            <SelectItem
                                value="go"
                                className="text-xs focus:bg-zinc-800 focus:text-zinc-100 rounded-none"
                            >
                                Go
                            </SelectItem>
                            <SelectItem
                                value="rust"
                                className="text-xs focus:bg-zinc-800 focus:text-zinc-100 rounded-none"
                            >
                                Rust
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                        className="h-8 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 rounded-none"
                    >
                        {copied ? (
                            <Check className="h-3 w-3 mr-1" />
                        ) : (
                            <Copy className="h-3 w-3 mr-1" />
                        )}
                        {copied ? "COPIED" : "COPY"}
                    </Button>
                </div>
            </div>
            <div className="bg-zinc-950 border border-zinc-800">
                <Textarea
                    ref={codeRef}
                    value={getCodeSnippet(frames, language, fps)}
                    readOnly
                    className="font-mono text-xs bg-transparent border-0 resize-none h-[200px] rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>
        </div>
    );
}
