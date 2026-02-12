
import { SettingsForm } from "@/components/admin/SettingsForm";
import { getSettings } from "@/app/actions/settings";
import { Info, Shield } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/lib/auth";

export default async function AdminSettingsPage() {
    const settings = await getSettings();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const session: any = await getSession();
    const isReadOnly = session?.role === "staff";

    return (
        <div className="p-8 space-y-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <Shield className="w-8 h-8 text-emerald-600" />
                Configuración del Sistema
                {isReadOnly && <span className="text-sm font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded">(Solo Lectura)</span>}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Main Settings Form */}
                <div className="md:col-span-2">
                    <SettingsForm
                        initialSettings={{
                            clinicName: settings.clinicName,
                            clinicEmail: settings.clinicEmail,
                            clinicPhone: settings.clinicPhone,
                            clinicAddress: settings.clinicAddress,
                        }}
                        readOnly={isReadOnly}
                    />
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Info className="w-5 h-5 text-blue-500" />
                                Información Importante
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-slate-600 space-y-4">
                            <p>
                                <strong>Versión del Sistema:</strong> 1.0.0
                            </p>
                            <p>
                                <strong>Soporte Técnico:</strong><br />
                                <a href="mailto:soporte@codebs.com" className="text-blue-600 hover:underline">soporte@codebs.com</a>
                            </p>
                            <div className="bg-amber-50 p-3 rounded border border-amber-200 text-amber-800 text-xs">
                                <strong>Nota:</strong> Los cambios en la información de la clínica se reflejarán inmediatamente en los correos y facturas generadas.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
