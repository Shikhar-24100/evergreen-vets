"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const openBooking = () => {
        window.dispatchEvent(new CustomEvent("open-booking-modal"));
    };

    return (
        <header className={`fixed top-0 w-full z-[50] transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}>
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

                {/* Logo Left */}
                <Link href="/" className="flex flex-col group disable-cursor-hover">
                    <div className="flex items-center gap-2">
                        <span className={`text-2xl font-display font-medium ${scrolled ? "text-forest" : "text-white"}`}>Evergreen Vets</span>
                    </div>
                    <span className={`text-[10px] tracking-widest font-mono uppercase ${scrolled ? "text-sage" : "text-mint/80"}`}>
                        Poynton, Cheshire
                    </span>
                </Link>

                {/* Center Links (Desktop) */}
                <nav className={`hidden lg:flex items-center gap-8 ${scrolled ? "text-charcoal" : "text-white/90"}`}>
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
                    className="lg:hidden text-2xl z-[60] interactive"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="text-forest" /> : <Menu className={scrolled ? "text-forest" : "text-white"} />}
                </button>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="fixed inset-0 bg-warm-white z-[55] flex flex-col items-center justify-center gap-8 p-6 lg:hidden animate-fade-up">
                        {["Home", "Services", "The Team", "Hydrotherapy", "Info Sheets", "Contact"].map((item) => {
                            const href = item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`;
                            return (
                                <Link
                                    key={item}
                                    href={href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-2xl font-display text-forest hover:text-gold transition-colors"
                                >
                                    {item}
                                </Link>
                            );
                        })}
                        <button
                            onClick={() => {
                                setMobileMenuOpen(false);
                                openBooking();
                            }}
                            className="mt-4 bg-gold text-forest px-8 py-4 rounded-full font-medium text-lg w-full shadow-lg"
                        >
                            Book Appointment
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
