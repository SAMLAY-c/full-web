import { createClient, type ClientConfig } from "@sanity/client";

/**
 * 获取环境变量（用于脚本环境）
 */
function getEnv() {
  require("dotenv").config({ path: ".env.local" });

  return {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    writeToken: process.env.SANITY_WRITE_TOKEN,
  };
}

const env = getEnv();

if (!env.projectId || !env.dataset) {
  throw new Error("Missing Sanity environment variables");
}

export const sanityConfig: ClientConfig = {
  projectId: env.projectId,
  dataset: env.dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
};

export const sanityWriteClient = env.writeToken
  ? createClient({
      ...sanityConfig,
      token: env.writeToken,
    })
  : null;
