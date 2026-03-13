"use client";

import { FileText, Download } from "lucide-react";

const sheets = [
    { title: "Lungworm Information", desc: "How to spot the symptoms and prevent infection in dogs." },
    { title: "Vaccination Schedules", desc: "A lifelong timeline of required vaccines for cats and dogs." },
    { title: "Dental Care Guide", desc: "Tips for brushing, diet, and spotting dental disease early." },
    { title: "Nutrition Essentials", desc: "Choosing the right diet for your pet's life stage." },
    { title: "Weight Management", desc: "How to assess body condition score and safely reduce weight." },
    { title: "Senior Pet Care", desc: "Adjusting care for older pets — arthritis, vision, and diet." }
];

export default function InfoSheets() {
    return (
        <div className="pt-24 pb-0 bg-warm-white min-h-screen">

            {/* Short Dark Hero */}
            <section className="bg-forest py-20 px-6 relative text-center rounded-b-[3rem] mx-4 shadow-xl overflow-hidden">
                <h1 className="font-display text-4xl md:text-5xl text-white mb-6 relative z-10">
                    Info <i className="text-mint">Sheets</i>
                </h1>
                <p className="text-sage text-lg font-light max-w-2xl mx-auto leading-relaxed relative z-10">
                    Downloadable resources and guides prepared by our veterinary team to help you care for your pet at home.
                </p>
            </section>

            {/* Grid */}
            <section className="py-24">
                <div className="container mx-auto px-6 md:px-12">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sheets.map((sheet, i) => (
                            <div
                                key={i}
                                className="bg-white p-6 rounded-2xl border border-sage/10 hover:border-moss/30 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col interactive cursor-pointer"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 bg-cream text-forest rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <FileText size={24} />
                                    </div>
                                    <button className="text-sage hover:text-forest transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-cream/50 group-hover:bg-mint/20">
                                        <Download size={16} />
                                    </button>
                                </div>

                                <h3 className="font-display text-xl text-forest mb-2 group-hover:text-moss transition-colors">
                                    {sheet.title}
                                </h3>
                                <p className="text-sm text-sage leading-relaxed flex-1">
                                    {sheet.desc}
                                </p>

                                <div className="mt-6 pt-4 border-t border-sage/10">
                                    <p className="text-[10px] font-mono uppercase tracking-widest text-mint">PDF Document</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center max-w-xl mx-auto bg-cream p-8 rounded-2xl border border-sage/20">
                        <h4 className="font-medium text-forest mb-2">Need advice not listed here?</h4>
                        <p className="text-sm text-sage mb-6">
                            Our nurses run complimentary advice clinics for general pet care questions. Send us a message on WhatsApp or book a slot.
                        </p>
                        <a
                            href="https://wa.me/447723485061"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center bg-forest text-gold px-6 py-3 rounded-full font-medium hover:-translate-y-1 hover:shadow-lg transition-all text-sm interactive"
                        >
                            Message on WhatsApp
                        </a>
                    </div>

                </div>
            </section>

        </div>
    );
}
