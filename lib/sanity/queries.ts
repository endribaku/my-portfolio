import { groq } from "next-sanity";

export const allProjectsQuery = groq`*[_type == "project" && defined(slug.current)] | order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  thumbnailImage
}`;

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  description,
  body,
  thumbnailImage,
  "galleryImages": galleryImages[defined(asset)]{
    _key,
    alt,
    asset->{
      _id,
      url,
      mimeType,
      metadata { dimensions { width, height, aspectRatio } }
    }
  },
  "externalLink": select(
    defined(externalLink.kind) && defined(externalLink.url) => externalLink,
    null
  )
}`;

export const projectSlugsQuery = groq`*[_type == "project" && defined(slug.current)][].slug.current`;
