import imageUrlBuilder from "@sanity/image-url";
import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import { sanityConfig } from "./sanity.client";

type ImageSource = Parameters<ImageUrlBuilder["image"]>[0];

type UrlForInput = ImageSource | string | null | undefined;

const builder = sanityConfig
  ? imageUrlBuilder({
      projectId: sanityConfig.projectId,
      dataset: sanityConfig.dataset
    })
  : null;

export function urlFor(source: UrlForInput) {
  if (!source) {
    return null;
  }

  if (typeof source === "string") {
    return {
      url: () => source,
      width: () => ({ url: () => source })
    } as unknown as ImageUrlBuilder;
  }

  return builder?.image(source) ?? null;
}
