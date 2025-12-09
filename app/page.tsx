import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Shirt, Scissors, ShoppingBag, Star } from "lucide-react";

export default function Home() {
    return (
        <main className="min-h-screen bg-black overflow-hidden relative flex items-center justify-center">
            {/* Navigation (Minimal) */}
            <nav className="fixed top-0 w-full z-50 p-6 flex justify-end">
                <Link href="/login">
                    <Button variant="ghost" className="text-white/50 hover:text-white transition-colors">
                        Login
                    </Button>
                </Link>
            </nav>

            {/* Background Animations */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Dark Woven Pattern */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-40"></div>

                {/* Spotlight effects */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '4s' }}></div>

                {/* Floating "Ghost" Elements */}
                <div className="absolute inset-0 opacity-10">
                    <Shirt className="absolute top-[15%] left-[15%] h-32 w-32 text-white animate-float duration-[10s]" />
                    <Scissors className="absolute bottom-[20%] right-[20%] h-24 w-24 text-white animate-float-delayed duration-[12s]" />
                    <ShoppingBag className="absolute top-[25%] right-[25%] h-20 w-20 text-white animate-float duration-[15s]" />
                    {/* Abstract shapes representing fabric rolls */}
                    <div className="absolute bottom-[30%] left-[30%] h-40 w-12 bg-white/5 rounded-full rotate-45 animate-float-delayed duration-[18s]"></div>
                    <div className="absolute top-[40%] right-[10%] h-32 w-8 bg-white/5 rounded-full -rotate-12 animate-float duration-[14s]"></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center px-4">
                <div className="mb-6 animate-fade-in-up">
                    <div className="mx-auto bg-white/10 w-20 h-20 rounded-2xl flex items-center justify-center backdrop-blur-md mb-8 border border-white/5 shadow-2xl shadow-blue-900/20">
                        <Image src="/logo.png" alt="Logo" width={48} height={48} className="object-contain invert brightness-0" />
                    </div>
                </div>

                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl animate-fade-in-up delay-100 font-serif">
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50">
                        Om Prakash
                    </span>
                    <br />
                    <span className="text-3xl md:text-5xl font-light tracking-widest uppercase text-white/40 mt-4 block">
                        Textiles
                    </span>
                </h1>

                <div className="mt-16 animate-fade-in-up delay-300">
                    <Link href="/login">
                        <Button className="rounded-full px-8 py-6 bg-white text-black hover:bg-white/90 text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                            Enter Portal
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
