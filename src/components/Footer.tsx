"use client";

import Link from "next/link";
import { Facebook, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-forest text-cream py-16">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-sage/30 pb-12 mb-8">

                    <div className="space-y-4 md:col-span-1">
                        <h3 className="font-display text-2xl text-gold">Evergreen Vets</h3>
                        <p className="text-sm text-mint/80 font-light leading-relaxed">
                            Exceptional care for every pet. A small, independent practice treating your pets like our own.
                        </p>
                        <div className="pt-4 flex items-center gap-4">
                            <a href="https://www.facebook.com/evergreenvets63" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors interactive">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 text-sm">
                        <h4 className="font-mono text-xs tracking-wider text-sage mb-2 uppercase">Core Services</h4>
                        <Link href="/services" className="hover:text-gold transition-colors interactive">All Services</Link>
                        <Link href="/hydrotherapy" className="hover:text-gold transition-colors interactive">Hydrotherapy</Link>
                        <Link href="/services" className="hover:text-gold transition-colors interactive">Vaccinations</Link>
                        <Link href="/services" className="hover:text-gold transition-colors interactive">Dental Care</Link>
                    </div>

                    <div className="flex flex-col gap-3 text-sm">
                        <h4 className="font-mono text-xs tracking-wider text-sage mb-2 uppercase">Practice</h4>
                        <Link href="/team" className="hover:text-gold transition-colors interactive">The Team</Link>
                        <Link href="/out-of-hours" className="hover:text-gold transition-colors interactive">Emergency Info</Link>
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent("open-prescription-modal"))}
                            className="text-left w-fit hover:text-gold transition-colors interactive"
                        >
                            Repeat Prescriptions
                        </button>
                        <Link href="/info-sheets" className="hover:text-gold transition-colors interactive">Info Sheets</Link>
                    </div>

                    <div className="flex flex-col gap-4 text-sm font-light">
                        <h4 className="font-mono text-xs tracking-wider text-sage mb-1 uppercase">Contact & Location</h4>
                        <div className="flex items-start gap-3">
                            <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                            <span>63 London Road South,<br />Poynton SK12 1LA</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone size={16} className="text-gold shrink-0" />
                            <span>01625 859019</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail size={16} className="text-gold shrink-0" />
                            <span>enquiries.evergreenvets@gmail.com</span>
                        </div>

                        <div className="mt-4 inline-flex items-center gap-2 border border-sage/40 rounded px-3 py-2 bg-moss/20">
                            <span className="w-2 h-2 rounded-full bg-mint animate-pulse-slow"></span>
                            <span className="text-xs font-mono uppercase text-mint">RCVS Accredited</span>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-xs text-sage space-y-4 md:space-y-0">
                    <p>© 2025 Evergreen Vets · All rights reserved</p>
                    <div className="flex space-x-6">
                        <Link href="#" className="hover:text-white transition-colors interactive">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors interactive">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
