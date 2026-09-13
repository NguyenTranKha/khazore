# Tự động gen bài từ Markdown

Repo: https://github.com/NguyenTranKha/khazore

## Cách hoạt động

1. Viết bài trong `md/<ten-bai>.md` (tên file = slug URL).
2. Push file `.md` lên `main`.
3. GitHub Action chạy `scripts/build-posts.cjs`.
4. Bot commit lại:
   - `bai/<ten-bai>.html`
   - `index.html` (khối bài nổi bật + danh sách + chủ đề)
   - `posts.json`

Chỉ trigger khi:
- thêm / sửa / xóa file trong `md/`
- sửa `scripts/build-posts.cjs`
- sửa workflow
- hoặc bấm Run workflow thủ công

Sửa `index.html`, `css/`, `img/` không chạy gen.

Sắp xếp theo trường `date` trong frontmatter, mới nhất trước.
Bài `featured: true` lên khối nổi bật. Không có thì lấy bài mới nhất.

File bắt đầu bằng `_` (ví dụ `_mau.md`) bị bỏ qua.

## Frontmatter

```yaml
---
title: Tiêu đề bài
date: 2026-09-13
category: Ghi chép
excerpt: Câu dẫn ngắn trên trang chủ.
cover: clay
image: img/ten-anh.jpg
alt: Mô tả ảnh bìa
readingMinutes: 5
featured: false
draft: false
---
```

`cover`: clay | ink | moss | tea | pine
`draft: true` = không xuất bản
Không ghi `readingMinutes` thì script tự tính (~180 từ/phút).

## Copy vào repo

Chép đè các file này vào repo rồi commit:

```
scripts/build-posts.cjs
.github/workflows/jekyll-docker.yml
index.html
md/*.md
```

`index.html` phải giữ 3 cặp comment:

```
<!-- POSTS:FEATURED:START -->
<!-- POSTS:FEATURED:END -->

<!-- POSTS:LIST:START -->
<!-- POSTS:LIST:END -->

<!-- POSTS:TOPICS:START -->
<!-- POSTS:TOPICS:END -->
```

## Chạy local

```bash
npm install --prefix /tmp/mdbuild marked@15.0.12
NODE_PATH=/tmp/mdbuild/node_modules node scripts/build-posts.cjs
```

## Settings GitHub

Settings → Actions → General:
- Allow GitHub Actions to create and approve pull requests: không bắt buộc
- Workflow permissions: Read and write permissions

Lần đầu sau khi commit bộ file này, vào Actions bấm "Gen HTML từ Markdown" → Run workflow.
