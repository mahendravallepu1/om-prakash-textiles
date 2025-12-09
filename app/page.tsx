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
                    src="/hero-saree.png"
                    alt="Traditional Saree Collection"
                    fill
                    className="object-cover object-top opacity-80 brightness-75 scale-105 animate-slow-zoom"
                    priority
                />
                {/* Gradient Overlays for Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60"></div>

                {/* Traditional Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20 mix-blend-overlay"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col justify-center min-h-screen px-8 md:px-24 max-w-7xl mx-auto">

                {/* Decorative Element */}
                <div className="flex items-center gap-4 mb-6 opacity-80 animate-fade-in-up">
                    <div className="h-[1px] w-12 bg-amber-400"></div>
                    <span className="uppercase tracking-[0.4em] text-xs text-amber-300 font-sans">Heritage & Tradition</span>
                    <div className="h-[1px] w-12 bg-amber-400"></div>
                </div>

                <h1 className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-none text-white drop-shadow-2xl animate-fade-in-up delay-100">
                    <span className="block text-amber-50">Om Prakash</span>
                    <span className="block italic text-amber-200 ml-4 md:ml-24 font-light">Textiles</span>
                </h1>

                <p className="mt-8 text-lg md:text-xl text-amber-100/80 max-w-xl leading-relaxed animate-fade-in-up delay-200 font-sans font-light">
                    Where golden threads weave stories of elegance. <br />
                    Discover our premium collection of authentic Indian handlooms, crafted for timeless grace.
                </p>

                <div className="mt-12 flex flex-col sm:flex-row gap-6 animate-fade-in-up delay-300">
                    <Link href="/login">
                        <Button className="h-14 px-10 bg-amber-600 hover:bg-amber-700 text-white rounded-none tracking-widest uppercase text-sm font-sans relative overflow-hidden group shadow-[0_0_30px_rgba(217,119,6,0.3)] transition-all hover:scale-105">
                            <span className="relative z-10 flex items-center gap-2">
                                Explore Collection
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </Button>
                    </Link>

                    <div className="flex items-center gap-2 text-amber-200/80 text-sm font-sans tracking-wide">
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
