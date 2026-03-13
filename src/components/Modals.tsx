"use client";

import { useState, useEffect, FormEvent } from "react";
import { X, Calendar, Clock, Stethoscope, Pill, AlertTriangle } from "lucide-react";

export default function Modals() {
    const [bookingOpen, setBookingOpen] = useState(false);
    const [prescriptionOpen, setPrescriptionOpen] = useState(false);

    useEffect(() => {
        const handleBooking = () => setBookingOpen(true);
        const handlePresc = () => setPrescriptionOpen(true);

        window.addEventListener("open-booking-modal", handleBooking);
        window.addEventListener("open-prescription-modal", handlePresc);

        return () => {
            window.removeEventListener("open-booking-modal", handleBooking);
            window.removeEventListener("open-prescription-modal", handlePresc);
        };
    }, []);

    return (
        <>
            <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
            <PrescriptionModal isOpen={prescriptionOpen} onClose={() => setPrescriptionOpen(false)} />
        </>
    );
}

const services = [
    "Animal Health Certificates", "Consultations", "Dental Care", "Diagnostics",
    "End of Life Care", "Emergency Care Access", "Hydrotherapy", "Microchipping",
    "Neutering", "Nursing Clinics", "Surgical Procedures", "Parasite Control",
    "Pet Health Clinics", "Physiotherapy", "Puppy Parties", "Vaccinations"
];

function BookingModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [step, setStep] = useState(1);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        petType: "",
        petName: "",
        service: "",
        notes: "",
        date: "",
        time: "",
        ownerName: "",
        phone: "",
        email: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => setStep(s => Math.min(s + 1, 3));
    const handlePrev = () => setStep(s => Math.max(s - 1, 1));

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Construct email body
        const subject = `New Appointment Request — ${formData.petName}`;
        const body = `
Owner Name: ${formData.ownerName}
Phone: ${formData.phone}
Email: ${formData.email}

Pet Info
Name: ${formData.petName}
Type: ${formData.petType}

Requested Appointment
Service: ${formData.service}
Preferred Date: ${formData.date}
Preferred Time: ${formData.time}

Notes:
${formData.notes || "None"}
    `.trim();

        // Trigger mailto
        window.location.href = `mailto:enquiries.evergreenvets@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        setSuccess(true);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-forest/80 backdrop-blur-sm" onClick={() => { onClose(); setSuccess(false); setStep(1); }} />

            <div className="bg-warm-white text-charcoal rounded-2xl w-full max-w-lg relative z-10 overflow-hidden shadow-2xl animate-fade-up">
                <button onClick={() => { onClose(); setSuccess(false); setStep(1); }} className="absolute right-4 top-4 text-forest/50 hover:text-forest transition-colors interactive">
                    <X size={24} />
                </button>

                {success ? (
                    <div className="p-12 text-center text-forest">
                        <div className="w-16 h-16 bg-mint/30 rounded-full flex items-center justify-center mx-auto mb-6 text-mint">
                            <Calendar size={32} />
                        </div>
                        <h3 className="font-display text-3xl mb-4">Request Sent!</h3>
                        <p className="text-forest/80">Thanks! We'll call to confirm your appointment within 2 hours.</p>
                        <button onClick={() => { onClose(); setSuccess(false); setStep(1); }} className="mt-8 bg-forest text-gold px-8 py-3 rounded-full font-medium hover:bg-forest/90 interactive">
                            Close Window
                        </button>
                    </div>
                ) : (
                    <div className="p-8">
                        <h2 className="font-display text-3xl text-forest mb-2">Book Appointment</h2>

                        {/* Progress indicators */}
                        <div className="flex items-center gap-2 mb-8">
                            <div className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-gold" : "bg-sage/20"}`} />
                            <div className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-gold" : "bg-sage/20"}`} />
                            <div className={`h-1 flex-1 rounded-full ${step >= 3 ? "bg-gold" : "bg-sage/20"}`} />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {step === 1 && (
                                <div className="space-y-4 animate-fade-up">
                                    <h3 className="font-medium text-lg text-forest flex items-center gap-2">
                                        <Stethoscope size={18} /> About your pet
                                    </h3>
                                    <div>
                                        <label className="block text-sm text-forest/70 mb-1">Type of Pet</label>
                                        <select name="petType" value={formData.petType} onChange={handleChange} required className="w-full border border-sage/30 rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-moss interactive">
                                            <option value="">Select type...</option>
                                            <option value="Dog">Dog</option>
                                            <option value="Cat">Cat</option>
                                            <option value="Small Animal">Small Animal (Rabbit, Guinea Pig, etc)</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-forest/70 mb-1">Pet's Name</label>
                                        <input type="text" name="petName" value={formData.petName} onChange={handleChange} required className="w-full border border-sage/30 rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-moss interactive" placeholder="e.g. Bella" />
                                    </div>
                                    <button type="button" onClick={handleNext} disabled={!formData.petType || !formData.petName} className="w-full bg-forest text-gold py-3 rounded-lg font-medium mt-4 disabled:opacity-50 transition-opacity interactive">
                                        Next Step
                                    </button>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-4 animate-fade-up">
                                    <h3 className="font-medium text-lg text-forest flex items-center gap-2">
                                        <Calendar size={18} /> Service needed
                                    </h3>
                                    <div>
                                        <label className="block text-sm text-forest/70 mb-1">Reason for visit</label>
                                        <select name="service" value={formData.service} onChange={handleChange} required className="w-full border border-sage/30 rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-moss interactive">
                                            <option value="">Select service...</option>
                                            {services.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-forest/70 mb-1">Additional Notes (optional)</label>
                                        <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className="w-full border border-sage/30 rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-moss interactive" placeholder="Brief details about the appointment..." />
                                    </div>
                                    <div className="flex gap-3 mt-4">
                                        <button type="button" onClick={handlePrev} className="bg-sage/10 text-forest px-6 py-3 rounded-lg font-medium interactive">Back</button>
                                        <button type="button" onClick={handleNext} disabled={!formData.service} className="flex-1 bg-forest text-gold py-3 rounded-lg font-medium disabled:opacity-50 interactive">Next Step</button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-4 animate-fade-up">
                                    <h3 className="font-medium text-lg text-forest flex items-center gap-2">
                                        <Clock size={18} /> Details & Time
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm text-forest/70 mb-1">Preferred Date</label>
                                            <input type="date" name="date" value={formData.date} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} className="w-full border border-sage/30 rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-moss interactive" />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-forest/70 mb-1">Preferred Time</label>
                                            <select name="time" value={formData.time} onChange={handleChange} required className="w-full border border-sage/30 rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-moss interactive">
                                                <option value="">Any time</option>
                                                <option value="Morning (08:30 - 12:00)">Morning (08:30 - 12:00)</option>
                                                <option value="Afternoon (12:00 - 16:00)">Afternoon (12:00 - 16:00)</option>
                                                <option value="Late (16:00 - 18:00)">Late (16:00 - 18:00)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-forest/70 mb-1">Your Name</label>
                                        <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} required className="w-full border border-sage/30 rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-moss interactive" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-sm text-forest/70 mb-1">Phone</label>
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full border border-sage/30 rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-moss interactive" />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-forest/70 mb-1">Email</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border border-sage/30 rounded-lg px-4 py-3 bg-white focus:outline-none focus:border-moss interactive" />
                                        </div>
                                    </div>
                                    <div className="flex gap-3 mt-6">
                                        <button type="button" onClick={handlePrev} className="bg-sage/10 text-forest px-6 py-3 rounded-lg font-medium interactive">Back</button>
                                        <button type="submit" className="flex-1 bg-gold text-forest py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all border border-transparent interactive">
                                            Submit Request
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

function PrescriptionModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [formData, setFormData] = useState({
        petName: "",
        medication: "",
        lastVisitDate: "",
        ownerName: "",
        phone: "",
        email: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Construct email body
        const subject = `Repeat Prescription Request — ${formData.petName}`;
        const body = `
Owner Name: ${formData.ownerName}
Phone: ${formData.phone}
Email: ${formData.email}

Pet Name: ${formData.petName}
Medication Needed: ${formData.medication}
Approx. Date of Last Vet Visit: ${formData.lastVisitDate}

Note: The practice requires 48 hours notice for repeat prescriptions.
    `.trim();

        // Trigger mailto
        window.location.href = `mailto:enquiries.evergreenvets@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-forest/80 backdrop-blur-sm" onClick={onClose} />

            <div className="bg-warm-white text-charcoal rounded-2xl w-full max-w-lg relative z-10 overflow-hidden shadow-2xl animate-fade-up">
                <button onClick={onClose} className="absolute right-4 top-4 text-forest/50 hover:text-forest transition-colors z-10 interactive">
                    <X size={24} />
                </button>

                <div className="bg-red-900 text-white p-4 text-center font-medium flex items-center justify-center gap-2">
                    <AlertTriangle size={18} className="text-red-200" />
                    48 hours notice required for all repeat prescriptions
                </div>

                <div className="p-8">
                    <h2 className="font-display text-2xl text-forest mb-6 flex items-center gap-2">
                        <Pill size={24} className="text-gold" />
                        Prescription Request
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-forest/70 mb-1">Pet's Name</label>
                                <input type="text" name="petName" value={formData.petName} onChange={handleChange} required className="w-full border border-sage/30 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-moss interactive" />
                            </div>
                            <div>
                                <label className="block text-sm text-forest/70 mb-1">Medication Name</label>
                                <input type="text" name="medication" value={formData.medication} onChange={handleChange} required className="w-full border border-sage/30 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-moss interactive" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-forest/70 mb-1">Approx. Date of Last Physical Visit</label>
                            <input type="date" name="lastVisitDate" value={formData.lastVisitDate} onChange={handleChange} required className="w-full border border-sage/30 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-moss interactive" />
                        </div>

                        <div className="border-t border-sage/20 pt-4 mt-4 grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm text-forest/70 mb-1">Your Name</label>
                                <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} required className="w-full border border-sage/30 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-moss interactive" />
                            </div>
                            <div>
                                <label className="block text-sm text-forest/70 mb-1">Phone</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full border border-sage/30 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-moss interactive" />
                            </div>
                            <div>
                                <label className="block text-sm text-forest/70 mb-1">Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border border-sage/30 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-moss interactive" />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-forest text-gold py-3 mt-4 rounded-lg font-medium shadow-md hover:bg-forest/90 transition-colors interactive">
                            Request Prescription
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
