import "./globals.css";
import "react-toastify/dist/ReactToastify.min.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import { ToastContainer } from "react-toastify";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "Tiệm bách hoá";
const description =
  "This is a Next.js starter kit that uses Next-Auth for simple email + password login and a Postgres database to persist the data.";

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <ThemeProvider>
      <body className={`${inter.variable}`}>
        <Providers>
          <NextAuthProvider session={session}>{children}</NextAuthProvider>
          <ToastContainer />
        </Providers>
      </body>
    </ThemeProvider>
  );
}
