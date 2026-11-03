import BorrowedBookDelete from '../AllBookForm/BorrowedBookDelete';

export interface BorrowedBook {
    _id?: string;
    bookId?: string;
    Title?: string;
    Image?: string;
    Name?: string;
    Email?: string;
    borrowedAt?: string; // অথবা Date টাইপও ব্যবহার করতে পারো যদি ডেট অবজেক্ট হিসেবে রাখো
    returnDate?: string;
}
const BorrowedBookCards = ({ book }: { book: BorrowedBook[] }) => {
    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8 border-b border-white/10 pb-6">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
                    My Activity
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight text-white">
                    Borrowed Books
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Here are the books you currently have borrowed from the community.
                </p>
            </div>

            {/* Cards Grid (Compact & Horizontal Layout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {book.map((item) => {
                    return (
                        <div
                            key={item._id}
                            className="group relative flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/80 p-4 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/40 hover:shadow-[0_10px_30px_rgba(251,191,36,0.08)]"
                        >
                            {/* Left Side: Book Cover (Compact) */}
                            <div className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden rounded-xl bg-slate-950/60 border border-white/5 shadow-inner">
                                <img
                                    src={item.Image || '/default-book-cover.jpg'} // ডিফল্ট কভার ইমেজ ব্যবহার করা হচ্ছে যদি Image না থাকে
                                    alt={item.Title || 'Borrowed Book'}
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Right Side: Details & Delete Button Space */}
                            <div className="flex flex-1 flex-col justify-between h-full py-0.5">
                                <div>
                                    <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
                                        {item.Title}
                                    </h3>
                                    <p className="text-[11px] text-slate-400 mt-0.5">
                                        Borrower: <span className="text-slate-200 font-medium">{item.Name}</span>
                                    </p>

                                    {/* Dates Section */}
                                    <div className="mt-2.5 space-y-1 text-[11px] text-slate-300 border-t border-white/5 pt-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-400">Borrowed:</span>
                                            <span className="font-medium text-slate-200">{item.borrowedAt || "N/A"}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-400">Return Date:</span>
                                            <span className="font-semibold text-amber-400">{item.returnDate || "N/A"}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Placeholder for Delete Button (যেটি পরে অন্য কম্পোনেন্টে যুক্ত করবে) */}
                                <div className="mt-3 flex items-center justify-end">
                                  <BorrowedBookDelete book={item} />  
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BorrowedBookCards;