"use client";

import { Button } from "@/components/ui/button";
import { useSignInModal } from "@/lib/store/signin-modal";
import { Share2 } from "lucide-react";
import { useSession } from "next-auth/react";

interface SubmitToCommunityCTAProps {
    onSubmit: () => void;
}

export default function SubmitToCommunityCTA({
    onSubmit,
}: SubmitToCommunityCTAProps) {
    const { setOpen } = useSignInModal();
    const { status } = useSession();
    return (
        <div className="p-4 bg-zinc-900 border-t border-zinc-800">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Share2 className="h-4 w-4 text-zinc-400" />
                    <h3 className="text-xs text-zinc-400 font-bold">
                        SHARE_WITH_COMMUNITY
                    </h3>
                </div>
                {status === "authenticated" ? (
                    <Button
                        onClick={onSubmit}
                        className="h-8 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 rounded-none"
                    >
                        SUBMIT_TO_COMMUNITY
                    </Button>
                ) : (
                    <Button
                        onClick={() => setOpen(true)}
                        className="h-8 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 rounded-none"
                    >
                        SIGN_IN_TO_SUBMIT
                    </Button>
                )}
            </div>
        </div>
    );
}
