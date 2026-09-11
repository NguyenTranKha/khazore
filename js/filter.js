(function () {
  var topic = "all";
  var tags = document.querySelectorAll("[data-topic]");
  var items = document.querySelectorAll("#posts-root > li[data-category]");
  var clearBtn = document.getElementById("clear-topic");
  function render() {
    items.forEach(function (li) {
      li.hidden = !(topic === "all" || li.getAttribute("data-category") === topic);
    });
    tags.forEach(function (btn) {
      var on = topic === btn.getAttribute("data-topic");
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", String(on));
    });
    if (clearBtn) clearBtn.hidden = topic === "all";
  }
  tags.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = btn.getAttribute("data-topic");
      topic = topic === next ? "all" : next;
      render();
      var el = document.getElementById("bai-viet");
      if (el) el.scrollIntoView();
    });
  });
  if (clearBtn) clearBtn.addEventListener("click", function () {
    topic = "all";
    render();
  });
  render();
})();
