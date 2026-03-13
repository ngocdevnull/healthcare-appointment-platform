import type { NextConfig } from "next";

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("❌ Missing environment variable: 'NEXT_PUBLIC_API_URL'. Please add it to your .env file at the root directory to run the project!");
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
