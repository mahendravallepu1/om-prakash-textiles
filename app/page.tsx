import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shirt, Scissors, ShoppingBag, Truck, Star, ShieldCheck } from "lucide-react";

export default function Home() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-md border-b border-white/20 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-white p-1 rounded-md">
                            <Image src="/logo.png" alt="Logo" width={32} height={32} className="object-contain" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white">Om Prakash Textiles</span>
                    </div>
                    <Link href="/login">
                        <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-white font-medium">
                            Login
                        </Button>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-16">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/woven.png')] opacity-20 animate-pulse-slow pointer-events-none"></div>

                {/* Gradient Mesh Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 -z-10"></div>

                {/* Floating Elements (Clothing UI) */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <Shirt className="absolute top-1/4 left-1/4 h-24 w-24 text-blue-300 animate-float" />
                    <Scissors className="absolute bottom-1/3 right-1/4 h-16 w-16 text-teal-300 animate-float-delayed" />
                    <ShoppingBag className="absolute top-1/3 right-10 h-20 w-20 text-purple-300 animate-float" style={{ animationDuration: '7s' }} />
                    <Star className="absolute bottom-20 left-10 h-12 w-12 text-yellow-300 animate-float" style={{ animationDuration: '5s' }} />
                </div>

                <div className="relative z-10 max-w-4xl space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-sm font-medium backdrop-blur-sm animate-fade-in-up">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Premium Textile Management Solution
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200 drop-shadow-sm">
                        Seamless <span className="italic font-serif text-blue-400">Inventory</span> <br />
                        meets <span className="italic font-serif text-teal-400">Elegance</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Elevate your textile business with our state-of-the-art management system.
                        Track stock, manage billing, and analyze growth with unprecedented ease.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Link href="/login">
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border-0">
                                Get Started <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Marquee Section */}
            <section className="bg-slate-950 border-y border-white/5 py-10 overflow-hidden relative">
                <div className="flex animate-scroll whitespace-nowrap gap-16 min-w-full text-slate-400 font-bold uppercase tracking-widest text-sm">
                    {Array(10).fill(null).map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <ShieldCheck className="h-5 w-5 text-blue-500" />
                            <span>Premium Quality Fabric</span>
                            <span className="mx-4 text-slate-700">•</span>
                            <Truck className="h-5 w-5 text-teal-500" />
                            <span>Efficient Logistics</span>
                            <span className="mx-4 text-slate-700">•</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900 relative">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {[
                        { title: "Smart Inventory", icon: Shirt, desc: "Real-time tracking of fabrics, garments, and accessories.", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/10" },
                        { title: "Fast Billing", icon: ShoppingBag, desc: "Lightning fast POS system designed for textile retail.", color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-900/10" },
                        { title: "Fabric Analytics", icon: Scissors, desc: "Deep insights into your best-selling patterns and materials.", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/10" },
                    ].map((feature, i) => (
                        <div key={i} className="group p-8 rounded-3xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-blue-500/30 transition-all hover:shadow-xl hover:-translate-y-2">
                            <div className={`h-14 w-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 transition-colors group-hover:bg-opacity-80`}>
                                <feature.icon className={`h-7 w-7 ${feature.color}`} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
