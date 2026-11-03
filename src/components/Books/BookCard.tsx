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


  const filteredBooks = books || []; // Use the provided books directly without filtering
  return (
    <div className="min-h-screen bg-[#07101c] text-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              >
                {/* Book Image Container using standard img for zero rendering issues */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-300 backdrop-blur-md">
                    {book.category}
                  </span>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-xs font-bold text-amber-400 backdrop-blur-md">
                    <HugeiconsIcon icon={StarIcon} size={13} className="fill-amber-400" />
                    <span>{book.rating}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                      {book.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-slate-400">
                      By {book.author}
                    </p>
                    <p className="mt-2.5 text-xs text-slate-300/80 line-clamp-2 leading-relaxed">
                      {book.description}
                    </p>
                  </div>

                  {/* Card Footer with View Details Button */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="text-[11px] text-slate-400">
                      Copies: <span className="font-semibold text-white">{book.totalCopies}</span>
                    </div>

                    <Link
                      href={`/detailsbook/${book._id}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-amber-400 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    >
                      <span>View Details</span>
                      <HugeiconsIcon icon={ViewIcon} size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400 mb-4">
              <HugeiconsIcon icon={Book01Icon} size={28} />
            </div>
            <h3 className="text-lg font-bold text-white">No books found</h3>
            <p className="mt-1 text-sm text-slate-400 max-w-sm">
              We couldn{"'"}t find any books matching your search or category filter. Try searching for something else.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default BookCard;