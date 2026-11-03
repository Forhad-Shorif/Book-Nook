import ProfileUpdate from "@/components/Authentication/ProfileUpdate";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon, ShieldCheckIcon, UserCircle02Icon } from "@hugeicons/core-free-icons";

const ProfilePage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;
    if(!user) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-[#07101c] text-white">
                <div className="flex flex-col items-center gap-3">
                    <div className="size-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                    <p className="text-sm font-medium tracking-wide text-slate-400">Loading your profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#07101c] text-slate-100 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">

                {/* Page Header */}
                <div className="mb-8 text-center sm:text-left">
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
                        Account Settings
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-extrabold font-heading tracking-tight text-white">
                        My Profile
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                        Manage your BookNook account details, profile picture, and display name.
                    </p>
                </div>

                {/* Main Profile Card */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    {/* Background Glowing Ambient Light */}
                    <div className="absolute -top-24 -right-24 size-48 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

                    {/* Top User Info Section (Image, Name, Email) */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-white/10 text-center sm:text-left">
                        {/* Avatar */}
                        <div className="relative size-24 sm:size-28 shrink-0 overflow-hidden rounded-full ring-4 ring-amber-400/20 shadow-xl bg-slate-950">
                            <img
                                src={user?.image || "https://github.com/shadcn.png"}
                                alt={user?.name || "User Avatar"}

                                className="object-cover"
                            />
                        </div>

                        {/* Name, Email & Badge */}
                        <div className="space-y-1.5 flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                                    {user?.name || "Forhad Shorif"}
                                </h2>
                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 text-[10px] font-semibold text-amber-400 w-fit mx-auto sm:mx-0">
                                    <HugeiconsIcon icon={ShieldCheckIcon} size={12} />
                                    Verified Member
                                </span>
                            </div>

                            <p className="text-xs sm:text-sm text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
                                <HugeiconsIcon icon={Mail01Icon} size={15} className="text-slate-500" />
                                <span>{user?.email || "forhadshorif79@gmail.com"}</span>
                            </p>
                        </div>
                    </div>

                    {/* Profile Update Form Section */}
                    <div className="pt-6">
                        <div className="mb-4 flex items-center gap-2">
                            <div className="size-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                                <HugeiconsIcon icon={UserCircle02Icon} size={18} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white">Update Information</h3>
                                <p className="text-[11px] text-slate-400">Change your display name or profile image URL below.</p>
                            </div>
                        </div>

                        {/* Profile Update Component */}
                        <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 sm:p-6">
                            <ProfileUpdate />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfilePage;