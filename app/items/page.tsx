import { getItems, deleteItem } from "@/app/actions/items";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { AddItemDialog } from "@/components/items/AddItemDialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ItemsPage() {
    const items = await getItems();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Items</h1>
                <AddItemDialog />
            </div>

            <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price (Sell)</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow className="hover:bg-muted/50 transition-colors">
                                <TableCell className="font-medium">
                                    <div className="flex flex-col">
                                        <span>{item.name}</span>
                                        <span className="md:hidden text-xs text-muted-foreground">Stock: {item.stock}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                        {item.category}
                                    </span>
                                </TableCell>
                                <TableCell className="font-semibold text-foreground">₹{item.sellingPrice}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <span className={item.stock < 5 ? "text-red-500 font-bold" : "text-green-600"}>
                                        {item.stock}
                                    </span>
                                </TableCell>
                                <TableCell className="hidden md:table-cell text-muted-foreground">{item.unit}</TableCell>
                                <TableCell className="text-right">
                                    <form action={async () => {
                                        "use server";
                                        await deleteItem(item.id);
                                    }}>
                                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </form>
                                </TableCell>
                            </TableRow>
                        ))}
                        {items.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                    No items found. Add one to get started.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
