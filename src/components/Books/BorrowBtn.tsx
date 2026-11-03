
"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    BookmarkAdd01Icon,
    FavouriteIcon,
    Calendar01Icon,
} from "@hugeicons/core-free-icons";

import { Book } from "@/Type/type";
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { showToast } from "@/utils/Toast";

// Get local date: YYYY-MM-DD
const getLocalDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const BookDetailsShare = ({ BorrowBook }: { BorrowBook: Book }) => {

    const router = useRouter();
    const [isLiked, setIsLiked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const availableCopies = Number(BorrowBook.totalCopies ?? 1);

    const handleBorrowSubmit = async ( e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) return;

        // Capture form and its data before async operations
        const form = e.currentTarget;
        const formData = new FormData(form);

        const returnDate = String(formData.get("returnDate") || "");
        const borrowedAt = getLocalDate();

        if (!Number.isFinite(availableCopies) || availableCopies <= 0) {
           showToast.error("This book is currently out of stock.");
            return;
        }

        if (!BorrowBook._id) {
            showToast.error("Book information is missing.");
            return;
        }

        if (!returnDate || returnDate < borrowedAt) {
            showToast.error("Please select a valid return date.");
            return;
        }

        setLoading(true);

        try {
            // 1. Get authenticated user
            const { data: session, error } = await authClient.getSession();
            const user = session?.user;

            if (error || !user?.name || !user?.email) {
                showToast.error("Please sign in to borrow this book.");
                return;
            }

            // 2. Prepare borrowing information
            const data = {
                Id: BorrowBook?._id,
                Title: BorrowBook?.title,
                Image: BorrowBook?.coverImage,
                Name: user?.name,
                Email: user?.email,
                borrowedAt,
                returnDate,
            };

            // 3. Save borrowing information
            const borrowResponse = await fetch(
                `${process.env.PUBLIC_SECRET_URL}/BorrowedBooks`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!borrowResponse.ok) {
              showToast.error('Failed to save borrowing information. Please try again.');
                return;
            }
             if(borrowResponse.ok) {
                showToast.success('Borrowing information saved successfully!');
            }
            // Update available book copies
            const updateResponse = await fetch(
                `${process.env.PUBLIC_SECRET_URL}/BookCopesReduce/${BorrowBook._id}`,
                {
                    method: "PATCH",
                }
            );
       
            if (!updateResponse.ok) {
                showToast.error('Failed to reduce book copies. Please contact support.');
            }
            if(updateResponse.ok) {
                router.refresh(); // Refresh the page to reflect changes
                showToast.success('Book copies updated successfully!');
            }

            if (!updateResponse.ok) {
                showToast.error("Borrowing was saved, but updating book copies failed. Please contact support.");
            }

            // 5. Success
            setIsOpen(false);
            form.reset();
            showToast.success("Book borrowed successfully!");

        } catch (error) {
            console.error("Borrow error:", error);

            showToast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-3 sm:flex-row">

            {/* Borrow Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger
                    render={
                        <Button
                            disabled={availableCopies <= 0 || loading}
                            className={`w-full rounded-full px-6 py-3.5 text-sm font-semibold shadow-lg transition-all sm:flex-1 ${availableCopies <= 0
                                ? "bg-slate-800 text-slate-500 shadow-none"
                                : "bg-amber-400 text-slate-950 shadow-amber-400/20 hover:-translate-y-0.5 hover:bg-amber-300"
                                }`}
                        >
                            <HugeiconsIcon
                                icon={BookmarkAdd01Icon}
                                size={18}
                            />
                            {availableCopies <= 0
                                ? "Out of Stock"
                                : "Borrow This Book"}
                        </Button>
                    }
                />

                <DialogContent className="rounded-3xl border border-white/15 bg-slate-900/95 p-6 text-slate-100 shadow-[0_30px_100px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:max-w-md">

                    <form onSubmit={handleBorrowSubmit}>
                        <DialogHeader className="mb-5">
                            <span className="mb-1 text-xs font-semibold uppercase tracking-widest text-amber-400">
                                Library Checkout
                            </span>

                            <DialogTitle className="text-xl font-bold text-white">
                                Borrow: {BorrowBook.title}
                            </DialogTitle>

                            <DialogDescription className="text-xs text-slate-400">
                                Your account information and borrowing date
                                will be recorded automatically.
                            </DialogDescription>
                        </DialogHeader>

                        <FieldGroup className="space-y-4">

                            {/* Return Date */}
                            <Field>
                                <Label
                                    htmlFor="returnDate"
                                    className="text-xs font-semibold uppercase tracking-wider text-slate-400"
                                >
                                    Select Return Date
                                </Label>

                                <div className="relative">
                                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                                        <HugeiconsIcon
                                            icon={Calendar01Icon}
                                            size={18}
                                        />
                                    </span>

                                    <Input
                                        id="returnDate"
                                        type="date"
                                        name="returnDate"
                                        required
                                        min={getLocalDate()}
                                        className="w-full cursor-pointer rounded-xl border-white/15 bg-slate-950/70 py-2.5 pl-10 text-sm text-white transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-400/35 [&::-webkit-calendar-picker-indicator]:invert"
                                    />
                                </div>
                            </Field>

                        </FieldGroup>

                        {/* Dialog Buttons */}
                        <DialogFooter className="flex w-full flex-row gap-3 pt-6">

                            {/* Cancel Button */}
                            <DialogClose
                                render={
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={loading}
                                        className="rounded-full border-white/15 bg-white/5 text-slate-300 hover:bg-white/10"
                                    >
                                        Cancel
                                    </Button>
                                }
                            />

                            {/* Confirm Button */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="rounded-full bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20 transition-all hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading
                                    ? "Processing..."
                                    : "Confirm Borrow"}
                            </Button>

                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Love Button */}
            <Button
                type="button"
                variant="outline"
                onClick={() => setIsLiked((previous) => !previous)}
                aria-pressed={isLiked}
                className={`w-full rounded-full border px-6 py-3.5 text-sm font-semibold transition-all sm:w-auto ${isLiked
                    ? "border-rose-500/40 bg-rose-500/20 text-rose-300 shadow-lg shadow-rose-500/10"
                    : "border-white/20 bg-white/5 text-white hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-300"
                    }`}
            >
                <HugeiconsIcon
                    icon={FavouriteIcon}
                    size={18}
                    className={
                        isLiked
                            ? "fill-rose-500 text-rose-500"
                            : ""
                    }
                />

                {isLiked ? "Loved ❤️" : "Love"}
            </Button>

        </div>
    );
};

export default BookDetailsShare;
