(function(){
  var btn = document.querySelector("[data-theme-toggle]");
  var meta = document.querySelector('meta[name="theme-color"]');
  function current(){ return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light"; }
  function apply(next){
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("muc-lang-theme", next); } catch(e){}
    if (meta) meta.setAttribute("content", next === "dark" ? "#161412" : "#F6F3EE");
    if (btn) {
      btn.setAttribute("aria-pressed", String(next === "dark"));
      btn.setAttribute("aria-label", next === "dark" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối");
    }
  }
  apply(current());
  if (btn) btn.addEventListener("click", function(){ apply(current() === "dark" ? "light" : "dark"); });
})();
