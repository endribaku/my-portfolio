import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { GalleryImage } from "@/lib/sanity/types";

type Props = {
  images: GalleryImage[];
  fallbackAlt: string;
};

export function Gallery({ images, fallbackAlt }: Props) {
  if (!images?.length) return null;

  return (
    <div
      className="
        overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
        ml-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))]
        md:ml-[max(2.5rem,calc((100vw-64rem)/2+2.5rem))]
      "
      role="region"
      aria-label="Project gallery"
    >
      <div className="flex gap-4">
        {images.map((image, index) => {
          const isGif = image.asset.mimeType === "image/gif";
          const dim = image.asset.metadata?.dimensions;
          const isMobile =
            !isGif && dim ? dim.height > dim.width : false;

          let src: string;
          let width: number;
          let height: number;
          let containerClass: string;
          let imageClass: string;

          if (isGif) {
            src = image.asset.url;
            width = 1500;
            height = 1000;
            containerClass = "shrink-0 h-[60vh] bg-fg";
            imageClass = "h-full w-auto";
          } else if (isMobile) {
            src = urlFor(image).width(540).height(1170).fit("crop").url();
            width = 540;
            height = 1170;
            containerClass = "shrink-0 h-[60vh] aspect-[9/19.5] bg-fg";
            imageClass = "h-full w-full object-cover";
          } else {
            src = urlFor(image).width(1500).height(1000).fit("crop").url();
            width = 1500;
            height = 1000;
            containerClass = "shrink-0 h-[60vh] aspect-3/2 bg-fg";
            imageClass = "h-full w-full object-cover";
          }

          const alt = image.alt ?? `${fallbackAlt} — image ${index + 1}`;
          return (
            <div
              key={image._key ?? image.asset._id}
              className={containerClass}
            >
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                unoptimized={isGif}
                className={imageClass}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
