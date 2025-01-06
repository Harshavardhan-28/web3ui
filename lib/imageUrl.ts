import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const client = createClient({
  projectId: "<3pwx7ra2>", // Replace with your project ID
  dataset: "<production>",     // Replace with your dataset
  apiVersion: "2023-01-01",      // Use a recent API version
  useCdn: true,                  // Enable CDN
});

const builder: ImageUrlBuilder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource): string {
  return builder.image(source).url() || "";
}
