// 1. Thực thi ngay lập tức khi tải file để áp dụng class 'dark' (chống nháy màn hình)
(function initTheme() {
  const savedTheme = localStorage.getItem('khazore_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();

// 2. Hàm chuyển đổi Theme chuẩn duy nhất
function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('khazore_theme', isDark ? 'dark' : 'light');
  updateThemeIcons(isDark);
}

// 3. Cập nhật trạng thái hiển thị Icon
function updateThemeIcons(isDark) {
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');

  if (sunIcon && moonIcon) {
    if (isDark) {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  }
}

// 4. Lắng nghe khi DOM đã sẵn sàng để đồng bộ Icon và gán sự kiện duy nhất
document.addEventListener('DOMContentLoaded', () => {
  const isDark = document.documentElement.classList.contains('dark');
  updateThemeIcons(isDark);

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    // Dùng .onclick để đảm bảo chỉ có duy nhất 1 listener hoạt động
    themeToggleBtn.onclick = toggleTheme;
  }
});