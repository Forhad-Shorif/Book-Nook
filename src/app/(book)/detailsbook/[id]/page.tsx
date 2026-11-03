import BookDetailsCards from '@/components/Books/BookDetailsCards';
import { Book } from '@/Type/type';

interface BookDetailsPageProps {
    params: Promise<{ id: string }>;
}

const BookDetailsPage = async ({ params }: BookDetailsPageProps) => {
    // 1. Await params safely for Next.js 15+ dynamic routes
    const { id } = await params;

    if (!id) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#07101c] text-white">
                <p className="text-red-400 font-medium">Invalid book ID provided.</p>
            </div>
        );
    }


    // 2. Fetch book details from backend API
    const res = await fetch(`${process.env.PUBLIC_SECRET_URL}/books/${id}`);

    // 3. Handle response errors gracefully
    if (!res.ok) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#07101c] text-white text-center px-4">
                <h2 className="text-2xl font-bold text-amber-400">Book Not Found</h2>
                <p className="mt-2 text-sm text-slate-400">The book you are looking for might have been removed or does not exist.</p>
            </div>
        );
    }

    const bookDetails: Book = await res.json();

    if (!bookDetails) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#07101c] text-white">
                <p className="text-slate-400">No details available for this book.</p>
            </div>
        );
    }

    // 4. Render the details card component
    return (
        <main className="w-full">
            <BookDetailsCards bookDetails={bookDetails} />
        </main>
    );
};

export default BookDetailsPage;