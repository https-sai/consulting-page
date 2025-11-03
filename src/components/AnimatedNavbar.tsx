// app/components/AnimatedNavbar.tsx
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Professional Experience" },
  { id: "consulting", label: "Private Consulting" },
  { id: "contact", label: "Contact" },
] as const;

const BRACKET_PAD = 6;

type Box = { x: number; y: number; w: number; h: number; ready: boolean };

export default function AnimatedNavbar() {
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
  const [offset, setOffset] = React.useState(0); // spacer height if you use the fixed bar

  const measure = React.useCallback(() => {
    const nav = navRef.current;
    // Use hoveredIndex if available, otherwise use active
    const displayIndex = hoveredIndex !== null ? hoveredIndex : active;
    const el = itemRefs.current[displayIndex] ?? null;
    const hidden = !nav || (nav as HTMLElement).offsetParent === null;
    if (!el || hidden) {
      setBox((b) => ({ ...b, ready: false }));
    } else {
      const n = nav.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const x = r.left - n.left - BRACKET_PAD;
      const y = r.top - n.top;
      const w = r.width + BRACKET_PAD * 2;
      const h = r.height;
      setBox({ x, y, w, h, ready: true });
    }
    const h = wrapRef.current?.offsetHeight ?? 0;
    setOffset(h);
  }, [active, hoveredIndex]);

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

  // keyboard support: arrow keys cycle items (visual only)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % SECTIONS.length);
      if (e.key === "ArrowLeft")
        setActive((i) => (i - 1 + SECTIONS.length) % SECTIONS.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Track active section based on scroll position
  React.useEffect(() => {
    const handleScroll = () => {
      // Don't update during programmatic scrolling (user clicks)
      if (isScrollingProgrammatically.current) {
        return;
      }

      let newActive = 0;

      // Check if we're at the very top (landing section with no ID)
      if (window.scrollY < 100) {
        newActive = 0; // Default to first section (About)
      } else {
        // Find which section is currently in view
        // Start from the last section and work backwards
        for (let i = SECTIONS.length - 1; i >= 0; i--) {
          const section = document.getElementById(SECTIONS[i].id);
          if (section) {
            const rect = section.getBoundingClientRect();
            // Check if section is in the upper portion of viewport
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
              newActive = i;
              break;
            }
          }
        }
      }

      // Only update if the active section has changed
      if (newActive !== active) {
        setActive(newActive);
        // Only clear hover if we're not currently hovering over the new active section
        // and if we're not in the middle of a click (hoveredIndex matches active means user just clicked)
        if (hoveredIndex !== newActive && hoveredIndex !== active) {
          setHoveredIndex(null);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [active, hoveredIndex]);

  // --- NEW: scroll to section id, accounting for fixed header height
  const scrollToId = React.useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;
      isScrollingProgrammatically.current = true;
      const top =
        target.getBoundingClientRect().top + window.scrollY - (offset + 8); // small breathing room
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      // Reset flag after scroll animation completes
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 1000); // Allow time for smooth scroll to complete
    },
    [offset]
  );

  const scrollToTop = React.useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const itemBase =
    "group relative inline-block overflow-hidden px-2 uppercase tracking-wider " +
    "text-sm md:text-base transition-colors";

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[100] pt-[env(safe-area-inset-top)] pointer-events-none flex items-center justify-center">
        <div
          ref={wrapRef}
          className="pointer-events-auto p-4 w-full flex items-center justify-center"
        >
          <header className="w-fit border border-black/50 rounded-2xl p-2 px-4 md:px-8 flex items-center justify-center backdrop-blur-sm">
            <button
              onClick={scrollToTop}
              className="group relative inline-flex items-center justify-center p-1 mr-0 md:mr-6 transition-colors hover:bg-blue-400/70 rounded-[2px]"
              aria-label="Home"
            >
              <Home className="h-4 w-4 text-black group-hover:text-white transition-colors" />
            </button>
            <nav
              ref={navRef}
              className="relative isolate hidden md:flex gap-3 md:gap-6 items-center"
              aria-label="Static nav demo"
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
                  <span className="tabular-nums select-none">[</span>
                  <span className="tabular-nums select-none">]</span>
                </motion.div>
              )}

              {SECTIONS.map(({ id, label }, i) => (
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
                    // Don't clear hover if we're in the middle of clicking this tab
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
                    // Reset after a short delay to allow onClick to run
                    setTimeout(() => {
                      isClicking.current = false;
                    }, 100);
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    isClicking.current = true;
                    setActive(i);
                    setHoveredIndex(i); // Keep brackets on clicked tab
                    // Use a small delay to ensure state updates before scrolling
                    setTimeout(() => {
                      scrollToId(id);
                      // Reset clicking flag after scroll starts
                      setTimeout(() => {
                        isClicking.current = false;
                      }, 100);
                    }, 0);
                  }}
                >
                  <span className="relative inline-flex items-center">
                    {/* highlight wipe (unchanged) */}
                    <span
                      aria-hidden
                      className="absolute inset-0 z-0 bg-blue-400/70 origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-700 ease-out rounded-[2px]"
                    />
                    <motion.span
                      className={`relative z-10 inline-block ${
                        hoveredIndex === i || active === i
                          ? "text-black"
                          : "text-black/70"
                      } group-hover:text-white group-focus-visible:text-white`}
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
    </>
  );
}
