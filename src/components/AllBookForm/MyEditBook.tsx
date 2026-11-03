'use client'

import { Button } from "@/components/ui/button"
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
import { Book } from "@/Type/type"
import { BookOpen01Icon, File01Icon, Image01Icon, Tag01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { showToast } from "@/utils/Toast"

const EditBookForm = ({ book }: { book: Book }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // MongoDB ID সেফলি স্ট্রিং এ রূপান্তর করার ফাংশন
    const getBookId = (id: string | { $oid: string }) => {
        if (!id) return "";
        if (typeof id === 'string') return id;
        if (id.$oid) return id.$oid;
        return String(id);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const updatedBookData = Object.fromEntries(formData.entries()) as {
            title: string;
            author: string;
            category: string;
            coverImage: string;
            description: string;
        };
                              
        console.log("Updated Book Data:", updatedBookData);
        const bookId = getBookId(book?._id as string | { $oid: string });

        try {
            const response = await fetch(`${process.env.PUBLIC_SECRET_URL}/UpdateBook/${bookId}`, {
                method: "PATCH", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedBookData),
            });
           console.log("Update Response:", response);
            if (!response.ok) {
               showToast.error("Failed to update the book. Please try again.");
            }

            showToast.success("Book updated successfully!");
            setOpen(false); // ডায়ালগ বন্ধ করবে
            router.refresh(); // পেজ রিফ্রেশ করে লেটেস্ট ডেটা দেখাবে
        } catch (error) {
            console.error("Update error:", error);
            showToast.error("Failed to update the book. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <form onSubmit={handleSubmit}>
                    <DialogTrigger render={<Button variant="outline">Edit Book</Button>} />
                    <DialogContent className="sm:max-w-sm rounded-3xl border border-white/15 bg-slate-900/95 p-6 backdrop-blur-2xl text-slate-100 shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-bold text-white font-heading">Edit Book</DialogTitle>
                            <DialogDescription className="text-xs text-slate-400">
                                Update the book details here. Click save when you&apos;re done.
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup className="space-y-4 py-2">
                            {/* Book Title */}
                            <Field>
                                <Label
                                    htmlFor="title"
                                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400"
                                >
                                    Book Title
                                </Label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                        <HugeiconsIcon icon={BookOpen01Icon} size={18} />
                                    </span>
                                    <Input
                                        id="title"
                                        name="title"
                                        type="text"
                                        key={book._id}
                                        required
                                        defaultValue={book.title}
                                        className="w-full rounded-xl border border-white/15 bg-slate-950/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all"
                                    />
                                </div>
                            </Field>

                            {/* Author & Category */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Field>
                                    <Label
                                        htmlFor="author"
                                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400"
                                    >
                                        Author Name
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                            <HugeiconsIcon icon={BookOpen01Icon} size={18} />
                                        </span>
                                        <Input
                                            id="author"
                                            name="author"
                                            type="text"
                                            required
                                            key={book._id}
                                            defaultValue={book.author}
                                            className="w-full rounded-xl border border-white/15 bg-slate-950/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all"
                                        />
                                    </div>
                                </Field>

                                <Field>
                                    <Label
                                        htmlFor="category"
                                        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400"
                                    >
                                        Category
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                            <HugeiconsIcon icon={Tag01Icon} size={18} />
                                        </span>
                                        <Input
                                            id="category"
                                            name="category"
                                            type="text"
                                            required
                                            key={book._id}
                                            defaultValue={book.category}
                                            className="w-full rounded-xl border border-white/15 bg-slate-950/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all"
                                        />
                                    </div>
                                </Field>
                            </div>

                            {/* Cover Image URL */}
                            <Field>
                                <Label
                                    htmlFor="coverImage"
                                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400"
                                >
                                    Cover Image URL
                                </Label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                        <HugeiconsIcon icon={Image01Icon} size={18} />
                                    </span>
                                    <Input
                                        id="coverImage"
                                        name="coverImage"
                                        type="url"
                                        required
                                        key={book._id}
                                        defaultValue={book.coverImage}
                                        className="w-full rounded-xl border border-white/15 bg-slate-950/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all"
                                    />
                                </div>
                            </Field>

                            {/* Short Description */}
                            <Field>
                                <Label
                                    htmlFor="description"
                                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400"
                                >
                                    Short Description / Summary
                                </Label>
                                <div className="relative">
                                    <span className="absolute top-3 left-0 flex items-center pl-3.5 text-slate-400">
                                        <HugeiconsIcon icon={File01Icon} size={18} />
                                    </span>
                                    <textarea
                                        id="description"
                                        name="description"
                                        required
                                        rows={3}
                                        key={book._id}
                                        defaultValue={book.description}
                                        className="w-full rounded-xl border border-white/15 bg-slate-950/70 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all"
                                    />
                                </div>
                            </Field>
                        </FieldGroup>
                        <DialogFooter className="flex gap-2 pt-2">
                            <DialogClose render={<Button variant="outline" className="flex-1 rounded-full border-white/15 bg-white/5 text-slate-300 hover:bg-white/10">Cancel</Button>} />
                            <Button type="submit" disabled={loading} className="flex-1 rounded-full bg-amber-400 font-bold text-slate-950 hover:bg-amber-300">
                                {loading ? "Updating..." : "Update Now"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    );
};

export default EditBookForm;