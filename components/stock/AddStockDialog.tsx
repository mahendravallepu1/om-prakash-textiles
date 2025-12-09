"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { addStock } from "@/app/actions/stock";
import { Plus } from "lucide-react";

export function AddStockDialog({ items }: { items: { id: string; name: string }[] }) {
    const [open, setOpen] = React.useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Add Stock</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Stock</DialogTitle>
                    <DialogDescription>
                        Select item and enter quantity to add.
                    </DialogDescription>
                </DialogHeader>
                <form action={async (formData) => {
                    await addStock(formData);
                    setOpen(false);
                }} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Item</label>
                        <select name="itemId" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                            {items.map(i => (
                                <option key={i.id} value={i.id}>{i.name}</option>
                            ))}
                        </select>
                    </div>
                    <Input name="quantity" type="number" step="0.01" placeholder="Quantity to Add" required />
                    <Input name="note" placeholder="Note (Optional)" />
                    <Button type="submit" className="w-full">Update Stock</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
