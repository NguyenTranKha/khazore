import { CoverImage } from "@/components/cover-image";
import {
  CATEGORIES,
  featuredPost,
  recentPosts,
  type Category,
  type Post,
} from "@/data/posts";
import { cn } from "@/lib/utils";

type HomePageProps = {
  topic: Category | "all";
  onTopic: (topic: Category | "all") => void;
  onOpen: (post: Post) => void;
};

export function HomePage({ topic, onTopic, onOpen }: HomePageProps) {
  const visible =
    topic === "all" ? recentPosts : recentPosts.filter((post) => post.category === topic);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-12 md:px-8 md:pb-14 md:pt-16">
        <p className="font-serif text-hero font-medium italic tracking-tight text-fg md:text-hero-md">
          Viết chậm về những thứ đáng nhớ
        </p>
        <p className="mt-3 max-w-xl text-meta">
          Một góc viết từ Sài Gòn. Ít bài, đọc chậm, không vội xuất bản cho đủ lịch.
        </p>
        <p className="mt-6">
          <a
            href="/muc-lang.zip"
            download="muc-lang.zip"
            className="inline-flex min-h-11 items-center border border-accent px-4 text-sm text-accent transition-colors duration-150 hover:bg-accent hover:text-bg"
          >
            Tải file ZIP — HTML, CSS, JS
          </a>
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 md:px-8" aria-labelledby="noi-bat-heading">
        <p
          id="noi-bat-heading"
          className="mb-5 font-sans text-kicker font-medium uppercase tracking-kicker text-meta"
        >
          Bài nổi bật
        </p>
        <FeaturedPost post={featuredPost} onOpen={onOpen} />
      </section>

      <section
        id="bai-viet"
        className="mx-auto max-w-6xl scroll-mt-24 px-5 pt-16 md:px-8 md:pt-24"
        aria-labelledby="bai-moi-heading"
      >
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2
            id="bai-moi-heading"
            className="font-sans text-kicker font-medium uppercase tracking-kicker text-meta"
          >
            Bài mới
          </h2>
          {topic !== "all" ? (
            <button
              type="button"
              onClick={() => onTopic("all")}
              className="text-sm text-accent title-link"
            >
              Xem tất cả
            </button>
          ) : null}
        </div>

        {visible.length === 0 ? (
          <p className="text-meta">Chưa có bài trong chủ đề này.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-2 md:gap-y-16">
            {visible.map((post) => (
              <li key={post.id}>
                <PostCard post={post} onOpen={onOpen} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section
        id="chu-de"
        className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 md:px-8 md:py-24"
        aria-labelledby="chu-de-heading"
      >
        <h2
          id="chu-de-heading"
          className="mb-6 font-sans text-kicker font-medium uppercase tracking-kicker text-meta"
        >
          Chủ đề
        </h2>
        <ul className="flex flex-wrap gap-3">
          {CATEGORIES.map((category) => {
            const active = topic === category;
            return (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => {
                    onTopic(active ? "all" : category);
                    document.getElementById("bai-viet")?.scrollIntoView();
                  }}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex min-h-11 items-center border px-3.5 text-sm transition-colors duration-150",
                    active
                      ? "border-accent bg-accent text-bg"
                      : "border-line text-fg hover:border-accent hover:text-accent",
                  )}
                >
                  {category}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section
        id="ve-toi"
        className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-8 md:px-8"
        aria-labelledby="ve-toi-heading"
      >
        <div className="measure border-t border-line pt-14 pb-4">
          <h2
            id="ve-toi-heading"
            className="mb-5 font-sans text-kicker font-medium uppercase tracking-kicker text-meta"
          >
            Về tôi
          </h2>
          <p>
            Tôi viết từ Sài Gòn. Nguyễn Trần Kha là nơi giữ những bài không vội — ghi chép,
            đọc, phố, và vài suy nghĩ về chữ. Không newsletter, không quảng cáo. Chỉ
            trang này, khi có gì đáng nhớ.
          </p>
        </div>
      </section>

      <section
        id="colophon"
        className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-20 md:px-8"
        aria-labelledby="colophon-heading"
      >
        <div className="measure">
          <h2
            id="colophon-heading"
            className="mb-3 font-sans text-kicker font-medium uppercase tracking-kicker text-meta"
          >
            Colophon
          </h2>
          <p className="text-sm text-meta">
            Chữ tiêu đề Fraunces, chữ bài Source Sans 3. Nền giấy ấm, accent xanh rêu.
            Trang được xếp để đọc, không để lướt.
          </p>
        </div>
      </section>
    </div>
  );
}

function FeaturedPost({ post, onOpen }: { post: Post; onOpen: (post: Post) => void }) {
  return (
    <article>
      <button
        type="button"
        onClick={() => onOpen(post)}
        className="block w-full text-left"
        aria-label={`Đọc bài: ${post.title}`}
      >
        <CoverImage
          src={post.image}
          srcSet={post.imageSrcSet}
          alt={post.imageAlt}
          cover={post.cover}
          sizes="(min-width: 1152px) 1152px, 100vw"
          priority
        />
      </button>
      <div className="measure mt-6">
        <h3 className="font-serif text-feature font-medium text-fg md:text-feature-md">
          <button type="button" onClick={() => onOpen(post)} className="text-left title-link">
            {post.title}
          </button>
        </h3>
        <p className="mt-3 text-fg">{post.excerpt}</p>
        <p className="mt-3 text-sm text-meta">
          <span className="text-accent">{post.category}</span>
          <span aria-hidden="true"> · </span>
          <time dateTime={post.date}>{post.dateLabel}</time>
          <span aria-hidden="true"> · </span>
          <span>{post.readingMinutes} phút đọc</span>
        </p>
      </div>
    </article>
  );
}

function PostCard({ post, onOpen }: { post: Post; onOpen: (post: Post) => void }) {
  return (
    <article>
      <button
        type="button"
        onClick={() => onOpen(post)}
        className="block w-full text-left"
        aria-label={`Đọc bài: ${post.title}`}
      >
        <CoverImage
          src={post.image}
          srcSet={post.imageSrcSet}
          alt={post.imageAlt}
          cover={post.cover}
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </button>
      <h3 className="mt-4 font-serif text-title font-medium text-fg md:text-title-md">
        <button type="button" onClick={() => onOpen(post)} className="text-left title-link">
          {post.title}
        </button>
      </h3>
      <p className="mt-2 line-clamp-2 text-fg">{post.excerpt}</p>
      <p className="mt-2 text-sm text-meta">
        <span className="text-accent">{post.category}</span>
        <span aria-hidden="true"> · </span>
        <time dateTime={post.date}>{post.dateLabel}</time>
      </p>
    </article>
  );
}
