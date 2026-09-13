(function () {
  var lineEl = document.getElementById("hero-line");
  var dekEl = document.getElementById("hero-dek");
  var meta = document.querySelector('meta[name="description"]');

  fetch("index_content.json", { cache: "no-cache" })
    .then(function (res) { return res.ok ? res.json() : Promise.reject(res.status); })
    .then(function (data) {
      if (data.line && lineEl) lineEl.textContent = data.line;
      if (data.dek && dekEl) dekEl.textContent = data.dek;
      if (data.description && meta) meta.setAttribute("content", data.description);
    })
    .catch(function () {
      /* giữ text cứng trong HTML nếu JSON lỗi / chưa có file */
    });
})();