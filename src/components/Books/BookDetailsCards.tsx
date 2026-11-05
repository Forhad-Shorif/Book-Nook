"use client";

import { Book } from "@/Type/type";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    BookOpen01Icon,
    StarIcon,
    ArrowLeftIcon, // 👈 ব্যাক আইকনের জন্য এটি যোগ করা হয়েছে
} from "@hugeicons/core-free-icons";
import BorrowBtn from "./BorrowBtn";
import { useRouter } from "next/navigation"; // 👈 useRouter ইমপোর্ট করা হয়েছে


interface BookDetailsCardsProps {
    bookDetails: Book;
}

const BookDetailsCards = ({ bookDetails }: BookDetailsCardsProps) => {
    const router = useRouter(); // 👈 রাউটার ইনিশিয়ালাইজ করা হয়েছে

    return (
        <div className="min-h-screen bg-[#07101c] text-slate-100 px-4 py-8 sm:px-6 lg:px-12 flex items-center justify-center">
            <div className="mx-auto max-w-5xl w-full">

                {/* 👈 ব্যাক বাটনটি এখানে যোগ করা হলো */}
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-900/60 hover:bg-slate-800/80 active:bg-slate-950 rounded-xl transition-all border border-white/10 backdrop-blur-md cursor-pointer group shadow-lg"
                >
                    <HugeiconsIcon 
                        icon={ArrowLeftIcon} 
                        size={16} 
                        className="transition-transform group-hover:-translate-x-1" 
                    />
                    <span>Back</span>
                </button>

                {/* Main Glass Card Wrapper */}
                <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900/60 p-6 sm:p-8 lg:p-10 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)]">

                    {/* Background Ambient Glow */}
                    <div className="absolute -top-24 -right-24 size-96 rounded-full bg-amber-400/10 blur-[120px] pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 size-96 rounded-full bg-sky-500/10 blur-[120px] pointer-events-none" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                        {/* Left Side: Book Cover Image */}
                        <div className="lg:col-span-5 flex justify-center">
                            <div className="relative aspect-[3/4] w-full max-w-xs sm:max-w-sm overflow-hidden rounded-2xl border border-white/20 bg-slate-950 shadow-2xl group">
                                <img
                                    src={bookDetails.coverImage}
                                    alt={bookDetails.title}
                                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />

                                {/* Category Badge */}
                                <span className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300 backdrop-blur-md">
                                    {bookDetails.category || "General"}
                                </span>

                                {/* Rating Badge */}
                                <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-3 py-1 text-xs font-bold text-amber-400 backdrop-blur-md">
                                    <HugeiconsIcon icon={StarIcon} size={14} className="fill-amber-400" />
                                    <span>{bookDetails.rating || "4.5"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Book Details Content */}
                        <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">

                            <div>
                                {/* Eyebrow */}
                                <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-300 mb-3">
                                    <HugeiconsIcon icon={BookOpen01Icon} size={14} />
                                    Book Details
                                </div>

                                {/* Title */}
                                <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                                    {bookDetails.title}
                                </h1>

                                {/* Author */}
                                <p className="mt-2 text-sm sm:text-base font-medium text-amber-400/90">
                                    By {bookDetails.author}
                                </p>

                                {/* Description */}
                                <p className="mt-4 text-xs sm:text-sm lg:text-base text-slate-300/80 leading-relaxed">
                                    {bookDetails.description}
                                </p>
                            </div>

                            {/* Meta Info Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-y border-white/10">
                                <div className="flex flex-col">
                                    <span className="text-[11px] uppercase tracking-wider text-slate-400">Total Pages</span>
                                    <span className="text-sm font-semibold text-white mt-0.5">{bookDetails.totalPages || "N/A"} Pages</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] uppercase tracking-wider text-slate-400">Available Copies</span>
                                    <span className="text-sm font-semibold text-white mt-0.5">{bookDetails.totalCopies ?? "1"} Left</span>
                                </div>
                                <div className="col-span-2 sm:col-span-1 flex flex-col">
                                    <span className="text-[11px] uppercase tracking-wider text-slate-400">Added By</span>
                                    <span className="text-sm font-semibold text-white truncate mt-0.5">
                                        {bookDetails.addedBy?.name || "Admin"}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons (Borrow & Love) */}
                            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">

                                {/* Borrow Button and Love Button */}
                                <BorrowBtn BorrowBook={bookDetails} />
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default BookDetailsCards;
