
"use client";

import { useActionState } from "react";
import { updateSettings } from "@/app/actions/settings";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const initialState = {
    success: false,
    error: undefined,
};

type SettingsState = {
    success: boolean;
    error?: {
        clinicName?: string[];
        clinicEmail?: string[];
        clinicPhone?: string[];
        clinicAddress?: string[];
    } | string;
};

export function SettingsForm({
    initialSettings,
    readOnly = false,
}: {
    initialSettings: {
        clinicName: string;
        clinicEmail: string;
        clinicPhone: string;
        clinicAddress: string;
    };
    readOnly?: boolean;
}) {
    const [state, formAction, isPending] = useActionState<SettingsState, FormData>(updateSettings, initialState);

    const getError = (field: keyof typeof initialSettings) => {
        if (!state?.error || typeof state.error === "string") return null;
        return state.error[field]?.[0];
    };

    return (
        <form action={readOnly ? undefined : formAction}>
            <Card>
                <CardHeader>
                    <CardTitle>Información de la Clínica</CardTitle>
                    <CardDescription>
                        Datos visibles en facturas y comunicaciones.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="clinicName">Nombre de la Clínica</Label>
                        <Input
                            id="clinicName"
                            name="clinicName"
                            defaultValue={initialSettings.clinicName}
                            required
                            disabled={readOnly}
                        />
                        {getError("clinicName") && <p className="text-red-500 text-sm">{getError("clinicName")}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="clinicEmail">Correo Electrónico</Label>
                        <Input
                            id="clinicEmail"
                            name="clinicEmail"
                            type="email"
                            defaultValue={initialSettings.clinicEmail}
                            required
                            disabled={readOnly}
                        />
                        {getError("clinicEmail") && <p className="text-red-500 text-sm">{getError("clinicEmail")}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="clinicPhone">Teléfono de Contacto</Label>
                        <Input
                            id="clinicPhone"
                            name="clinicPhone"
                            defaultValue={initialSettings.clinicPhone}
                            required
                            disabled={readOnly}
                        />
                        {getError("clinicPhone") && <p className="text-red-500 text-sm">{getError("clinicPhone")}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="clinicAddress">Dirección Física</Label>
                        <Input
                            id="clinicAddress"
                            name="clinicAddress"
                            defaultValue={initialSettings.clinicAddress}
                            required
                            disabled={readOnly}
                        />
                        {getError("clinicAddress") && <p className="text-red-500 text-sm">{getError("clinicAddress")}</p>}
                    </div>

                    {state?.success && (
                        <div className="p-3 bg-green-100 text-green-700 rounded-md text-sm">
                            ¡Configuración actualizada con éxito!
                        </div>
                    )}
                    {state?.success === false && state.error && typeof state.error === "string" && (
                        <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                            {(state.error as string)}
                        </div>
                    )}
                </CardContent>
                {!readOnly && (
                    <CardFooter>
                        <Button type="submit" disabled={isPending} className="ml-auto">
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Guardar Cambios
                                </>
                            )}
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </form>
    );
}
