import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Shirt, Scissors, ShoppingBag, Star } from "lucide-react";

export default function Home() {
    return (
        <main className="min-h-screen bg-black overflow-hidden relative flex items-center justify-center">
            {/* Top Right Login (No Header) */}
            <div className="absolute top-6 right-6 z-50">
                <Link href="/login">
                    <Button variant="ghost" className="text-amber-200/60 hover:text-amber-100 hover:bg-amber-900/20 transition-all font-light tracking-wider uppercase text-sm">
                        Login
                    </Button>
                </Link>
            </div>

            {/* Background Animations */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Dark Woven Pattern */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-60"></div>

                {/* Gold/Warm Spotlights */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-amber-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-yellow-600/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '4s' }}></div>

                {/* Floating "Ghost" Elements (Subtle Gold Tint) */}
                <div className="absolute inset-0 opacity-10">
                    <Shirt className="absolute top-[15%] left-[15%] h-32 w-32 text-amber-100 animate-float duration-[10s]" />
                    <Scissors className="absolute bottom-[20%] right-[20%] h-24 w-24 text-amber-100 animate-float-delayed duration-[12s]" />
                    <ShoppingBag className="absolute top-[25%] right-[25%] h-20 w-20 text-amber-100 animate-float duration-[15s]" />
                    {/* Abstract shapes representing fabric rolls */}
                    <div className="absolute bottom-[30%] left-[30%] h-40 w-12 bg-amber-100/10 rounded-full rotate-45 animate-float-delayed duration-[18s]"></div>
                    <div className="absolute top-[40%] right-[10%] h-32 w-8 bg-amber-100/10 rounded-full -rotate-12 animate-float duration-[14s]"></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center px-4 flex flex-col items-center">
                <div className="mb-8 animate-fade-in-up">
                    <div className="mx-auto w-24 h-24 flex items-center justify-center mb-6">
                        <Image src="/logo.png" alt="Logo" width={80} height={80} className="object-contain invert brightness-0 sepia saturate-100 hue-rotate-[5deg]" />
                    </div>
                </div>

                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter drop-shadow-2xl animate-fade-in-up delay-100 font-serif">
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600">
                        Om Prakash
                    </span>
                    <br />
                    <span className="text-4xl md:text-6xl font-light tracking-[0.2em] text-amber-100/80 mt-2 block uppercase">
                        Textiles
                    </span>
                </h1>

                <div className="mt-8 animate-fade-in-up delay-300">
                    <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-4"></div>
                    <p className="text-amber-200/60 font-light tracking-[0.3em] uppercase text-sm">
                        Premium Textile Management
                    </p>
                </div>
            </div>
        </main>
    );
}
