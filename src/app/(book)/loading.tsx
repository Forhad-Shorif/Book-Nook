export default function BookLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] w-full bg-transparent px-4">
      {/* Loading Animation */}
      <div className="relative flex items-center justify-center">
        
        {/* (Glow Ring) */}
        <div className="absolute w-24 h-24 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin duration-700"></div>
        
        {/* (Reverse Glow Ring) */}
        <div className="absolute w-16 h-16 rounded-full border-2 border-indigo-500/20 border-b-indigo-500 animate-spin duration-1000" style={{ animationDirection: 'reverse' }}></div>
        
        {/* (Center Pulse Icon) */}
        <div className="w-8 h-8 bg-gradient-to-tr from-amber-500 to-indigo-600 rounded-lg shadow-[0_0_20px_rgba(245,158,11,0.5)] animate-pulse flex items-center justify-center">
          <svg 
            className="w-4 h-4 text-white animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      </div>

      {/* Styleful Text and Dot Animation */}
      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold tracking-wide bg-gradient-to-r from-amber-400 via-indigo-300 to-amber-500 bg-clip-text text-transparent animate-pulse">
          Opening BookNook Library...
        </h3>
        <p className="text-xs text-gray-400 mt-1.5 font-mono">
          Preparing your shelves & stories ✨
        </p>
      </div>
    </div>
  );
}