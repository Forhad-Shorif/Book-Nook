'use client'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { authClient } from "@/lib/auth-client";
import { showToast } from "@/utils/Toast";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { File01Icon, ArrowLeftIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export interface BorrowedBook {
    _id?: string;
    bookId?: string;
    Title?: string;
    Image?: string;
    Name?: string;
    Email?: string;
    borrowedAt?: string;
    returnDate?: string;
}

const BorrowedBookDelete = ({ book }: { book: BorrowedBook }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleReturnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const { data: sessionData } = await authClient.getSession();
        const user = sessionData?.user;
        if (!user) {
            showToast.error('User not authenticated. Please log in.');
            setLoading(false);
            return;
        }

        // ফর্ম থেকে রিভিউ ডেটা নেওয়া (অপশনাল)
        const formData = new FormData(e.target as HTMLFormElement);
        const bookData = Object.fromEntries(formData.entries()) as {
            review: string
        }

        const payload = {
            Name: user.name,
            Email: user.email,
            ...bookData,
            bookName: book.Title,
            returnedAt: new Date().toISOString()
        };

        try {
            if (bookData.review && bookData.review.trim() !== "") {
                const apiUrl = process.env.NEXT_PUBLIC_SECRET_URL || "";

                // ১. ব্যাকএন্ডে রিভিউ বা রিটার্ন হিস্ট্রি পোস্ট করা
           await fetch(`${apiUrl}/ReviewPost`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

            }
  
              // ৫. বইয়ের কপি একটি দেওয়া (PATCH Request)
            const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_SECRET_URL}/BookCopesIncrease/${book._id}`, {
                method: "PATCH",
            });
           
            // ২. ধার করা বইয়ের লিস্ট থেকে ডিলিট করা
            const response = await fetch(`${process.env.NEXT_PUBLIC_SECRET_URL}/BorrowedBooksReturn/${book._id}`, {
                method: 'DELETE',
            });
            if (response) {
                showToast.success('Borrowed book returned successfully!');
                router.refresh();
                 setOpen(false);
            }

            if(!response){
                showToast.error('Failed to return the borrowed book. Please try again.');
            }

        } catch (error) {
            showToast.error('Error returning borrowed book.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                {/* Dialog Trigger */}
                <DialogTrigger className="inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 border border-white/10 bg-slate-900 text-slate-100 shadow-md hover:bg-slate-800 hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] h-10 px-5 py-2 cursor-pointer">
                    <HugeiconsIcon icon={ArrowLeftIcon} size={16} />
                    Return Book
                </DialogTrigger>

                {/* Dialog Content */}
                <DialogContent className="w-[calc(100%-2rem)] sm:max-w-md mx-auto rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 sm:p-8 backdrop-blur-3xl text-slate-100 shadow-[0_30px_100px_rgba(0,0,0,0.9),0_0_50px_rgba(245,158,11,0.05)] max-h-[88vh] overflow-y-auto transition-all duration-500 animate-in fade-in-50 zoom-in-95">
                    <form onSubmit={handleReturnSubmit} className="space-y-6">
                        <DialogHeader className="text-left">
                            <span className="inline-block mb-1 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                                Return Process
                            </span>
                            <DialogTitle className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent font-heading mt-2">
                                Return: {book.Title}
                            </DialogTitle>
                            <DialogDescription className="text-xs sm:text-sm text-slate-400/80 mt-1">
                                Are you sure you want to return this book? You can leave an optional review below.
                            </DialogDescription>
                        </DialogHeader>

                        {/* Review Input */}
                        <div className="space-y-5 py-1">
                            <div className="group flex flex-col gap-1.5">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 group-focus-within:text-amber-400 transition-colors duration-300">
                                    Your Review <span className="text-[10px] text-slate-500 font-normal">(Optional)</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute top-3 left-0 flex items-center pl-4 text-slate-500 group-focus-within:text-amber-400 transition-colors duration-300 pointer-events-none">
                                        <HugeiconsIcon icon={File01Icon} size={18} />
                                    </span>
                                    <textarea
                                        name="review"
                                        rows={3}
                                        placeholder="Share your thoughts about this book (optional)..."
                                        className="w-full rounded-2xl border border-white/5 bg-slate-900/40 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-600 focus:border-amber-500/50 focus:bg-slate-900/80 focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all duration-300 shadow-inner resize-none min-h-[90px]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Dialog Footer */}
                        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 pt-3 border-t border-white/5">
                            <DialogClose className="w-full sm:flex-1 rounded-2xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 text-sm font-semibold h-11 cursor-pointer flex items-center justify-center transition-all duration-300 active:scale-98">
                                Cancel
                            </DialogClose>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:flex-1 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 font-bold text-slate-950 hover:from-amber-400 hover:to-amber-300 shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.4)] disabled:opacity-50 disabled:pointer-events-none h-11 text-sm cursor-pointer flex items-center justify-center transition-all duration-300 active:scale-98"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Returning...
                                    </span>
                                ) : (
                                    "Confirm Return"
                                )}
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default BorrowedBookDelete;
