import BorrowedBookCards from '@/components/Books/BorrowedBookCards';
import { auth } from '@/lib/auth'
import { headers } from "next/headers";

const BorrowedBook = async () => {

    const session = await auth.api.getSession({
        headers: await headers() 
    });
    const token = await auth.api.getToken({
    headers: await headers()
  });
  const tokenValue = token?.token;

    const user = session?.user
    if(!user) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-[#07101c] text-white">
                <div className="flex flex-col items-center gap-3">
                    <div className="size-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                    <p className="text-sm font-medium tracking-wide text-slate-400">Loading your borrowed books...</p>
                </div>
            </div>
        );
    }
    const email = user?.email

    const fetchData = await fetch(`${process.env.NEXT_PUBLIC_SECRET_URL}/BorrowedBooksGet/${email}`,{
        headers: {
            "authorization": `Bearer ${tokenValue}`
        },
        next: { revalidate: 1 }
    });
     const data = await fetchData.json();

     if(!data || data.length === 0){
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-[#07101c] text-white">
                <div className="flex flex-col items-center gap-3">
                    <div className="size-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                    <p className="text-sm font-medium tracking-wide text-slate-400">You haven{"'"}t borrowed any books yet.</p>
                </div>
            </div>
        );
     }
    return (
        <div>
            <BorrowedBookCards book={data}></BorrowedBookCards>
        </div>
    );
};

export default BorrowedBook; 