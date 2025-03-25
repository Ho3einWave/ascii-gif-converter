import { useSignInModal } from "@/lib/store/signin-modal";
import { Button } from "../ui/button";
import { useSession, signOut } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
export default function SignInButton() {
    const { data: session, status } = useSession();
    console.log("session", session);
    const { setOpen } = useSignInModal();

    const handleSignIn = () => {
        if (session) {
            signOut();
        } else {
            setOpen(true);
        }
    };

    if (status === "loading") {
        return (
            <Skeleton className="h-8 min-w-24 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 rounded-none" />
        );
    }

    return (
        <Button
            variant={session ? "default" : "outline"}
            className="h-8 bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 rounded-none"
            onClick={handleSignIn}
        >
            {session ? (
                <>
                    <Avatar className="h-4 w-4">
                        <AvatarImage src={session.user?.image || ""} />
                        <AvatarFallback>
                            {session.user?.name?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    {session.user?.name}
                    <LogOut className="h-4 w-4 ml-1" />
                </>
            ) : (
                <>
                    Login
                    <LogIn className="h-4 w-4 ml-1" />
                </>
            )}
        </Button>
    );
}
