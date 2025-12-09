"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSettings() {
    return await prisma.settings.findUnique({
        where: { id: "1" }
    });
}

export async function updateSettings(formData: FormData) {
    const shopName = formData.get("shopName") as string;
    const address = formData.get("address") as string;
    const phone = formData.get("phone") as string;
    const gst = formData.get("gst") as string;

    await prisma.settings.upsert({
        where: { id: "1" },
        update: { shopName, address, phone, gst },
        create: { id: "1", shopName, address, phone, gst }
    });

    revalidatePath("/settings");
}
