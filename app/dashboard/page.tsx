import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, TrendingUp, AlertTriangle } from "lucide-react";
import { getDashboardStats } from "@/app/actions/dashboard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const stats = await getDashboardStats();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="glass relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl border-t-4 border-t-primary">
                    <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-primary/5 -mr-8 -mt-8 transition-all group-hover:bg-primary/10" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales (Today)</CardTitle>
                        <div className="p-2 bg-primary/10 rounded-full text-primary">
                            <ShoppingCart className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="text-3xl font-bold text-foreground">₹ {stats.salesToday.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground mt-1">Today's Revenue</p>
                    </CardContent>
                </Card>

                <Card className="glass relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl border-t-4 border-t-blue-500">
                    <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-blue-500/5 -mr-8 -mt-8 transition-all group-hover:bg-blue-500/10" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Bills</CardTitle>
                        <div className="p-2 bg-blue-500/10 rounded-full text-blue-500">
                            <Package className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="text-3xl font-bold text-foreground">{stats.billsToday}</div>
                        <p className="text-xs text-muted-foreground mt-1">Bills generated today</p>
                    </CardContent>
                </Card>

                <Card className={`glass relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl border-t-4 ${stats.lowStockCount > 0 ? "border-t-destructive bg-destructive/5" : "border-t-orange-500"}`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Items</CardTitle>
                        <div className={`p-2 rounded-full ${stats.lowStockCount > 0 ? "bg-destructive/10 text-destructive" : "bg-orange-500/10 text-orange-500"}`}>
                            <AlertTriangle className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className={`text-3xl font-bold ${stats.lowStockCount > 0 ? "text-destructive" : "text-foreground"}`}>{stats.lowStockCount}</div>
                        <p className="text-xs text-muted-foreground mt-1">Items below minimum level</p>
                    </CardContent>
                </Card>

                <Card className="glass relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl border-t-4 border-t-green-500">
                    <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-green-500/5 -mr-8 -mt-8 transition-all group-hover:bg-green-500/10" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Stock Value</CardTitle>
                        <div className="p-2 bg-green-500/10 rounded-full text-green-500">
                            <TrendingUp className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="text-3xl font-bold text-foreground">₹ {stats.totalStockValue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground mt-1">Based on purchase price</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-full border-none shadow-none bg-transparent">
                    <div className="rounded-xl overflow-hidden glass p-6">
                        <CardHeader className="px-0">
                            <CardTitle className="text-xl">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="px-0">
                            <p className="text-muted-foreground">Select an option from the sidebar to get started.</p>
                        </CardContent>
                    </div>
                </Card>
            </div>
        </div>
    );
}
