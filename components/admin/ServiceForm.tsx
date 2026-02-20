
"use client";

import { useActionState, useState } from "react";
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
    const [previewUrl, setPreviewUrl] = useState<string | null>(service?.imageUrl || null);
    const [fileError, setFileError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFileError(null);

        if (!file) return;

        // 1. Validar Tipo (JPG, PNG)
        const validTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!validTypes.includes(file.type)) {
            setFileError("Solo se permiten imágenes JPG o PNG.");
            e.target.value = ""; // Limpiar input
            return;
        }

        // 2. Validar Peso (Máximo 500 KB)
        const maxSize = 500 * 1024; // 500KB en bytes
        if (file.size > maxSize) {
            setFileError(`La imagen es muy pesada (${(file.size / 1024).toFixed(0)}KB). El máximo permitido es 500KB.`);
            e.target.value = ""; // Limpiar input
            return;
        }

        // 3. Crear Preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

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

            <div className="space-y-4">
                <label className="text-sm font-medium text-slate-700">Imagen del Servicio (JPG/PNG - Máx 500KB)</label>

                {/* Preview */}
                <div className="flex items-center gap-6">
                    <div className="w-32 h-32 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden bg-slate-50">
                        {previewUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-xs text-slate-400">Sin imagen</span>
                        )}
                    </div>

                    <div className="flex-1 space-y-2">
                        <input
                            type="file"
                            name="imageFile"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleFileChange}
                            className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-all cursor-pointer w-full"
                        />
                        <p className="text-[11px] text-slate-500">
                            Formatos: JPG o PNG. Peso ideal: debajo de 500KB.
                        </p>
                        {fileError && <p className="text-xs text-red-600 font-medium">{fileError}</p>}
                    </div>
                </div>

                {/* hidden field to keep the current URL if no new file is selected during edit */}
                <input type="hidden" name="currentImageUrl" defaultValue={service?.imageUrl || ""} />
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
                    disabled={isPending || !!fileError}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                    {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                    {service ? "Guardar Cambios" : "Crear Servicio"}
                </button>
            </div>
        </form>
    );
}
