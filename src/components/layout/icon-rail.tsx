"use client"
import { Home, LayoutGrid, Send, Bookmark, BookOpen, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  ContextMenuLabel,
} from "@/components/ui/context-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Item = { icon: typeof Home; to: string; label: string };

const items: Item[] = [
  { icon: Home, to: "/", label: "Home" },
  { icon: LayoutGrid, to: "/apps", label: "Apps" },
  { icon: Send, to: "/contact", label: "Contact" },
  { icon: Bookmark, to: "/bookmarks", label: "Bookmarks" },
  { icon: BookOpen, to: "/learn", label: "Learn" },
];

export function IconRail() {
  const pathname = usePathname()
  return (
    <aside className="hidden md:flex w-16 shrink-0 flex-col items-center border-r border-sidebar-border bg-sidebar relative">
      {/* Top logo */}
      <div className="pt-4 pb-3 flex justify-center w-full">
        <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20 ring-1 ring-primary/30">
          <svg viewBox="0 0 24 24" className="size-5 text-primary-foreground" fill="currentColor">
            <path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" />
          </svg>
        </div>
      </div>

      {/* Centered icon stack */}
      <nav className="flex-1 flex flex-col items-center justify-center gap-1.5 w-full">
        {items.map((it, i) => {
          const active =
            i === 0
              ? pathname === "/" || pathname.startsWith("/surah")
              : pathname.startsWith(it.to);
          return <IconButton key={it.to} item={it} active={active} />;
        })}
      </nav>

      {/* Bottom settings */}
      <div className="pb-4 pt-3 flex justify-center w-full">
        <button
          className="group size-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-300"
          aria-label="Settings"
        >
          <Settings className="size-5 transition-transform duration-500 group-hover:rotate-90" />
        </button>
      </div>
    </aside>
  );
}

function IconButton({ item, active }: { item: Item; active: boolean }) {
  const Icon = item.icon;
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Link
          href={item.to}
          className={cn(
            "group relative size-10 rounded-xl flex items-center justify-center transition-all duration-300 ease-out",
            "text-muted-foreground hover:text-foreground hover:bg-accent",
            "hover:scale-110 active:scale-95",
            active && "text-primary bg-accent",
          )}
          aria-label={item.label}
        >
          {/* Active pill indicator */}
          <span
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full bg-primary transition-all duration-300",
              active ? "h-6 opacity-100" : "h-0 opacity-0",
            )}
          />
          <Icon className="size-5 transition-transform duration-300 group-hover:scale-110" />
          {/* Tooltip */}
          <span className="pointer-events-none absolute left-full ml-3 px-2 py-1 rounded-md bg-popover text-popover-foreground text-xs font-medium whitespace-nowrap shadow-lg border border-border opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50">
            {item.label}
          </span>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52 animate-in fade-in-0 zoom-in-95 slide-in-from-left-2 duration-200">
        <ContextMenuLabel className="text-xs text-muted-foreground">{item.label}</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem asChild>
          <Link href={item.to} className="cursor-pointer">Open</Link>
        </ContextMenuItem>
        <ContextMenuItem
          onSelect={() => {
            if (typeof window !== "undefined") {
              window.open(item.to, "_blank", "noopener");
            }
          }}
        >
          Open in new tab
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onSelect={() => {
            if (typeof navigator !== "undefined" && navigator.clipboard) {
              void navigator.clipboard.writeText(window.location.origin + item.to);
            }
          }}
        >
          Copy link
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
