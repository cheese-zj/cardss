"use client"

import {Menu, Sparkles} from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { UserButton,
    SignInButton,
    SignedIn,
    SignedOut,
  } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import {Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";

const font = Poppins({ weight: "600", subsets: ["latin"] });

export const Navbar = () => {
    return (
        <div className="fixed w-full z-50 flex justify-between
        items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
            <div className="flex items-center">
                <Menu className="block md:hidden" />
                <Link href="/">
                    <h1 className={cn(
                        "hidden md:block text-xl md:text-3xl font-bold text-primary",
                        font.className)}>
                        Luck in Card
                    </h1>
                </Link>
            </div>
            <div className="flex items-center gap-x-3">
                <Button variant="prem" size="sm">
                    Upgrade
                    <Sparkles className="w-4 h-4 fill-white text-white ml-2" />
                </Button>
                <ModeToggle />
                {/* SignedOut renders when the user is not authenticated */}
                <SignedOut>
                    <SignInButton />
                </SignedOut>

                {/* SignedIn renders when the user is authenticated */}
                <SignedIn>
                    <UserButton afterSignOutUrl="/"/>
                </SignedIn>
            </div>
        </div>
    );
};
