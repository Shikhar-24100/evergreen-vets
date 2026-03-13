"use client";

import { AlertTriangle, Clock, Activity, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function OutOfHours() {
    return (
        <div className="pt-24 pb-0 bg-warm-white min-h-screen">

            {/* Urgent Dark Hero */}
            <section className="bg-charcoal py-20 px-6 relative text-center rounded-b-[3rem] mx-4 shadow-xl overflow-hidden border-b-4 border-red-500">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200%] bg-red-900/10 rounded-full blur-[100px]"></div>

                <AlertTriangle className="text-red-500 mx-auto mb-6 animate-pulse" size={48} />
                <h1 className="font-display text-4xl md:text-5xl text-white mb-6 relative z-10">
                    Out of Hours & <i className="text-red-400">Emergencies</i>
                </h1>
                <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed relative z-10 mb-8">
                    If your pet needs emergency care when Evergreen is closed, please call our partnered dedicated 24/7 hospital immediately.
                </p>

                <a
                    href="tel:01614862355"
                    className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-5 rounded-full font-display text-2xl shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:bg-red-500 hover:scale-105 transition-all w-fit mx-auto interactive"
                >
                    A&E Vets Cheadle — 0161 486 2355
                </a>
            </section>

            {/* Main Content Areas */}
            <section className="py-24">
                <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* In-Patient Care Area */}
                    <div className="animate-fade-up">
                        <h2 className="font-display text-3xl text-forest mb-8 flex items-center gap-3">
                            <Activity className="text-gold" size={28} />
                            In-Patient Care
                        </h2>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-sage/10 relative">
                            <p className="text-charcoal/80 leading-relaxed mb-6">
                                When your pet stays with us during the day for procedures or monitoring, they are cared for in our dedicated ward.
                                Our team provides constant, compassionate supervision ensuring they feel safe, warm, and comfortable.
                            </p>

                            <ul className="space-y-4 text-sage">
                                <li className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-cream shrink-0 flex items-center justify-center text-forest mt-1">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    <div>
                                        <strong className="text-forest block mb-1">Constant Monitoring</strong>
                                        Close observation by our qualified nursing team.
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-cream shrink-0 flex items-center justify-center text-forest mt-1">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    <div>
                                        <strong className="text-forest block mb-1">Overnight Stays</strong>
                                        For critical cases requiring overnight intensive care, we transfer patients safely to A&E Vets Cheadle, where a team is awake 24/7.
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Prescription Policy Area */}
                    <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
                        <h2 className="font-display text-3xl text-forest mb-8 flex items-center gap-3">
                            <FileText className="text-gold" size={28} />
                            Prescription Policy
                        </h2>

                        <div className="bg-forest rounded-3xl p-8 shadow-xl border border-moss relative overflow-hidden text-cream">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-mint/10 rounded-bl-full flex pointer-events-none"></div>

                            <div className="bg-red-900/80 border border-red-500/50 text-white rounded-xl p-4 mb-8 text-center font-medium">
                                <Clock className="mx-auto mb-2 opacity-80" size={20} />
                                We require strictly 48 hours notice for all repeat prescriptions.
                            </div>

                            <div className="space-y-6 text-sm relative z-10">
                                <div className="border-l-2 border-mint pl-4 pb-4 border-b border-white/5">
                                    <strong className="text-mint block mb-1 font-mono uppercase tracking-widest text-[10px]">Medication Reviews</strong>
                                    Pets on long-term medication must see a vet every 6 months (or every 3 months for unstable conditions) before further drugs can be dispensed.
                                </div>

                                <div className="border-l-2 border-mint pl-4 pb-4 border-b border-white/5">
                                    <strong className="text-mint block mb-1 font-mono uppercase tracking-widest text-[10px]">Flea & Wormer</strong>
                                    Must have been seen by a vet within the last 12 months. Save time with our <a href="https://evergreenvets.easydirectdebits.co.uk/signup/welcome" target="_blank" className="text-gold hover:underline">direct debit subscription</a>.
                                </div>

                                <div className="border-l-2 border-gold pl-4 pt-2">
                                    <strong className="text-gold block mb-2 font-mono uppercase tracking-widest text-[10px]">RCVS New Guidance (Sept 2024 update)</strong>
                                    <p className="opacity-90 leading-relaxed text-xs">
                                        By law, a physical examination by a vet is now required <b>every single time</b> antibiotics, antifungals, antivirals, or antiparasiticides (including ear/eye drops and flea/tick products) are prescribed.
                                    </p>
                                    <a href="https://www.rcvs.org.uk/setting-standards/advice-and-guidance/under-care-new-guidance/" target="_blank" className="text-gold hover:text-white transition-colors text-xs flex items-center gap-1 mt-3">Read full RCVS guidance <AlertTriangle size={12} /></a>
                                </div>
                            </div>

                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent("open-prescription-modal"))}
                                className="w-full bg-gold text-forest mt-8 py-4 rounded-xl font-medium hover:bg-white transition-colors interactive"
                            >
                                Request Repeat Prescription
                            </button>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
}
