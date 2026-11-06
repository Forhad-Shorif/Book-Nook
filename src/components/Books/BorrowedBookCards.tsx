"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
    Book01Icon,
    Calendar01Icon,
} from "@hugeicons/core-free-icons";

import BorrowedBookDelete from "../AllBookForm/BorrowedBookDelete";

export interface BorrowedBook {
    _id?: string;
    bookId?: string;
    Title?: string;
    Image?: string;
    Name?: string;
    Email?: string;
    borrowedAt?: string;
    returnDate?: string;
}

const BorrowedBookCards = ({ book }: { book: BorrowedBook[] }) => {

    // Empty State
    if (!book || book.length === 0) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center px-4 py-10">
                <div className="flex max-w-sm flex-col items-center rounded-2xl border border-white/10 bg-slate-900/60 px-8 py-10 text-center shadow-xl backdrop-blur-xl">

                    <div className="mb-5 flex size-16 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-amber-400">
                        <HugeiconsIcon icon={Book01Icon} size={32} />
                    </div>

                    <h2 className="text-xl font-bold text-white">
                        No Borrowed Books
                    </h2>

                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        You haven{"'"}t borrowed any books yet. Explore our
                        collection and find your next favorite read.
                    </p>

                </div>
            </div>
        );
    }

    return (
        <section className="mx-auto max-w-7xl px-3 py-7 text-slate-100 sm:px-5 sm:py-9 lg:px-8">

            {/* Header */}
            <div className="mb-7 border-b border-white/[0.08] pb-5">

                <span className="mb-1 inline-block text-[10px] font-bold uppercase tracking-[2px] text-amber-400">
                    My Activity
                </span>

                <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                    Borrowed Books
                </h1>

                <p className="mt-1.5 text-xs leading-relaxed text-slate-400 sm:text-sm">
                    Keep track of your borrowed books and return dates.
                </p>

            </div>

            {/* Borrowed Books Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">

                {book.map((item) => (

                    <article
                        key={item._id}
                        className="group relative flex min-w-0 gap-3 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-slate-800/80 to-[#0b1422] p-3 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/30 hover:shadow-xl hover:shadow-amber-400/[0.06] sm:gap-4 sm:p-4"
                    >

                        {/* Book Cover */}
                        <div className="relative flex h-32 w-[88px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br from-[#111e30] to-[#080f1b] p-2 sm:h-36 sm:w-24">

                            <img
                                src={item.Image || "/default-book-cover.jpg"}
                                alt={item.Title || "Borrowed Book"}
                                loading="lazy"
                                className="h-full w-full object-contain drop-shadow-[0_8px_10px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105"
                            />

                        </div>

                        {/* Book Details */}
                        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">

                            <div className="min-w-0">

                                {/* Book Title */}
                                <h3 className="line-clamp-2 text-sm font-bold leading-snug text-white transition-colors duration-300 group-hover:text-amber-300 sm:text-base">
                                    {item.Title || "Untitled Book"}
                                </h3>

                                {/* Borrower */}
                                <p className="mt-1 truncate text-[10px] text-slate-400 sm:text-xs">
                                    Borrower:{" "}
                                    <span className="font-semibold text-slate-200">
                                        {item.Name || "N/A"}
                                    </span>
                                </p>

                                {/* Dates */}
                                <div className="mt-3 space-y-2 border-t border-white/[0.08] pt-2.5">

                                    {/* Borrowed Date */}
                                    <div className="flex min-w-0 items-center justify-between gap-1.5">

                                        <div className="flex shrink-0 items-center gap-1.5 text-slate-500">
                                            <HugeiconsIcon
                                                icon={Calendar01Icon}
                                                size={12}
                                            />
                                            <span className="text-[10px]">
                                                Borrowed
                                            </span>
                                        </div>

                                        <span className="truncate text-right text-[10px] font-medium text-slate-300">
                                            {item.borrowedAt || "N/A"}
                                        </span>

                                    </div>

                                    {/* Return Date */}
                                    <div className="flex min-w-0 items-center justify-between gap-1.5">

                                        <div className="flex shrink-0 items-center gap-1.5 text-amber-400">
                                            <HugeiconsIcon
                                                icon={Calendar01Icon}
                                                size={12}
                                            />
                                            <span className="text-[10px]">
                                                Return
                                            </span>
                                        </div>

                                        <span className="truncate text-right text-[10px] font-bold text-amber-300">
                                            {item.returnDate || "N/A"}
                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* Delete Action */}
                            <div className="mt-3 flex items-center justify-end border-t border-white/[0.06] pt-2.5">

                                <div className="min-w-0 [&_button]:max-w-full">
                                    <BorrowedBookDelete book={item} />
                                </div>

                            </div>

                        </div>

                        {/* Bottom Accent */}
                        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400 transition-all duration-500 group-hover:w-full" />

                    </article>

                ))}

            </div>

        </section>
    );
};

export default BorrowedBookCards;