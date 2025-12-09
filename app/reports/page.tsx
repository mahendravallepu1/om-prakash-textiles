import prisma from "@/lib/prisma";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

async function getDailyReports() {
    // Simple report: Last 50 bills
    return await prisma.bill.findMany({
        take: 50,
        orderBy: { createdAt: "desc" },
        include: { createdBy: true }
    });
}

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
    const bills = await getDailyReports();
    const totalSales = bills.reduce((sum, bill) => sum + bill.netTotal, 0);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Reports</h1>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Total Revenue (Last 50 Bills)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">₹{totalSales.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Bills Generated</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{bills.length}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Bill #</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Payment</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bills.map((bill) => (
                            <TableRow key={bill.id}>
                                <TableCell className="font-medium">#{bill.billNumber}</TableCell>
                                <TableCell>{format(bill.createdAt, "dd MMM yyyy")}</TableCell>
                                <TableCell>{bill.customerName || "Walk-in"}</TableCell>
                                <TableCell>₹{bill.netTotal.toFixed(2)}</TableCell>
                                <TableCell>{bill.paymentMode}</TableCell>
                            </TableRow>
                        ))}
                        {bills.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                    No sales data available.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
