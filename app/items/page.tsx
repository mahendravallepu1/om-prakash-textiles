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

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
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
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>₹{item.sellingPrice}</TableCell>
                                <TableCell>{item.stock}</TableCell>
                                <TableCell>{item.unit}</TableCell>
                                <TableCell className="text-right">
                                    <form action={async () => {
                                        "use server";
                                        await deleteItem(item.id);
                                    }}>
                                        <Button variant="ghost" size="icon" className="text-red-500">
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
