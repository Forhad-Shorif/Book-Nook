import { Book } from '@/Type/type';
import EditBookForm from '../AllBookForm/MyEditBook';
import DeleteBookForm from '../AllBookForm/MyDeleteBook';

const MyBookCards = ({ books }: { books: Book[] }) => {
    
    return (
        <>
            {/* Wow & Responsive Book Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book: Book) => (
                    <div
                        key={book._id}
                        className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/50 hover:shadow-[0_20px_50px_rgba(251,191,36,0.1)] hover:-translate-y-1"
                    >
                        <div>
                            {/* Book Cover with Glassmorphism Badge */}
                            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-slate-950/60 mb-4 border border-white/5 shadow-inner">
                                <img
                                    src={book.coverImage}
                                    alt={book.title}
                                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                />
                                {book.category && (
                                    <span className="absolute top-3 left-3 rounded-full bg-slate-950/80 backdrop-blur-md px-3.5 py-1 text-[10px] font-semibold text-amber-400 border border-white/10 shadow-lg tracking-wider">
                                        {book.category}
                                    </span>
                                )}
                            </div>

                            {/* Book Info */}
                            <h3 className="text-base font-bold text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
                                {book.title}
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">
                                Author: <span className="text-slate-200 font-medium">{book.author}</span>
                            </p>
                        </div>

                        {/* Action Buttons (Edit & Delete modals passed with book data) */}
                        <div className="flex items-center gap-2.5 pt-4 mt-5 border-t border-white/10">
                            <div className="flex-1">
                                <EditBookForm book={book} />
                            </div>
                            <div className="flex-1">
                                <DeleteBookForm book={book} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MyBookCards;