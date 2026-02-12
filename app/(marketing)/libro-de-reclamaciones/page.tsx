"use client";

import { useActionState } from "react";
import { createComplaint, type ComplaintState } from "@/app/actions/complaints";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, BookOpen } from "lucide-react";

const initialState: ComplaintState = {
    success: false,
    message: "",
    ticketNumber: "",
    error: {},
};

export default function LibroReclamacionesPage() {
    const [state, formAction, isPending] = useActionState(createComplaint, initialState);

    if (state?.success) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full text-center p-8 bg-white shadow-xl animate-in fade-in zoom-in duration-500">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-teal-800 mb-2">¡Reclamo Registrado!</CardTitle>
                    <CardDescription className="text-stone-600 mb-6">
                        Hemos enviado una copia de tu Hoja de Reclamación a tu correo electrónico.
                    </CardDescription>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <p className="text-sm text-yellow-800 font-medium uppercase tracking-wide">Tu Código de Reclamo</p>
                        <p className="text-3xl font-mono font-bold text-teal-900 mt-1">{state.ticketNumber}</p>
                    </div>

                    <Button onClick={() => window.location.href = "/"} className="w-full bg-teal-700 hover:bg-teal-800 text-white">
                        Volver al Inicio
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 pt-[160px] pb-12 px-4 md:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                        <BookOpen className="w-4 h-4" />
                        Libro de Reclamaciones Virtual
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-teal-900 mb-4">
                        Hoja de Reclamación
                    </h1>
                    <p className="text-stone-600 max-w-2xl mx-auto">
                        Conforme a lo establecido en el Código de Protección y Defensa del Consumidor, ponemos a tu disposición este Libro de Reclamaciones Virtual.
                    </p>
                </div>

                <Card className="shadow-lg border-t-[200px] border-t-teal-600 relative overflow-hidden">
                    <CardHeader className="bg-white border-b border-stone-100 pb-6">
                        <CardTitle className="text-lg text-teal-800">Datos del Consumidor Reclamante</CardTitle>
                        <CardDescription>Ingresa tus datos personales para contactarte.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form action={formAction} className="space-y-8">

                            {/* 1. Datos del Consumidor */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="clientName">Nombre Completo</Label>
                                    <Input id="clientName" name="clientName" placeholder="Juan Pérez" required aria-describedby="name-error" />
                                    {state?.error?.clientName && <p id="name-error" className="text-red-500 text-xs">{state.error.clientName[0]}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="clientDni">DNI / CE</Label>
                                    <Input id="clientDni" name="clientDni" placeholder="12345678" required />
                                    {state?.error?.clientDni && <p className="text-red-500 text-xs">{state.error.clientDni[0]}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="clientEmail">Email</Label>
                                    <Input id="clientEmail" name="clientEmail" type="email" placeholder="juan@ejemplo.com" required />
                                    {state?.error?.clientEmail && <p className="text-red-500 text-xs">{state.error.clientEmail[0]}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="clientPhone">Teléfono</Label>
                                    <Input id="clientPhone" name="clientPhone" placeholder="999 999 999" required />
                                    {state?.error?.clientPhone && <p className="text-red-500 text-xs">{state.error.clientPhone[0]}</p>}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="clientAddress">Domicilio</Label>
                                    <Input id="clientAddress" name="clientAddress" placeholder="Av. Principal 123, Lima" required />
                                    {state?.error?.clientAddress && <p className="text-red-500 text-xs">{state.error.clientAddress[0]}</p>}
                                </div>
                            </div>

                            <hr className="border-stone-200" />

                            {/* 2. Bien Contratado */}
                            <div>
                                <h3 className="text-lg font-semibold text-teal-800 mb-4">Información del Bien Contratado</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Tipo de Bien</Label>
                                        <RadioGroup defaultValue="Servicio" name="goodType" className="flex gap-6">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Producto" id="ty-prod" />
                                                <Label htmlFor="ty-prod">Producto</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Servicio" id="ty-serv" />
                                                <Label htmlFor="ty-serv">Servicio</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="amountClaimed">Monto Reclamado (S/)</Label>
                                        <Input id="amountClaimed" name="amountClaimed" type="number" step="0.01" placeholder="0.00" />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="goodDescription">Descripción del Producto o Servicio</Label>
                                        <Input id="goodDescription" name="goodDescription" placeholder="Ej: Consulta Veterinaria del día 10/02" required />
                                        {state?.error?.goodDescription && <p className="text-red-500 text-xs">{state.error.goodDescription[0]}</p>}
                                    </div>
                                </div>
                            </div>

                            <hr className="border-stone-200" />

                            {/* 3. Detalle de Reclamación */}
                            <div>
                                <h3 className="text-lg font-semibold text-teal-800 mb-4">Detalle de la Reclamación</h3>

                                <div className="bg-blue-50 p-4 rounded-md mb-6 text-sm text-blue-800">
                                    <p><strong>Reclamo:</strong> Disconformidad relacionada a los productos o servicios.</p>
                                    <p><strong>Queja:</strong> Disconformidad no relacionada directamente al giro del negocio (ej. mala atención).</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>Tipo</Label>
                                        <RadioGroup defaultValue="Reclamo" name="type" className="flex gap-6">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Reclamo" id="t-rec" />
                                                <Label htmlFor="t-rec">Reclamo</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Queja" id="t-que" />
                                                <Label htmlFor="t-que">Queja</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Detalle</Label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Describa los hechos..."
                                            required
                                        />
                                        {state?.error?.description && <p className="text-red-500 text-xs">{state.error.description[0]}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="consumerRequest">Pedido del Consumidor</Label>
                                        <textarea
                                            id="consumerRequest"
                                            name="consumerRequest"
                                            className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="¿Qué solución espera?"
                                            required
                                        />
                                        {state?.error?.consumerRequest && <p className="text-red-500 text-xs">{state.error.consumerRequest[0]}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-lg py-6" disabled={isPending}>
                                    {isPending ? "Enviando..." : "Enviar Hoja de Reclamación"}
                                </Button>
                                <p className="text-xs text-stone-500 mt-4 text-center">
                                    Al enviar este formulario acepta que la información consignada es verdadera.
                                    La empresa deberá dar respuesta al reclamo en un plazo no mayor a quince (15) días hábiles.
                                </p>
                            </div>

                            {state?.message && !state?.success && (
                                <div className="bg-red-50 text-red-600 p-3 rounded-md text-center text-sm">
                                    {state.message}
                                </div>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
