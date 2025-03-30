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
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}

export const metadata = {
    title: "ASCII Art Converter",
    description: "Convert images to ASCII art",
};
