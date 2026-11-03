'use client'
import { Button } from "@/components/ui/button"
import { showToast } from "@/utils/Toast";
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
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { HugeiconsIcon } from "@hugeicons/react"
import { Edit01Icon, Logout01Icon } from "@hugeicons/core-free-icons"
import { useRouter } from 'next/navigation';

const ProfileUpdate = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;
    if (!user) {
        return <p className="text-red-500">User not found. Please log in.</p>;
    }

    const HandleonSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const updatedUser = Object.fromEntries(formData.entries()) as {
            image: string;
            name: string;
        };
        if (!updatedUser.name || !updatedUser.image) {
            showToast.error('Please fill in all the fields before submitting.');
            return;
        }
        const { data, error } = await authClient.updateUser({
            ...updatedUser,
        });
       
        if (error) {
            showToast.error('Failed to update profile. Please try again.');
            return;
        }

        showToast.success('Profile updated successfully!');

        router.refresh();
    };
    const handleSignOut = async () => {
        try {
            await authClient.signOut();
            showToast.success('sign out successful');
        } catch (error) {
            showToast.error('Failed to sign out! Please try again.');
        }
        showToast.success('sign out successful');
        router.refresh();
    }


    return (
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full">
            {/* 1. Edit Dialog Trigger */}
            <Dialog>
                <form onSubmit={HandleonSubmit} className="w-full sm:w-auto flex-1">
                    <DialogTrigger
                        render={
                            <Button
                                variant="outline"
                                className="w-full h-11 rounded-2xl border-amber-400/30 bg-amber-400/10 text-amber-400 hover:bg-amber-400 hover:text-slate-950 hover:border-amber-400 font-semibold transition-all duration-300 shadow-lg shadow-amber-400/5 cursor-pointer flex items-center justify-center gap-2"
                            >
                                <HugeiconsIcon icon={Edit01Icon} size={16} />
                                <span>Edit Profile</span>
                            </Button>
                        }
                    />
                    <DialogContent className="sm:max-w-sm rounded-3xl border border-white/15 bg-slate-900/95 p-6 backdrop-blur-2xl text-slate-100 shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-bold text-white font-heading">Edit profile</DialogTitle>
                            <DialogDescription className="text-xs text-slate-400">
                                Make changes to your profile here. Click save when you&apos;re
                                done.
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup className="space-y-4 py-2">
                            <Field>
                                <Label htmlFor="name-1" className="text-xs text-slate-300 mb-1 block">Name</Label>
                                <Input id="name-1" name="name" defaultValue={user?.name || "User Name"} className="rounded-xl border-white/15 bg-slate-950/70 text-white" />
                            </Field>
                            <Field>
                                <Label htmlFor="image-1" className="text-xs text-slate-300 mb-1 block">Image URL</Label>
                                <Input id="image-1" name="image" defaultValue={user?.image || "User Image URL"} className="rounded-xl border-white/15 bg-slate-950/70 text-white" />
                            </Field>
                        </FieldGroup>
                        <DialogFooter className="flex gap-2 pt-2">
                            <DialogClose render={<Button variant="outline" className="flex-1 rounded-full border-white/15 bg-white/5 text-slate-300 py-1.5 hover:bg-white/10">Cancel</Button>} />
                            <Button type="submit" className="flex-1 rounded-full bg-amber-400 font-bold text-slate-950 py-1.5 hover:bg-amber-300">Update Profile</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>

            {/* 2. Sign Out Button */}
            <div className="w-full sm:w-auto flex-1">
                <Button
                    variant="outline"
                    onClick={handleSignOut}
                    className="w-full h-11 rounded-2xl border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500 hover:text-white hover:border-rose-500 font-semibold transition-all duration-300 shadow-lg shadow-rose-500/5 cursor-pointer flex items-center justify-center gap-2"
                >
                    <HugeiconsIcon icon={Logout01Icon} size={16} />
                    <span>Sign Out</span>
                </Button>
            </div>
        </div>
    );
};

export default ProfileUpdate;