import { Book } from '@/Type/type';
import React from 'react';
import { HugeiconsIcon } from "@hugeicons/react";
import { BookOpen01Icon } from "@hugeicons/core-free-icons";
import AllBooksCards from '@/components/Books/AllBooksCards';

const FetchData: () => Promise<Book[]> = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SECRET_URL}/books`, {
      next: { revalidate: 1 } 
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      return data;
    }

    if (data.ok && Array.isArray(data.books)) {
      return data.books;
    }

    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
};

const AllBookPage = async () => {
  const books: Book[] = await FetchData() as Book[];

  if (!books || books.length === 0) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center bg-transparent text-white px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-16 h-16 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin duration-700"></div>
            <div className="w-8 h-8 bg-gradient-to-tr from-amber-500 to-indigo-600 rounded-lg shadow-[0_0_20px_rgba(245,158,11,0.4)] animate-pulse" />
          </div>
          <p className="text-sm font-medium tracking-wide text-slate-300">
            No books found or loading library...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#07101c] text-white px-4 sm:px-6 lg:px-8 py-10 overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-amber-500/10 via-indigo-600/10 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          <HugeiconsIcon icon={BookOpen01Icon} size={15} className="text-amber-400" />
          Explore Library
        </div>
        
        <h1 className="mt-5 font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Browse All <span className="bg-gradient-to-r from-amber-400 via-indigo-300 to-amber-500 bg-clip-text text-transparent">Books</span>
        </h1>
        
        <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          Discover thousands of hand-picked stories, financial guides, and historical masterpieces. Find your next favorite read today.
        </p>
      </div>

      {/* Cards Component Section */}
      <div className="max-w-7xl mx-auto">
        <AllBooksCards books={books} />
      </div>
    </main>
  );
};

export default AllBookPage;