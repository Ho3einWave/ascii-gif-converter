import { createUser } from "@/services/api/createUser";
import httpClient from "@/services/httpClient";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const github = GithubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,

    profile: (profile) => {
        return {
            id: profile.id.toString(),
            name: profile.name || profile.login,
            email: profile.email,
            image: profile.avatar_url,
            username: profile.login,
        };
    },
});

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [github],
    callbacks: {
        async signIn({ user }) {
            await createUser(user);
            return true;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.image = token.image as string;
                session.user.username = token.username as string;
            }
            return session;
        },
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.image = user.image;
                token.username = user.username;
            }
            return token;
        },
    },
});
