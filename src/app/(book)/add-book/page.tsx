import React from 'react';
import Link from 'next/link';
import AddBookForm from '@/components/AllBookForm/AddBookForm'; // তোমার পাথ অনুযায়ী দেখে নিও
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";

const AddBook = () => {
    
    return (
        <main className="min-h-screen bg-[#07101c] text-slate-100 px-4 py-12 relative overflow-hidden">
            
            {/* Background Ambient Glow Effects */}
            <div className="absolute top-1/4 -left-32 size-96 rounded-full bg-amber-400/10 blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-32 size-96 rounded-full bg-sky-500/10 blur-[140px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-2xl mx-auto">
                
                {/* Back Button */}
                <div className="mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-slate-900/40 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 backdrop-blur-xl transition-all shadow-sm"
                    >
                        <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
                        <span>Back to Home</span>
                    </Link>
                </div>

                {/* Form Container */}
                <AddBookForm />
            </div>

        </main>
    );
};

export default AddBook;