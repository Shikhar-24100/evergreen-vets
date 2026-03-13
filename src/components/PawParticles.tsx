"use client";

import { useEffect, useState } from "react";
import { PawPrint } from "lucide-react";

export default function PawParticles() {
    const [particles, setParticles] = useState<{ id: number; left: number; delay: number; duration: number; size: number }[]>([]);

    useEffect(() => {
        const arr = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 15,
            duration: Math.random() * 20 + 20,
            size: Math.random() * 24 + 16
        }));
        setParticles(arr);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute text-white/[0.04]"
                    style={{
                        left: `${p.left}%`,
                        bottom: "-10%",
                        animation: `float-up ${p.duration}s linear infinite`,
                        animationDelay: `${p.delay}s`,
                    }}
                >
                    <PawPrint size={p.size} className="transform -rotate-12" />
                </div>
            ))}
            <style jsx>{`
        @keyframes float-up {
          0% { transform: translateY(0) rotate(-12deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-120vh) rotate(12deg); opacity: 0; }
        }
      `}</style>
        </div>
    );
}
