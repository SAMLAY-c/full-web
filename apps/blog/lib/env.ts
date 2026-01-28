import "server-only";

import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
  SANITY_READ_TOKEN: z.string().optional(),
  SANITY_WRITE_TOKEN: z.string().optional()
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  SANITY_READ_TOKEN: process.env.SANITY_READ_TOKEN,
  SANITY_WRITE_TOKEN: process.env.SANITY_WRITE_TOKEN
});
