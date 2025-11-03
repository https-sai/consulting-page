import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // GitHub Pages uses the repository name as the base path
  // The workflow will automatically inject basePath if needed
};

export default nextConfig;
