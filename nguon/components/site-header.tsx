import { ThemeToggle } from "@/components/theme-toggle";

const NAV = [
  { id: "bai-viet", label: "Viết" },
  { id: "chu-de", label: "Chủ đề" },
  { id: "ve-toi", label: "Về tôi" },
] as const;

type SiteHeaderProps = {
  onLogo: () => void;
  onSection: (id: string) => void;
};

export function SiteHeader({ onLogo, onSection }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <a
        href="#noi-dung"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2.5 focus:z-50 focus:bg-bg focus:px-3 focus:py-2 focus:text-sm"
      >
        Bỏ qua đến nội dung
      </a>
      <div className="mx-auto flex h-12 max-w-6xl items-center gap-3 px-5 md:px-8">
        <button
          type="button"
          onClick={onLogo}
          className="shrink-0 font-serif text-lg font-medium tracking-tight text-fg title-link"
        >
          Nguyễn Trần Kha
        </button>
        <nav aria-label="Chính" className="ml-auto min-w-0">
          <ul className="flex items-center gap-3 sm:gap-5 md:gap-7">
            {NAV.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSection(item.id)}
                  className="inline-flex min-h-11 items-center font-sans text-sm tracking-wide text-meta title-link"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
