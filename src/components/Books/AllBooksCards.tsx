'use client';
import React from 'react';
import { Book } from '@/Type/type';
import { useState } from 'react';
import BookCard from './BookCard';
import {
    Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const AllBooksCards = ({ books }: { books: Book[] }) => {
  

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", "Financial", "Science", "History", "Islamic", "Others"];

    const filteredBooks = (books || []).filter((book) => {
        const matchesSearch =
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    

    return (
        <div>
            {/* Search and Filter Toolbar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-slate-900/60 p-4 rounded-2xl border border-white/10 backdrop-blur-xl">

                {/* Search Input */}
                <div className="relative w-full md:w-80">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                        <HugeiconsIcon icon={Search01Icon} size={18} />
                    </span>
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-full border border-white/15 bg-slate-950/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
                    />
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`rounded-full px-4 py-2 text-xs font-medium transition-all shrink-0 ${selectedCategory === cat
                                    ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20 font-semibold"
                                    : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

            </div>

            <BookCard books={filteredBooks} />
        </div>
    );
};

export default AllBooksCards;