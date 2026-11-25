"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schemaTypes";
import { sanityDataset, sanityProjectId } from "./src/sanity/env";

export default defineConfig({
  basePath: "/studio",
  name: "vet-nang-studio",
  title: "Vệt Nắng — Studio Viết Bài",
  projectId: sanityProjectId || "demo-placeholder",
  dataset: sanityDataset,
  schema,
  plugins: [structureTool()],
});
