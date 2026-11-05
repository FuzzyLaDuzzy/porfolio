import type { NextConfig } from "next";

// GitHub Pages serves the site from fuzzyladuzzy.github.io/porfolio/: there every page and file needs
// that prefix, and locally none. The build on GitHub Actions sets GITHUB_ACTIONS.
const basePath = process.env.GITHUB_ACTIONS ? "/porfolio" : "";

const nextConfig: NextConfig = {
  output: "export", // plain files for GitHub Pages
  basePath,
  images: { unoptimized: true }, // no image server on GitHub Pages
  env: { NEXT_PUBLIC_BASE_PATH: basePath }, // for asset() in content.ts: next/image and <video> don't add it
};

export default nextConfig;
