import Link from 'next/link';
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon, BookOpen01Icon } from "@hugeicons/core-free-icons";
import MyBookCards from '@/components/Books/MyBooks'
import { Book } from '@/Type/type';

import { auth } from '@/lib/auth'
import { headers } from "next/headers";


const MyBooksPage = async () => {

const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
const user = session?.user
const email = user?.email
console.log(email)

    const res = await fetch(`http://localhost:8000/MyBooks/${email}`);

    if (!res.ok) {
       return <p>somossa hoyeche</p>
    }

    const books: Book[] = await res.json();
   
    if (!books) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-[#07101c] text-white">
                <div className="flex flex-col items-center gap-3">
                    <div className="size-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                    <p className="text-sm font-medium tracking-wide text-slate-400">Loading your bookshelf...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#07101c] text-slate-100 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Header section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
                    <div>
                        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
                            Your Library
                        </span>
                        <h1 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight text-white">
                            My Published Books
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1">
                            Manage, update details, or remove books you have shared with the BookNook community.
                        </p>
                    </div>
                    <Link
                        href="/add-book"
                        className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-xs sm:text-sm font-bold text-slate-950 shadow-lg shadow-amber-400/25 hover:bg-amber-300 hover:scale-[1.02] transition-all cursor-pointer"
                    >
                        <HugeiconsIcon icon={PlusSignIcon} size={18} />
                        <span>Add New Book</span>
                    </Link>
                </div>

                {/* Books Grid */}
                {books.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-slate-900/50 p-16 text-center backdrop-blur-xl">
                        <div className="size-16 rounded-2xl bg-amber-400/10 flex items-center justify-center text-amber-400 mb-4 border border-amber-400/20">
                            <HugeiconsIcon icon={BookOpen01Icon} size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">No books added yet</h3>
                        <p className="text-xs sm:text-sm text-slate-400 max-w-sm mb-6">
                            You haven{"'"}t published any books to your shelf. Start sharing your favorite reads today!
                        </p>
                        <Link
                            href="/add-book"
                            className="rounded-full bg-white/10 border border-white/20 px-6 py-3 text-xs font-semibold text-white hover:bg-white/20 transition-all cursor-pointer"
                        >
                            Publish Your First Book
                        </Link>
                    </div>
                ) : (
                    <MyBookCards
                        books={books}
                    />
                )}
            </div>
        </div>
    );
};

export default MyBooksPage;