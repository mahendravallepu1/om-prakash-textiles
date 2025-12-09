"use client";
import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Trash, Check, Printer } from "lucide-react";
import { createBill } from "@/app/actions/billing";

type Item = {
    id: string;
    name: string;
    sellingPrice: number;
    stock: number;
    unit: string;
};

type CartItem = Item & {
    qty: number;
    total: number;
};

export function POSInterface({ items }: { items: Item[] }) {
    const [search, setSearch] = useState("");
    const [cart, setCart] = useState<CartItem[]>([]);
    const [customer, setCustomer] = useState({ name: "", phone: "" });
    const [discount, setDiscount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [lastBill, setLastBill] = useState<any>(null);

    const filteredItems = useMemo(() => {
        if (!search) return items.slice(0, 5); // Show first 5 initially
        return items.filter((i) =>
            i.name.toLowerCase().includes(search.toLowerCase())
        ).slice(0, 10);
    }, [items, search]);

    const addToCart = (item: Item) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id
                        ? { ...i, qty: i.qty + 1, total: (i.qty + 1) * i.sellingPrice }
                        : i
                );
            }
            return [...prev, { ...item, qty: 1, total: item.sellingPrice }];
        });
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((i) => i.id !== id));
    };

    const updateQty = (id: string, qty: number) => {
        if (qty < 0) return;
        setCart((prev) =>
            prev.map((i) =>
                i.id === id ? { ...i, qty, total: qty * i.sellingPrice } : i
            )
        );
    };

    const subTotal = cart.reduce((sum, i) => sum + i.total, 0);
    const netTotal = subTotal - discount; // Tax needed? Let's keep simpler for now or assume inclusive

    const handleCheckout = async () => {
        if (cart.length === 0) return;
        setLoading(true);
        try {
            const res = await createBill({
                customerName: customer.name,
                customerPhone: customer.phone,
                items: cart.map(i => ({
                    itemId: i.id,
                    name: i.name,
                    qty: i.qty,
                    price: i.sellingPrice,
                    total: i.total
                })),
                total: subTotal,
                discount: discount,
                tax: 0,
                netTotal: netTotal,
                paymentMode: "CASH", // Default
            });

            if (res.success) {
                setLastBill({ ...res, customer, cart, subTotal, discount, netTotal });
                setCart([]);
                setCustomer({ name: "", phone: "" });
                setDiscount(0);
                alert(`Bill #${res.billNumber} created successfully!`);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to create bill");
        } finally {
            setLoading(false);
        }
    };

    if (lastBill) {
        return (
            <div className="flex flex-col items-center justify-center p-8 space-y-4">
                <Card className="w-[400px]">
                    <CardHeader>
                        <CardTitle className="text-center">Om Prakash Textiles</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-center text-sm">
                            <p>Bill #{lastBill.billNumber}</p>
                            <p>{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
                        </div>
                        <div className="border-t border-b py-2 space-y-1">
                            {lastBill.cart.map((i: any) => (
                                <div key={i.id} className="flex justify-between text-sm">
                                    <span>{i.name} x {i.qty}</span>
                                    <span>{i.total.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>Net Total</span>
                            <span>₹{lastBill.netTotal.toFixed(2)}</span>
                        </div>
                        <Button onClick={() => window.print()} className="w-full mt-4">
                            <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
                        <Button variant="outline" onClick={() => setLastBill(null)} className="w-full mt-2">
                            New Bill
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
            {/* Left: Item Selection */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <Search className="text-muted-foreground" />
                    <Input
                        placeholder="Search items..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1"
                    />
                </div>
                <div className="grid grid-cols-2 gap-2 overflow-y-auto">
                    {filteredItems.map((item) => (
                        <Card
                            key={item.id}
                            className="cursor-pointer hover:border-primary transition-colors"
                            onClick={() => addToCart(item)}
                        >
                            <CardContent className="p-4">
                                <div className="font-semibold">{item.name}</div>
                                <div className="text-sm text-muted-foreground">
                                    ₹{item.sellingPrice} / {item.unit}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Stock: {item.stock}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Right: Cart & Checkout */}
            <Card className="flex flex-col h-full">
                <CardHeader className="pb-3 border-b">
                    <CardTitle>Current Bill</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-0">
                    <div className="flex-1 overflow-y-auto p-4">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-left text-muted-foreground">
                                    <th className="pb-2">Item</th>
                                    <th className="pb-2 w-20">Qty</th>
                                    <th className="pb-2 text-right">Total</th>
                                    <th className="pb-2 w-8"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => (
                                    <tr key={item.id} className="border-b last:border-0">
                                        <td className="py-2">{item.name}</td>
                                        <td className="py-2">
                                            <Input
                                                type="number"
                                                className="h-8 w-20 px-2"
                                                value={item.qty}
                                                onChange={(e) => updateQty(item.id, parseFloat(e.target.value))}
                                            />
                                        </td>
                                        <td className="py-2 text-right">₹{item.total.toFixed(2)}</td>
                                        <td className="py-2">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 border-t bg-muted/20 space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                            <Input
                                placeholder="Customer Name"
                                value={customer.name}
                                onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))}
                            />
                            <Input
                                placeholder="Mobile Number"
                                value={customer.phone}
                                onChange={(e) => setCustomer(prev => ({ ...prev, phone: e.target.value }))}
                            />
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span>Subtotal:</span>
                            <span className="font-bold">₹{subTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm gap-4">
                            <span>Discount:</span>
                            <Input
                                type="number"
                                className="w-24 text-right h-8"
                                value={discount}
                                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                            />
                        </div>
                        <div className="flex justify-between items-center text-xl font-bold border-t pt-2">
                            <span>Net Total:</span>
                            <span>₹{netTotal.toFixed(2)}</span>
                        </div>

                        <Button
                            size="lg"
                            className="w-full"
                            onClick={handleCheckout}
                            disabled={cart.length === 0 || loading}
                        >
                            {loading ? "Processing..." : "Complete Sale"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
