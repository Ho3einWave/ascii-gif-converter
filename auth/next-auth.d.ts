import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            username: string;
            image: string;
            email: string;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        id: string;
        name: string;
        username: string;
        image: string;
        email: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        name: string;
        username: string;
        image: string;
        email: string;
    }
}
