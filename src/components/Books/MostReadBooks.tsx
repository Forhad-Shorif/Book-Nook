import BookCard from '@/components/Books/BookCard';
import { Book } from '@/Type/type';
import { showToast } from '@/utils/Toast';
import React from 'react';

// ব্যাকএন্ড থেকে লেটেস্ট 6 টি বই ফেচ করার ফাংশন
const fetchLatestBooks = async (): Promise<Book[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SECRET_URL}/LatestBooks`,{next: { revalidate: 1 }});

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    showToast.error("Failed to fetch latest books. Please try again later.");
    return [];
  }
};

const MostReadBooks = async () => {
  
  const books: Book[] = await fetchLatestBooks();

  return (
    <section className="bg-[#07101c] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-white/10 pb-6">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
              Fresh Arrivals
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-heading">
              Latest Books Collection
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-sm text-slate-400 max-w-sm">
            Explore the newly added stories and guides freshly curated in our library shelf.
          </p>
        </div>

        {/* Passing Data Directly to BookCard Component */}
        <div>
          <BookCard books={books}/>
        </div>

      </div>
    </section>
  );
};

export default MostReadBooks;