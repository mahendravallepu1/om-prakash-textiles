import { getStockLogs, getLowStockItems } from "@/app/actions/stock";
import { getItems } from "@/app/actions/items";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { AddStockDialog } from "@/components/stock/AddStockDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function StockPage() {
    const logs = await getStockLogs();
    const lowStockItems = await getLowStockItems();
    const allItems = await getItems();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Stock Management</h1>
                <AddStockDialog items={allItems} />
            </div>

            {lowStockItems.length > 0 && (
                <Card className="border-red-200 bg-red-50">
                    <CardHeader>
                        <CardTitle className="flex items-center text-red-700 text-lg">
                            <AlertTriangle className="mr-2 h-5 w-5" /> Low Stock Alerts
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {lowStockItems.map((item: any) => (
                                <div key={item.id} className="flex justify-between items-center bg-white p-2 rounded border border-red-100">
                                    <span className="font-medium text-red-900">{item.name}</span>
                                    <span className="text-sm text-red-700">Stock: {item.stock} {item.unit} (Min: {item.minStock})</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Recent Stock History</h2>
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Item</TableHead>
                                <TableHead>Change</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Note</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logs.map((log: any) => (
                                <TableRow key={log.id}>
                                    <TableCell>{format(log.createdAt, "dd MMM yyyy HH:mm")}</TableCell>
                                    <TableCell className="font-medium">{log.item.name}</TableCell>
                                    <TableCell className={log.change > 0 ? "text-green-600" : "text-red-600"}>
                                        {log.change > 0 ? "+" : ""}{log.change}
                                    </TableCell>
                                    <TableCell>{log.type}</TableCell>
                                    <TableCell className="text-muted-foreground">{log.note}</TableCell>
                                </TableRow>
                            ))}
                            {logs.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                                        No stock history available.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
