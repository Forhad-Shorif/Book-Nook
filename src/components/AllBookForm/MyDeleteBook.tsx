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

const DeleteBookForm = ({ book }: { book: Book }) => {

    const handleDelete = async () => {
        const bookId = book._id;
        try {
            const response = await fetch(`http://localhost:8000/DeleteBook/${bookId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                console.log("Book deleted successfully!");
            } else {
                console.log("Failed to delete the book. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting the book:", error);
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