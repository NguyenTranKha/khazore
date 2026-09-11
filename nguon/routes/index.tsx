import { useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArticleView } from "@/components/article-view";
import { HomePage } from "@/components/home-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { postBySlug, type Category, type Post } from "@/data/posts";

export const Route = createFileRoute("/")({ component: Home });

function readHashSlug(): string | null {
  if (typeof window === "undefined") return null;
  const match = window.location.hash.match(/^#bai\/(.+)$/);
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}

function clearArticleHash() {
  if (window.location.hash.startsWith("#bai/")) {
    history.pushState(null, "", `${window.location.pathname}${window.location.search}`);
  }
}

function Home() {
  const [slug, setSlug] = useState<string | null>(null);
  const [topic, setTopic] = useState<Category | "all">("all");

  useEffect(() => {
    const apply = () => setSlug(readHashSlug());
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const openPost = useCallback((post: Post) => {
    setSlug(post.slug);
    window.location.hash = `bai/${post.slug}`;
  }, []);

  const goHome = useCallback(() => {
    setSlug(null);
    setTopic("all");
    clearArticleHash();
    window.scrollTo(0, 0);
  }, []);

  const goSection = useCallback(
    (id: string) => {
      const hadArticle = Boolean(slug);
      setSlug(null);
      clearArticleHash();
      const scroll = () => document.getElementById(id)?.scrollIntoView();
      if (hadArticle) {
        window.setTimeout(scroll, 0);
      } else {
        scroll();
      }
    },
    [slug],
  );

  const post = slug ? (postBySlug(slug) ?? null) : null;

  useEffect(() => {
    document.title = post ? `${post.title} — Mực Lặng` : "Mực Lặng";
  }, [post]);

  useEffect(() => {
    if (slug) window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") goHome();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [post, goHome]);

  return (
    <div className="min-h-screen bg-bg text-fg">
      <SiteHeader onLogo={goHome} onSection={goSection} />
      <main id="noi-dung">
        {post ? (
          <ArticleView post={post} onBack={goHome} />
        ) : (
          <HomePage topic={topic} onTopic={setTopic} onOpen={openPost} />
        )}
      </main>
      <SiteFooter onNavigate={goSection} />
    </div>
  );
}
