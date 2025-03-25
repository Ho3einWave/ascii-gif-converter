"use client";

import { SessionProvider } from "next-auth/react";
import { useSignInModal } from "@/lib/store/signin-modal";
import SignInModal from "./auth/signin-modal";

export default function Providers({ children }: { children: React.ReactNode }) {
    const { open, setOpen } = useSignInModal();
    return (
        <SessionProvider>
            {children}
            <SignInModal open={open} onOpenChange={setOpen} />
        </SessionProvider>
    );
}
