"use client";

import * as React from "react";
import { queryConfig } from "@/core";
import { PlaceHolder } from "@/components/PlaceHolder";
import { QueryClientProvider } from "@tanstack/react-query";

export default function Page() {
  return (
    <QueryClientProvider client={queryConfig.client}>
      <PlaceHolder />
    </QueryClientProvider>
  );
}
