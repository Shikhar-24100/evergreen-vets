"use client";

import { useEffect, useState } from "react";
import { PawPrint } from "lucide-react";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 1024) {
            setIsHidden(true);
            return;
        }

        const unhover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.closest("button") ||
                target.closest("a") ||
                target.closest(".interactive") ||
                target.tagName.toLowerCase() === 'button' ||
                target.tagName.toLowerCase() === 'a'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            unhover(e);
        };

        const handleMouseLeave = () => setIsHidden(true);
        const handleMouseEnter = () => setIsHidden(false);

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, []);

    if (isHidden) return null;

    return (
        <>
            <div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-mint pointer-events-none z-[100] transition-transform duration-200 ease-out hidden lg:flex items-center justify-center mix-blend-difference"
                style={{
                    transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${isHovering ? 1.5 : 1})`,
                }}
            >
                {isHovering ? (
                    <PawPrint size={14} className="text-mint opacity-80" />
                ) : null}
            </div>

            <div
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-mint pointer-events-none z-[100] transition-transform duration-75 ease-out hidden lg:block mix-blend-difference"
                style={{
                    transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
                    opacity: isHovering ? 0 : 1
                }}
            />
        </>
    );
}
