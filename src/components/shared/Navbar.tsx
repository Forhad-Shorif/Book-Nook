"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  UserRound,
  Mail,
  CircleUserRound,
  LogOut,
  MenuIcon,
  XIcon,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";// অথবা যেখান থেকে authClient ইম্পোর্ট করা হয়েছে
import { showToast } from "@/utils/Toast";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "All Books", href: "/books" },
  { label: "Add Book", href: "/add-book" },
  { label: "My Books", href: "/my-book" },
  { label: "My Borrows", href: "/borrowedbook" },
];
function UserAvatarMenu() {
  const router = useRouter();

  const { data: session } =  authClient.useSession();
const user = session?.user || null;

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in");
            router.refresh();
          },
        },
      });
      showToast.success("Sign out successful");
    } catch (error) {
      showToast.error("Failed to sign out. Please try again.");
      return;
    }
  };

  return (
    <div>
      {user ? (<DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open user menu"
              className="shrink-0 rounded-full border border-white/15"
            >
              <Avatar className="size-9">
                <AvatarImage
                  src={user?.image || ""}
                  alt={user?.name || ""}
                />
                <AvatarFallback>FS</AvatarFallback>
              </Avatar>
            </Button>
          }
        />

        <DropdownMenuContent
          align="end"
          className="z-50 w-64 rounded-2xl border border-white/15 bg-slate-900/95 p-2 text-slate-100 shadow-2xl backdrop-blur-xl"
        >
          {/* User Information */}
          <DropdownMenuGroup>
            <DropdownMenuLabel className="px-3 py-2">
              <div className="flex items-center gap-3">
                <Avatar className="size-10 shrink-0">
                  <AvatarImage
                    src={user?.image || ""}
                    alt={user?.name || ""}
                  />
                  <AvatarFallback>FS</AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {user?.name || "No Name"}
                  </p>

                  <p className="truncate text-xs font-normal text-slate-400">
                    {user?.email || "No Email"}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-white/10" />

          {/* User Menu Items */}
          <DropdownMenuGroup>
            <DropdownMenuItem
              disabled
              className="cursor-default rounded-xl px-3 py-2 text-slate-200 opacity-100"
            >
              <UserRound className="mr-2 size-4" />
              <span className="truncate">
                {user?.name || "No name"}
              </span>
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled
              className="cursor-default rounded-xl px-3 py-2 text-slate-200 opacity-100"
            >
              <Mail className="mr-2 size-4" />
              <span className="truncate">
                {user?.email || "No email"}
              </span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => router.push("/profile")}
              className="cursor-pointer rounded-xl px-3 py-2 text-slate-200 focus:bg-white/10 focus:text-white"
            >
              <CircleUserRound className="mr-2 size-4" />
              My Profile
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-white/10" />

          {/* Sign Out */}
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer rounded-xl px-3 py-2 text-rose-400 focus:bg-rose-500/10 focus:text-rose-300"
          >
            <LogOut className="mr-2 size-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>) : (
        <div>
          <Link
            href="/sign-in"
            className="rounded-full border border-white/15 bg-slate-900/60 px-3.5 py-2 text-sm font-semibold text-white hover:bg-slate-800 hover:text-white transition-all"
          >
            Sign In
          </Link>

          <Link
            href="/sign-up"
            className="rounded-full border border-white/15 bg-slate-900/60 px-3.5 py-2 text-sm font-semibold text-white hover:bg-slate-800 hover:text-white transition-all"
          >
            Sign Up
          </Link>
        </div>
      )
      }
    </div>
  );
}

// Main Navbar
const Navbar =  () => {
  
  const { data: session , error } = authClient.useSession();

  const user = session?.user || null;

  const firstName =
    user?.name?.trim().split(/\s+/)[0] || "";

  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#07101c]/85 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:px-6 lg:h-20 lg:gap-6 lg:px-8"
      >
        {/* Logo */}
        <Link
          href="/"
          className="group flex min-w-0 shrink items-center gap-2 rounded-full"
        >
          <span className="relative size-9 shrink-0 overflow-hidden rounded-full ring-2 ring-white/20 transition-transform duration-300 group-hover:scale-105 sm:size-10 lg:size-11">
            <Image
              src="/images/Logo.jpeg"
              alt="BookNook logo"
              fill
              sizes="44px"
              className="object-cover"
            />
          </span>

          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate font-heading text-base font-bold tracking-tight text-white sm:text-lg lg:text-xl">
              BookNook
            </span>

            <span className="mt-0.5 hidden text-[10px] uppercase tracking-[0.2em] text-slate-400 sm:block">
              Read · Dream · Discover
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 items-center justify-center lg:flex">
          <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-slate-900/50 p-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={
                    isActive(link.href) ? "page" : undefined
                  }
                  className={cn(
                    "block rounded-full px-3.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white",
                    isActive(link.href) &&
                    "bg-amber-400 font-semibold text-slate-950 shadow-sm"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop User Name + Avatar */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <span className="max-w-28 truncate text-sm font-semibold text-white">
            {firstName}
          </span>

          <UserAvatarMenu />
        </div>

        {/* Mobile Right Section */}
        <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
          <span className="max-w-16 truncate text-xs font-semibold text-white sm:max-w-28 sm:text-sm">
            {firstName}
          </span>

          <UserAvatarMenu />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={
              mobileMenuOpen ? "Close menu" : "Open menu"
            }
            aria-expanded={mobileMenuOpen}
            onClick={() =>
              setMobileMenuOpen((prev) => !prev)
            }
            className="size-9 shrink-0 rounded-full border border-white/15 bg-slate-900/60 text-white hover:bg-slate-800 hover:text-white"
          >
            {mobileMenuOpen ? (
              <XIcon className="size-5" />
            ) : (
              <MenuIcon className="size-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute right-3 top-full mt-2 w-56 rounded-2xl border border-white/15 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-xl lg:hidden">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={
                    isActive(link.href) ? "page" : undefined
                  }
                  className={cn(
                    "block rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white",
                    isActive(link.href) &&
                    "bg-amber-400 font-semibold text-slate-950"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
