'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Captured App Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full bg-transparent px-4 text-center">
      <div className="w-20 h-20 bg-red-500/10 border border-red-500/30 rounded-3xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
        <svg className="w-10 h-10 text-red-500 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h2 className="text-3xl font-extrabold bg-gradient-to-r from-red-400 via-amber-400 to-red-500 bg-clip-text text-transparent">
        Something Went Wrong!
      </h2>
      <p className="text-gray-400 mt-3 max-w-lg text-xs md:text-sm font-mono bg-gray-900/80 p-4 rounded-xl border border-gray-800 text-left overflow-x-auto">
        {error.message || 'An unexpected error occurred in the application.'}
      </p>

      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium text-sm shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 hover:scale-105 transition-all duration-300"
        >
          Try Again
        </button>
        
      
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-gray-800 text-gray-300 font-medium text-sm hover:bg-gray-700 hover:text-white transition-all duration-300 border border-gray-700"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}