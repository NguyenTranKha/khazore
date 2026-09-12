#!/usr/bin/env node
/**
 * Gen HTML cho bài Markdown.
 * Nguồn: md/*.md  →  bai/<slug>.html + cập nhật index.html, posts.json
 * Không xóa bài HTML cũ nếu chưa có file .md tương ứng.
 */
const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const ROOT = path.resolve(__dirname, "..");
const MD_DIR = path.join(ROOT, "md");
const BAI_DIR = path.join(ROOT, "bai");
const IMG_DIR = path.join(ROOT, "img");
const INDEX_PATH = path.join(ROOT, "index.html");
const POSTS_JSON = path.join(ROOT, "posts.json");

const COVERS = new Set(["clay", "ink", "moss", "tea", "pine"]);
const TOPIC_ORDER = ["Đọc", "Ở Sài Gòn", "Ghi chép", "Thiết kế"];

marked.use({ gfm: true, breaks: false });

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "\u0026amp;")
    .replace(/</g, "\u0026lt;")
    .replace(/>/g, "\u0026gt;")
    .replace(/"/g, "\u0026quot;");
}

function parseFrontmatter(raw) {
  const text = raw.replace(/^\uFEFF/, "");
  if (!text.startsWith("---")) return { data: {}, content: text };
  const nl = text.indexOf("\n");
  const end = text.indexOf("\n---", nl);
  if (end === -1) return { data: {}, content: text };
  const yaml = text.slice(nl + 1, end);
  let content = text.slice(end + 4);
  if (content.startsWith("\n")) content = content.slice(1);
  const data = {};
  for (const line of yaml.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    if (v === "true") v = true;
    else if (v === "false") v = false;
    else if (/^-?\d+$/.test(v)) v = Number(v);
    data[m[1]] = v;
  }
  return { data, content };
}

function dateLabel(iso) {
  const [y, m, d] = String(iso).split("-").map(Number);
  if (!y || !m || !d) return String(iso);
  return `${d} tháng ${m}, ${y}`;
}

function todayIso() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function countWords(md) {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_`~\-|=]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function hasMath(md) {
  return /\$\$[\s\S]+?\$\$/.test(md) || /(^|[^$])\$[^$\n]+\$(?!\$)/.test(md);
}

function rewriteImgSrc(src) {
  if (!src) return src;
  if (/^(https?:)?\/\//i.test(src) || src.startsWith("data:")) return src;
  let s = src.replace(/^\.\//, "");
  if (s.startsWith("../img/")) return s;
  if (s.startsWith("/img/")) return `..${s}`;
  if (s.startsWith("img/")) return `../${s}`;
  if (!s.includes("/")) return `../img/${s}`;
  return s;
}

function renderBody(md) {
  let html = marked.parse(md, { async: false });
  html = html.replace(
    /<img\s([^>]*?)src="([^"]+)"/g,
    (_, attrs, src) => `<img ${attrs}src="${esc(rewriteImgSrc(src))}"`
  );
  html = html.replace(/<a\s([^>]*?)href="(https?:\/\/[^"]+)"([^>]*)>/g, (m, pre, href, post) => {
    if (/\btarget=/.test(pre + post)) return m;
    return `<a ${pre}href="${href}"${post} target="_blank" rel="noopener noreferrer">`;
  });
  return html.trim();
}

function extractParagraphs(md) {
  return md
    .split(/\n{2,}/)
    .map((block) =>
      block
        .replace(/^#{1,6}\s+/, "")
        .replace(/^>\s?/gm, "")
        .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[*_`]/g, "")
        .replace(/\s+/g, " ")
        .trim()
    )
    .filter((p) => p && !p.startsWith("|") && !p.startsWith("- ") && p !== "---");
}

