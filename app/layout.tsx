import type { Metadata } from "next";
import './globals.css'

export const metadata: Metadata = {
  title: "The Origin - Pioneering Intelligence",
  description: "Next-generation AI technology parent company pioneering autonomous intelligence systems across cybersecurity, research, and innovation.",
  keywords: "AI, Artificial Intelligence, Machine Learning, Cybersecurity, Quantum Computing, Autonomous Systems, The Origin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
