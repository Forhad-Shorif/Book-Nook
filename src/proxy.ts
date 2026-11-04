import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
const user = session?.user
if (!user) {
     return NextResponse.redirect(new URL('/sign-in', request.url))
}

 
}
export const config = {
  matcher: ['/add-book','/borrowedbook', '/my-book', '/profile', "/detailsbook/:path*",],
}

