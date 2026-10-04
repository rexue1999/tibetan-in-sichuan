'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export type HeroSlide = {
  src: string;
  /** Place name shown bottom-left. Already localized by the caller. */
  caption: string;
  /**
   * Where the crop should sit. These are 2.7:1 panoramas being shown on a
   * 16:9 screen, so `center` would slice off the ridgeline on the Meili shot
   * and bury the Potala Palace in the middle of the frame. `50% 42%` keeps the
   * sky and the peaks both in view.
   */
  focus?: string;
};

const INTERVAL_MS = 6000;

export default function HeroCarousel({
  slides,
  slideLabel,
  previousLabel,
  nextLabel,
}: {
  slides: HeroSlide[];
  /**
   * Pre-rendered label for the slide at index 0, e.g. "Slide 1 of 5". The
   * caller builds these, because a function cannot cross the server/client
   * boundary: passing `label={(n) => t('slideOf', {n})}` from page.tsx fails at
   * runtime with "Functions cannot be passed directly to Client Components",
   * and it fails on the first request rather than at build time.
   */
  slideLabel: string[];
  previousLabel: string;
  nextLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Rendered on the client only. Server and first client render must agree or
  // React discards the tree — and a reduced-motion visitor must never see the
  // carousel run, so the fallback has to be "stopped", not "animating".
  const [reduced, setReduced] = useState(true);
  const total = slides.length;

  // Advancing wraps; going back from the first slide should land on the last
  // one, not silently do nothing.
  const go = useCallback((n: number) => setIndex(((n % total) + total) % total), [total]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (paused || reduced || total < 2) return;
    const id = window.setInterval(next, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, reduced, total, next]);

  // A keyboard user tabbing onto the arrows should not also have the carousel
  // advancing under them. Focus anywhere inside counts as intent to look closer.
  const rootRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onFocusIn = () => setPaused(true);
    el.addEventListener('focusin', onFocusIn);
    return () => el.removeEventListener('focusin', onFocusIn);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }
  };

  if (total === 0) return null;

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label={slideLabel[0]}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={onKeyDown}
      className="absolute inset-0 overflow-hidden"
    >
      {slides.map((s, i) => {
        const active = i === index;
        return (
          <div
            key={s.src}
            aria-hidden={!active}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
            style={{ opacity: active ? 1 : 0 }}
          >
            {/*
              Only the first frame is eager. It is the Largest Contentful Paint
              element for the whole page, so it must not queue behind four
              others; the rest load lazily as they come round.
            */}
            <Image
              src={s.src}
              alt={active ? s.caption : ''}
              fill
              priority={i === 0}
              loading={i === 0 ? undefined : 'lazy'}
              sizes="100vw"
              quality={82}
              className="object-cover"
              style={{ objectPosition: s.focus || '50% 50%' }}
            />
          </div>
        );
      })}

      {/*
        Place name, bottom-RIGHT of centre — deliberately clear of the copy
        panel, which occupies the left 62% of the hero. It used to sit at
        bottom-left, where white text landed on the pale beige panel and
        measured 1.4:1: technically present, practically invisible. It also
        carries its own shadow, because a photograph behind it can be anything
        from a white sky to a dark forest.
      */}
      <div className="absolute bottom-16 right-6 md:bottom-20 md:right-[330px] z-30 pointer-events-none text-right md:text-left">
        <p
          key={slides[index].src}
          className="text-[10px] md:text-[11px] font-medium tracking-[4px] uppercase text-white animate-[heroCaptionIn_900ms_ease-out]"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.55)' }}
        >
          {slides[index].caption}
        </p>
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label={previousLabel}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label={nextLabel}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/70"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>

          {/*
            Progress bars rather than dots: each carries its own fill so the
            active one visibly advances, which tells the visitor the carousel
            is moving without needing a pause control. `key` on the inner span
            restarts the CSS animation on every change of slide.
          */}
          <div className="absolute bottom-8 right-6 md:right-12 z-30 flex items-center gap-2">
            {slides.map((s, i) => {
              const isActive = i === index;
              return (
              <button
                key={s.src}
                type="button"
                onClick={() => go(i)}
                aria-label={slideLabel[i]}
                aria-current={isActive}
                className="group py-2 focus:outline-none"
              >
                <span
                  className={
                    'block h-[2px] transition-all duration-300 ' +
                    (isActive ? 'w-10 bg-white/40' : 'w-5 bg-white/25 group-hover:bg-white/50')
                  }
                >
                  {isActive && !paused && !reduced && (
                    <span
                      key={`${s.src}-${index}`}
                      className="block h-full bg-white animate-[heroProgress_6s_linear_forwards]"
                    />
                  )}
                </span>
              </button>
              );
            })}
          </div>
        </>
      )}

      {/* Announce slide changes without moving focus. */}
      <p aria-live="polite" className="sr-only">
        {slideLabel[index]}
      </p>
    </section>
  );
}
