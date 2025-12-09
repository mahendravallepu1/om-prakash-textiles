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
import { createItem } from "@/app/actions/items";
import { Plus } from "lucide-react";

export function AddItemDialog() {
    const [open, setOpen] = React.useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button><Plus className="mr-2 h-4 w-4" /> Add Item</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Item</DialogTitle>
                    <DialogDescription>
                        Enter item details below.
                    </DialogDescription>
                </DialogHeader>
                <form action={async (formData) => {
                    await createItem(formData);
                    setOpen(false);
                }} className="space-y-4">
                    <Input name="name" placeholder="Item Name" required />
                    <Input name="category" placeholder="Category" required />
                    <div className="grid grid-cols-2 gap-4">
                        <Input name="purchasePrice" type="number" step="0.01" placeholder="Purchase Price" required />
                        <Input name="sellingPrice" type="number" step="0.01" placeholder="Selling Price" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input name="stock" type="number" step="0.01" placeholder="Initial Stock" required />
                        <Input name="unit" placeholder="Unit (meter/piece)" required />
                    </div>
                    <Input name="minStock" type="number" placeholder="Min Stock Alert" defaultValue="5" />
                    <Button type="submit" className="w-full">Save Item</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
