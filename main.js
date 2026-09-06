// Trạng thái ứng dụng
let currentCategory = 'all';
let currentQuery = '';

// --- 1. Render giao diện động ---
function renderBlog() {
  const featuredSection = document.getElementById('featuredSection');
  const postsGrid = document.getElementById('postsGrid');
  const articleCount = document.getElementById('articleCount');
  const noResultsBox = document.getElementById('noResultsBox');
  const topLatestLink = document.getElementById('topLatestLink');

  if (typeof BLOG_POSTS === 'undefined') {
    console.error("Không tìm thấy dữ liệu BLOG_POSTS từ file posts.js");
    return;
  }

  // Lọc bài viết theo danh mục và từ khóa
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchCat = currentCategory === 'all' || post.category === currentCategory;
    const matchSearch = post.title.toLowerCase().includes(currentQuery.toLowerCase()) ||
                        post.summary.toLowerCase().includes(currentQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // Bài viết Tiêu điểm
  const featuredPost = BLOG_POSTS.find(p => p.isFeatured) || BLOG_POSTS[0];

  if (featuredPost && topLatestLink) {
    topLatestLink.href = featuredPost.url;
    topLatestLink.querySelector('span').textContent = `Mới nhất: ${featuredPost.title.split(':')[0]}`;
  }

  // Render Hero Banner Tiêu Điểm
  if (featuredPost && !currentQuery && currentCategory === 'all' && featuredSection) {
    featuredSection.classList.remove('hidden');
    featuredSection.innerHTML = `
      <div class="group relative rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 md:grid-cols-12">
        <div class="md:col-span-6 overflow-hidden relative min-h-[220px] sm:min-h-[300px]">
          <img src="${featuredPost.coverImage}" alt="${featuredPost.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
          <div class="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase shadow-sm">
            ${featuredPost.badge || 'Bài mới nhất'}
          </div>
        </div>
        <div class="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-2 mb-3 text-xs">
              <span class="font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">${featuredPost.categoryLabel}</span>
              <span class="text-zinc-300 dark:text-zinc-700">•</span>
              <span class="text-zinc-500">${featuredPost.url}</span>
            </div>
            <h2 class="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
              <a href="${featuredPost.url}">${featuredPost.title}</a>
            </h2>
            <p class="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">${featuredPost.summary}</p>
          </div>
          <div class="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
            <div class="flex items-center gap-2 text-xs text-zinc-500">
              <span class="font-medium text-zinc-800 dark:text-zinc-200">Khazore</span>
              <span>•</span>
              <span>${featuredPost.readTime}</span>
            </div>
            <div class="flex items-center gap-3">
              <button onclick="copyPageUrl('${featuredPost.url}')" title="Sao chép liên kết bài viết" class="p-2 rounded-lg text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              </button>
              <a href="${featuredPost.url}" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white transition shadow-sm">
                Khám phá ngay →
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (featuredSection) {
    featuredSection.classList.add('hidden');
  }

  // Render danh sách bài viết
  if (postsGrid) {
    postsGrid.innerHTML = filteredPosts.map(post => `
      <article class="post-card bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden hover:border-zinc-400 dark:hover:border-zinc-700 transition flex flex-col justify-between">
        <div>
          <div class="aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative">
            <img src="${post.coverImage}" alt="${post.title}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            <span class="absolute top-3 left-3 bg-zinc-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
              ${post.badge || post.categoryLabel}
            </span>
          </div>
          <div class="p-5">
            <span class="text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1.5">${post.categoryLabel}</span>
            <h3 class="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug">
              <a href="${post.url}" class="hover:underline">${post.title}</a>
            </h3>
            <p class="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">${post.summary}</p>
          </div>
        </div>
        <div class="px-5 pb-5 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-xs text-zinc-500">
          <span>${post.readTime}</span>
          <a href="${post.url}" class="font-medium text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1">
            Khám phá →
          </a>
        </div>
      </article>
    `).join('');
  }

  if (articleCount) articleCount.textContent = `${filteredPosts.length} bài viết`;
  if (noResultsBox) {
    if (filteredPosts.length === 0) noResultsBox.classList.remove('hidden');
    else noResultsBox.classList.add('hidden');
  }
}

// --- 2. Sự kiện Tìm kiếm & Bộ Lọc ---
const searchInput = document.getElementById('searchInput');
const mobileSearchInput = document.getElementById('mobileSearchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const categoryButtons = document.querySelectorAll('.cat-btn');

function handleSearch(e) {
  currentQuery = e.target.value.trim();
  if (searchInput) searchInput.value = currentQuery;
  if (mobileSearchInput) mobileSearchInput.value = currentQuery;
  if (clearSearchBtn) clearSearchBtn.classList.toggle('hidden', !currentQuery);
  renderBlog();
}

if (searchInput) searchInput.addEventListener('input', handleSearch);
if (mobileSearchInput) mobileSearchInput.addEventListener('input', handleSearch);

if (clearSearchBtn) {
  clearSearchBtn.addEventListener('click', () => {
    currentQuery = '';
    if (searchInput) searchInput.value = '';
    if (mobileSearchInput) mobileSearchInput.value = '';
    clearSearchBtn.classList.add('hidden');
    renderBlog();
  });
}

categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentCategory = btn.getAttribute('data-cat');
    categoryButtons.forEach(b => {
      b.className = 'cat-btn shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition';
    });
    btn.className = 'cat-btn shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 transition';
    renderBlog();
  });
});

// --- 3. Sao chép liên kết ---
function copyPageUrl(relativeUrl) {
  // Loại bỏ index.html khỏi pathname để lấy đúng gốc thư mục
  const basePath = window.location.pathname.replace(/index\.html$/, '');
  const cleanRelativeUrl = relativeUrl.startsWith('/') ? relativeUrl.slice(1) : relativeUrl;
  const fullUrl = window.location.origin + basePath + cleanRelativeUrl;
  
  const tempInput = document.createElement('input');
  tempInput.value = fullUrl;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  showToast('Đã sao chép đường dẫn: ' + cleanRelativeUrl);
}

function showToast(message) {
  const toast = document.getElementById('toastMessage');
  const toastText = document.getElementById('toastText');
  if (toast && toastText) {
    toastText.textContent = message;
    toast.classList.remove('translate-y-16', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-16', 'opacity-0');
    }, 3000);
  }
}

// Khởi chạy khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', renderBlog);