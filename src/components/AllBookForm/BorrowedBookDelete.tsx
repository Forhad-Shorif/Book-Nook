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
import { showToast } from "@/utils/Toast";
import { useRouter } from 'next/navigation';

export interface BorrowedBook {
    _id?: string;
    bookId?: string;
    Title?: string;
    Image?: string;
    Name?: string;
    Email?: string;
    borrowedAt?: string; // অথবা Date টাইপও ব্যবহার করতে পারো যদি ডেট অবজেক্ট হিসেবে রাখো
    returnDate?: string;
}


const BorrowedBookDelete = ({ book }: { book: BorrowedBook }) => {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const response = await fetch(`${process.env.PUBLIC_SECRET_URL}/BorrowedBooksReturn/${book._id}`, {
                method: 'DELETE',
            });
            if(!response.ok) {
                showToast.error('Failed to delete borrowed book. Please try again.');
                return;
            }
            if(response.ok) {
                showToast.success('Borrowed book returned successfully!');
                router.refresh(); // Refresh the page to reflect changes
            }
        } catch (error) {
            showToast.error('Error deleting borrowed book:');
        }
    };

    return (
        <div>
             <Dialog>
                <form>
                    <DialogTrigger render={<Button variant="outline">Return Borrowed Book</Button>} />
                    <DialogContent className="sm:max-w-sm">
                        <DialogHeader>
                            <DialogTitle>Return Borrowed Book</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to return this borrowed book?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose render={<Button variant="outline">Cancel</Button>} />
                            <Button type="submit" onClick={handleDelete}>
                                Return Book
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    );
};

export default BorrowedBookDelete;