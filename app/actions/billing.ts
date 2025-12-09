"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type BillData = {
    customerName: string;
    customerPhone: string;
    paymentMode: string;
    items: {
        itemId: string;
        name: string;
        qty: number;
        price: number;
        total: number;
    }[];
    total: number;
    discount: number;
    tax: number;
    netTotal: number;
};

export async function createBill(data: BillData) {
    // Use transaction to ensure stock is reduced and bill is saved together
    const bill = await prisma.$transaction(async (tx) => {
        // 1. Create Bill
        const newBill = await tx.bill.create({
            data: {
                customerName: data.customerName,
                customerPhone: data.customerPhone,
                total: data.total,
                discount: data.discount,
                tax: data.tax,
                netTotal: data.netTotal,
                paymentMode: data.paymentMode,
                items: {
                    create: data.items.map((item) => ({
                        itemId: item.itemId,
                        name: item.name,
                        qty: item.qty,
                        price: item.price,
                        total: item.total,
                    })),
                },
            },
        });

        // 2. Update Stock & Log Sale
        for (const item of data.items) {
            await tx.item.update({
                where: { id: item.itemId },
                data: { stock: { decrement: item.qty } },
            });

            await tx.stockLog.create({
                data: {
                    itemId: item.itemId,
                    change: -item.qty,
                    type: "SALE",
                    note: `Bill #${newBill.billNumber}`,
                },
            });
        }

        return newBill;
    });

    revalidatePath("/dashboard");
    revalidatePath("/items");
    revalidatePath("/reports");

    return { success: true, billId: bill.id, billNumber: bill.billNumber };
}
