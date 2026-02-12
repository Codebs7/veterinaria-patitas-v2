import nodemailer from 'nodemailer';

console.log("Email Config Check:", process.env.EMAIL_USER ? "User set" : "User MISSING", process.env.EMAIL_PASS ? "Pass set" : "Pass MISSING");

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const emailDefaults = {
    from: `"Patitas Veterinaria" <${process.env.EMAIL_USER}>`,
};

export async function sendConfirmationEmail(
    to: string,
    bookingDetails: {
        clientName: string;
        petName: string;
        serviceName: string;
        date: Date;
        orderId: string;
    }
) {
    const formattedDate = bookingDetails.date.toLocaleDateString('es-PE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedTime = bookingDetails.date.toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <style>
            body { font-family: 'Arial', sans-serif; background-color: #f3f4f6; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background-color: #10b981; color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; color: #374151; }
            .detail-row { display: flex; justify-content: space-between; border-bottom: 1px solid #e5e7eb; padding: 10px 0; }
            .detail-label { font-weight: bold; color: #6b7280; }
            .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; }
            .button { display: inline-block; background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="margin:0;">¡Reserva Confirmada! 🐾</h1>
            </div>
            <div class="content">
                <p>Hola <strong>${bookingDetails.clientName}</strong>,</p>
                <p>Tu cita para <strong>${bookingDetails.petName}</strong> ha sido confirmada exitosamente.</p>
                
                <div style="margin-top: 20px; margin-bottom: 20px;">
                    <div class="detail-row">
                        <span class="detail-label">Servicio:</span>
                        <span>${bookingDetails.serviceName}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Fecha:</span>
                        <span>${formattedDate}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Hora:</span>
                        <span>${formattedTime}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Código de Reserva:</span>
                        <span>#${bookingDetails.orderId}</span>
                    </div>
                </div>

                <p style="text-align: center;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reservas/confirmacion?status=approved" class="button">Ver Detalles</a>
                </p>
            </div>
            <div class="footer">
                <p>Clínica Veterinaria Patitas<br>Cuidando a quienes más quieres.</p>
            </div>
        </div>
    </body>
    </html>
    `;

    try {
        await transporter.sendMail({
            from: '"Patitas Veterinaria" <' + process.env.EMAIL_USER + '>',
            to,
            subject: `Confirmación de Reserva #${bookingDetails.orderId} - Patitas`,
            html: htmlContent,
        });
        console.log(`Email sent to ${to}`);
        return { success: true };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
}
