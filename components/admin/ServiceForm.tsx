
"use client";

import { useActionState } from "react";
import { createService, updateService } from "@/app/actions/service";
import { Loader2 } from "lucide-react";
import Link from "next/link";
type Service = {
    id: number;
    name: string;
    description: string | null;
    price: number | null;
    duration: number | null;
    imageUrl: string | null;
};

const initialState = {
    message: "",
    error: undefined,
    success: false,
};

export function ServiceForm({ service }: { service?: Service }) {
    const action = service ? updateService.bind(null, service.id) : createService;
    const [state, formAction, isPending] = useActionState(action, initialState);

    return (
        <form action={formAction} className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
                {service ? "Editar Servicio" : "Nuevo Servicio"}
            </h2>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Nombre del Servicio</label>
                <input
                    type="text"
                    name="name"
                    defaultValue={service?.name}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Descripción</label>
                <textarea
                    name="description"
                    defaultValue={service?.description || ""}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Precio (S/)</label>
                    <input
                        type="number"
                        name="price"
                        defaultValue={service?.price || ""}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Duración (min)</label>
                    <input
                        type="number"
                        name="duration"
                        defaultValue={service?.duration || ""}
                        required
                        min="1"
                        className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">URL de Imagen</label>
                <input
                    type="url"
                    name="imageUrl"
                    defaultValue={service?.imageUrl || ""}
                    required
                    placeholder="https://ejemplo.com/imagen.jpg"
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <p className="text-xs text-slate-500">
                    Ingresa una URL directa a la imagen (ej. Unsplash, imgur).
                </p>
            </div>

            {state.message && (
                <div className={`p-4 rounded-md text-sm ${state.success ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                    {state.message}
                </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
                <Link
                    href="/admin/servicios"
                    className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                >
                    Cancelar
                </Link>
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                    {service ? "Guardar Cambios" : "Crear Servicio"}
                </button>
            </div>
        </form>
    );
}
