import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
    return (
        <div className="fixed bottom-6 left-6 z-[40] group">
            <a
                href="https://wa.me/447723485061?text=Hi%20Evergreen%20Vets%2C%20I%27d%20like%20to%20enquire%20about..."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 hover:-translate-y-1 transition-all duration-300 relative interactive"
                aria-label="Chat on WhatsApp"
            >
                <MessageCircle size={28} />
            </a>
            {/* Tooltip */}
            <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-charcoal text-white text-xs whitespace-nowrap px-3 py-2 rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300 shadow-xl">
                Chat with us on WhatsApp
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-charcoal"></div>
            </div>
        </div>
    );
}
