"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowRight, Loader2 } from "lucide-react"

export default function LoginPage() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setError("")

        const username = formData.get("username")
        const password = formData.get("password")

        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        })

        if (res?.error) {
            setError("Invalid credentials")
            setLoading(false)
        } else {
            router.push("/dashboard")
        }
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
                    <form action={handleSubmit} className="space-y-6">
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
                            className="w-full text-sm font-medium tracking-widest uppercase h-12 transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(217,119,6,0.2)] bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white border-none mt-4"
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

                    <div className="mt-8 text-center">
                        <p className="text-[10px] text-amber-500/40 uppercase tracking-widest">
                            &copy; 2024 Om Prakash Legacy
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
