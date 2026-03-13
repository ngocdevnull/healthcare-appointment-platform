import type { Metadata } from "next";
import { AuthProvider } from "@context/auth-context";

import "./globals.css";

export const metadata: Metadata = {
  title: "Doct",
  description: "Healthcare Appointment Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
