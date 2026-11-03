import React from 'react';
import Link from 'next/link';
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import SignInForm from '@/components/Authentication/SignIn-Form'; // তোমার ফোল্ডার স্ট্রাকচার অনুযায়ী পাথটি ঠিক করে নিও

const SignInPage = () => {
    return (
        <main className="min-h-screen bg-[#07101c] text-slate-100 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
            
            {/* Background Ambient Glow Effects */}
            <div className="absolute top-1/4 -left-32 size-96 rounded-full bg-amber-400/10 blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-32 size-96 rounded-full bg-sky-500/10 blur-[140px] pointer-events-none" />

            {/* Main Wrapper matching the form width */}
            <div className="relative z-10 w-full max-w-md space-y-6">
                
                {/* Wow Back Button */}
                <div>
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-white/10 bg-slate-900/60 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-amber-400 hover:border-amber-400/40 hover:bg-slate-900/80 backdrop-blur-2xl transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                    >
                        <span className="flex size-6 items-center justify-center rounded-lg bg-white/5 group-hover:bg-amber-400/10 transition-all">
                            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} className="transition-transform group-hover:-translate-x-0.5" />
                        </span>
                        <span>Back to Home</span>
                    </Link>
                </div>

                {/* Main Sign In Form Container */}
                <SignInForm />

            </div>

        </main>
    );
};

export default SignInPage;