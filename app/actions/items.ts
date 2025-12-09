"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getItems() {
    try {
        const items = await prisma.item.findMany({
            orderBy: { createdAt: "desc" },
        });
        return items;
    } catch (e) {
        console.error(e);
        return [];
    }
}

export async function createItem(formData: FormData) {
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const purchasePrice = parseFloat(formData.get("purchasePrice") as string);
    const sellingPrice = parseFloat(formData.get("sellingPrice") as string);
    const unit = formData.get("unit") as string;
    const stock = parseFloat(formData.get("stock") as string);
    const minStock = parseFloat(formData.get("minStock") as string);

    await prisma.item.create({
        data: {
            name,
            category,
            purchasePrice,
            sellingPrice,
            unit,
            stock,
            minStock
        },
    });

    revalidatePath("/items");
    redirect("/items");
}

export async function deleteItem(id: string) {
    await prisma.item.delete({ where: { id } });
    revalidatePath("/items");
}
