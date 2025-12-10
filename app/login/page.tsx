"use client"
import { signIn } from "next-auth/react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Loader2, ArrowRight } from "lucide-react"

export default function LoginPage() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const username = formData.get("username")
        const password = formData.get("password")

        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        })

        if (res?.error) {
            setError("Invalid credentials")
        } else {
            router.push("/dashboard")
        }
        setLoading(false)
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a0505]">
            {/* Background Hero Image (Dimmed & Blurred) */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-saree-2.jpg"
                    alt="Traditional Background"
                    fill
                    className="object-cover opacity-40 blur-sm scale-105 animate-slow-zoom"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/80"></div>
            </div>

            {/* Traditional Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-30 mix-blend-overlay z-0"></div>

            <Card className="glass relative z-10 w-full max-w-md mx-4 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-amber-500/20 bg-black/40 backdrop-blur-md">
                <CardHeader className="flex flex-col items-center pb-2 pt-8">
                    <div className="mb-6 animate-float">
                        <Image
                            src="/logo.png"
                            alt="Om Prakash Textiles Logo"
                            width={100}
                            height={100}
                            className="object-contain invert brightness-0 sepia saturate-100 hue-rotate-[5deg]"
                        />
                    </div>
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-serif font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 drop-shadow-sm">
                            Om Prakash Textiles
                        </h1>
                        <div className="flex items-center justify-center gap-2 opacity-80">
                            <div className="h-[1px] w-8 bg-amber-500/50"></div>
                            <p className="text-xs text-amber-100/80 uppercase tracking-[0.2em] font-light">Inventory Portal</p>
                            <div className="h-[1px] w-8 bg-amber-500/50"></div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="px-8 pb-8 pt-6">
                    <form action={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="username" className="text-xs font-medium text-amber-200/80 uppercase tracking-wider ml-1">Username</label>
                            <Input
                                name="username"
                                placeholder="Enter Access ID"
                                className="bg-black/30 border-amber-500/30 text-amber-50 placeholder:text-amber-500/30 focu:border-amber-400 focus:ring-amber-500/20 h-11"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label htmlFor="password" className="text-xs font-medium text-amber-200/80 uppercase tracking-wider ml-1">Password</label>
                            </div>
                            <Input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                className="bg-black/30 border-amber-500/30 text-amber-50 placeholder:text-amber-500/30 focus:border-amber-400 focus:ring-amber-500/20 h-11"
                                required
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-red-950/30 border border-red-500/30 rounded-lg">
                                <p className="text-sm text-center text-red-400 font-medium">{error}</p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full text-sm font-medium tracking-widest uppercase h-12 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(217,119,6,0.2)] bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white border-none mt-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin text-white" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    Secure Login <ArrowRight className="h-4 w-4" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-amber-500/20" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#150505] px-2 text-amber-500/50 tracking-widest">Or Continue With</span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        type="button"
                        className="w-full h-11 border-amber-500/30 bg-black/20 text-amber-100 hover:bg-amber-950/30 hover:text-amber-50 transition-colors"
                        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                    >
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Google
                    </Button>

                    <div className="mt-8 text-center space-y-2">
                        <div className="text-xs text-amber-200/60">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="text-amber-400 hover:text-amber-300 underline font-medium transition-colors">
                                Sign up here
                            </Link>
                        </div>
                        <p className="text-[10px] text-amber-500/40 uppercase tracking-widest pt-4">
                            &copy; 2024 Om Prakash Legacy
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
