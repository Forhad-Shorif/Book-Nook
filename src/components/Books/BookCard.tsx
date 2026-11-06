"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Book } from "@/Type/type";
import {
  StarIcon,
  ViewIcon,
  Book01Icon,
} from "@hugeicons/core-free-icons";

interface AllBooksProps {
  books: Book[];
}

const BookCard = ({ books }: AllBooksProps) => {
  const filteredBooks = books || [];

  return (
    <section className="min-h-screen bg-[#07101c] px-3 py-6 text-slate-100 sm:px-5 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">

            {filteredBooks.map((book) => {
              const rating = Math.min(
                5,
                Math.max(0, Number(book.rating) || 0)
              );

              return (
                <article
                  key={book._id}
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-b from-slate-800/80 to-[#0b1422] shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/30 hover:shadow-xl hover:shadow-amber-400/[0.08]"
                >

                  {/* Book Image */}
                  <div className="relative flex h-44 w-full shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-[#111e30] via-[#0b1422] to-[#080f1b] p-3 sm:h-48 sm:p-4 lg:h-52">

                    <img
                      src={book.coverImage}
                      alt={book.title}
                      loading="lazy"
                      className="h-full w-full object-contain drop-shadow-[0_10px_12px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Category Badge */}
                    <span className="absolute left-3 top-3 max-w-[45%] truncate rounded-lg border border-white/10 bg-slate-950/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-amber-300 shadow-lg backdrop-blur-xl">
                      {book.category}
                    </span>

                    {/* Rating Box */}
                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg border border-amber-400/20 bg-slate-950/85 px-2 py-1.5 shadow-lg backdrop-blur-xl transition-all duration-300 group-hover:border-amber-400/40">

                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <HugeiconsIcon
                            key={index}
                            icon={StarIcon}
                            size={11}
                            className={
                              index + 1 <= rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-600"
                            }
                          />
                        ))}
                      </div>

                      <span className="ml-1 border-l border-white/15 pl-1.5 text-[10px] font-bold text-amber-300">
                        {rating.toFixed(1)}
                      </span>

                    </div>

                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-3.5 sm:p-4">

                    {/* Book Information */}
                    <div className="min-w-0 flex-1">

                      <h3 className="line-clamp-1 text-base font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-amber-300">
                        {book.title}
                      </h3>

                      <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                        By <span className="text-slate-300">{book.author}</span>
                      </p>

                      <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-slate-400 sm:text-xs">
                        {book.description}
                      </p>

                    </div>

                    {/* Card Footer */}
                    <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/[0.08] pt-3">

                      {/* Available Copies */}
                      <div className="flex min-w-0 flex-col">
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                          Available Copies
                        </span>

                        <span className="mt-0.5 text-sm font-bold tabular-nums text-white">
                          {book.totalCopies}
                        </span>
                      </div>

                      {/* Premium Details Button */}
                      <Link
                        href={`/detailsbook/${book._id}`}
                        className="group/btn relative inline-flex shrink-0 items-center gap-1.5 overflow-hidden rounded-lg bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 px-3 py-2 text-[11px] font-extrabold text-slate-950 shadow-md shadow-amber-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:translate-y-0 sm:px-3.5 sm:text-xs"
                      >

                        {/* Button Shine */}
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />

                        <span className="relative">
                          View Details
                        </span>

                        <HugeiconsIcon
                          icon={ViewIcon}
                          size={14}
                          className="relative transition-transform duration-300 group-hover/btn:scale-110"
                        />

                      </Link>

                    </div>

                  </div>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400 transition-all duration-500 group-hover:w-full" />

                </article>
              );
            })}

          </div>
        ) : (

          /* Empty State */
          <div className="flex min-h-[300px] flex-col items-center justify-center px-4 text-center">

            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-amber-400">
              <HugeiconsIcon icon={Book01Icon} size={28} />
            </div>

            <h3 className="text-lg font-bold text-white">
              No Books Found
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
              We couldn{"'"}t find any books matching your search or category
              filter. Try searching for something else.
            </p>

          </div>

        )}

      </div>
    </section>
  );
};

export default BookCard;