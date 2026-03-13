"use client";

import Image from "next/image";
import { ArrowRight, Info } from "lucide-react";

const team = [
    {
        name: "Charlie Westbrook-Platts",
        qualifications: "BVM&S MRCVS",
        role: "Clinical Director",
        bio: "Charlie graduated from Edinburgh and has a passion for building lasting relationships with clients and their pets.",
        img: "/team/team-image/charlie-westbrook.jpg"
    },
    {
        name: "Elaine Griffiths",
        qualifications: "BVSc MRCVS",
        role: "Veterinary Surgeon",
        bio: "Elaine brings decades of experience to the practice with a special interest in feline medicine.",
        img: "/team/team-image/elaine-griffiths.jpg"
    },
    {
        name: "Emma Tebay",
        qualifications: "BVSc BSc MRCVS",
        role: "Veterinary Surgeon",
        bio: "Emma loves all aspects of general practice, especially soft tissue surgery and internal medicine.",
        img: "/team/team-image/emma-tebay.jpg"
    },
    {
        name: "Emma Judson",
        qualifications: "RVN",
        role: "Head Nurse",
        bio: "Emma ensures the smooth running of the clinical floor, bringing compassion and high standards to patient care.",
        img: "/team/team-image/emma-judson-2.jpg"
    },
    {
        name: "Caroline Lomax",
        qualifications: "RVN",
        role: "Practice Manager",
        bio: "Caroline keeps the practice running efficiently while ensuring every client receives a warm welcome.",
        img: "/team/team-image/caroline-lomax.jpg"
    },
    {
        name: "Lisa Foley",
        qualifications: "RVN",
        role: "Consult Nurse & Client Care",
        bio: "Lisa brings a wealth of nursing experience and a reassuring presence to all our nurse clinics.",
        img: "/team/team-image/lisa-foley.jpg"
    },
    {
        name: "Sarah Critchlow",
        qualifications: "RVN",
        role: "Nurse",
        bio: "Sarah is passionate about inpatient care and ensuring every pet feels comfortable during their stay.",
        img: "/team/team-image/sarah-critchlow.jpg"
    },
    {
        name: "Victoria Andrews",
        qualifications: "RVN",
        role: "Nurse",
        bio: "Victoria is a dedicated veterinary nurse providing excellent care.",
        img: "/team/team-image/victoria-andrews.jpg"
    },
    {
        name: "Aimee Williams",
        qualifications: "",
        role: "Receptionist & Hydrotherapist",
        bio: "Aimee splits her time between welcoming clients and running our dedicated hydrotherapy suite.",
        img: "/team/team-image/aimee-williams.jpg"
    }
];

export default function Team() {
    return (
        <div className="pt-24 pb-0 bg-warm-white min-h-screen">

            {/* Short Dark Hero */}
            <section className="bg-forest py-20 px-6 relative text-center rounded-b-[3rem] mx-4 shadow-xl overflow-hidden">
                <div className="absolute top-[-50%] left-[-10%] w-[60%] h-[150%] bg-mint/5 rounded-full blur-3xl transform rotate-12"></div>
                <h1 className="font-display text-4xl md:text-5xl text-white mb-6 relative z-10">
                    Our <i className="text-mint">Team</i>
                </h1>
                <p className="text-sage text-lg font-light max-w-2xl mx-auto leading-relaxed relative z-10">
                    All members of the Evergreen team are dedicated to treating every pet as if it were our own.
                </p>
            </section>

            {/* Grid */}
            <section className="py-24">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                        {team.map((member, i) => (
                            <div key={i} className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md relative interactive aspect-[3/4]">
                                <div className="absolute inset-0 bg-sage/10 group-hover:scale-105 transition-transform duration-700">
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="w-full h-full object-cover opacity-90"
                                        onError={(e) => { e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="%23fdfaf5"><rect width="100%" height="100%"/></svg>' }}
                                    />
                                </div>

                                {/* Hover Overlay - warm green slides up */}
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-moss via-moss/95 to-moss/80 pt-16 pb-6 px-6 translate-y-[45%] lg:translate-y-[60%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                                    <h3 className="font-display text-2xl text-white mb-1">{member.name}</h3>
                                    <div className="flex gap-2 text-xs font-mono uppercase tracking-wider text-mint mb-4">
                                        <span>{member.role}</span>
                                        {member.qualifications && <span className="text-gold">| {member.qualifications}</span>}
                                    </div>

                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                                        <div className="w-8 h-px bg-mint/30 mb-4"></div>
                                        <p className="text-sm text-cream/90 leading-relaxed">
                                            {member.bio}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Specialist Callout Card */}
                        <div className="lg:col-span-4 mt-8">
                            <div className="bg-forest rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-2xl border border-moss">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-mint/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

                                <div className="w-20 h-20 shrink-0 bg-moss rounded-full flex items-center justify-center text-mint z-10">
                                    <Info size={32} />
                                </div>

                                <div className="flex-1 z-10 text-center md:text-left">
                                    <p className="text-xs font-mono uppercase tracking-widest text-gold mb-2">Visiting Specialist</p>
                                    <h3 className="font-display text-3xl text-white mb-2">Joseph Binfield <span className="text-lg text-sage font-sans ml-2">BVetMed BSAVA PGCertSAS MRCVS</span></h3>
                                    <p className="text-mint/80 mb-4">Double certificate holder in orthopaedics and soft tissue surgery.</p>
                                    <p className="text-cream text-sm leading-relaxed max-w-2xl">
                                        Available as a visiting vet — so your pet doesn't need to travel to an unfamiliar referral centre for complex procedures.
                                    </p>
                                </div>

                                <div className="z-10 shrink-0">
                                    <button
                                        onClick={() => window.dispatchEvent(new CustomEvent("open-booking-modal"))}
                                        className="bg-gold text-forest px-8 py-3 rounded-full font-medium hover:bg-white transition-colors flex items-center gap-2 interactive"
                                    >
                                        Enquire <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
}
