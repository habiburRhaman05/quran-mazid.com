"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutGrid,
  Send,
  Bookmark,
  BookOpen,
  Settings,
  ExternalLink,
  Copy,
} from "lucide-react";

import { cn } from "@/lib/utils";

type Item = {
  icon: typeof Home;
  to: string;
  label: string;
};

const items: Item[] = [
  { icon: Home, to: "/", label: "Home" },
  { icon: LayoutGrid, to: "/apps", label: "Apps" },
  { icon: Send, to: "/contact", label: "Contact" },
  { icon: Bookmark, to: "/bookmarks", label: "Bookmarks" },
  { icon: BookOpen, to: "/learn", label: "Learn" },
];

export function IconRail() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen md:flex w-16 shrink-0 flex-col items-center border-r border-sidebar-border bg-sidebar    relative">
      {/* Logo */}
      <div className="pt-4 pb-3 flex justify-center w-full">
   <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.99183 0H29.0082C32.8696 0 36 3.13043 36 6.99183V29.0082C36 32.8696 32.8696 36 29.0082 36H6.99183C3.13043 36 0 32.8696 0 29.0082V6.99183C0 3.13043 3.13043 0 6.99183 0Z" className="fill-primary"></path><path d="M26.0687 24.5654V28.2374C26.0688 28.3545 26.0389 28.4696 25.9818 28.5717C25.9247 28.6739 25.8424 28.7597 25.7427 28.821C25.6429 28.8822 25.5292 28.9168 25.4122 28.9215C25.2953 28.9263 25.1791 28.9009 25.0748 28.8479L18 25.2596" stroke="#E2E2E2" stroke-width="0.782609"></path><path d="M9.92969 24.5654V28.2374C9.92957 28.3545 9.95949 28.4696 10.0166 28.5717C10.0737 28.6739 10.156 28.7597 10.2557 28.821C10.3554 28.8822 10.4692 28.9168 10.5861 28.9215C10.7031 28.9263 10.8193 28.9009 10.9236 28.8479L17.9976 25.2596" stroke="#E2E2E2" stroke-width="0.782609"></path><path opacity="0.35" d="M17.5839 24.1444C17.5839 24.3737 17.7733 24.5591 18.0018 24.5591V25.5405L8.60421 23.6114L7.45143 23.3821C7.093 23.3109 6.77034 23.1177 6.53844 22.8353C6.30654 22.5528 6.17975 22.1987 6.17969 21.8333V10.8729C6.17969 9.90245 7.04838 9.16131 8.00708 9.31392L18.001 10.9026V11.884C17.8908 11.8842 17.7852 11.9279 17.7071 12.0056C17.629 12.0833 17.5847 12.1886 17.5839 12.2988V24.1436V24.1444Z" fill="#E2E2E2"></path><path opacity="0.35" d="M18.4171 24.1444C18.4171 24.3737 18.2293 24.5591 18 24.5591V25.5405L27.3976 23.6114L28.5503 23.3821C28.9088 23.3109 29.2314 23.1177 29.4633 22.8353C29.6952 22.5528 29.822 22.1987 29.8221 21.8333V10.8729C29.8221 9.90245 28.9534 9.16131 27.9947 9.31392L18 10.9018V11.8832C18.2285 11.8832 18.4171 12.0687 18.4171 12.298V24.1436V24.1444Z" fill="#E2E2E2"></path><path d="M17.5806 24.1443C17.5806 24.3736 17.77 24.5591 17.9986 24.5591V25.5405L9.92986 22.0383L8.60099 21.4623C8.29824 21.3311 8.04048 21.1142 7.85944 20.8383C7.6784 20.5624 7.58197 20.2396 7.58203 19.9096V9.37417C7.58187 9.09963 7.64851 8.82918 7.7762 8.58615C7.9039 8.34312 8.08881 8.13482 8.31498 7.97921C8.54116 7.8236 8.8018 7.72536 9.07441 7.69297C9.34703 7.66058 9.62343 7.69501 9.87977 7.7933L17.9986 10.9026V11.884C17.8883 11.884 17.7824 11.9276 17.7041 12.0053C17.6259 12.083 17.5815 12.1885 17.5806 12.2988V24.1436V24.1443Z" fill="white"></path><path d="M28.0252 9.37374V9.37397V19.9095C28.0252 20.4269 27.7175 20.8958 27.2417 21.1032C27.2416 21.1033 27.2415 21.1033 27.2413 21.1034L25.9131 21.6791L25.9129 21.6792L18.3913 24.9439V24.8493C18.4568 24.8131 18.517 24.7678 18.5702 24.7147C18.6452 24.6398 18.7048 24.5509 18.7454 24.453C18.786 24.3551 18.8069 24.2501 18.8069 24.1441V12.2986C18.8069 12.0848 18.7219 11.8798 18.5708 11.7286C18.5173 11.6751 18.4571 11.6299 18.3921 11.5938V11.1708L26.2587 8.15774L26.2589 8.15769C26.4559 8.08214 26.6684 8.05567 26.878 8.08056C27.0875 8.10546 27.2879 8.18098 27.4618 8.3006C27.6356 8.42023 27.7778 8.58036 27.876 8.76718C27.974 8.95384 28.0253 9.16251 28.0252 9.37374Z" fill="#E2E2E2" stroke="#E2E2E2" stroke-width="0.782609"></path></svg>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center justify-center gap-3 w-full">
        {items.map((item, index) => {
          const active =
            index === 0
              ? pathname === "/" || pathname.startsWith("/surah")
              : pathname.startsWith(item.to);

          return (
            <IconButton
              key={item.to}
              item={item}
              active={active}
            />
          );
        })}
      </nav>

      {/* Settings */}
      <div className="pb-4 pt-3 flex justify-center w-full">
        <button className="group size-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-300">
          <Settings className="size-5 transition-transform duration-500 group-hover:rotate-90" />
        </button>
      </div>
    </aside>
  );
}