function coverFile(post) {
  return String(post.coverImage || `${post.slug}.jpg`).replace(/^img\//, "");
}

function loadPosts() {
  if (!fs.existsSync(MD_DIR)) {
    throw new Error("Không thấy thư mục md/. Hãy đặt file .md vào md/");
  }
  const files = fs
    .readdirSync(MD_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_") && f.toLowerCase() !== "readme.md")
    .sort();

  const posts = [];
  for (const file of files) {
    const slug = file.replace(/\.md$/i, "");
    const raw = fs.readFileSync(path.join(MD_DIR, file), "utf8");
    const { data, content } = parseFrontmatter(raw);
    if (data.draft === true) continue;
    let mdBody = content.trim();
    let title = data.title;
    if (!title) {
      const h1 = mdBody.match(/^#\s+(.+?)\s*$/m);
      if (h1) {
        title = h1[1].replace(/\*+/g, "").trim();
        mdBody = mdBody.replace(h1[0], "").trim();
      } else {
        title = slug;
      }
    }
    const paras = extractParagraphs(mdBody);
    const date = data.date ? String(data.date) : todayIso();
    const cover = COVERS.has(String(data.cover)) ? String(data.cover) : "clay";
    const words = countWords(mdBody);
    const readingMinutes =
      Number(data.readingMinutes) > 0
        ? Number(data.readingMinutes)
        : Math.max(1, Math.round(words / 180));
    posts.push({
      slug,
      title,
      excerpt: data.excerpt || paras[0] || "",
      category: data.category || "Ghi chép",
      date,
      dateLabel: dateLabel(date),
      readingMinutes,
      imageAlt: data.imageAlt || title,
      cover,
      featured: data.featured === true,
      coverImage: data.coverImage || `${slug}.jpg`,
      bodyMd: mdBody,
      bodyHtml: renderBody(mdBody),
      body: paras,
      math: hasMath(mdBody),
    });
  }

  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return posts;
}

function katexBlock() {
  return `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" />
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function () {
  if (window.renderMathInElement) {
    renderMathInElement(document.querySelector(".article__body") || document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false }
      ],
      throwOnError: false
    });
  }
});
</script>`;
}

function articleHtml(post) {
  const imgSrc = `../img/${coverFile(post)}`;
  return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(post.title)} — Nguyễn Trần Kha</title>
<meta name="description" content="${esc(post.excerpt)}" />
<meta name="theme-color" content="#F6F3EE" />
<link rel="icon" type="image/svg+xml" href="../favicon.svg" />
<link rel="stylesheet" href="../css/fonts.css" />
<link rel="stylesheet" href="../css/styles.css" />
${post.math ? katexBlock() : ""}<script>
(function(){try{var t=localStorage.getItem("muc-lang-theme");if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","light");}})();
</script>
</head>
<body>

<header class="site-header">
  <a class="sr-only" href="#noi-dung">Bỏ qua đến nội dung</a>
  <div class="wrap site-header__inner">
    <a class="logo title-link" href="../index.html">Nguyễn Trần Kha</a>
    <nav class="nav" aria-label="Chính"><ul>
      <li><a class="title-link" href="../index.html#bai-viet">Viết</a></li>
      <li><a class="title-link" href="../index.html#chu-de">Chủ đề</a></li>
      <li><a class="title-link" href="../index.html#ve-toi">Về tôi</a></li>
    </ul></nav>
    <button type="button" class="theme-toggle" data-theme-toggle aria-label="Chuyển sang giao diện tối">
  <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 3v1.5M12 19.5V21M4.93 4.93l1.06 1.06M18.01 18.01l1.06 1.06M3 12h1.5M19.5 12H21M4.93 19.07l1.06-1.06M18.01 5.99l1.06-1.06"/></svg>
  <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z"/></svg>
</button>
  </div>
</header>
<main id="noi-dung">
<article class="article">
<a class="article__back title-link" href="../index.html">
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
Tất cả bài viết
</a>
<p class="article__cat">${esc(post.category)}</p>
<h1 class="article__title">${esc(post.title)}</h1>
<p class="article__meta"><time datetime="${esc(post.date)}">${esc(post.dateLabel)}</time> · ${post.readingMinutes} phút đọc</p>
<div class="cover cover--${esc(post.cover)}">
<img src="${esc(imgSrc)}" alt="${esc(post.imageAlt)}" width="1400" height="788" />
</div>
<div class="article__body measure">
${post.bodyHtml}
</div>
</article>
</main>
<footer class="site-footer">
  <div class="wrap site-footer__inner">
    <p>© 2026 Nguyễn Trần Kha</p>
    <ul>
      <li><a class="title-link" href="../index.html#chu-de">Chủ đề</a></li>
      <li><a class="title-link" href="../index.html#ve-toi">Về tôi</a></li>
      <li><a class="title-link" href="../index.html#colophon">Colophon</a></li>
    </ul>
  </div>
</footer>
<script src="../js/theme.js"></script>
</body></html>
`;
}

function cardHtml(post, prefix) {
  const imgFile = coverFile(post);
  return `<li data-category="${esc(post.category)}">
<article class="card">
<a class="cover-btn" href="${prefix}bai/${esc(post.slug)}.html" aria-label="Đọc bài: ${esc(post.title)}"><div class="cover cover--${esc(post.cover)}">
<img src="${prefix}img/${esc(imgFile)}" alt="${esc(post.imageAlt)}" width="1400" height="788" />
</div></a>
<h3 class="card__title"><a class="title-link" href="${prefix}bai/${esc(post.slug)}.html">${esc(post.title)}</a></h3>
<p class="card__excerpt">${esc(post.excerpt)}</p>
<p class="card__meta"><span class="meta-accent">${esc(post.category)}</span> · <time datetime="${esc(post.date)}">${esc(post.dateLabel)}</time></p>
</article>
</li>`;
}

function featuredHtml(post) {
  const imgFile = coverFile(post);
  return `<section class="featured wrap" aria-labelledby="noi-bat-heading">
<p id="noi-bat-heading" class="kicker">Bài nổi bật</p>
<article>
<a class="cover-btn" href="bai/${esc(post.slug)}.html" aria-label="Đọc bài: ${esc(post.title)}"><div class="cover cover--${esc(post.cover)}">
<img src="img/${esc(imgFile)}" alt="${esc(post.imageAlt)}" width="1400" height="788" />
</div></a>
<div class="measure featured__copy">
<h3 class="featured__title"><a class="title-link" href="bai/${esc(post.slug)}.html">${esc(post.title)}</a></h3>
<p class="featured__excerpt">${esc(post.excerpt)}</p>
<p class="featured__meta"><span class="meta-accent">${esc(post.category)}</span> · <time datetime="${esc(post.date)}">${esc(post.dateLabel)}</time> · ${post.readingMinutes} phút đọc</p>
</div>
</article>
</section>`;
}

function topicsHtml(posts) {
  const seen = new Set();
  const extra = [];
  for (const p of posts) {
    if (!seen.has(p.category)) {
      seen.add(p.category);
      extra.push(p.category);
    }
  }
  const ordered = [
    ...TOPIC_ORDER.filter((t) => seen.has(t)),
    ...extra.filter((t) => !TOPIC_ORDER.includes(t)),
  ];
  return ordered
    .map((t) => `<li><button type="button" class="tag" data-topic="${esc(t)}">${esc(t)}</button></li>`)
    .join("");
}

function updateIndex(posts) {
  if (!fs.existsSync(INDEX_PATH)) {
    throw new Error("Không thấy index.html");
  }
  let html = fs.readFileSync(INDEX_PATH, "utf8");
  const featured = posts.find((p) => p.featured) || posts[0];
  const rest = featured ? posts.filter((p) => p.slug !== featured.slug) : posts;

  html = html.replace(
    /<section class="featured wrap"[\s\S]*?<\/section>/,
    featured ? featuredHtml(featured) : ""
  );
  html = html.replace(
    /<ul class="grid" id="posts-root">[\s\S]*?<\/ul>/,
    `<ul class="grid" id="posts-root">${rest.map((p) => cardHtml(p, "")).join("")}</ul>`
  );
  html = html.replace(
    /<ul class="tags">[\s\S]*?<\/ul>/,
    `<ul class="tags">${topicsHtml(posts)}</ul>`
  );
  fs.writeFileSync(INDEX_PATH, html);
}

function writePostsJson(posts) {
  const json = posts.map((p, i) => ({
    id: String(i + 1),
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    date: p.date,
    dateLabel: p.dateLabel || dateLabel(p.date),
    readingMinutes: p.readingMinutes,
    imageAlt: p.imageAlt,
    cover: p.cover,
    featured: !!p.featured,
    body: p.body || [],
  }));
  fs.writeFileSync(POSTS_JSON, JSON.stringify(json, null, 2) + "\n");
}

function loadExistingJson() {
  if (!fs.existsSync(POSTS_JSON)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(POSTS_JSON, "utf8"));
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}

function mergeCatalog(mdPosts) {
  const map = new Map();
  for (const e of loadExistingJson()) {
    map.set(e.slug, { ...e, generated: false });
  }
  for (const p of mdPosts) {
    map.set(p.slug, { ...p, generated: true });
  }
  const all = [...map.values()].sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : 0
  );
  const mdFeatured = mdPosts.find((p) => p.featured);
  if (mdFeatured) {
    for (const p of all) p.featured = p.slug === mdFeatured.slug;
  }
  return all;
}

function main() {
  const mdPosts = loadPosts();
  if (!mdPosts.length) {
    console.warn("Không có bài Markdown nào trong md/.");
    process.exit(0);
  }

  fs.mkdirSync(BAI_DIR, { recursive: true });

  for (const post of mdPosts) {
    const out = path.join(BAI_DIR, `${post.slug}.html`);
    fs.writeFileSync(out, articleHtml(post));
    const img = path.join(IMG_DIR, coverFile(post));
    if (!fs.existsSync(img) && !/^https?:/i.test(String(post.coverImage || ""))) {
      console.warn("thiếu ảnh bìa:", img);
    }
    console.log("gen", post.slug);
  }

  const posts = mergeCatalog(mdPosts);
  updateIndex(posts);
  writePostsJson(posts);
  console.log(`xong ${mdPosts.length} bài md, tổng ${posts.length} bài trên trang chủ`);
}

main();
