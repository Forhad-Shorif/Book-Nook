export default function GlobalLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full bg-transparent px-4">
      {/* Loading Animation */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-28 h-28 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin duration-700"></div>
        <div className="absolute w-20 h-20 rounded-full border-2 border-indigo-500/20 border-b-indigo-500 animate-spin duration-1000" style={{ animationDirection: 'reverse' }}></div>
        
        <div className="w-10 h-10 bg-gradient-to-tr from-amber-500 to-indigo-600 rounded-xl shadow-[0_0_25px_rgba(245,158,11,0.5)] animate-pulse flex items-center justify-center">
          <svg className="w-5 h-5 text-white animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-xl font-bold tracking-wide bg-gradient-to-r from-amber-400 via-indigo-300 to-amber-500 bg-clip-text text-transparent animate-pulse">
          Loading BookNook...
        </h3>
        <p className="text-xs text-gray-400 mt-2 font-mono tracking-wider">
          Crafting your digital sanctuary ✨
        </p>
      </div>
    </div>
  );
}