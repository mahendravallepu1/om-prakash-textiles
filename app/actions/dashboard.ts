"use server";
import prisma from "@/lib/prisma";

export async function getDashboardStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
        totalSalesToday,
        billsToday,
        lowStockItems,
        totalStockValueResult
    ] = await Promise.all([
        // 1. Total Sales Today
        prisma.bill.aggregate({
            _sum: { netTotal: true },
            where: { createdAt: { gte: today } }
        }),
        // 2. Total Bills Today
        prisma.bill.count({
            where: { createdAt: { gte: today } }
        }),
        // 3. Low Stock Items Count (manual filter as discussed)
        prisma.item.findMany(),
        // 4. Total Stock Value
        prisma.item.findMany() // We will calc in JS for sqlite compatibility simplicity or raw query
    ]);

    const lowStockCount = lowStockItems.filter(i => i.stock <= i.minStock).length;
    const totalStockValue = totalStockValueResult.reduce((sum, item) => sum + (item.stock * item.purchasePrice), 0);

    return {
        salesToday: totalSalesToday._sum.netTotal || 0,
        billsToday,
        lowStockCount,
        totalStockValue
    };
}
