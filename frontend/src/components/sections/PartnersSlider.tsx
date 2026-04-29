"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type PartnerSlideItem = Readonly<{
  key: string;
  name: string;
  src: string;
}>;

function getSlidesPerViewCount(): number {
  if (typeof window === "undefined") return 2;
  const w = window.innerWidth;
  if (w < 640) return 2;
  if (w < 768) return 3;
  if (w < 1024) return 4;
  return 5;
}

function subscribeSlidesPerView(cb: () => void) {
  window.addEventListener("resize", cb);
  return () => window.removeEventListener("resize", cb);
}

function useSlidesPerView() {
  return useSyncExternalStore(
    subscribeSlidesPerView,
    getSlidesPerViewCount,
    () => 2
  );
}

function PartnerLogoTile({
  name,
  src,
  reducedMotion,
}: Readonly<{
  name: string;
  src: string;
  reducedMotion: boolean;
}>) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0.75, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 420, damping: 34, mass: 0.7 }
      }
      whileHover={
        reducedMotion
          ? undefined
          : {
              scale: 1.035,
              y: -3,
              transition: { type: "spring", stiffness: 500, damping: 28 },
            }
      }
      className={cn(
        "group relative flex h-[92px] min-h-[92px] min-w-0 items-center justify-center",
        "rounded-2xl border border-border/80 bg-background/80 px-4 shadow-[0_1px_0_rgba(15,23,42,0.04)]",
        "backdrop-blur-sm ring-1 ring-black/[0.03]",
        "transition-[box-shadow,border-color] duration-300",
        "hover:border-primary/25 hover:shadow-[0_18px_40px_-26px_rgba(39,71,202,0.55)]"
      )}
    >
      <div className="relative h-[52px] w-full">
        <Image
          src={src}
          alt={name}
          fill
          sizes="(max-width: 640px) 45vw, 160px"
          className="object-contain opacity-90 transition-[filter,opacity] duration-300 group-hover:opacity-100"
        />
      </div>
    </motion.div>
  );
}

export function PartnersSlider({
  items,
  className,
}: Readonly<{
  items: PartnerSlideItem[];
  className?: string;
}>) {
  const reducedMotion = useReducedMotion() ?? false;
  const slidesPerView = useSlidesPerView();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const swipeRef = useRef<{ x: number; t: number } | null>(null);
  const [viewportW, setViewportW] = useState(0);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const pages = useMemo(() => {
    const out: PartnerSlideItem[][] = [];
    for (let i = 0; i < items.length; i += slidesPerView) {
      out.push(items.slice(i, i + slidesPerView));
    }
    return out;
  }, [items, slidesPerView]);

  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(0, pages.length - 1)));
  }, [pages.length]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      setViewportW(el.getBoundingClientRect().width);
    });

    ro.observe(el);
    setViewportW(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  const pageCount = pages.length;
  const canSlide = pageCount > 1 && viewportW > 0;

  const goPrev = useCallback(() => {
    if (!canSlide) return;
    setIndex((i) => (i - 1 + pageCount) % pageCount);
  }, [canSlide, pageCount]);

  const goNext = useCallback(() => {
    if (!canSlide) return;
    setIndex((i) => (i + 1) % pageCount);
  }, [canSlide, pageCount]);

  useEffect(() => {
    if (!canSlide || paused || reducedMotion) return;
    const t = window.setInterval(goNext, 5200);
    return () => window.clearInterval(t);
  }, [canSlide, paused, reducedMotion, goNext]);

  const x = canSlide ? -index * viewportW : 0;

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    swipeRef.current = { x: e.clientX, t: performance.now() };
    try {
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  }

  function onPointerUp(e: PointerEvent<HTMLDivElement>) {
    const start = swipeRef.current;
    swipeRef.current = null;
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    if (!start || !canSlide) return;
    const dx = e.clientX - start.x;
    const dt = Math.max(1, performance.now() - start.t);
    const vx = dx / dt;
    if (dx < -56 || vx < -0.45) goNext();
    else if (dx > 56 || vx > 0.45) goPrev();
  }

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={viewportRef}
        className="relative overflow-hidden cursor-grab touch-pan-y active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          swipeRef.current = null;
        }}
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-card via-card/85 to-transparent sm:w-16"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-card via-card/85 to-transparent sm:w-16"
          aria-hidden="true"
        />
        <motion.div
          className="flex"
          animate={{ x }}
          transition={
            reducedMotion
              ? { duration: 0.18, ease: "easeOut" }
              : { type: "spring", stiffness: 260, damping: 32, mass: 0.85 }
          }
          style={{ willChange: "transform" }}
        >
          {pages.map((page, pageIdx) => (
            <div
              key={pageIdx}
              className="grid shrink-0 gap-3 md:gap-4"
              style={{
                width: viewportW > 0 ? viewportW : "100%",
                gridTemplateColumns: `repeat(${slidesPerView}, minmax(0, 1fr))`,
              }}
            >
              {page.map((p) => (
                <PartnerLogoTile
                  key={p.key}
                  name={p.name}
                  src={p.src}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-7 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={`hint-${index}`}
            initial={reducedMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: reducedMotion ? 0 : 0.22 }}
            className="min-w-0 shrink text-sm text-muted-foreground tabular-nums"
          >
            {index + 1} <span className="text-muted-foreground/70">/</span>{" "}
            {pageCount} · {items.length} partners
          </motion.p>
        </AnimatePresence>

        <div className="flex shrink-0 items-center justify-end gap-2 sm:ml-4">
          <motion.button
            type="button"
            aria-label="Previous partners"
            disabled={!canSlide}
            whileHover={reducedMotion || !canSlide ? undefined : { scale: 1.03 }}
            whileTap={reducedMotion || !canSlide ? undefined : { scale: 0.94 }}
            onClick={goPrev}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm backdrop-blur-sm",
              "hover:border-primary/30 hover:text-primary",
              "disabled:pointer-events-none disabled:opacity-40"
            )}
          >
            <ChevronLeft size={20} strokeWidth={2.2} />
          </motion.button>
          <motion.button
            type="button"
            aria-label="Next partners"
            disabled={!canSlide}
            whileHover={reducedMotion || !canSlide ? undefined : { scale: 1.03 }}
            whileTap={reducedMotion || !canSlide ? undefined : { scale: 0.94 }}
            onClick={goNext}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm backdrop-blur-sm",
              "hover:border-primary/30 hover:text-primary",
              "disabled:pointer-events-none disabled:opacity-40"
            )}
          >
            <ChevronRight size={20} strokeWidth={2.2} />
          </motion.button>
        </div>
      </div>

      {pageCount > 1 ? (
        <div
          className="mt-5 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Partner slides"
        >
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-[width,background-color,opacity] duration-300",
                i === index
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/25 hover:bg-muted-foreground/45"
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
