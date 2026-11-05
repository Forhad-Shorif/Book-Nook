"use client"

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
import { Book } from "@/Type/type"
import { showToast } from "@/utils/Toast"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Delete02Icon, AlertCircleIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

const DeleteBookForm = ({ book }: { book: Book }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    setLoading(true);

    const bookId = book._id;
    if (!bookId) {
      showToast.error("Book ID is missing.");
      setLoading(false);
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_SECRET_URL || "";
      const response = await fetch(`${apiUrl}/DeleteBook/${bookId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        showToast.error("Failed to delete the book. Please try again.");
        return;
      }
      if(response.ok) {
         showToast.success("Book deleted successfully!");
         setOpen(false);
         router.refresh();
      }
    } catch (error) {
      showToast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        {/* Dialog Trigger */}
        <DialogTrigger className="inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all duration-200 border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white h-9 px-4 py-2 cursor-pointer shadow-[0_4px_12px_rgba(239,68,68,0.1)]">
          <HugeiconsIcon icon={Delete02Icon} size={16} />
          Delete
        </DialogTrigger>

        {/* Dialog Content */}
        <DialogContent className="w-[calc(100%-2rem)] sm:max-w-sm mx-auto rounded-3xl border border-white/15 bg-slate-900/95 p-6 backdrop-blur-2xl text-slate-100 shadow-[0_30px_100px_rgba(0,0,0,0.8)] transition-all duration-300">
          <form className="space-y-6">
            <div className="flex flex-col items-center text-center space-y-3 pt-2">
              {/* Warning Icon */}
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.15)] animate-pulse">
                <HugeiconsIcon icon={AlertCircleIcon} size={24} />
              </div>

              <DialogHeader className="space-y-1">
                <DialogTitle className="text-xl font-bold text-white font-heading tracking-wide">
                  Confirm Deletion
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-400 max-w-[280px]">
                  Are you sure you want to delete <span className="text-red-400 font-semibold">&ldquo;{book.title}&rdquo;</span>? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
            </div>

            {/* Dialog Footer */}
            <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 pt-1">
              <DialogClose className="w-full sm:flex-1 rounded-full border border-white/15 bg-white/5 text-slate-300 hover:bg-white/10 text-sm font-medium h-10 cursor-pointer flex items-center justify-center transition-all duration-200">
                Cancel
              </DialogClose>
              <button
                type="button"
                disabled={loading}
                onClick={handleDelete}
                className="w-full sm:flex-1 rounded-full bg-red-500 font-bold text-white hover:bg-red-600 cursor-pointer h-10 text-sm disabled:opacity-50 shadow-[0_4px_20px_rgba(239,68,68,0.2)] transition-all duration-200 flex items-center justify-center gap-1.5"
              >
                {loading ? "Deleting..." : "Delete Now"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteBookForm;
