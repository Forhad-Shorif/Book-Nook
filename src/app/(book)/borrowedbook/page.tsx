import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import BorrowedBookCards from "@/components/Books/BorrowedBookCards";

const BorrowedBook = async () => {
    const requestHeaders = await headers();

    // Authentication
    const session = await auth.api.getSession({
        headers: requestHeaders,
    });

    // Unauthorized State
    if (!session?.user) {
        return (
            <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#07101c] px-4 text-white">

                {/* Background Glow */}
                <div className="pointer-events-none absolute -left-32 top-10 size-72 rounded-full bg-amber-400/[0.06] blur-[100px]" />
                <div className="pointer-events-none absolute -right-32 bottom-0 size-72 rounded-full bg-blue-500/[0.06] blur-[100px]" />

                <div className="relative z-10 flex max-w-sm flex-col items-center rounded-2xl border border-white/10 bg-slate-900/70 px-8 py-10 text-center shadow-2xl backdrop-blur-xl">

                    <div className="mb-5 flex size-16 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-amber-400">
                        <span className="text-3xl">📚</span>
                    </div>

                    <h2 className="text-xl font-bold text-white">
                        Sign In Required
                    </h2>

                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        Please sign in to view and manage your borrowed books.
                    </p>

                    <Link
                        href="/sign-in"
                        className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 px-6 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-400/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-amber-400/25"
                    >
                        Sign In
                    </Link>

                </div>
            </main>
        );
    }

    // Get Authentication Token
    const token = await auth.api.getToken({
        headers: requestHeaders,
    });

    const tokenValue = token?.token;
    const email = session.user.email;

    let borrowedBooks = [];

    // Fetch Borrowed Books
    if (tokenValue && email) {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SECRET_URL}/BorrowedBooksGet/${encodeURIComponent(email)}`,
                {
                    headers: {
                        authorization: `Bearer ${tokenValue}`,
                    },
                    cache: "no-store",
                }
            );

            if (response.ok) {
                const data = await response.json();

                borrowedBooks = Array.isArray(data) ? data : [];
            }
        } catch (error) {
            console.error("Failed to fetch borrowed books:", error);
        }
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#07101c]">

            {/* Ambient Background Effects */}
            <div className="pointer-events-none absolute -left-40 top-20 size-96 rounded-full bg-amber-400/[0.045] blur-[120px]" />

            <div className="pointer-events-none absolute -right-40 top-[35%] size-96 rounded-full bg-blue-500/[0.045] blur-[120px]" />

            <div className="pointer-events-none absolute bottom-0 left-1/3 size-80 rounded-full bg-amber-500/[0.035] blur-[120px]" />

            {/* Borrowed Books Content */}
            <div className="relative z-10">

                <BorrowedBookCards book={borrowedBooks} />

            </div>

        </main>
    );
};

export default BorrowedBook;