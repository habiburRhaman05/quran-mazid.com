
import { Search, Moon, Sun, Heart, Menu } from "lucide-react";
import { useSettings } from "@/lib/settings";
import { useSearchModal } from "@/components/search/search-modal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header({ onOpenMobileNav }: { onOpenMobileNav?: () => void }) {
  const theme = useSettings((s) => s.theme);
  const setTheme = useSettings((s) => s.setTheme);
  const openSearch = useSearchModal((s) => s.open);

  return (
    <header className="h-16 shrink-0 border-b border-sidebar-border bg-sidebar/80 backdrop-blur flex items-center justify-between px-4 md:px-6 gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onOpenMobileNav}
          aria-label="Open navigation"
        >
          <Menu className="size-5" />
        </Button>
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <div className="size-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
            <BookIcon />
          </div>
          <div className="leading-tight min-w-0">
            <div className="font-semibold text-base truncate">Quran Mazid</div>
            <div className="text-[11px] text-muted-foreground truncate">
              Read, Study, and Learn The Quran
            </div>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-1 md:gap-2">
        <Button variant="ghost" size="icon" onClick={openSearch} aria-label="Search">
          <Search className="size-5 text-primary" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Moon className="size-5" /> : <Sun className="size-5" />}
        </Button>
        <Button className="rounded-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
          Support Us <Heart className="size-4 fill-current" />
        </Button>
      </div>
    </header>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}
