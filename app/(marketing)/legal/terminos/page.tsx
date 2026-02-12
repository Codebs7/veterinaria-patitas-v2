import { CalendarCheck, CreditCard, Stethoscope, AlertTriangle, Scale, Clock } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-stone-50 pt-[160px] pb-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-teal-900 text-white p-8 md:p-12 text-center relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

                    <div className="relative z-10">
                        <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                            <Scale className="w-8 h-8 text-teal-200" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">Términos y Condiciones</h1>
                        <p className="text-teal-200 text-lg max-w-2xl mx-auto">
                            Conoce las reglas del juego para asegurar la mejor atención para tu mascota.
                        </p>
                    </div>
                </div>

                <div className="p-8 md:p-12 space-y-10 text-stone-700">
                    <p className="text-lg leading-relaxed border-b pb-8">
                        Bienvenido a <strong>Veterinaria Patitas</strong>. Al agendar una cita o adquirir nuestros servicios, usted acepta los siguientes términos y condiciones. Estos lineamientos buscan garantizar un servicio eficiente, seguro y de calidad para todos nuestros pacientes.
                    </p>

                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-teal-900 mb-4">
                            <CalendarCheck className="w-6 h-6 text-yellow-500" />
                            1. Reservas y Cancelaciones
                        </h2>
                        <ul className="list-disc pl-6 space-y-3 marker:text-teal-600">
                            <li>Las citas se pueden agendar a través de nuestra web, WhatsApp o teléfono.</li>
                            <li>Para reprogramar o cancelar una cita, solicitamos un aviso mínimo de <strong>24 horas de anticipación</strong>.</li>
                            <li>Las cancelaciones con menos de 24 horas de antelación no serán reembolsables, salvo casos de fuerza mayor debidamente justificados.</li>
                            <li>Nos reservamos el derecho de reagendar citas por motivos de emergencia médica veterinaria.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-teal-900 mb-4">
                            <Clock className="w-6 h-6 text-yellow-500" />
                            2. Tolerancia y Puntualidad
                        </h2>
                        <p className="mb-4">
                            Respetamos el tiempo de todos nuestros pacientes. Existe una tolerancia máxima de <strong>10 minutos</strong>. Pasado este tiempo:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 marker:text-teal-600">
                            <li>La cita se considerará como &quot;Inasistencia&quot; o &quot;No Show&quot;.</li>
                            <li>Podrá ser atendido solo si existe un espacio libre posterior, sin garantía de ello.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-teal-900 mb-4">
                            <CreditCard className="w-6 h-6 text-yellow-500" />
                            3. Pagos y Facturación
                        </h2>
                        <ul className="list-disc pl-6 space-y-3 marker:text-teal-600">
                            <li>Todos los precios están expresados en Soles (S/).</li>
                            <li>Aceptamos pagos en efectivo, tarjetas de crédito/débito y transferencias bancarias.</li>
                            <li>Para servicios quirúrgicos u hospitalización, se podrá solicitar un adelanto del 50% al momento del ingreso.</li>
                            <li>Los comprobantes de pago (Boleta/Factura) se emiten electrónicamente al momento de cancelar el servicio.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-teal-900 mb-4">
                            <AlertTriangle className="w-6 h-6 text-yellow-500" />
                            4. Responsabilidad del Propietario
                        </h2>
                        <p className="mb-4">El propietario o responsable de la mascota declara que:</p>
                        <ul className="list-disc pl-6 space-y-3 marker:text-teal-600">
                            <li>La información proporcionada sobre la salud y comportamiento de la mascota es verídica.</li>
                            <li>Debe informar previamente si la mascota es agresiva, nerviosa o tiene condiciones especiales.</li>
                            <li>Se hace responsable de dejar a su mascota con collar, correa y bozal (si aplica) dentro de las instalaciones.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-teal-900 mb-4">
                            <Stethoscope className="w-6 h-6 text-yellow-500" />
                            5. Consentimiento Informado
                        </h2>
                        <p className="leading-relaxed">
                            Todo procedimiento médico, quirúrgico o estético conlleva riesgos inherentes. Al autorizar un procedimiento, el propietario entiende que, aunque el personal médico pondrá todos los medios necesarios para el éxito del tratamiento, la medicina veterinaria no es una ciencia exacta y los resultados biológicos pueden variar.
                        </p>
                    </section>

                    <div className="border-t pt-8 text-sm text-stone-500 text-center">
                        <p>Última actualización: {new Date().toLocaleDateString('es-PE', { year: 'numeric', month: 'long' })}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
