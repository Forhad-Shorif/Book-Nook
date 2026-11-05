"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { HugeiconsIcon } from "@hugeicons/react";
import {
    UserCircleIcon,
    Mail01Icon,
    LockPasswordIcon,
    Image01Icon
} from "@hugeicons/core-free-icons";
import SocialSignBtn from './SocialSign-Btn';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utils/Toast';

const SignUpForm = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // ১. ফর্মের টার্গেট থেকে সমস্ত ডেটা একসাথে নিয়ে নেওয়া
        const formData = new FormData(e.currentTarget);
        const User = Object.fromEntries(formData.entries()) as {
            name: string;
            email: string;
            image: string;
            password: string;
            confirmPassword: string;
        };

        const { name, email, image, password } = User;
        const updatedUser = { name, email, image, password };

        // পাসওয়ার্ড মিল আছে কিনা চেক করা
        if (User.password !== User.confirmPassword) {
            showToast.error('Passwords do not match. Please try again.');
            return;
        }

        setLoading(true);


        // Better Auth ক্লায়েন্ট কল (confirmPassword বাদ দিয়ে বাকিগুলো পাঠানো হলো)
        const { data, error } = await authClient.signUp.email({
            ...updatedUser
        });
        if (error) {
            setLoading(false);
            showToast.error(`Sign Up Failed: ${error.message}`);
            return;
        }
        if (data) {
            showToast.success('Sign Up Successful! You can now sign in.');
            router.push('/');
            router.refresh();
        }

    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="overflow-hidden rounded-3xl border border-white/15 bg-slate-900/60 p-8 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)]">

                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-white font-heading">Create Account</h2>
                    <p className="text-xs text-slate-400 mt-1">Join BookNook to explore and borrow books</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Full Name */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                            Full Name
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                <HugeiconsIcon icon={UserCircleIcon} size={18} />
                            </span>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Forhad Shorif"
                                className="w-full rounded-xl border border-white/15 bg-slate-950/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all"
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                <HugeiconsIcon icon={Mail01Icon} size={18} />
                            </span>
                            <input
                                type="email"
                                name="email"
                                required
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                title="Please enter a valid email address containing '@' and '.'"
                                placeholder="forhadshorif79@gmail.com"
                                className="w-full rounded-xl border border-white/15 bg-slate-950/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all"
                            />
                        </div>
                        {/* Help Text */}
                        <p className="mt-1.5 text-[11px] text-slate-400 flex items-center gap-1">
                            <span className="text-amber-400">ℹ️</span> Must include {"@"} and {"."}
                        </p>
                    </div>

                    {/* Profile Image URL */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                            Profile Image URL
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                <HugeiconsIcon icon={Image01Icon} size={18} />
                            </span>
                            <input
                                type="url"
                                name="image"
                                placeholder="Your profile image URL "
                                className="w-full rounded-xl border border-white/15 bg-slate-950/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                <HugeiconsIcon icon={LockPasswordIcon} size={18} />
                            </span>
                            <input
                                type="password"
                                name="password"
                                required
                                pattern="(?=.*\d)(?=.*[A-Z]).{8,}"
                                title="Password must contain at least 8 characters, including at least 1 number and 1 uppercase letter."
                                placeholder="••••••••"
                                className="w-full rounded-xl border border-white/15 bg-slate-950/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all"
                            />
                        </div>
                        {/* Help Text */}
                        <p className="mt-1.5 text-[11px] text-slate-400 flex items-center gap-1">
                            <span className="text-amber-400">🔒</span> Must be 8+ chars with 1 uppercase letter & 1 number (e.g. BookNook123)
                        </p>
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                <HugeiconsIcon icon={LockPasswordIcon} size={18} />
                            </span>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                required
                                placeholder="••••••••"
                                className="w-full rounded-xl border border-white/15 bg-slate-950/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all"
                            />
                        </div>
                        <p className="mt-1.5 text-[11px] text-slate-400 flex items-center gap-1">
                            <span className="text-amber-400">✨</span> Please re-type your password to confirm
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-400/20 hover:bg-amber-300 transition-all cursor-pointer disabled:opacity-50"
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>

                </form>

                {/* Divider */}
                <div className="relative flex items-center justify-center my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10" />
                    </div>
                    <span className="relative bg-[#0d1624] px-3 text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                        Or sign up with
                    </span>
                </div>

                {/* Social Login Buttons (Google & GitHub) */}
                <SocialSignBtn />
                {/* Sign In Redirect Link */}
                <div className="mt-6 pt-6 border-t border-white/10 text-center text-xs text-slate-400">
                    Already have an account?{" "}
                    <Link href="/sign-in" className="font-semibold text-amber-400 hover:underline transition-all">
                        Sign In
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default SignUpForm;