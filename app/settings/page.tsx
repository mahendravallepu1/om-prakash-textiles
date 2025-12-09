import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateSettings, getSettings } from "@/app/actions/settings";

export default async function SettingsPage() {
    const settings = await getSettings();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Settings</h1>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Shop Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={updateSettings} className="space-y-4">
                        <div className="space-y-2">
                            <label>Shop Name</label>
                            <Input name="shopName" defaultValue={settings?.shopName || ""} placeholder="Om Prakash Textiles" />
                        </div>
                        <div className="space-y-2">
                            <label>Address</label>
                            <Input name="address" defaultValue={settings?.address || ""} placeholder="Shop No. 1, Main Market" />
                        </div>
                        <div className="space-y-2">
                            <label>Phone</label>
                            <Input name="phone" defaultValue={settings?.phone || ""} placeholder="+91 9876543210" />
                        </div>
                        <div className="space-y-2">
                            <label>GST Number</label>
                            <Input name="gst" defaultValue={settings?.gst || ""} placeholder="GSTIN..." />
                        </div>
                        <Button type="submit">Save Settings</Button>
                    </form>
                </CardContent>
            </Card>

            <Card className="max-w-2xl bg-muted/20">
                <CardHeader>
                    <CardTitle>Staff Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Admin can manage staff accounts here. (To be implemented)</p>
                </CardContent>
            </Card>
        </div>
    );
}