function IconButton({
  item,
  active,
}: {
  item: Item;
  active: boolean;
}) {
  const Icon = item.icon;

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close menu when clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [open]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}${item.to}`
    );
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Main Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "group relative size-10 rounded-xl flex items-center justify-center",
          "transition-all duration-300 ease-out",
          "text-muted-foreground hover:text-foreground hover:bg-accent",
          "hover:scale-110 active:scale-95",
          active && "text-primary bg-accent"
        )}
        aria-label={item.label}
      >
        {/* Active Indicator */}
        <span
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full bg-primary transition-all duration-300",
            active
              ? "h-6 opacity-100"
              : "h-0 opacity-0"
          )}
        />

        <Icon className="size-5 transition-transform duration-300 group-hover:scale-110" />

        {/* Tooltip */}
        <span className="pointer-events-none absolute left-full ml-3 px-2 py-1 rounded-md bg-popover text-popover-foreground text-xs font-medium whitespace-nowrap shadow-lg border border-border opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50">
          {item.label}
        </span>
      </button>

      {/* Dropdown Menu */}
      <div
        className={cn(
          "absolute left-full top-1/2 ml-3 -translate-y-1/2 z-50 w-56",
          "transition-all duration-200 ease-out origin-left",
          open
            ? "opacity-100 scale-100 translate-x-0"
            : "opacity-0 scale-95 translate-x-2 pointer-events-none"
        )}
      >
        <div className="rounded-xl border bg-popover shadow-2xl backdrop-blur-sm p-1">
          {/* Label */}
          <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b">
            {item.label}
          </div>

          {/* Open */}
          <Link
            href={item.to}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-accent transition-colors"
          >
            <Icon className="size-4" />
            Open
          </Link>

          {/* Open in new tab */}
          <button
            onClick={() => {
              window.open(item.to, "_blank", "noopener");
              setOpen(false);
            }}
            className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-accent transition-colors"
          >
            <ExternalLink className="size-4" />
            Open in new tab
          </button>

          {/* Copy link */}
          <button
            onClick={copyLink}
            className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-accent transition-colors"
          >
            <Copy className="size-4" />
            Copy link
          </button>
        </div>
      </div>
    </div>
  );
}