"use client";

import { useState, useEffect } from "react";
import { AlertCircle, X } from "lucide-react";

export default function EmergencyBanner() {
    const [show, setShow] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const checkTime = () => {
            const now = new Date();
            const day = now.getDay();
            const hour = now.getHours();
            const minute = now.getMinutes();

            const isWeekend = day === 0 || day === 6;

            const timeInMinutes = hour * 60 + minute;
            const openTime = 8 * 60 + 30; // 08:30
            const closeTime = 18 * 60;    // 18:00

            const isOutsideHours = timeInMinutes < openTime || timeInMinutes >= closeTime;

            if (isWeekend || isOutsideHours) {
                setShow(true);
            }
        };

        checkTime();
    }, []);

    if (!isClient || !show) return null;

    return (
        <div className="bg-red-900/90 text-white text-center py-2 px-4 text-sm font-medium z-[60] relative flex items-center justify-center backdrop-blur-sm animate-fade-up">
            <AlertCircle size={16} className="mr-2 text-red-200" />
            <span>
                ⚠️ We're currently closed. For emergencies call A&E Vets Cheadle: <strong>0161 486 2355</strong>
            </span>
            <button
                onClick={() => setShow(false)}
                className="absolute right-4 hover:bg-red-800 p-1 rounded transition-colors interactive"
                aria-label="Dismiss banner"
            >
                <X size={16} />
            </button>
        </div>
    );
}
