"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
    const [error, setError] = useState("")
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
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
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Om Prakash Textiles</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="username">Username</label>
                            <Input name="username" placeholder="admin" required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password">Password</label>
                            <Input name="password" type="password" placeholder="••••••" required />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
