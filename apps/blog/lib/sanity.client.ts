import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const sanityConfig =
  projectId && dataset
    ? {
        projectId,
        dataset
      }
    : null;

export const sanityClient = sanityConfig
  ? createClient({
      ...sanityConfig,
      apiVersion: "2024-01-01",
      useCdn: false,
      ...(typeof window === "undefined" &&
      (process.env.SANITY_READ_TOKEN || process.env.SANITY_WRITE_TOKEN)
        ? {
            token:
              process.env.SANITY_READ_TOKEN || process.env.SANITY_WRITE_TOKEN || undefined
          }
        : {})
    })
  : null;
