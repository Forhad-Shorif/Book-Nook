export default function AuthLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] w-full bg-transparent px-4">
      {/* ফিউচারিস্টিক সিকিউরিটি গ্লোয়িং লোডার */}
      <div className="relative flex items-center justify-center">
        
        {/* বাইরের পালসেটিং রিং */}
        <div className="absolute w-24 h-24 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin duration-700"></div>
        
        {/* ভেতরের রিভার্স রিং */}
        <div className="absolute w-16 h-16 rounded-full border-2 border-amber-500/20 border-b-amber-500 animate-spin duration-1000" style={{ animationDirection: 'reverse' }}></div>
        
        {/* মাঝখানে লক বা অথেনটিকেশন আইকন */}
        <div className="w-8 h-8 bg-gradient-to-tr from-indigo-600 to-amber-500 rounded-lg shadow-[0_0_20px_rgba(99,102,241,0.5)] animate-pulse flex items-center justify-center">
          <svg 
            className="w-4 h-4 text-white animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>

      {/* স্টাইলিশ টেক্সট ইফেক্ট */}
      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold tracking-wide bg-gradient-to-r from-indigo-400 via-amber-300 to-indigo-500 bg-clip-text text-transparent animate-pulse">
          Securing Connection...
        </h3>
        <p className="text-xs text-gray-400 mt-1.5 font-mono">
          Verifying credentials & loading portal 🔒
        </p>
      </div>
    </div>
  );
} 