"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, CheckCircle, Clock, Heart, Award, Shield, MessageSquare, Phone, Stethoscope, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PawParticles from "@/components/PawParticles";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Hero Animations
    const tl = gsap.timeline();

    tl.to(".hero-badge", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 })
      .to(".hero-title", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .to(".hero-ctas", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .to(".hero-card", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");

    // Scroll Animations
    const sections = gsap.utils.toArray(".gsap-section");
    sections.forEach((sec: any) => {
      const headline = sec.querySelector(".gsap-headline");
      if (headline) {
        gsap.fromTo(headline,
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sec, start: "top 80%" } }
        );
      }

      const cards = sec.querySelectorAll(".gsap-card");
      if (cards.length > 0) {
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: sec, start: "top 75%" } }
        );
      }
    });

  }, []);

  const openBooking = (e: any) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("open-booking-modal"));
  };

  return (
    <div className="overflow-hidden" ref={scrollContainerRef}>

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen bg-forest flex items-center pt-24 pb-16 overflow-hidden">
        {/* Animated Background Layers */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-mint/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gold/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "-4s" }}></div>

        {/* Subtle large watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[20vw] opacity-[0.02] text-white whitespace-nowrap pointer-events-none select-none">
          CARE
        </div>

        <PawParticles />

        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

          <div className="text-cream">
            <div className="hero-badge opacity-0 translate-y-4 inline-flex items-center gap-2 bg-moss/50 border border-sage/30 px-3 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse-slow"></span>
              RCVS Accredited Practice
            </div>

            <h1 className="hero-title opacity-0 translate-y-4 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6">
              Exceptional <i className="text-mint block md:inline font-light">Care</i><br />for Every Pet
            </h1>

            <p className="hero-subtitle opacity-0 translate-y-4 text-sage text-lg md:text-xl font-light max-w-lg mb-10 leading-relaxed">
              A small, friendly, independent practice in Poynton — treating every pet as if it were our own.
            </p>

            <div className="hero-ctas opacity-0 translate-y-4 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <button onClick={openBooking} className="bg-gold text-forest px-8 py-4 rounded-full font-medium shadow-[0_0_30px_rgba(200,169,110,0.3)] hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(200,169,110,0.5)] transition-all custom-focus relative overflow-hidden group interactive">
                <span className="relative z-10 flex items-center gap-2">Book Appointment <ArrowRight size={18} /></span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:animate-shimmer" />
              </button>
              <Link href="/team" className="text-mint hover:text-white transition-colors flex items-center gap-2 font-medium interactive">
                Meet the Team <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="hero-card opacity-0 translate-y-8 lg:p-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Box 1: Hours */}
              <div className="bg-cream text-forest p-6 flex flex-col justify-center items-start rounded-2xl border border-sage/20 shadow-md">
                <Clock className="text-moss mb-3" size={28} />
                <h3 className="font-display text-xl mb-1">Hours</h3>
                <p className="text-sm text-sage leading-tight">Mon–Fri<br />8:30am – 6:00pm</p>
              </div>

              {/* Box 2: Emergency */}
              <div onClick={() => window.open("tel:01614862355")} className="bg-moss text-cream p-6 flex flex-col justify-center items-start rounded-2xl border border-moss/50 shadow-md hover:bg-forest transition-colors cursor-pointer interactive group">
                <Heart className="text-mint mb-3 group-hover:scale-110 transition-transform" size={28} />
                <h3 className="font-display text-xl mb-1">Emergency</h3>
                <p className="text-sm text-mint/80 group-hover:text-mint leading-tight">24/7 Care<br />0161 486 2355</p>
              </div>

              {/* Box 3: Prescriptions */}
              <div onClick={openBooking} className="bg-moss text-cream p-6 flex flex-col justify-center items-start rounded-2xl border border-moss/50 shadow-md hover:bg-forest transition-colors cursor-pointer interactive group">
                <Stethoscope className="text-mint mb-3 group-hover:scale-110 transition-transform" size={28} />
                <h3 className="font-display text-xl mb-1">Book</h3>
                <p className="text-sm text-mint/80 group-hover:text-mint leading-tight">Schedule an<br />appointment</p>
              </div>

              {/* Box 4: Repeat */}
              <div onClick={() => window.dispatchEvent(new CustomEvent("open-prescription-modal"))} className="bg-white text-forest p-6 flex flex-col justify-center rounded-2xl border border-sage/20 shadow-md hover:-translate-y-1 transition-transform cursor-pointer interactive">
                <p className="text-xs font-mono text-sage uppercase tracking-wider mb-2">Repeat</p>
                <h3 className="font-display text-xl mb-1 text-forest">Meds</h3>
                <p className="text-sm text-sage">Order flea & wormer</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. STATS STRIP */}
      <section className="bg-cream py-12 border-b border-sage/10 relative z-20">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-sage/20">
          <div className="flex flex-col gap-2">
            <span className="font-display text-4xl text-forest font-medium">20+</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-sage">Years Experience</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-display text-4xl text-forest font-medium">3</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-sage">Vets On Staff</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-display text-4xl text-forest font-medium">RCVS</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-sage">Accredited</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-display text-2xl text-forest font-medium mt-1">Poynton</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-sage">Cheshire</span>
          </div>
        </div>
      </section>

      {/* 3. SERVICES PREVIEW */}
      <section className="bg-warm-white py-24 gsap-section relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[20vw] opacity-[0.02] text-forest whitespace-nowrap pointer-events-none select-none">
          SERVICES
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-16">
            <h4 className="font-mono text-xs uppercase tracking-widest text-mint mb-2">What We Offer</h4>
            <h2 className="gsap-headline font-display text-4xl md:text-5xl text-forest max-w-2xl leading-tight">
              Comprehensive <i className="text-mint">Care</i> for Your Pet
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Service Card 1 */}
            <div className="gsap-card bg-white p-8 rounded-2xl shadow-sm border border-sage/10 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group cursor-pointer interactive">
              <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-forest mb-6 group-hover:scale-110 transition-transform">
                <Heart size={24} />
              </div>
              <h3 className="font-display text-xl text-forest mb-3">Consultations</h3>
              <p className="text-sm text-sage leading-relaxed mb-6">Thorough physical examinations, health checks, and treatment plans tailored to your pet's needs.</p>
              <span className="text-xs font-medium text-gold flex items-center gap-1 group-hover:gap-2 transition-all">Learn more <ArrowRight size={14} /></span>
            </div>

            {/* Service Card 2 */}
            <div className="gsap-card bg-white p-8 rounded-2xl shadow-sm border border-sage/10 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group cursor-pointer interactive">
              <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-forest mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle size={24} />
              </div>
              <h3 className="font-display text-xl text-forest mb-3">Vaccinations</h3>
              <p className="text-sm text-sage leading-relaxed mb-6">Essential protection against dangerous diseases, with ongoing health assessments.</p>
              <span className="text-xs font-medium text-gold flex items-center gap-1 group-hover:gap-2 transition-all">Learn more <ArrowRight size={14} /></span>
            </div>

            {/* Service Card 3 - Featured */}
            <div className="gsap-card bg-forest text-white p-8 rounded-2xl shadow-lg border border-moss hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group overflow-hidden relative cursor-pointer interactive">
              <div className="absolute top-0 right-0 w-32 h-32 bg-mint/10 rounded-bl-full flex pointer-events-none"></div>
              <div className="w-12 h-12 rounded-full bg-moss flex items-center justify-center text-mint mb-6 group-hover:rotate-12 transition-transform relative z-10">
                <Award size={24} />
              </div>
              <h3 className="font-display text-xl text-mint mb-3 relative z-10">Hydrotherapy</h3>
              <p className="text-sm text-sage leading-relaxed mb-6 relative z-10">Dedicated on-site water treadmill treatments for post-op recovery, mobility and weight management.</p>
              <span className="text-xs font-medium text-gold flex items-center gap-1 group-hover:gap-2 transition-all relative z-10">Explore hydrotherapy <ArrowRight size={14} /></span>
            </div>
          </div>

          <div className="text-center">
            <Link href="/services" className="inline-flex items-center gap-2 text-forest font-medium hover:text-gold transition-colors interactive">
              View all 16 services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY EVERGREEN */}
      <section className="bg-forest py-24 gsap-section text-white relative">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="gsap-card border-l py-2 border-mint/20 pl-6">
              <Shield className="text-mint mb-4" size={32} />
              <h3 className="font-display text-2xl mb-2">Independent</h3>
              <p className="text-sage text-sm leading-relaxed">We are proudly independent. Decisions are made entirely by the local team, focused purely on your pet's best interests.</p>
            </div>
            <div className="gsap-card border-l py-2 border-mint/20 pl-6">
              <Award className="text-mint mb-4" size={32} />
              <h3 className="font-display text-2xl mb-2">RCVS Accredited</h3>
              <p className="text-sage text-sm leading-relaxed">Recognised by the Royal College of Veterinary Surgeons Practice Standards Scheme, ensuring the highest standards of care.</p>
            </div>
            <div className="gsap-card border-l py-2 border-mint/20 pl-6">
              <Stethoscope className="text-mint mb-4" size={32} />
              <h3 className="font-display text-2xl mb-2">Specialist Referrals</h3>
              <p className="text-sage text-sm leading-relaxed">Visiting orthopaedic surgeon Joseph Binfield BVetMed is available on-site, saving your pet stressful travel to referral centres.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TEAM PREVIEW */}
      <section className="bg-cream py-24 gsap-section relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[20vw] opacity-[0.03] text-charcoal whitespace-nowrap pointer-events-none select-none">
          TRUST
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-mint mb-2">Our People</h4>
              <h2 className="gsap-headline font-display text-4xl md:text-5xl text-forest max-w-2xl leading-tight">
                Meet the <i className="text-mint">Team</i>
              </h2>
            </div>
            <Link href="/the-team" className="inline-flex items-center gap-2 bg-white text-forest px-6 py-3 rounded-full text-sm font-medium border border-sage/20 hover:border-gold hover:text-gold transition-colors interactive">
              Meet the Full Team <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Team placeholders - later real photos */}
            {[
              { name: "Charlie Westbrook-Platts", role: "Clinical Director", img: "/team/team-image/charlie-westbrook.jpg" },
              { name: "Elaine Griffiths", role: "Veterinary Surgeon", img: "/team/team-image/elaine-griffiths.jpg" },
              { name: "Caroline Lomax", role: "Practice Manager", img: "/team/team-image/caroline-lomax.jpg" },
              { name: "Aimee Williams", role: "Hydrotherapist", img: "/team/team-image/aimee-williams.jpg" }
            ].map((member, i) => (
              <div key={i} className="gsap-card group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm relative interactive aspect-[3/4]">
                <div className="absolute inset-0 bg-sage/10 group-hover:scale-105 transition-transform duration-700">
                  {/* We use an img tag to handle missing local files better for the demo */}
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover opacity-80" onError={(e) => { e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="%23e2e8f0"><rect width="100%" height="100%"/></svg>' }} />
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/80 to-transparent translate-y-[20%] group-hover:translate-y-0 transition-transform duration-300 flex flex-col justify-end p-6">
                  <h3 className="font-display text-xl text-white mb-1">{member.name}</h3>
                  <p className="text-xs font-mono text-gold tracking-wider uppercase">{member.role}</p>
                  <p className="text-sm text-sage mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-2">
                    Dedicated to providing exceptional care for your pets with years of invaluable experience.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS CAROUSEL */}
      <section className="bg-warm-white py-24 gsap-section overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 mb-16 text-center">
          <h4 className="font-mono text-xs uppercase tracking-widest text-mint mb-2">Reviews</h4>
          <h2 className="gsap-headline font-display text-4xl text-forest">What Pet Owners Say</h2>
        </div>

        {/* CSS-only marquee/carousel container */}
        <div className="flex w-max animate-shimmer hover:[animation-play-state:paused] gap-6 px-6">
          {[
            { quote: "Absolutely wonderful team. They treated Bella like their own.", author: "Sarah M.", pet: "Labrador owner" },
            { quote: "Charlie is incredible. So calm and reassuring, even in an emergency.", author: "James T.", pet: "Cat owner" },
            { quote: "Been coming here for 6 years. Would never go anywhere else.", author: "Priya K.", pet: "Spaniel owner" },
            { quote: "The hydrotherapy has transformed our dog's mobility after his surgery.", author: "Rachel B.", pet: "Golden Retriever owner" },
            { quote: "Friendly, professional, and genuinely caring. Highly recommend to anyone in Poynton.", author: "David L.", pet: "Mixed breed owner" },
            // Repeat for seamless loop
            { quote: "Absolutely wonderful team. They treated Bella like their own.", author: "Sarah M.", pet: "Labrador owner" },
            { quote: "Charlie is incredible. So calm and reassuring, even in an emergency.", author: "James T.", pet: "Cat owner" },
          ].map((r, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-sage/10 w-[350px] shrink-0 interactive">
              <div className="flex gap-1 mb-4 text-gold">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
              </div>
              <p className="text-forest text-lg font-display italic mb-6">"{r.quote}"</p>
              <div>
                <p className="font-medium text-charcoal text-sm">{r.author}</p>
                <p className="text-xs text-sage">{r.pet}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. LOCATION & MAP */}
      <section className="bg-cream py-24 gsap-section border-t border-sage/10">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div className="gsap-headline">
            <h2 className="font-display text-4xl text-forest mb-8">Visit Us</h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex justify-center items-center text-forest border border-sage/20 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-forest mb-1">Address</h4>
                  <p className="text-sm text-sage leading-relaxed">
                    63 London Road South<br />
                    Poynton, Stockport<br />
                    Cheshire SK12 1LA
                  </p>
                  <p className="text-xs text-mint mt-2 block font-mono">Parking available to rear of surgery</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex justify-center items-center text-forest border border-sage/20 shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-forest mb-1">Opening Hours</h4>
                  <table className="text-sm text-sage w-48 mt-2">
                    <tbody>
                      <tr><td className="py-1">Monday - Friday</td><td className="text-right">8:30am - 6:00pm</td></tr>
                      <tr><td className="py-1">Saturday - Sunday</td><td className="text-right">Closed</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-8 bg-red-50 border border-red-100 rounded-xl p-6">
                <h4 className="font-medium text-red-900 mb-2 flex items-center gap-2"><Heart size={16} /> Out of Hours</h4>
                <p className="text-sm text-red-800 leading-relaxed">
                  For emergencies when closed, please call A&E Vets in Cheadle immediately: <strong className="block text-xl mt-2 font-display">0161 486 2355</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="gsap-card h-[500px] rounded-2xl overflow-hidden shadow-lg border border-sage/20 interactive">
            {/* Dummy Maps Iframe pointing slightly generically to Poynton */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.166948625686!2d-2.128711823521639!3d53.340321774316135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487a4c7e7bdfa671%3A0xc3484f9b88f342b5!2s63%20London%20Rd%20S%2C%20Poynton%2C%20Stockport%20SK12%201LA%2C%20UK!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </section>

    </div>
  );
}
