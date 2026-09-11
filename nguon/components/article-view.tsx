import { ArrowLeft } from "lucide-react";
import { CoverImage } from "@/components/cover-image";
import type { Post } from "@/data/posts";

type ArticleViewProps = {
  post: Post;
  onBack: () => void;
};

export function ArticleView({ post, onBack }: ArticleViewProps) {
  return (
    <article className="mx-auto w-full max-w-3xl px-5 pb-20 pt-10 md:px-8 md:pt-14">
      <button
        type="button"
        onClick={onBack}
        className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm text-meta title-link"
      >
        <ArrowLeft className="size-4" strokeWidth={1.6} aria-hidden="true" />
        Tất cả bài viết
      </button>

      <p className="mb-3 text-sm tracking-wide text-accent">{post.category}</p>
      <h1 className="font-serif text-article font-medium text-fg md:text-article-md">{post.title}</h1>
      <p className="mt-4 text-sm text-meta">
        <time dateTime={post.date}>{post.dateLabel}</time>
        <span aria-hidden="true"> · </span>
        <span>{post.readingMinutes} phút đọc</span>
      </p>

      <CoverImage
        src={post.image}
        srcSet={post.imageSrcSet}
        alt={post.imageAlt}
        cover={post.cover}
        sizes="(min-width: 768px) 768px, 100vw"
        className="mt-8"
        priority
      />

      <div className="measure mt-10 space-y-5 text-fg">
        {post.body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
