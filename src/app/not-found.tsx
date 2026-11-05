import Link from 'next/link';

export default function GlobalNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full bg-transparent px-4 text-center">
      <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/30 rounded-3xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(245,158,11,0.2)] animate-pulse">
        <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-amber-400 via-indigo-300 to-amber-500 bg-clip-text text-transparent">
        Page Not Found
      </h1>
      <p className="text-gray-400 mt-3 max-w-md text-sm leading-relaxed">
        The page or book you are looking for has wandered off the shelf or doesn{"'"}t exist.
      </p>

      <Link 
        href="/" 
        className="mt-8 px-7 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 font-semibold text-sm shadow-lg shadow-amber-500/25 hover:scale-105 transition-all duration-300"
      >
        Return to Home
      </Link>
    </div>
  );
}