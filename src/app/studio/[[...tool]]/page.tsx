"use client";

import React from "react";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";
import { StudioOnboarding } from "@/components/StudioOnboarding";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return <StudioOnboarding />;
  }

  return <NextStudio config={config} />;
}
