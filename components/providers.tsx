"use client";

import { SessionProvider } from "next-auth/react";
import { useSignInModal } from "@/lib/store/signin-modal";
import SignInModal from "./auth/signin-modal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
const queryClient = new QueryClient();
import { NuqsAdapter } from "nuqs/adapters/next/app";
export default function Providers({ children }: { children: React.ReactNode }) {
    const { open, setOpen } = useSignInModal();
    return (
        <NuqsAdapter>
            <QueryClientProvider client={queryClient}>
                <SessionProvider>
                    {children}
                    <SignInModal open={open} onOpenChange={setOpen} />
                    <Toaster />
                </SessionProvider>
            </QueryClientProvider>
        </NuqsAdapter>
    );
}
