import { POSInterface } from "@/components/billing/POSInterface";
import { getItems } from "@/app/actions/items";

export default async function BillingPage() {
    const items = await getItems();

    return (
        <div className="h-full">
            <h1 className="text-3xl font-bold mb-6">Billing / POS</h1>
            <POSInterface items={items} />
        </div>
    );
}
