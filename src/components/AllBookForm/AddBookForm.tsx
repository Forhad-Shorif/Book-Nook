"use client";

import React, { useState } from 'react';
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  BookOpen01Icon, 
  UserCircleIcon, 
  Image01Icon, 
  File01Icon,
  Tag01Icon
} from "@hugeicons/core-free-icons";
import { showToast } from '@/utils/Toast';
import { useRouter } from 'next/navigation';

const AddBookForm = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // ১. ফর্ম থেকে সমস্ত ডেটা একসাথে নিয়ে নেওয়া
        const formData = new FormData(e.currentTarget);
        const bookData = Object.fromEntries(formData.entries());
        setLoading(true);

        try {
            // ২. তোমার ব্যাকএন্ড API-তে POST রিকুয়েস্ট পাঠানো
            const res = await fetch(`${process.env.PUBLIC_SECRET_URL}/NewBook`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...bookData,
                    createdAt: new Date().toISOString(), // সর্টিংয়ের জন্য তারিখ
                }),
            });

            if (res.ok) {
               showToast.success("Book added successfully!");
                (e.target as HTMLFormElement).reset(); // ফর্ম ক্লিয়ার করা
                router.refresh(); // পেজ রিফ্রেশ করে লেটেস্ট ডেটা দেখাবে
            } else {
                showToast.error("Failed to add book. Please try again.");
            }
        } catch (error) {
            showToast.error("Could not connect to backend server!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="overflow-hidden rounded-3xl border border-white/15 bg-slate-900/60 p-8 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-white font-heading">Add a New Book</h2>
                    <p className="text-xs text-slate-400 mt-1">Share a great book with the BookNook community</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Book Title */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                            Book Title
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                <HugeiconsIcon icon={BookOpen01Icon} size={18} />
                            </span>
                            <input
                                type="text"
                                name="title"
                                required
                                placeholder="The Great Gatsby"
                                className="w-full rounded-xl border border-white/15 bg-slate-950/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all"
                            />
                        </div>
                    </div>

                    {/* Author & Category (Grid Layout) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Author Name */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                Author Name
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                    <HugeiconsIcon icon={UserCircleIcon} size={18} />
                                </span>
                                <input
                                    type="text"
                                    name="author"
                                    required
                                    placeholder="F. Scott Fitzgerald"
                                    className="w-full rounded-xl border border-white/15 bg-slate-950/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all"
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                                Category
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                    <HugeiconsIcon icon={Tag01Icon} size={18} />
                                </span>
                                <input
                                    type="text"
                                    name="category"
                                    required
                                    placeholder="Fiction, Sci-Fi, History..."
                                    className="w-full rounded-xl border border-white/15 bg-slate-950/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Cover Image URL */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                            Cover Image URL
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                <HugeiconsIcon icon={Image01Icon} size={18} />
                            </span>
                            <input
                                type="url"
                                name="coverImage"
                                required
                                placeholder="https://images.unsplash.com/photo-..."
                                className="w-full rounded-xl border border-white/15 bg-slate-950/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all"
                            />
                        </div>
                    </div>

                    {/* Short Description */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                            Short Description / Summary
                        </label>
                        <div className="relative">
                            <span className="absolute top-3 left-0 flex items-center pl-3.5 text-slate-400">
                                <HugeiconsIcon icon={File01Icon} size={18} />
                            </span>
                            <textarea
                                name="description"
                                required
                                rows={4}
                                placeholder="Write a brief overview about the book..."
                                className="w-full rounded-xl border border-white/15 bg-slate-950/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-400/20 hover:bg-amber-300 transition-all cursor-pointer disabled:opacity-50"
                    >
                        {loading ? "Publishing Book..." : "Add Book to Library"}
                    </button>

                </form>

            </div>
        </div>
    );
};

export default AddBookForm;