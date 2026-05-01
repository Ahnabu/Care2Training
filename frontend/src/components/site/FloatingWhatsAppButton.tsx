import { FaWhatsapp } from "react-icons/fa";

const whatsappUrl = "https://wa.me/8801842497766";

export function FloatingWhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-[60] inline-flex items-center justify-center rounded-full border border-white/15 bg-[#25D366] p-3 shadow-[0_18px_45px_rgba(37,211,102,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(37,211,102,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-6 sm:right-6 sm:p-4 lg:p-5"
    >
      <FaWhatsapp className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 lg:h-8 lg:w-8" aria-hidden="true" />
    </a>
  );
}
