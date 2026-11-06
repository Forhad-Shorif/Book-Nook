"use client";

import { Book } from "@/Type/type";
import EditBookForm from "../AllBookForm/MyEditBook";
import DeleteBookForm from "../AllBookForm/MyDeleteBook";

const MyBookCards = ({ books }: { books: Book[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">

      {books.map((book: Book) => (
        <article
          key={book._id}
          className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-slate-800/80 to-[#0b1422] p-3.5 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/30 hover:shadow-xl hover:shadow-amber-400/[0.07] sm:p-4"
        >

          {/* Book Cover */}
          <div className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-xl border border-white/[0.05] bg-gradient-to-br from-[#111e30] via-[#0b1422] to-[#080f1b] p-3 sm:h-48 lg:h-52">

            <img
              src={book.coverImage}
              alt={book.title}
              loading="lazy"
              className="h-full w-full object-contain drop-shadow-[0_10px_12px_rgba(0,0,0,0.4)] transition-transform duration-500 ease-out group-hover:scale-105"
            />

            {/* Image Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-white/[0.02]" />

            {/* Category Badge */}
            {book.category && (
              <span className="absolute left-2.5 top-2.5 max-w-[65%] truncate rounded-lg border border-white/10 bg-slate-950/80 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider text-amber-300 shadow-lg backdrop-blur-xl">
                {book.category}
              </span>
            )}

          </div>

          {/* Book Information */}
          <div className="mt-3 min-w-0 flex-1">

            <h3 className="line-clamp-1 text-base font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-amber-300">
              {book.title}
            </h3>

            <p className="mt-1 truncate text-xs font-medium text-slate-400">
              Author:{" "}
              <span className="text-slate-200">
                {book.author}
              </span>
            </p>

          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex items-center gap-2.5 border-t border-white/[0.08] pt-3.5">

            <div className="min-w-0 flex-1 [&_button]:w-full">
              <EditBookForm book={book} />
            </div>

            <div className="min-w-0 flex-1 [&_button]:w-full">
              <DeleteBookForm book={book} />
            </div>

          </div>

          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400 transition-all duration-500 group-hover:w-full" />

        </article>
      ))}

    </div>
  );
};

export default MyBookCards;