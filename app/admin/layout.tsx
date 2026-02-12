import Link from "next/link";
import { LayoutDashboard, Calendar, Settings, LogOut, Briefcase } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white hidden md:block">
                <div className="p-6">
                    <h2 className="text-2xl font-bold">Patitas Admin</h2>
                </div>
                <nav className="p-4 space-y-2">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 p-3 rounded-md hover:bg-slate-800 transition-colors"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Inicio
                    </Link>
                    <Link
                        href="/admin/reservas"
                        className="flex items-center gap-3 p-3 rounded-md hover:bg-slate-800 transition-colors"
                    >
                        <Calendar className="w-5 h-5" />
                        Reservas
                    </Link>
                    <Link
                        href="/admin/servicios"
                        className="flex items-center gap-3 p-3 rounded-md hover:bg-slate-800 transition-colors"
                    >
                        <Briefcase className="w-5 h-5" />
                        Servicios
                    </Link>
                    <Link
                        href="/admin/configuracion"
                        className="flex items-center gap-3 p-3 rounded-md hover:bg-slate-800 transition-colors"
                    >
                        <Settings className="w-5 h-5" />
                        Configuración
                    </Link>
                </nav>
                <div className="absolute bottom-4 left-4 p-4">
                    <form action={async () => {
                        "use server"
                        const { logoutAction } = await import('@/app/actions/auth')
                        await logoutAction()
                    }}>
                        <button type="submit" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer">
                            <LogOut className="w-5 h-5" />
                            Cerrar Sesión
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
