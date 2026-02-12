
"use client";

import { Trash } from "lucide-react";
import { deleteService } from "@/app/actions/service";
import { useTransition } from "react";

export function DeleteServiceButton({ id }: { id: number }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
        if (confirm("¿Estás seguro de eliminar este servicio?")) {
            startTransition(async () => {
                await deleteService(id);
            });
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="text-slate-400 hover:text-red-600 p-1 transition-colors disabled:opacity-50"
        >
            <Trash className="w-5 h-5" />
        </button>
    );
}
