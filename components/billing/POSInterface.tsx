"use client";
import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Trash, Check, Printer, ShoppingCart } from "lucide-react";
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
    const [discountType, setDiscountType] = useState<"amount" | "percent">("amount");
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
    const discountAmount = discountType === "percent" ? (subTotal * discount / 100) : discount;
    const netTotal = Math.max(0, subTotal - discountAmount);

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
                discount: discountAmount,
                tax: 0,
                netTotal: netTotal,
                paymentMode: "CASH", // Default
            });

            if (res.success) {
                setLastBill({ ...res, customer, cart, subTotal, discountAmount, netTotal });
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
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-5rem)]">
            {/* Left: Item Selection */}
            <div className="flex-1 flex flex-col gap-4 min-h-0">
                <div className="flex items-center gap-2 bg-card p-2 rounded-lg border shadow-sm">
                    <Search className="text-muted-foreground ml-2" />
                    <Input
                        placeholder="Search items..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border-none shadow-none focus-visible:ring-0"
                    />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 overflow-y-auto p-1">
                    {filteredItems.map((item) => (
                        <Card
                            key={item.id}
                            className="cursor-pointer hover:border-primary hover:shadow-md transition-all group overflow-hidden relative"
                            onClick={() => addToCart(item)}
                        >
                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
                            <CardContent className="p-4 flex flex-col justify-between h-full">
                                <div>
                                    <div className="font-semibold truncate" title={item.name}>{item.name}</div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                        Starting at
                                    </div>
                                    <div className="text-lg font-bold text-primary">
                                        ₹{item.sellingPrice}
                                    </div>
                                </div>
                                <div className="mt-3 flex justify-between items-end border-t pt-2">
                                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                                        {item.unit}
                                    </span>
                                    <span className={`text-xs font-medium ${item.stock < 5 ? 'text-red-500' : 'text-green-600'}`}>
                                        {item.stock} left
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Right: Cart & Checkout */}
            <Card className="w-full lg:w-[450px] flex flex-col h-[50vh] lg:h-full shadow-xl border-t lg:border-l lg:border-t-0 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-3 border-b flex flex-row justify-between items-center bg-card/50">
                    <CardTitle>Current Bill</CardTitle>
                    <span className="text-sm text-muted-foreground">{cart.length} items</span>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-2">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-2 opacity-50">
                                <ShoppingCart className="h-12 w-12" />
                                <p>Cart is empty</p>
                            </div>
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="sticky top-0 bg-background/95 backdrop-blur z-10">
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="pb-2 pl-2">Item</th>
                                        <th className="pb-2 w-16 text-center">Qty</th>
                                        <th className="pb-2 text-right pr-2">Total</th>
                                        <th className="pb-2 w-8"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item) => (
                                        <tr key={item.id} className="border-b last:border-0 group hover:bg-muted/50 transition-colors">
                                            <td className="py-2 pl-2 font-medium">{item.name}</td>
                                            <td className="py-2 text-center">
                                                <div className="flex items-center justify-center bg-background border rounded-md h-8 w-16">
                                                    <Input
                                                        type="number"
                                                        className="h-full w-full border-none text-center px-0 focus-visible:ring-0"
                                                        value={item.qty}
                                                        onChange={(e) => updateQty(item.id, parseFloat(e.target.value))}
                                                    />
                                                </div>
                                            </td>
                                            <td className="py-2 text-right pr-2">₹{item.total.toFixed(2)}</td>
                                            <td className="py-2 text-right">
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-muted-foreground hover:text-destructive transition-colors p-1"
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <div className="p-4 border-t bg-card space-y-4 shadow-inner">
                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                placeholder="Customer Name"
                                className="bg-background"
                                value={customer.name}
                                onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))}
                            />
                            <Input
                                placeholder="Mobile Number"
                                className="bg-background"
                                value={customer.phone}
                                onChange={(e) => setCustomer(prev => ({ ...prev, phone: e.target.value }))}
                            />
                        </div>

                        <div className="space-y-2 pt-2">
                            <div className="flex justify-between items-center text-sm text-muted-foreground">
                                <span>Subtotal</span>
                                <span>₹{subTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm gap-4">
                                <span className="text-muted-foreground">Discount</span>
                                <div className="flex items-center gap-2">
                                    <div className="flex border rounded-md overflow-hidden bg-background">
                                        <button
                                            className={`px-2 py-1 text-xs ${discountType === "amount" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                                            onClick={() => setDiscountType("amount")}
                                        >
                                            ₹
                                        </button>
                                        <button
                                            className={`px-2 py-1 text-xs ${discountType === "percent" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                                            onClick={() => setDiscountType("percent")}
                                        >
                                            %
                                        </button>
                                    </div>
                                    <div className="flex items-center w-20 border rounded-md bg-background px-2">
                                        <Input
                                            type="number"
                                            className="h-7 w-full border-none p-0 text-right focus-visible:ring-0"
                                            value={discount}
                                            onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                                        />
                                    </div>
                                </div>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between items-center text-xs text-muted-foreground">
                                    <span>Discount Amount</span>
                                    <span>-₹{discountAmount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center text-xl font-bold border-t pt-2 text-primary">
                                <span>Net Total</span>
                                <span>₹{netTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <Button
                            size="lg"
                            className="w-full text-lg shadow-lg shadow-primary/20"
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
