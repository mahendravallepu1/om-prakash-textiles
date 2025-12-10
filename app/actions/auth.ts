"use server"

import { z } from "zod"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

const RegisterSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export async function registerUser(formData: FormData) {
    const rawData = {
        name: formData.get("name"),
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
    }

    const validatedFields = RegisterSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return { error: validatedFields.error.issues[0].message }
    }

    const { name, username, email, password } = validatedFields.data

    try {
        // Check if user exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username },
                    { email }
                ]
            }
        })

        if (existingUser) {
            return { error: "User with that username or email already exists." }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create user
        await prisma.user.create({
            data: {
                name,
                username,
                email,
                password: hashedPassword,
                role: "STAFF" // Default role
            }
        })

        return { success: true }
    } catch (error) {
        console.error("Registration error:", error)
        return { error: "Something went wrong. Please try again." }
    }
}
