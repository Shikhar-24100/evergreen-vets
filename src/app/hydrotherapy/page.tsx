"use client";

import { Droplets, CheckCircle2, ArrowRight } from "lucide-react";

export default function Hydrotherapy() {
    return (
        <div className="pt-24 pb-0 bg-warm-white min-h-screen">

            {/* Short Dark Hero */}
            <section className="bg-forest py-20 px-6 relative text-center rounded-b-[3rem] mx-4 shadow-xl overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-mint/5 rounded-full blur-3xl"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMxYTNhMmEiPjwvcmVjdD48cGF0aCBkPSJNMCAwTDIgMloibW9kZT0iRGVsIiBzdHJva2U9IiMzZDczNTAiIGZpbGwtb3BhY2l0eT0iLjIiLz48L3N2Zz4=')] opacity-30 mix-blend-overlay"></div>
                <h1 className="font-display text-4xl md:text-5xl text-white mb-6 relative z-10 flex items-center justify-center gap-4">
                    <Droplets className="text-mint animate-bounce" size={40} />
                    Hydro<i className="text-mint">therapy</i>
                </h1>
                <p className="text-sage text-lg font-light max-w-2xl mx-auto leading-relaxed relative z-10">
                    Gentle, effective, weightless rehabilitation in our state-of-the-art water treadmill suite. Led by Aimee Williams.
                </p>
            </section>

            {/* Main Content */}
            <section className="py-24">
                <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div className="space-y-8 animate-fade-up">
                        <div>
                            <h2 className="font-display text-3xl text-forest mb-4">What is it and who is it for?</h2>
                            <p className="text-charcoal/80 leading-relaxed text-lg">
                                Hydrotherapy uses the buoyancy and resistance of water to provide a safe, low-impact environment for exercise. Our water treadmill allows for controlled movement that eases pressure on joints while slowly rebuilding muscle strength.
                            </p>
                        </div>

                        <div className="bg-cream rounded-2xl p-8 border border-sage/20 shadow-inner">
                            <h3 className="font-display text-xl text-forest mb-4 flex items-center gap-2">
                                <CheckCircle2 className="text-gold" />
                                Highly Recommended For:
                            </h3>
                            <ul className="space-y-4">
                                {["Post-operative recovery (Cruciate, Hip, Spinal)", "Mobility issues and arthritis management", "Weight management and cardiovascular fitness", "Neurological conditions"].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sage font-medium">
                                        <span className="w-1.5 h-1.5 rounded-full bg-mint mt-2 shrink-0"></span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
                        <div className="aspect-square bg-forest rounded-full overflow-hidden absolute top-0 -right-8 w-2/3 h-2/3 opacity-10 blur-2xl"></div>
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-sage/10 relative z-10 h-full flex flex-col justify-center">
                            <p className="text-xs font-mono uppercase tracking-widest text-mint mb-4">The Treatment</p>
                            <h3 className="font-display text-2xl text-forest mb-4">The Water Treadmill</h3>
                            <p className="text-charcoal/80 leading-relaxed mb-8">
                                Unlike a swimming pool, the treadmill gives your dog a stable footing. We control the water level, speed, and temperature precisely. The warm water soothes aching joints, reduces swelling, and encourages a natural gait pattern that might be too painful on dry land.
                            </p>

                            <div className="bg-moss/10 rounded-xl p-6 mb-8 text-forest">
                                <p className="font-medium flex items-center gap-2 mb-2">
                                    <span className="w-2 h-2 rounded-full bg-moss animate-pulse-slow"></span>
                                    Booking a Session
                                </p>
                                <p className="text-sm text-sage">
                                    Initial assessments are required to tailor the perfect hydrotherapy plan for your pet. Sessions run typically 30 minutes.
                                </p>
                            </div>

                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent("open-booking-modal"))}
                                className="w-full bg-forest text-gold py-4 rounded-xl font-medium hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2 interactive group"
                            >
                                Book a Hydrotherapy Session
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
}
