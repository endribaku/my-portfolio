import type { PortableTextBlock } from "@portabletext/types";
import type { Image } from "sanity";

export type SanityImageWithAlt = Image & {
  alt?: string;
};

export type GalleryImage = {
  _key?: string;
  _type?: "image";
  alt?: string;
  asset: {
    _id: string;
    url: string;
    mimeType: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
        aspectRatio: number;
      };
    };
  };
};

export type ProjectListItem = {
  _id: string;
  title: string;
  slug: string;
  thumbnailImage: SanityImageWithAlt;
};

export type ExternalLink = {
  kind: "site" | "repo";
  url: string;
};

export type Project = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  body?: PortableTextBlock[];
  thumbnailImage: SanityImageWithAlt;
  galleryImages?: GalleryImage[];
  externalLink?: ExternalLink;
};
