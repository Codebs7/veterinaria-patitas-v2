
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateBookingNotes } from "@/app/actions/booking"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Loader2 } from "lucide-react"

interface BookingNotesProps {
    bookingId: number
    initialNotes?: string | null
    clientName: string
}

export function BookingNotes({ bookingId, initialNotes, clientName }: BookingNotesProps) {
    const [notes, setNotes] = useState(initialNotes || "")
    const [open, setOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const router = useRouter()

    const handleSave = async () => {
        setIsSaving(true)
        const result = await updateBookingNotes(bookingId, notes)
        setIsSaving(false)
        if (result.success) {
            setOpen(false)
            router.refresh()
        } else {
            alert("Error al guardar la nota")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir notas</span>
                    <FileText className={`h-4 w-4 ${initialNotes ? "text-blue-600" : "text-slate-400"}`} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Notas de Reserva</DialogTitle>
                    <DialogDescription>
                        Notas internas para la reserva de {clientName}.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Escribe notas aquí (ej. Paciente nervioso, traer bozal...)"
                        className="col-span-3 min-h-[150px]"
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Guardar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
