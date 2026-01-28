import "server-only";

import { createClient } from "@sanity/client";
import { env } from "../env";

export const sanityConfig = {
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  perspective: "raw" as const
} as const;

export const sanityClient = env.SANITY_WRITE_TOKEN
  ? createClient({
      ...sanityConfig,
      token: env.SANITY_WRITE_TOKEN
    })
  : createClient(sanityConfig);

export const sanityWriteClient = env.SANITY_WRITE_TOKEN
  ? sanityClient.withConfig({ token: env.SANITY_WRITE_TOKEN })
  : null;

export const sanityReadClient =
  env.SANITY_READ_TOKEN && !env.SANITY_WRITE_TOKEN
    ? sanityClient.withConfig({ token: env.SANITY_READ_TOKEN })
    : sanityWriteClient;
