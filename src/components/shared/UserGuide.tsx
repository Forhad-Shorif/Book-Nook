'use client';

import React from 'react';
import { HugeiconsIcon } from "@hugeicons/react";
import {
    Book01Icon,
    BookOpen01Icon,
    BookEditIcon,
    Delete02Icon,
} from "@hugeicons/core-free-icons";
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';

export default function BookNookGuide() {

    const { data: session, error } = authClient.useSession();
    const user = session?.user;


    const steps = [
        {
            icon: Book01Icon,
            stepNumber: "01",
            title: "Add Your Books",
            subtitle: "Got a book to share?",
            description: "Just click 'Add a Book', fill in the title, author, cover photo, and put it right on the community shelf for others to read.",
            badge: "Easy Share",
            color: "from-amber-500 to-amber-600",
            border: "border-amber-500/20",
            glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]",
            textColor: "group-hover:text-amber-400"
        },
        {
            icon: BookOpen01Icon,
            stepNumber: "02",
            title: "Borrow & Read",
            subtitle: "Found something you like?",
            description: "Explore the library, pick your next favorite story, and borrow it instantly with a clear return date in mind.",
            badge: "Explore",
            color: "from-indigo-500 to-indigo-600",
            border: "border-indigo-500/20",
            glow: "group-hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]",
            textColor: "group-hover:text-indigo-400"
        },
        {
            icon: BookEditIcon,
            stepNumber: "03",
            title: "Update Anytime",
            subtitle: "Made a mistake or changed info?",
            description: "No worries! You can easily update your book details, change descriptions, or modify info whenever you need to.",
            badge: "Flexible",
            color: "from-emerald-500 to-emerald-600",
            border: "border-emerald-500/20",
            glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]",
            textColor: "group-hover:text-emerald-400"
        },
        {
            icon: Delete02Icon,
            stepNumber: "04",
            title: "Return & Manage",
            subtitle: "Done reading or finished sharing?",
            description: "Simply return the borrowed book back to the shelf, or remove books you've listed with just a single click.",
            badge: "Control",
            color: "from-rose-500 to-rose-600",
            border: "border-rose-500/20",
            glow: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.25)]",
            textColor: "group-hover:text-rose-400"
        }
    ];

    return (
        <section className="relative py-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-slate-950/80 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-gradient-to-tr from-amber-500/10 via-indigo-600/10 to-transparent blur-[130px] pointer-events-none -z-10" />

            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-300 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                    ✨ Simple & Friendly Guide
                </span>
                <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    How <span className="bg-gradient-to-r from-amber-400 via-indigo-300 to-amber-500 bg-clip-text text-transparent">BookNook</span> Works For You
                </h2>
                <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl mx-auto">
                    We’ve kept things super simple. Whether you want to share a book or borrow one, here is all you need to know in 4 easy steps.
                </p>
            </div>

            {/* Guide Cards Grid */}
            {user ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className={`group relative rounded-3xl border ${step.border} bg-slate-900/70 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 ${step.glow} flex flex-col justify-between`}
                        >
                            {/* Card Content */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${step.color} flex items-center justify-center text-white shadow-lg shadow-black/40 group-hover:scale-110 transition-transform duration-300`}>
                                        <HugeiconsIcon icon={step.icon} size={26} />
                                    </div>
                                    <span className="text-3xl font-black text-slate-700/80 font-mono tracking-tighter">
                                        {step.stepNumber}
                                    </span>
                                </div>

                                {/* Badge */}
                                <div className="mb-3">
                                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60">
                                        {step.badge}
                                    </span>
                                </div>

                                {/* Title and Subtitle */}
                                <h3 className={`text-xl font-bold text-white mb-1 transition-colors ${step.textColor}`}>
                                    {step.title}
                                </h3>
                                <p className="text-xs font-medium text-amber-400/90 mb-3">
                                    {step.subtitle}
                                </p>

                                {/* Main Description */}
                                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/*  */}
                            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                                <span>Step {step.stepNumber} of 04</span>
                                <span className="group-hover:text-white transition-colors">Learn more →</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4 text-center py-4">
                    <p className="text-sm font-medium tracking-wide text-slate-400">
                        Please log in to see the guide and get started with BookNook.
                    </p>
                    <Link
                        href='/sign-in'
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400/10 border border-amber-400/20 text-sm font-semibold text-amber-400 hover:bg-amber-400/20 hover:text-white transition-all"
                    >
                        Sign In
                    </Link>
                </div>
            )}
        </section>
    );
}