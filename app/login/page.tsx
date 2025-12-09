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
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">
            {/* Textile Pattern Background Animation */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/woven.png')] opacity-30 animate-pulse-slow"></div>

            {/* Floating Threads Animation (CSS) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-float-delayed"></div>
            </div>

            <Card className="glass relative z-10 w-full max-w-md mx-4 shadow-2xl border-t-4 border-t-primary">
                <CardHeader className="flex flex-col items-center pb-2 pt-8">
                    <div className="bg-white p-3 rounded-2xl shadow-lg mb-4 ring-1 ring-slate-100">
                        <Image
                            src="/logo.png"
                            alt="Om Prakash Textiles Logo"
                            width={80}
                            height={80}
                            className="object-contain"
                        />
                    </div>
                    <div className="text-center space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight text-primary">Om Prakash Textiles</h1>
                        <p className="text-sm text-muted-foreground">Inventory & Billing Management</p>
                    </div>
                </CardHeader>
                <CardContent className="px-8 pb-8 pt-6">
                    <form action={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="username" className="text-sm font-medium">Username</label>
                            <Input
                                name="username"
                                placeholder="Enter your username"
                                className="bg-white/50 backdrop-blur-sm"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label htmlFor="password" className="text-sm font-medium">Password</label>
                            </div>
                            <Input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                className="bg-white/50 backdrop-blur-sm"
                                required
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                                <p className="text-sm text-center text-destructive font-medium">{error}</p>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full text-lg h-11 transition-all hover:scale-[1.02] shadow-lg shadow-primary/20"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin text-white" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    Login to Dashboard <ArrowRight className="h-4 w-4" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-xs text-muted-foreground">
                        <p>&copy; 2024 Om Prakash Textiles. All rights reserved.</p>
                    </div>
                </CardContent>
            </Card>

            <style jsx global>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.15; }
                }
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                @keyframes float-delayed {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(20px); }
                    100% { transform: translateY(0px); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 8s infinite ease-in-out;
                }
                .animate-float {
                    animation: float 6s infinite ease-in-out;
                }
                .animate-float-delayed {
                    animation: float-delayed 8s infinite ease-in-out;
                }
            `}</style>
        </div>
    )
}
