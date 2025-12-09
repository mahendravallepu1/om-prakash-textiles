import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-muted/20">
            {/* Desktop Sidebar */}
            <Sidebar />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between p-4 border-b bg-card">
                    <span className="font-bold text-lg">Om Prakash Textiles</span>
                    <MobileNav />
                </div>

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="mx-auto max-w-6xl animate-fade-in">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
