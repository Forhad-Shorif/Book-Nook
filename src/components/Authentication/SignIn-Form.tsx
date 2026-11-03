"use client";

import React, { useState } from 'react';
import Link from 'next/link';
// import { authClient } from "@/lib/auth-client"; // তোমার প্রজেক্টের পাথ অনুযায়ী অ্যাডজাস্ট করে নিও
import SocialSignBtn from './SocialSign-Btn';
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  Mail01Icon, 
  LockPasswordIcon 
} from "@hugeicons/core-free-icons";
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { showToast } from '@/utils/Toast';

const SignInForm = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // ১. ফর্ম থেকে সমস্ত ডেটা একসাথে নিয়ে নেওয়া
        const formData = new FormData(e.currentTarget);
        const credentials = Object.fromEntries(formData.entries()) as {
            email: string;
            password: string;
        };

        setLoading(true);

        try {
            // Better Auth সাইন-ইন কল (তোমার ব্যাকএন্ড লজিক অনুযায়ী ব্যবহার করতে পারো)
            
            const { data, error } = await authClient.signIn.email({
                email: credentials.email,
                password: credentials.password,
            });

            if (error) {
                setLoading(false);
                showToast.error('Sign In Failed! Please check your credentials and try again.');
                return;
            }
             
            if(data && data.user) {
                router.push("/");
                showToast.success('Sign In Successful!');
                router.refresh(); // সেশন আপডেট করতে পেজ রিফ্রেশ করা
            }

            setTimeout(() => {
                setLoading(false);
                showToast.success('Sign In Successful! Redirecting...');
            }, 1500);

        } catch (err) {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="overflow-hidden rounded-3xl border border-white/15 bg-slate-900/60 p-8 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                
                {/* Header */}
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-white font-heading">Welcome Back</h2>
                    <p className="text-xs text-slate-400 mt-1">Sign in to your BookNook account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    
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
                                placeholder="forhadshorif79@gmail.com"
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
                                placeholder="••••••••"
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
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                </form>

                {/* Divider */}
                <div className="relative flex items-center justify-center my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10" />
                    </div>
                    <span className="relative bg-[#0d1624] px-3 text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                        Or continue with
                    </span>
                </div>

                {/* Social Sign-In Component */}
                <SocialSignBtn />

                {/* Sign Up Redirect Link */}
                <div className="mt-6 pt-6 border-t border-white/10 text-center text-xs text-slate-400">
                    Don{"'"}t have an account?{" "}
                    <Link href="/sign-up" className="font-semibold text-amber-400 hover:underline transition-all">
                        Create an account
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default SignInForm;