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
import { Book } from "@/Type/type"
import { showToast } from "@/utils/Toast";

const DeleteBookForm = ({ book }: { book: Book }) => {

    const handleDelete = async () => {
        const bookId = book._id;
        try {
            const response = await fetch(`${process.env.PUBLIC_SECRET_URL}/DeleteBook/${bookId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                showToast.success("Book deleted successfully!");
            } else {
                showToast.error("Failed to delete the book. Please try again.");
            }
        } catch (error) {
            showToast.error("Error deleting the book:");
        }
        
    };

    return (
        <div>
            <Dialog>
                <form>
                    <DialogTrigger render={<Button variant="outline">Delete Book</Button>} />
                    <DialogContent className="sm:max-w-sm">
                        <DialogHeader>
                            <DialogTitle>Delete Book</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this book? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose render={<Button variant="outline">Cancel</Button>} />
                            <Button type="submit" onClick={handleDelete}>
                                Delete Book
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    );
};

export default DeleteBookForm;