import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <h1 className="text-4xl font-bold mb-4">Om Prakash Textiles</h1>
            <p className="mb-8">Manage your textile business efficiently.</p>
            <div className="flex gap-4">
                <a href="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login to Dashboard</a>
            </div>
        </main>
    );
}
