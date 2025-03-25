import type React from "react";
import "../styles/globals.css";
import "./components-override.css";
import Providers from "@/components/providers";
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}

import "../styles/globals.css";

export const metadata = {
    generator: "v0.dev",
};
