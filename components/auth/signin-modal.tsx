import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { Github } from "lucide-react";
type SignInModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const SignInModal = ({ open, onOpenChange }: SignInModalProps) => {
    const signInWithGithub = () => {
        signIn("github", { callbackUrl: "/" });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-zinc-950 border-zinc-800">
                <DialogHeader>
                    <DialogTitle>Sign in</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Sign in to your account to continue
                </DialogDescription>
                <Button
                    className="w-full bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 rounded-none"
                    onClick={signInWithGithub}
                >
                    <Github className="w-4 h-4 mr-2" />
                    Sign in with Github
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default SignInModal;
