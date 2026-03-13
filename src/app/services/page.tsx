"use client";

import Link from "next/link";
import { ArrowRight, Stethoscope, ArrowUpRight } from "lucide-react";

const services = [
    { name: "Animal Health Certificates", desc: "For travel abroad." },
    { name: "Consultations", desc: "Thorough physical exams and treatment plans." },
    { name: "Dental Care", desc: "Cleaning, extractions, and oral health checks." },
    { name: "Diagnostics", desc: "In-house bloods, ultrasound, and digital x-ray." },
    { name: "End of Life Care", desc: "Compassionate, peaceful goodbyes." },
    { name: "Emergency Care Access", desc: "Rapid triage and referral paths." },
    { name: "Hydrotherapy", desc: "Water treadmill for mobility and recovery.", important: true },
    { name: "Microchipping", desc: "Quick and essential identification." },
    { name: "Neutering", desc: "Castration and spaying procedures." },
    { name: "Nursing Clinics", desc: "Weight, dental, and general advice." },
    { name: "Surgical Procedures", desc: "Routine soft tissue and orthopaedic." },
    { name: "Parasite Control", desc: "Flea, worm, and tick prevention." },
    { name: "Pet Health Clinics", desc: "Routine wellness checkups." },
    { name: "Physiotherapy", desc: "Post-op and arthritis management." },
    { name: "Puppy Parties", desc: "Socialisation and early learning." },
    { name: "Vaccinations", desc: "Annual boosters and primary courses." }
];

export default function Services() {
    return (
        <div className="pt-24 pb-0 bg-warm-white">
            {/* Short Dark Hero */}
            <section className="bg-forest py-20 px-6 relative overflow-hidden text-center rounded-b-[3rem] mx-4 shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-mint/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-moss/20 rounded-full blur-3xl"></div>

                <h1 className="font-display text-4xl md:text-5xl text-white mb-6 relative z-10">
                    Our <i className="text-mint">Services</i>
                </h1>
                <p className="text-sage text-lg font-light max-w-2xl mx-auto leading-relaxed relative z-10">
                    We pride ourselves on offering a comprehensive range of veterinary services under one roof. Our modern diagnostic and surgical facilities allow us to provide exceptional care for your pet.
                </p>
            </section>

            {/* Grid */}
            <section className="py-24">
                <div className="container mx-auto px-6 md:px-12">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
                        {services.map((service) => (
                            <div
                                key={service.name}
                                className={`p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default group ${service.important
                                        ? "bg-forest border-moss text-white shadow-lg"
                                        : "bg-white border-sage/10 hover:border-moss/30"
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${service.important ? "bg-moss text-mint" : "bg-cream text-forest"}`}>
                                        <Stethoscope size={20} />
                                    </div>
                                    {service.important && (
                                        <span className="text-[10px] font-mono text-gold uppercase tracking-wider bg-gold/10 px-2 py-1 rounded">Specialist</span>
                                    )}
                                </div>
                                <h3 className={`font-display text-xl mb-2 ${service.important ? "text-mint" : "text-forest"}`}>
                                    {service.name}
                                </h3>
                                <p className={`text-sm leading-relaxed ${service.important ? "text-sage" : "text-charcoal/70"}`}>
                                    {service.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* Callout Banner */}
            <section className="bg-cream py-16 px-6 relative overflow-hidden border-t-4 border-gold">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 z-10 relative">
                    <div>
                        <h3 className="font-display text-3xl text-forest mb-2">Flea & Wormer Delivered</h3>
                        <p className="text-sage">Never forget a dose again. Join our monthly direct debit scheme.</p>
                    </div>
                    <a
                        href="https://evergreenvets.easydirectdebits.co.uk/signup/welcome"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-forest text-gold px-8 py-4 rounded-full font-medium shadow-md hover:bg-forest/90 transition-colors shrink-0 interactive"
                    >
                        Sign up from £9.99/mo <ArrowUpRight size={18} />
                    </a>
                </div>
            </section>
        </div>
    );
}
