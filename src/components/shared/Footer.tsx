"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  ArrowUp01Icon,
  ArrowUpRight01Icon,
  Call02Icon,
  Facebook01Icon,
  InstagramIcon,
  Location01Icon,
  Mail01Icon,
  SparklesIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
  { label: "Add a Book", href: "/add-book" },
  { label: "My Books", href: "/my-books" },
  { label: "My Borrows", href: "/my-borrows" },
];

const accountLinks = [
  { label: "Sign In", href: "/sign-in" },
  { label: "Create Account", href: "/sign-up" },
  { label: "My Profile", href: "/profile" },
];

const socialLinks = [
  {
    label: "BookNook on X",
    href: "https://x.com",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
      </svg>
    ),
  },
  {
    label: "BookNook on Facebook",
    href: "https://facebook.com",
    icon: <HugeiconsIcon icon={Facebook01Icon} size={17} />,
  },
  {
    label: "BookNook on Instagram",
    href: "https://instagram.com",
    icon: <HugeiconsIcon icon={InstagramIcon} size={17} />,
  },
];

const contactItems = [
  {
    label: "Visit",
    value: "Dhanmondi, Dhaka",
    href: undefined,
    icon: Location01Icon,
  },
  {
    label: "Email",
    value: "hello@booknook.com",
    href: "mailto:hello@booknook.com",
    icon: Mail01Icon,
  },
  {
    label: "Call",
    value: "+880 1700-000000",
    href: "tel:+8801700000000",
    icon: Call02Icon,
  },
] as const;

const Footer = () => {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setSubscribed(true);
    setEmail("");
  };

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer className="footer-surface relative mt-auto overflow-hidden border-t border-white/10 text-slate-300">
      <div
        aria-hidden="true"
        className="footer-grid-lines pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="footer-orb pointer-events-none absolute -top-32 left-[8%] size-[26rem] rounded-full bg-amber-400/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="footer-orb pointer-events-none absolute -right-[4%] -bottom-32 size-[24rem] rounded-full bg-sky-500/10 blur-[120px]"
        style={{ animationDelay: "-9s" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-10 pb-6 sm:px-6 sm:pt-12 lg:px-8 lg:pt-16">
        {/* Newsletter / CTA band */}
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-7 lg:p-9">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-amber-300/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 left-1/3 size-56 rounded-full bg-sky-400/10 blur-3xl"
          />

          <div className="relative grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-amber-100">
                <HugeiconsIcon icon={SparklesIcon} size={13} />
                Join the BookNook community
              </span>
              <h2 className="mt-3 max-w-lg font-heading text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                Your next favourite book is one email away.
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-400">
                Monthly new arrivals, curated reading lists, and community
                picks. No spam &mdash; just good books.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full">
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email address
              </label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative flex-1">
                  <HugeiconsIcon
                    icon={Mail01Icon}
                    size={18}
                    className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    id="footer-newsletter-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (subscribed) {
                        setSubscribed(false);
                      }
                    }}
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-full border border-white/10 bg-[#08111e]/80 pr-4 pl-11 text-sm text-white shadow-inner shadow-black/20 outline-none transition placeholder:text-slate-500 focus:border-amber-300/50 focus:ring-4 focus:ring-amber-300/10"
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-stone-900 shadow-lg shadow-black/30 transition-all hover:-translate-y-0.5 hover:bg-amber-100 focus-visible:ring-4 focus-visible:ring-white/30 focus-visible:outline-none"
                >
                  {subscribed ? "Subscribed" : "Subscribe"}
                  <HugeiconsIcon
                    icon={subscribed ? Tick02Icon : ArrowRight01Icon}
                    size={17}
                    className={
                      subscribed
                        ? ""
                        : "transition-transform group-hover:translate-x-0.5"
                    }
                  />
                </button>
              </div>
              <p
                aria-live="polite"
                className="mt-2.5 flex items-center gap-1.5 pl-1 text-[11px] text-slate-500"
              >
                {subscribed ? (
                  <>
                    <HugeiconsIcon
                      icon={Tick02Icon}
                      size={12}
                      className="text-emerald-400"
                    />
                    You&apos;re on the list. Happy reading!
                  </>
                ) : (
                  "One thoughtful email a month. Unsubscribe anytime."
                )}
              </p>
            </form>
          </div>
        </div>

        {/* Main footer columns */}
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-9 sm:gap-x-8 lg:mt-14 lg:grid-cols-[1.55fr_0.9fr_0.9fr_1.15fr] lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 rounded-2xl focus-visible:ring-2 focus-visible:ring-amber-300/50 focus-visible:outline-none"
            >
              <span className="relative flex size-11 shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/15 transition group-hover:ring-amber-300/40">
                <Image
                  src="/images/Logo.jpeg"
                  alt="BookNook logo"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </span>
              <span className="flex flex-col">
                <span className="font-heading text-lg font-bold tracking-tight text-white">
                  BookNook
                </span>
                <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.24em] text-amber-200/80">
                  Read &middot; Dream &middot; Discover
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              A cozy digital shelf for book lovers. Discover new stories, share
              the books you love, and borrow from a community that reads
              together.
            </p>

            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-all hover:-translate-y-0.5 hover:border-amber-300/40 hover:bg-amber-300/10 hover:text-amber-200 hover:shadow-[0_0_22px_-6px_rgba(251,191,36,0.65)] focus-visible:ring-2 focus-visible:ring-amber-300/50 focus-visible:outline-none"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Explore BookNook" className="col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Explore
            </h3>
            <ul className="mt-4 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-amber-200 focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-amber-300/50 focus-visible:outline-none"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-amber-300/70 transition-all duration-300 group-hover:w-full" />
                    </span>
                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={12}
                      className="-translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Account */}
          <nav aria-label="Account" className="col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Account
            </h3>
            <ul className="mt-4 space-y-3">
              {accountLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-amber-200 focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-amber-300/50 focus-visible:outline-none"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-amber-300/70 transition-all duration-300 group-hover:w-full" />
                    </span>
                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={12}
                      className="-translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Stay in touch
            </h3>
            <address className="mt-4 grid gap-2.5 not-italic sm:grid-cols-2 lg:grid-cols-1">
              {contactItems.map((item) => {
                const content = (
                  <>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-amber-300 transition group-hover:border-amber-300/30 group-hover:bg-amber-300/10">
                      <HugeiconsIcon icon={item.icon} size={15} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] uppercase tracking-[0.16em] text-slate-500">
                        {item.label}
                      </span>
                      <span className="block truncate text-xs text-slate-300 transition group-hover:text-amber-200">
                        {item.value}
                      </span>
                    </span>
                  </>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-2.5 transition hover:border-white/10 hover:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-amber-300/50 focus-visible:outline-none"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-2.5"
                  >
                    {content}
                  </div>
                );
              })}
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between lg:mt-12">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <p className="text-xs text-slate-500">
              &copy; {year} BookNook. All rights reserved.
            </p>
            <p className="text-[11px] text-slate-500">
              Made with <span className="text-rose-400">&hearts;</span> for book
              lovers.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 sm:justify-end">
            <span className="hidden items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-emerald-300 sm:inline-flex">
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              Always open
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-300 transition-all hover:border-amber-300/40 hover:bg-amber-300/10 hover:text-amber-200 focus-visible:ring-2 focus-visible:ring-amber-300/50 focus-visible:outline-none"
            >
              Back to top
              <span className="flex size-5 items-center justify-center rounded-full bg-white/10 transition-transform group-hover:-translate-y-0.5">
                <HugeiconsIcon icon={ArrowUp01Icon} size={13} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
