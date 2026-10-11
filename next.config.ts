import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages отдаёт только статику, поэтому собираем сайт в папку out/
  output: "export",
  // на Pages сайт живёт в /ResumeNR — путь подставляет workflow, локально он пустой
  basePath: process.env.PAGES_BASE_PATH || "",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
