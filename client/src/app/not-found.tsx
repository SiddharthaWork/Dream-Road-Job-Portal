"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RocketIcon } from "lucide-react";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-muted/50 p-6">
            <div className="relative">
                <div className="absolute -left-16 -top-16 -z-10 h-64 w-64 rounded-full bg-primary/20 dark:bg-primary/30 blur-2xl" />
                <div className="absolute -right-16 -bottom-16 -z-10 h-64 w-64 rounded-full bg-secondary/20 dark:bg-secondary/30 blur-2xl" />

                <h1 className="bg-gradient-to-r from-primary to-[#255cf4] bg-clip-text text-[10rem] font-extrabold leading-none text-transparent drop-shadow-lg">
                    404
                </h1>
            </div>


            <h2 className="mb-4 font-heading text-3xl font-semibold text-foreground md:text-4xl">
                Oops! Page Not Found
            </h2>

            <p className="max-w-md text-center text-muted-foreground">
                The page you're looking for might have been moved, deleted, or doesn't exist.
                Let's get you back on track.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button
                    onClick={() => router.back()}
                    variant="default"
                    size="lg"
                    className="gap-2 transition-all hover:scale-105 hover:shadow-lg"
                >
                    <ArrowLeft />
                    Go Back
                </Button>

                <Button
                    onClick={() => router.push("/")}
                    variant="outline"
                    size="lg"
                    className="gap-2 border-2 text-white transition-all hover:bg-secondary/10 hover:scale-105 hover:shadow-lg dark:bg-background dark:hover:bg-secondary/20"
                >
                    <RocketIcon className="h-4 w-4" />
                    DreamRoad
                </Button>
            </div>
        </div>
    );
}