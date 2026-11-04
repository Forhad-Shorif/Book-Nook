import ReviewCards from "./ReviewCards";

interface UserReview {
    _id: string;
    Name: string;
    Email: string;
    review: string;
    bookName: string;
    returnedAt: string;
}

const Review = async () => {


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
        <section className="py-8 px-4 max-w-5xl mx-auto">
            {/* সেকশন হেডার - স্লিক ও কমপ্যাক্ট */}
            <div className="text-center mb-6">
                <span className="inline-block px-2 py-0.5 mb-1 text-[9px] font-bold tracking-widest text-amber-400 uppercase bg-amber-400/10 rounded-full border border-amber-400/20">
                    Feedback
                </span>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent font-heading">
                    What Our Readers Say
                </h2>
            </div>

            {/* রিভিউ কার্ড গ্রিড */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviews.map((item: UserReview, index: number) => <ReviewCards key={index} item={item} />)}
            </div>
        </section>
    );
};

export default Review;
