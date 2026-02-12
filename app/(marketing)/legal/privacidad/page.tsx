import { Building2, FileText, Lock, Mail, ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-stone-50 pt-[160px] pb-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-teal-900 text-white p-8 md:p-12 text-center relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

                    <div className="relative z-10">
                        <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
                            <ShieldCheck className="w-8 h-8 text-teal-200" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">Política de Privacidad</h1>
                        <p className="text-teal-200 text-lg max-w-2xl mx-auto">
                            Tu confianza es lo más importante para nosotros. Aquí te explicamos cómo protegemos tus datos personales.
                        </p>
                    </div>
                </div>

                <div className="p-8 md:p-12 space-y-10 text-stone-700">
                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-teal-900 mb-4">
                            <Building2 className="w-6 h-6 text-yellow-500" />
                            1. Identidad y Domicilio
                        </h2>
                        <p className="leading-relaxed">
                            La presente Política de Privacidad describe cómo <strong>Veterinaria Patitas</strong> (en adelante, &quot;La Veterinaria&quot;), identificada con RUC Nº <strong>[COLOCAR RUC AQUÍ]</strong> y domicilio legal en <strong>[COLOCAR DIRECCIÓN AQUÍ]</strong>, trata los datos personales de sus usuarios y clientes, en cumplimiento con la Ley N° 29733, Ley de Protección de Datos Personales, y su Reglamento.
                        </p>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-teal-900 mb-4">
                            <FileText className="w-6 h-6 text-yellow-500" />
                            2. Datos Personales Recopilados
                        </h2>
                        <p className="mb-4">Para brindar nuestros servicios veterinarios, recopilamos los siguientes datos personales:</p>
                        <ul className="list-disc pl-6 space-y-2 marker:text-teal-600">
                            <li><strong>Datos de Identificación:</strong> Nombres, apellidos, DNI/CE, dirección, teléfono y correo electrónico.</li>
                            <li><strong>Datos de la Mascota:</strong> Nombre, edad, raza, historial clínico, vacunas y tratamientos previos.</li>
                            <li><strong>Datos Económicos:</strong> Información necesaria para procesar pagos y emitir comprobantes (facturación).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-teal-900 mb-4">
                            <Lock className="w-6 h-6 text-yellow-500" />
                            3. Finalidad del Tratamiento
                        </h2>
                        <p className="mb-4">Los datos personales serán utilizados estrictamente para:</p>
                        <ul className="list-disc pl-6 space-y-2 marker:text-teal-600">
                            <li>Gestión de citas médicas y reservas de servicios (baños, hospedaje, etc.).</li>
                            <li>Creación y mantenimiento de la Historia Clínica de las mascotas.</li>
                            <li>Envío de recordatorios de vacunas, desparasitación y citas programadas.</li>
                            <li>Comunicación sobre el estado de salud de la mascota (resultados de exámenes, evolución).</li>
                            <li>Emisión de comprobantes de pago electrónicos.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-teal-900 mb-4">
                            <ShieldCheck className="w-6 h-6 text-yellow-500" />
                            4. Seguridad y Confidencialidad
                        </h2>
                        <p className="leading-relaxed">
                            Nos comprometemos a proteger sus datos personales adoptando las medidas técnicas y organizativas necesarias para evitar su pérdida, mal uso, alteración, acceso no autorizado o robo. <strong>No vendemos ni compartimos sus datos con terceros para fines comerciales.</strong>
                        </p>
                    </section>

                    <section>
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-teal-900 mb-4">
                            <Mail className="w-6 h-6 text-yellow-500" />
                            5. Derechos ARCO
                        </h2>
                        <p className="leading-relaxed mb-4">
                            Como titular de sus datos personales, usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse (Derechos ARCO) al tratamiento de su información. Para ejercer estos derechos, puede enviar una solicitud a nuestro correo de contacto:
                        </p>
                        <div className="bg-stone-100 p-4 rounded-lg flex items-center justify-center gap-2 font-mono text-teal-800 font-bold border border-stone-200 hover:bg-teal-50 transition-colors cursor-pointer">
                            <Mail className="w-5 h-5" />
                            privacidad@patitas.com
                        </div>
                    </section>

                    <div className="border-t pt-8 text-sm text-stone-500 text-center">
                        <p>Última actualización: {new Date().toLocaleDateString('es-PE', { year: 'numeric', month: 'long' })}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
