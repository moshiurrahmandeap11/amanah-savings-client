import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { getMessages } from "next-intl/server";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/shared/ProtectedRoute/ProtectedRoute";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Sonchoy Bondhu - Digital Savings Community in Bangladesh",
    template: "%s | Sonchoy Bondhu",
  },
  description:
    "Amanah is Bangladesh's trusted digital savings community platform. Save together, achieve your goals, and build your future in a halal and disciplined way.",
};

export default async function RootLayout({ children }) {
  const messages = await getMessages();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>

          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
