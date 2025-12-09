import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#1a0505] overflow-hidden relative font-serif text-white">
            {/* Top Right Login (No Header) */}
            <div className="absolute top-6 right-6 z-50">
                <Link href="/login">
                    <Button variant="ghost" className="text-amber-100 hover:text-white hover:bg-white/10 transition-all font-light tracking-widest uppercase text-xs border border-amber-200/30 rounded-none px-6">
                        Login
                    </Button>
                </Link>
            </div>

            {/* Background Hero Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-saree-2.jpg"
                    alt="Traditional Saree Collection"
                    fill
                    className="object-cover object-top opacity-90 brightness-90 scale-105 animate-slow-zoom"
                    priority
                />
                {/* Gradient Overlays for Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>

                {/* Traditional Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-10 mix-blend-overlay"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col justify-center min-h-screen px-8 md:px-24 max-w-7xl mx-auto">

                {/* Decorative Element */}
                <div className="flex items-center gap-4 mb-6 opacity-80 animate-fade-in-up">
                    <div className="h-[1px] w-12 bg-amber-400"></div>
                    <span className="uppercase tracking-[0.4em] text-xs text-amber-300 font-sans shadow-black drop-shadow-md">Heritage & Tradition</span>
                    <div className="h-[1px] w-12 bg-amber-400"></div>
                </div>

                <h1 className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-none text-white drop-shadow-2xl animate-fade-in-up delay-100">
                    <span className="block text-amber-50 drop-shadow-lg">Om Prakash</span>
                    <span className="block italic text-amber-200 ml-4 md:ml-24 font-light drop-shadow-lg">Textiles</span>
                </h1>

                <p className="mt-8 text-lg md:text-xl text-amber-50/90 max-w-xl leading-relaxed animate-fade-in-up delay-200 font-sans font-light drop-shadow-md">
                    Where golden threads weave stories of elegance. <br />
                    Discover our premium collection of authentic Indian handlooms, crafted for timeless grace.
                </p>

                <div className="mt-12 animate-fade-in-up delay-300">
                    <div className="flex items-center gap-2 text-amber-200/90 text-sm font-sans tracking-wide">
                        <Star className="h-4 w-4 fill-amber-200 text-amber-200" />
                        <span>Premium Quality Guaranteed</span>
                    </div>
                </div>


                {/* Floating Traditional Motifs */}
                <div className="absolute bottom-10 right-10 animate-float-delayed opacity-50 hidden md:block">
                    <div className="w-32 h-32 border border-amber-500/30 rounded-full flex items-center justify-center">
                        <div className="w-24 h-24 border border-amber-500/50 rounded-full"></div>
                    </div>
                </div>
            </div>

        </main>
    );
}
