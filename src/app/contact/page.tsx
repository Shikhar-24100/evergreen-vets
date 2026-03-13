"use client";

import { useState, FormEvent } from "react";
import { MapPin, Phone, Mail, MessageCircle, Clock, AlertCircle } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        petType: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Construct email body
        const subject = `Website Enquiry from ${formData.name}`;
        const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Pet Type: ${formData.petType}

Message:
${formData.message}
    `.trim();

        // Trigger mailto
        window.location.href = `mailto:enquiries.evergreenvets@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <div className="pt-24 pb-0 bg-warm-white min-h-screen">

            {/* Short Dark Hero */}
            <section className="bg-forest py-20 px-6 relative text-center rounded-b-[3rem] mx-4 shadow-xl overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-mint/10 rounded-full blur-[60px]"></div>
                <h1 className="font-display text-4xl md:text-5xl text-white mb-6 relative z-10">
                    Get in <i className="text-mint">Touch</i>
                </h1>
                <p className="text-sage text-lg font-light max-w-2xl mx-auto leading-relaxed relative z-10">
                    Whether you're registering a new pet, booking an appointment, or just asking for advice — we're here to help.
                </p>
            </section>

            {/* Main Content Areas */}
            <section className="py-24">
                <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Contact Details & Map */}
                    <div className="space-y-12 animate-fade-up">

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-sage/10 relative">
                            <h2 className="font-display text-2xl text-forest mb-6 border-b border-sage/20 pb-4">Practice Details</h2>

                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-cream shrink-0 flex items-center justify-center text-forest">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-sage block mb-1">Address</span>
                                        <strong className="text-charcoal block">63 London Road South</strong>
                                        <span className="text-charcoal block leading-relaxed">Poynton, Stockport<br />Cheshire SK12 1LA</span>
                                        <span className="text-mint text-sm mt-2 block font-medium">Parking to rear of surgery</span>
                                    </div>
                                </li>

                                <li className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-cream shrink-0 flex items-center justify-center text-forest">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-sage block mb-1">Phone</span>
                                        <a href="tel:01625859019" className="text-charcoal text-lg font-medium hover:text-gold transition-colors block mb-1 interactive">01625 859019</a>
                                    </div>
                                </li>

                                <li className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#25D366]/10 shrink-0 flex items-center justify-center text-[#25D366]">
                                        <MessageCircle size={18} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-sage block mb-1">WhatsApp</span>
                                        <a href="https://wa.me/447723485061" target="_blank" rel="noopener noreferrer" className="text-charcoal text-lg font-medium hover:text-[#25D366] transition-colors interactive">07723 485061</a>
                                    </div>
                                </li>

                                <li className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-cream shrink-0 flex items-center justify-center text-forest">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-sage block mb-1">Email</span>
                                        <a href="mailto:enquiries.evergreenvets@gmail.com" className="text-charcoal font-medium hover:text-gold transition-colors break-all interactive">enquiries.evergreenvets@gmail.com</a>
                                    </div>
                                </li>

                                <li className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-cream shrink-0 flex items-center justify-center text-forest">
                                        <Clock size={18} />
                                    </div>
                                    <div className="w-full">
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-sage block mb-2">Opening Hours</span>
                                        <div className="bg-sage/5 rounded-xl p-4">
                                            <div className="flex justify-between text-sm py-1 font-medium text-forest border-b border-sage/10 mb-2">
                                                <span>Monday – Friday</span>
                                                <span>8:30am – 6:00pm</span>
                                            </div>
                                            <div className="flex justify-between text-sm py-1 text-sage">
                                                <span>Saturday – Sunday</span>
                                                <span>Closed</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="h-[300px] w-full bg-cream rounded-3xl overflow-hidden border border-sage/20 shadow-inner">
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

                    {/* Form Area */}
                    <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
                        <div className="bg-cream rounded-3xl p-8 shadow-sm border border-sage/10 relative h-full flex flex-col">
                            <h2 className="font-display text-3xl text-forest mb-2">Send a Message</h2>
                            <p className="text-sage text-sm mb-8">We aim to respond to all non-urgent enquiries within 24 hours.</p>

                            <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-mono uppercase tracking-widest text-sage mb-2">Your Name</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-white border border-sage/20 rounded-xl px-4 py-3 focus:outline-none focus:border-forest/50 focus:ring-1 focus:ring-forest/30 transition-shadow interactive" placeholder="Jane Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-mono uppercase tracking-widest text-sage mb-2">Phone Number</label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full bg-white border border-sage/20 rounded-xl px-4 py-3 focus:outline-none focus:border-forest/50 focus:ring-1 focus:ring-forest/30 transition-shadow interactive" placeholder="07123 456789" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-mono uppercase tracking-widest text-sage mb-2">Email Address</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-white border border-sage/20 rounded-xl px-4 py-3 focus:outline-none focus:border-forest/50 focus:ring-1 focus:ring-forest/30 transition-shadow interactive" placeholder="jane@example.com" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-mono uppercase tracking-widest text-sage mb-2">Pet Details (Optional)</label>
                                        <input type="text" name="petType" value={formData.petType} onChange={handleChange} className="w-full bg-white border border-sage/20 rounded-xl px-4 py-3 focus:outline-none focus:border-forest/50 focus:ring-1 focus:ring-forest/30 transition-shadow interactive" placeholder="e.g. Dog, Cat, Rabbit" />
                                    </div>
                                </div>

                                <div className="flex-1 min-h-[150px]">
                                    <label className="block text-[10px] font-mono uppercase tracking-widest text-sage mb-2">Message</label>
                                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} className="w-full h-full bg-white border border-sage/20 rounded-xl px-4 py-3 focus:outline-none focus:border-forest/50 focus:ring-1 focus:ring-forest/30 transition-shadow resize-none interactive" placeholder="How can we help?" />
                                </div>

                                {/* Important notice */}
                                <div className="bg-red-50 text-red-900 border border-red-100 rounded-xl p-4 text-xs mt-4 flex gap-3 items-start">
                                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                                    <p><strong>Cancellation Notice:</strong> Please note we require 24 hours notice for cancellations. Failure to give notice will result in a £10 cancellation fee.</p>
                                </div>

                                <button type="submit" className="w-full bg-forest text-gold py-4 rounded-xl font-medium mt-6 shadow-md hover:-translate-y-1 hover:shadow-xl hover:bg-forest/95 transition-all interactive">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
}
