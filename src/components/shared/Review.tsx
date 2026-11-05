import { auth } from "@/lib/auth";
import ReviewCards from "./ReviewCards";
import { headers } from "next/headers";
import Link from "next/link";

interface UserReview {
    _id: string;
    Name: string;
    Email: string;
    review: string;
    bookName: string;
    returnedAt: string;
}

const Review = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    const user = session?.user

    const response = await fetch(`${process.env.NEXT_PUBLIC_SECRET_URL}/GetReview`, {
        next: { revalidate: 10 }
    });
    const reviews = await response.json();

    if (!reviews || reviews.length === 0) {
        return (
            <div className="py-8 text-center text-slate-500">
                <p className="text-xs">No community reviews yet.</p>
            </div>
        );
    }

    return (
        <div>
            {user ? (
                <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto overflow-hidden bg-slate-950/60 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-xl my-10">
                    {/* Section Header */}
                    <div className="text-center mb-6">
                        <span className="inline-block px-2 py-0.5 mb-1 text-[9px] font-bold tracking-widest text-amber-400 uppercase bg-amber-400/10 rounded-full border border-amber-400/20">
                            Feedback
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent font-heading">
                            What Our Readers Say
                        </h2>
                    </div>

                    {/* Review Card Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {reviews.map((item: UserReview, index: number) => <ReviewCards key={index} item={item} />)}
                    </div>
                </section>
            ) : (
                ""
            )}
        </div>
    );
};

export default Review;
