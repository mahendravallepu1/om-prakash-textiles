"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addStock(formData: FormData) {
    const itemId = formData.get("itemId") as string;
    const quantity = parseFloat(formData.get("quantity") as string);
    const note = formData.get("note") as string;

    // Transaction to update stock and create log
    await prisma.$transaction([
        prisma.item.update({
            where: { id: itemId },
            data: { stock: { increment: quantity } },
        }),
        prisma.stockLog.create({
            data: {
                itemId,
                change: quantity,
                type: "PURCHASE",
                note: note || "Manual Entry",
            },
        }),
    ]);

    revalidatePath("/stock");
    revalidatePath("/items");
}

export async function getStockLogs() {
    return await prisma.stockLog.findMany({
        take: 20,
        orderBy: { createdAt: "desc" },
        include: { item: true },
    });
}

export async function getLowStockItems() {
    // Prisma doesn't support comparing two columns directly easily in standard where clause without raw query in some versions,
    // but we can just filter in JS for small datasets or use raw query.
    // simpler: find all, filter. For large datasets, raw query is better.
    // Let's use raw query for efficiency or just finding all items with low constant check if minStock was constant.
    // But minStock is per item.
    // We will fetch all and filter for this prototype to accept diverse SQL dialects (sqlite).
    const items = await prisma.item.findMany();
    return items.filter(item => item.stock <= item.minStock);
}
