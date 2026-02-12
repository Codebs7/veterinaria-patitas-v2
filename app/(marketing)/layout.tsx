
import { Navbar } from "@/components/layout/Navbar";
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp";
import { SmoothScroll } from "@/components/ui/smooth-scroll";

export default function MarketingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <FloatingWhatsApp />
            <SmoothScroll>{children}</SmoothScroll>
        </>
    );
}
