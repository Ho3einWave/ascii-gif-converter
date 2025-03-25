import type React from "react";
import "./globals.css";
import "./components-override.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}

import "./globals.css";

export const metadata = {
    generator: "v0.dev",
};
