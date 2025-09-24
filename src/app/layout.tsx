import "../assets/globals.css";

export const metadata = {
    title: "Uniform Web",
    description: "My Next.js project",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    );
}

