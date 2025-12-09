"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Sidebar from "@/components/Sidebar";

export default function MobileNav() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-r border-border bg-card w-[80%] max-w-[300px]">
                {/* Reuse the existing Sidebar component logic but render it inside the sheet */}
                <div className="h-full">
                    <Sidebar isMobile={true} />
                </div>
            </SheetContent>
        </Sheet>
    );
}
