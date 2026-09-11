type SiteFooterProps = {
  onNavigate: (id: string) => void;
};

export function SiteFooter({ onNavigate }: SiteFooterProps) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-7 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="text-sm text-meta">© 2026 Mực Lặng</p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-meta">
          <li>
            <button
              type="button"
              onClick={() => onNavigate("chu-de")}
              className="inline-flex min-h-11 items-center title-link"
            >
              Chủ đề
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => onNavigate("ve-toi")}
              className="inline-flex min-h-11 items-center title-link"
            >
              Về tôi
            </button>
          </li>
          <li>
            <a
              href="/muc-lang.zip"
              download="muc-lang.zip"
              className="inline-flex min-h-11 items-center title-link"
            >
              Tải HTML/CSS
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
