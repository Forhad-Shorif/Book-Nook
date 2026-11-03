"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  BookOpen01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    image: "/images/Bannerimage.jpg",
    alt: "A reader in a cozy sweater holding an open book in a warm library",
    eyebrow: "Welcome to BookNook",
    title: "Find Your Next Great Read",
    description:
      "Explore hand-picked books across fiction, romance, mystery and more — all in one cozy place.",
    caption: "Lost in the shelves",
  },
  {
    image: "/images/Bannerimage1.jpg",
    alt: "A reader holding a book beside a window with a cup of coffee",
    eyebrow: "Curated With Care",
    title: "Stories for Every Mood",
    description:
      "From timeless classics to fresh new voices, your next favourite book is waiting on our shelves.",
    caption: "Slow mornings, good books",
  },
  {
    image: "/images/bannerimage2.jpg",
    alt: "A smiling reader relaxing in a chair with a book at home",
    eyebrow: "Join the Community",
    title: "Read. Dream. Discover.",
    description:
      "Share the books you love, borrow from fellow readers, and build a shelf that feels like home.",
    caption: "Read. Dream. Discover.",
  },
] as const;

const HeroBanner = () => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return (
    <section
      aria-label="Featured books and collections"
      className="mx-auto w-full max-w-7xl px-4 pt-6 pb-12 sm:px-6 lg:px-8 lg:pt-10 lg:pb-16"
    >
      <h1 className="sr-only">BookNook — Find your next great read</h1>

      <div className="hero-swiper relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#08111e] shadow-2xl sm:rounded-[2rem]">
        <Swiper
          modules={[A11y, Autoplay, Keyboard, Navigation, Pagination]}
          loop
          speed={850}
          grabCursor
          autoplay={
            reduceMotion
              ? false
              : {
                  delay: 5500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
          }
          keyboard={{ enabled: true, onlyInViewport: true }}
          pagination={{ clickable: true }}
          navigation
          a11y={{
            enabled: true,
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            paginationBulletMessage: "Go to slide {{index}}",
          }}
          className="h-[640px] w-full sm:h-[680px] lg:h-[580px] xl:h-[640px]"
        >
          {slides.map((slide, index) => {
            return (
              <SwiperSlide key={slide.title}>
                <div className="relative flex h-full flex-col overflow-hidden py-5 sm:py-8 lg:grid lg:grid-cols-[1.02fr_1fr] lg:py-0">
                  {/* Ambient, blurred version of the image — fills the slide
                      without ever cropping the real photo below. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                  >
                    <Image
                      src={slide.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="hero-ambient-image scale-110 object-cover opacity-35 blur-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#08111e] via-[#08111e]/90 to-[#08111e] lg:bg-gradient-to-r lg:from-[#08111e] lg:via-[#08111e]/88 lg:to-[#08111e]/55" />
                    <div className="absolute -left-20 top-1/4 size-72 rounded-full bg-amber-300/10 blur-3xl" />
                    <div className="absolute -right-16 bottom-0 size-80 rounded-full bg-sky-400/10 blur-3xl" />
                  </div>

                  {/* Copy */}
                  <div className="relative z-10 order-2 mt-5 flex w-full items-center px-5 sm:mt-6 sm:px-8 lg:order-1 lg:mt-0 lg:px-16 lg:py-14 xl:px-20">
                    <div className="max-w-xl">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm sm:px-4 sm:text-xs">
                        <HugeiconsIcon icon={BookOpen01Icon} size={15} />
                        {slide.eyebrow}
                      </span>

                      <h2 className="mt-5 font-heading text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
                        {slide.title}
                      </h2>

                      <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base lg:text-lg">
                        {slide.description}
                      </p>

                      <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">
                        <Link
                          href="/books"
                          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-stone-900 shadow-lg shadow-black/30 transition-all hover:-translate-y-0.5 hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-white/50 sm:px-6 sm:py-3"
                        >
                          Browse Books
                          <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                        </Link>
                        <Link
                          href="/sign-up"
                          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-white/40 sm:px-6 sm:py-3"
                        >
                          Join BookNook
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Full, uncropped photo inside a glass frame */}
                  <div className="relative z-10 order-1 flex w-full items-center justify-center px-5 sm:px-8 lg:order-2 lg:py-10 lg:pr-16 lg:pl-8 xl:pr-20 xl:pl-10">
                    <div className="relative w-full">
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-amber-300/25 via-rose-300/10 to-sky-400/20 opacity-60 blur-2xl"
                      />

                      <div className="relative mx-auto flex h-[240px] w-full flex-col overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/5 shadow-[0_30px_80px_-24px_rgba(0,0,0,0.9)] ring-1 ring-white/10 sm:h-[300px] lg:h-[380px] xl:h-[420px]">
                        <div className="relative flex-1 overflow-hidden">
                          <Image
                            src={slide.image}
                            alt=""
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="hero-frame-blur scale-110 object-cover opacity-45 blur-xl"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#07101c]/70 via-transparent to-[#07101c]/15" />

                          <Image
                            src={slide.image}
                            alt={slide.alt}
                            fill
                            preload={index === 0}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-contain p-2 sm:p-3"
                          />

                          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-md">
                            <HugeiconsIcon icon={SparklesIcon} size={12} />
                            Featured
                          </div>
                        </div>

                        <div className="relative flex items-center justify-between gap-3 border-t border-white/10 bg-black/35 px-4 py-2.5 backdrop-blur-sm">
                          <span className="truncate text-xs font-medium text-white/80">
                            {slide.caption}
                          </span>
                          <span className="shrink-0 text-[10px] tracking-[0.2em] text-white/50">
                            {String(index + 1).padStart(2, "0")} /{" "}
                            {String(slides.length).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default HeroBanner;
