import { useState } from "react";
import { cn } from "@/lib/utils";
import type { CoverTone } from "@/data/posts";

const TONE_CLASS: Record<CoverTone, string> = {
  moss: "bg-cover-moss",
  ink: "bg-cover-ink",
  clay: "bg-cover-clay",
  tea: "bg-cover-tea",
  pine: "bg-cover-pine",
};

type CoverImageProps = {
  src: string;
  srcSet?: string;
  alt: string;
  cover: CoverTone;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function CoverImage({
  src,
  srcSet,
  alt,
  cover,
  className,
  sizes,
  priority = false,
}: CoverImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "cover-frame aspect-video w-full overflow-hidden",
        TONE_CLASS[cover],
        className,
      )}
    >
      {failed ? (
        <span className="sr-only">{alt}</span>
      ) : (
        <img
          src={src}
          srcSet={srcSet}
          alt={alt}
          sizes={sizes}
          width={1600}
          height={900}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      )}
    </div>
  );
}
