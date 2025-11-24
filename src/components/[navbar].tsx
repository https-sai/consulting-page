"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Home, LucideIcon } from "lucide-react";

export interface NavbarItem {
  id: string;
  label: string;
}

export interface NavbarProps {
  items: NavbarItem[];
  theme?: "light" | "dark";
  showHomeButton?: boolean;
  homeIcon?: LucideIcon;
  onHomeClick?: () => void;
  bracketPadding?: number;
  className?: string;
  headerClassName?: string;
  navClassName?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  hoverItemClassName?: string;
  bracketColor?: string;
  highlightColor?: string;
  scrollOffset?: number;
  scrollThreshold?: number;
}

const BRACKET_PAD_DEFAULT = 6;

type Box = { x: number; y: number; w: number; h: number; ready: boolean };

export default function Navbar({
  items,
  theme = "light",
  showHomeButton = true,
  homeIcon: HomeIcon = Home,
  onHomeClick,
  bracketPadding = BRACKET_PAD_DEFAULT,
  className = "",
  headerClassName = "",
  navClassName = "",
  itemClassName = "",
  activeItemClassName = "",
  hoverItemClassName = "",
  bracketColor,
  highlightColor,
  scrollOffset = 8,
  scrollThreshold = 100,
}: NavbarProps) {
  const navRef = React.useRef<HTMLDivElement | null>(null);
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const itemRefs = React.useRef<Record<number, HTMLButtonElement | null>>({});
  const isScrollingProgrammatically = React.useRef(false);
  const isClicking = React.useRef(false);
  const [active, setActive] = React.useState(0);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [box, setBox] = React.useState<Box>({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    ready: false,
  });
  const [offset, setOffset] = React.useState(0);

  // Theme-based color classes
  const isDark = theme === "dark";
  const borderColor = isDark
    ? "border-white/50"
    : bracketColor || "border-black/50";
  const textColor = isDark ? "text-white" : "text-black";
  const textMutedColor = isDark ? "text-white/70" : "text-black/70";
  const highlightBg = highlightColor
    ? highlightColor
    : isDark
    ? "bg-white/20"
    : "bg-blue-400/70";
  const homeHoverBg = isDark ? "hover:bg-white/20" : "hover:bg-blue-400/70";
  const homeIconColor = isDark ? "text-white" : "text-black";
  const homeIconHoverColor = isDark
    ? "group-hover:text-black"
    : "group-hover:text-white";

  const measure = React.useCallback(() => {
    const nav = navRef.current;
    const displayIndex = hoveredIndex !== null ? hoveredIndex : active;
    const el = itemRefs.current[displayIndex] ?? null;
    const hidden = !nav || (nav as HTMLElement).offsetParent === null;
    if (!el || hidden) {
      setBox((b) => ({ ...b, ready: false }));
    } else {
      const n = nav.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const x = r.left - n.left - bracketPadding;
      const y = r.top - n.top;
      const w = r.width + bracketPadding * 2;
      const h = r.height;
      setBox({ x, y, w, h, ready: true });
    }
    const h = wrapRef.current?.offsetHeight ?? 0;
    setOffset(h);
  }, [active, hoveredIndex, bracketPadding]);

  React.useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    if (navRef.current) ro.observe(navRef.current);
    Object.values(itemRefs.current).forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // Keyboard support: arrow keys cycle items
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % items.length);
      if (e.key === "ArrowLeft")
        setActive((i) => (i - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items.length]);

  // Track active section based on scroll position
  React.useEffect(() => {
    const handleScroll = () => {
      if (isScrollingProgrammatically.current) {
        return;
      }

      let newActive = 0;

      if (window.scrollY < scrollThreshold) {
        newActive = 0;
      } else {
        for (let i = items.length - 1; i >= 0; i--) {
          const section = document.getElementById(items[i].id);
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
              newActive = i;
              break;
            }
          }
        }
      }

      if (newActive !== active) {
        setActive(newActive);
        if (hoveredIndex !== newActive && hoveredIndex !== active) {
          setHoveredIndex(null);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [active, hoveredIndex, items, scrollThreshold]);

  const scrollToId = React.useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;
      isScrollingProgrammatically.current = true;
      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        (offset + scrollOffset);
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 1000);
    },
    [offset, scrollOffset]
  );

  const scrollToTop = React.useCallback(() => {
    if (onHomeClick) {
      onHomeClick();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [onHomeClick]);

  const itemBase = `group relative inline-block overflow-hidden px-2 uppercase tracking-wider text-sm md:text-base transition-colors ${itemClassName}`;

  return (
    <div
      className={`fixed inset-x-0 top-0 z-[100] pt-[env(safe-area-inset-top)] pointer-events-none flex items-center justify-center ${className}`}
    >
      <div
        ref={wrapRef}
        className="pointer-events-auto p-4 w-full flex items-center justify-center"
      >
        <header
          className={`w-fit border ${borderColor} rounded-2xl p-2 px-4 md:px-8 flex items-center justify-center backdrop-blur-sm ${headerClassName}`}
        >
          {showHomeButton && (
            <button
              onClick={scrollToTop}
              className={`group relative inline-flex items-center justify-center p-1 mr-0 md:mr-6 transition-colors ${homeHoverBg} rounded-[2px]`}
              aria-label="Home"
            >
              <HomeIcon
                className={`h-4 w-4 ${homeIconColor} ${homeIconHoverColor} transition-colors`}
              />
            </button>
          )}
          <nav
            ref={navRef}
            className={`relative isolate hidden md:flex gap-3 md:gap-6 items-center ${navClassName}`}
            aria-label="Navigation"
          >
            {box.ready && (
              <motion.div
                className="pointer-events-none absolute z-20 flex items-center justify-between"
                initial={false}
                animate={{
                  x: box.x,
                  y: box.y,
                  width: box.w,
                  height: box.h,
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 550,
                  damping: 40,
                  mass: 0.6,
                }}
                style={{ left: 0, top: 0 }}
              >
                <span className={`tabular-nums select-none ${textColor}`}>
                  [
                </span>
                <span className={`tabular-nums select-none ${textColor}`}>
                  ]
                </span>
              </motion.div>
            )}

            {items.map(({ id, label }, i) => (
              <button
                key={id}
                ref={(el: HTMLButtonElement | null) => {
                  itemRefs.current[i] = el;
                }}
                className={itemBase}
                onMouseEnter={() => {
                  if (!isClicking.current) {
                    setHoveredIndex(i);
                  }
                }}
                onMouseLeave={() => {
                  if (!isClicking.current && active !== i) {
                    setHoveredIndex(null);
                  }
                }}
                onFocus={() => {
                  if (!isClicking.current) {
                    setHoveredIndex(i);
                  }
                }}
                onBlur={() => {
                  if (!isClicking.current && active !== i) {
                    setHoveredIndex(null);
                  }
                }}
                onMouseDown={() => {
                  isClicking.current = true;
                }}
                onMouseUp={() => {
                  setTimeout(() => {
                    isClicking.current = false;
                  }, 100);
                }}
                onClick={(e) => {
                  e.preventDefault();
                  isClicking.current = true;
                  setActive(i);
                  setHoveredIndex(i);
                  setTimeout(() => {
                    scrollToId(id);
                    setTimeout(() => {
                      isClicking.current = false;
                    }, 100);
                  }, 0);
                }}
              >
                <span className="relative inline-flex items-center">
                  <span
                    aria-hidden
                    className={`absolute inset-0 z-0 ${highlightBg} origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-700 ease-out rounded-[2px] ${hoverItemClassName}`}
                  />
                  <motion.span
                    className={`relative z-10 inline-block ${
                      hoveredIndex === i || active === i
                        ? textColor
                        : textMutedColor
                    } group-hover:text-white group-focus-visible:text-white ${
                      hoveredIndex === i || active === i
                        ? activeItemClassName
                        : ""
                    }`}
                    animate={{
                      scale: hoveredIndex === i || active === i ? 0.93 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 600,
                      damping: 40,
                      mass: 0.3,
                    }}
                  >
                    {label}
                  </motion.span>
                </span>
              </button>
            ))}
          </nav>
        </header>
      </div>
    </div>
  );
}
