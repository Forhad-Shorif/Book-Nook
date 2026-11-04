'use client';

import { authClient } from '@/lib/auth-client';
import { showToast } from '@/utils/Toast';
import { Delete02Icon, Message02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import React from 'react';
interface UserReview {
    _id: string;
    Name: string;
    Email: string;
    review: string;
    bookName: string;
    returnedAt: string;
}

const ReviewCards = ({ item }: { item: UserReview }) => {

    const { data: session, error } = authClient.useSession();
    const user = session?.user

    const handleDeleteReview = async () => {
        if (!user) {
            console.error('User not authenticated. Please log in.');
            return;
        }
        try {
            const apiUrl = process.env.NEXT_PUBLIC_SECRET_URL || "";
            const response = await fetch(`${apiUrl}/DeleteReview/${item._id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                console.error("Failed to delete the review. Please try again.");
                return;
            }
            showToast.success("Review deleted successfully!");
            // Refresh the page or update the state to reflect the deletion
            window.location.reload(); // This will refresh the page to show updated reviews
        } catch (error) {
            showToast.error("Failed to delete the review. Please try again.");
            return;
        }
    };

    const formattedDate = item.returnedAt
        ? new Date(item.returnedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
        : "";

    return (
        <div
            key={item._id}
            className="group relative flex flex-col justify-between rounded-xl border border-white/5 bg-slate-950/40 p-3.5 backdrop-blur-3xl shadow-sm hover:border-amber-400/30 hover:bg-slate-900/40 hover:-translate-y-0.5 transition-all duration-300"
        >
            <div>
                {/* টপ বার: মিনি আইকন ও ডেট */}
                <div className="flex items-center justify-between mb-2">
                    <div className="w-6 h-6 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all duration-300">
                        <HugeiconsIcon icon={Message02Icon} size={12} />
                    </div>
                    {formattedDate && (
                        <span className="text-[9px] font-medium text-slate-500 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                            {formattedDate}
                        </span>
                    )}
                </div>

                {/* রিভিউ টেক্সট */}
                <p className="text-xs text-slate-300/90 italic mb-2 leading-relaxed line-clamp-3 group-hover:text-white transition-colors duration-300">
                    &ldquo;{item.review || "Great experience using BookNook!"}&rdquo;
                </p>

                {/* মিনি বুক নেম ট্যাগ */}
                {item.bookName && (
                    <div className="inline-block text-[9px] text-amber-400/70 bg-amber-400/5 border border-amber-400/10 rounded px-1.5 py-0.5 mb-2 max-w-full truncate">
                        📖 {item.bookName}
                    </div>
                )}
            </div>

            {/* বটম বার: ইউজার ইনফো ও ডিলিট বাটন */}
            <div className="flex items-center justify-between pt-2 border-t border-white/5 gap-2">
                <div className="flex items-center gap-2 overflow-hidden flex-1">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-slate-200 font-bold text-[10px] shadow-inner shrink-0">
                        {item.Name ? item.Name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div className="overflow-hidden flex-1 leading-tight">
                        <h4 className="text-[10px] font-bold text-white truncate tracking-wide">
                            {item.Name || "Anonymous User"}
                        </h4>
                        <p className="text-[9px] text-slate-500 truncate mt-0.5">
                            {item.Email}
                        </p>
                    </div>
                </div>

                {/* প্রিমিয়াম কাস্টম ডিলিট বাটন */}
                {user && user.email === item.Email && (
                    <button
                        onClick={handleDeleteReview}
                        className="w-6 h-6 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-slate-950 transition-all duration-300"
                        title="Delete Review"
                    >
                        <HugeiconsIcon icon={Delete02Icon} size={12} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ReviewCards;