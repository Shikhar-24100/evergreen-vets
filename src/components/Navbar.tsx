"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [mobileMenuOpen]);

    const openBooking = () => {
        window.dispatchEvent(new CustomEvent("open-booking-modal"));
    };

    return (
        <header className={`fixed top-0 w-full z-[1000] transition-all duration-300 bg-forest shadow-md ${scrolled ? "py-4" : "py-6"}`}>
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

                {/* Logo Left */}
                <Link href="/" className="flex flex-col group disable-cursor-hover">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-display font-medium text-white">Evergreen Vets</span>
                    </div>
                    <span className="text-[10px] tracking-widest font-mono uppercase text-mint/80">
                        Poynton, Cheshire
                    </span>
                </Link>

                {/* Center Links (Desktop) */}
                <nav className="hidden lg:flex items-center gap-8 text-white/90">
                    {["Home", "Services", "The Team", "Hydrotherapy", "Info Sheets", "Contact"].map((item) => {
                        const href = item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`;
                        return (
                            <Link
                                key={item}
                                href={href}
                                className={`text-sm hover:text-gold transition-colors font-medium ${pathname === href ? "text-gold" : ""}`}
                            >
                                {item}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right CTA */}
                <div className="hidden lg:block">
                    <button
                        onClick={openBooking}
                        className="bg-gold text-forest px-6 py-2.5 rounded-full font-medium text-sm hover:-translate-y-1 hover:shadow-lg transition-all relative overflow-hidden group interactive"
                    >
                        <span className="relative z-10">Book Appointment</span>
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:animate-shimmer" />
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden text-2xl z-[1000] interactive"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <Menu className="text-white" />
                </button>

                {/* React Portal for Mobile Drawer */}
                {isMounted && typeof document !== "undefined" && createPortal(
                    <div className="lg:hidden">
                        {/* Mobile Drawer Overlay */}
                        <div
                            className={`fixed inset-0 bg-black/60 z-[9998] transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Mobile Drawer */}
                        <div
                            className={`fixed top-0 right-0 h-[100vh] w-[75vw] bg-[#1a3a2a] z-[9999] shadow-2xl transition-transform duration-300 ease-out flex flex-col pt-20 px-6 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
                        >
                            <button
                                className="absolute top-6 right-6 text-white text-2xl p-2 interactive"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <X size={28} />
                            </button>

                            <nav className="flex flex-col mt-8">
                                {["Home", "Services", "The Team", "Hydrotherapy", "Info Sheets", "Contact"].map((item) => {
                                    const href = item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`;
                                    return (
                                        <Link
                                            key={item}
                                            href={href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="text-[18px] font-display text-white hover:text-gold transition-colors block py-[20px]"
                                        >
                                            {item}
                                        </Link>
                                    );
                                })}
                            </nav>

                            <div className="mt-8">
                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        openBooking();
                                    }}
                                    className="bg-gold text-forest px-8 py-4 rounded-full font-medium text-[18px] w-full shadow-lg interactive"
                                >
                                    Book Appointment
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
            </div>
        </header>
    );
}
