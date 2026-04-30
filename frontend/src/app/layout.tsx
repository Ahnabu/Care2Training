import { Inter, Lexend, Montserrat } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";

const lexend = Lexend({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
  variable: "--font-display",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Care2 Training",
  description: "Healthcare learning experiences for modern teams.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn(lexend.variable, inter.variable, montserrat.variable, "font-sans")} suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
