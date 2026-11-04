import { Book } from '@/Type/type';
import React from 'react';
import { HugeiconsIcon } from "@hugeicons/react";
import { BookOpen01Icon } from "@hugeicons/core-free-icons";
import AllBooksCards from '@/components/Books/AllBooksCards';

const FetchData: () => Promise<Book[]> = async ()=> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SECRET_URL}/books`, {
      next: { revalidate: 10 } // রিয়েল-টাইম ডেটা ফেচ করার জন্য
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    // যদি এপিআই রেসপন্সটি সরাসরি অ্যারে হয় (যেমন তোমার ডেটা স্যাম্পলে দেখা যাচ্ছে)
    if (Array.isArray(data)) {
      return data;
    }

    // যদি রেসপন্স অবজেক্টের ভেতরে ডেটা থাকে (যেমন data.books বা data.data)
    if (data.ok && Array.isArray(data.books)) {
      return data.books;
    }

    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
};

const AllBookPage = async () => {
  const books: Book[] = await FetchData() as Book[]; // Type assertion to Book[]
  if (!books || books.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07101c] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
          <p className="text-sm font-medium tracking-wide text-slate-400">Loading books...</p>
        </div>
      </div>
    );
  }

  return (
    <main>
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-amber-300 backdrop-blur-md">
          <HugeiconsIcon icon={BookOpen01Icon} size={15} />
          Explore Library
        </span>
        <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Browse All Books
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
          Discover thousands of hand-picked stories, financial guides, and historical masterpieces. Find your next favorite read today.
        </p>
      </div>
      <AllBooksCards books={books} />
    </main>
  );
};

export default AllBookPage;