"use client"

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
import { Book } from "@/Type/type"
import { BookOpen01Icon, File01Icon, Image01Icon, Layers01Icon, Tag01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { showToast } from "@/utils/Toast"

const EditBookForm = ({ book }: { book: Book }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const updatedBookData = Object.fromEntries(formData.entries()) as unknown as {
            title: string;
            author: string;
            category: string;
            coverImage: string;
            description: string;
            totalCopies: number;
        };

        const bookId = book._id;
        if (!bookId) {
            showToast.error("Book ID is missing. Cannot update the book.");
            setLoading(false);
            return;
        }

        try {
            const apiUrl = process.env.NEXT_PUBLIC_SECRET_URL || "";
            const response = await fetch(`${apiUrl}/UpdateBook/${bookId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedBookData),
            });

            if (!response.ok) {
                showToast.error("Failed to update the book. Please try again.");
                return;
            }

            if (response.ok) {
                showToast.success("Book updated successfully!");
                setOpen(false);
                router.refresh();
            }
        } catch (error) {
            showToast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 border border-slate-200 shadow-sm hover:text-red-600 h-9 px-4 py-2 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 cursor-pointer">
                    Edit Book
                </DialogTrigger>

                {/* All Devices "Wow" Layout Responsive Classes - sm:max-w-xl দিয়ে উইডথ বাড়ানো হয়েছে */}
                <DialogContent className="w-[calc(100%-2rem)] sm:max-w-xl mx-auto rounded-3xl border border-white/15 bg-slate-900/95 p-5 sm:p-7 backdrop-blur-2xl text-slate-100 shadow-[0_30px_100px_rgba(0,0,0,0.8)] max-h-[88vh] overflow-y-auto custom-scrollbar transition-all duration-300">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-white font-heading tracking-wide">Edit Book</DialogTitle>
                            <DialogDescription className="text-xs text-slate-400">
                                Update the book details here. Click save when you&apos;re done.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-1">
                            {/* Book Title */}
                            <div className="group">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 group-focus-within:text-amber-400 transition-colors">
                                    Book Title
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 group-focus-within:text-amber-400 transition-colors">
                                        <HugeiconsIcon icon={BookOpen01Icon} size={18} />
                                    </span>
                                    <input
                                        type="text"
                                        name="title"
                                        defaultValue={book.title}
                                        required
                                        placeholder="The Great Gatsby"
                                        className="w-full rounded-xl border border-white/15 bg-slate-950/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Author & Category - Mobile 1 colom and desktop 2 colom */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="group">
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 group-focus-within:text-amber-400 transition-colors">
                                        Author Name
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 group-focus-within:text-amber-400 transition-colors">
                                            <HugeiconsIcon icon={BookOpen01Icon} size={18} />
                                        </span>
                                        <input
                                            type="text"
                                            name="author"
                                            defaultValue={book.author}
                                            required
                                            placeholder="F. Scott Fitzgerald"
                                            className="w-full rounded-xl border border-white/15 bg-slate-950/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 group-focus-within:text-amber-400 transition-colors">
                                        Category
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 group-focus-within:text-amber-400 transition-colors">
                                            <HugeiconsIcon icon={Tag01Icon} size={18} />
                                        </span>
                                        <input
                                            type="text"
                                            name="category"
                                            defaultValue={book.category}
                                            required
                                            placeholder="Fiction, Sci-Fi..."
                                            className="w-full rounded-xl border border-white/15 bg-slate-950/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all duration-200"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Total Copies */}
                            <div className="group">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 group-focus-within:text-amber-400 transition-colors">
                                    Total Copies
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 group-focus-within:text-amber-400 transition-colors">
                                        <HugeiconsIcon icon={Layers01Icon} size={18} />
                                    </span>
                                    <input
                                        type="number"
                                        name="totalCopies"
                                        min="1"
                                        defaultValue={book.totalCopies}
                                        required
                                        placeholder="5"
                                        className="w-full rounded-xl border border-white/15 bg-slate-950/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Cover Image URL */}
                            <div className="group">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 group-focus-within:text-amber-400 transition-colors">
                                    Cover Image URL
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 group-focus-within:text-amber-400 transition-colors">
                                        <HugeiconsIcon icon={Image01Icon} size={18} />
                                    </span>
                                    <input
                                        type="url"
                                        name="coverImage"
                                        defaultValue={book.coverImage}
                                        required
                                        placeholder="https://example.com"
                                        className="w-full rounded-xl border border-white/15 bg-slate-950/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            {/* Short Description */}
                            <div className="group">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 group-focus-within:text-amber-400 transition-colors">
                                    Short Description / Summary
                                </label>
                                <div className="relative">
                                    <span className="absolute top-3 left-0 flex items-center pl-3.5 text-slate-400 group-focus-within:text-amber-400 transition-colors">
                                        <HugeiconsIcon icon={File01Icon} size={18} />
                                    </span>
                                    <textarea
                                        name="description"
                                        defaultValue={book.description}
                                        required
                                        rows={3}
                                        placeholder="Write a short summary..."
                                        className="w-full rounded-xl border border-white/15 bg-slate-950/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="flex gap-2 pt-2">
                            <DialogClose className="flex-1 rounded-full border border-white/15 bg-white/5 text-slate-300 hover:bg-white/10 text-sm font-medium h-9 cursor-pointer flex items-center justify-center">
                                Cancel
                            </DialogClose>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 rounded-full bg-amber-400 font-bold text-slate-950 hover:bg-amber-300 cursor-pointer h-9 text-sm disabled:opacity-50"
                            >
                                {loading ? "Updating..." : "Update Now"}
                            </button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditBookForm;
