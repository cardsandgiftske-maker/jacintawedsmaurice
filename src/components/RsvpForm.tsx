import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  User,
  Phone,
  Check,
  Heart,
  MessageSquare,
  ArrowLeft,
} from 'lucide-react';
import { RsvpGuest } from '../types';
import { saveRsvp, isFirebaseConfigured } from '../lib/firebase';
import Crest from './Crest';

export default function RsvpForm() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [willAttend, setWillAttend] = useState<'yes' | 'no'>('yes');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [submittedGuest, setSubmittedGuest] = useState<RsvpGuest | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Floating button state
  const [showFloatingBtn, setShowFloatingBtn] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const rsvpSection = document.getElementById('rsvp-section');
      if (rsvpSection) {
        const rect = rsvpSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setShowFloatingBtn(false);
        } else {
          setShowFloatingBtn(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generateInvitationCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'JM-26-';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMessage('Please enter your phone number.');
      return;
    }

    setLoading(true);

    try {
      const cleanNotes = notes.trim();
      const newGuest: RsvpGuest = {
        id: 'rsvp-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        willAttend,
        adultsCount: willAttend === 'yes' ? 1 : 0,
        childrenCount: 0,
        submittedAt: new Date().toISOString(),
        eCardCode: generateInvitationCode(),
        ...(cleanNotes ? { notes: cleanNotes } : {}),
      };

      // Save to secure backend database
      const response = await saveRsvp(newGuest);

      setSubmittedGuest(response?.rsvp || newGuest);
      setLoading(false);

      // Reset form fields
      setFullName('');
      setPhoneNumber('');
      setWillAttend('yes');
      setNotes('');
    } catch (err: any) {
      console.error('RSVP submission failure:', err);
      setErrorMessage(
        err instanceof Error && err.message
          ? err.message
          : 'Unable to submit your RSVP at this time. Please check your network connection and try again.'
      );
      setLoading(false);
    }
  };

  const scrollToRsvp = () => {
    const element = document.getElementById('rsvp-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section
        className="relative py-20 bg-[#FAF7F3] text-stone-900 border-t border-[#D4AF37]/30"
        id="rsvp-section"
      >
        {/* Background Gold Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200/20 via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          {/* Section Header */}
          <div className="text-center mb-10">
            <span className="text-[#87434E] text-xs font-bold tracking-widest uppercase font-sans flex items-center justify-center gap-1.5 mb-2">
              <Mail className="w-4 h-4 text-[#D4AF37]" />
              <span>RSVP</span>
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#4A1F26] font-semibold mb-3">
              Confirm Attendance
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
            
            {/* Explicit Closure Deadline Notice */}
            <div className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#E6EEE7] border border-[#58735B]/40 text-[#2B3C2D] text-xs md:text-sm font-sans font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-[#58735B]" />
              <span>RSVP Deadline: Closure on 30th November 2026</span>
            </div>

            <p className="text-stone-700 text-sm md:text-base mt-3 max-w-lg mx-auto italic font-serif">
              Kindly confirm your attendance by November 30, 2026 to help us make the best preparations for our special day.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {submittedGuest ? (
              /* WARM & ELEGANT RSVP SUCCESS EXPERIENCE */
              <motion.div
                key="rsvp-submitted-success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="bg-white border-2 border-[#D4AF37]/70 p-8 md:p-12 rounded-3xl shadow-xl text-center text-stone-900 relative overflow-hidden max-w-2xl mx-auto"
              >
                {/* Decorative Top Accent Bar */}
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#87434E] via-[#D4AF37] to-[#58735B]" />

                {/* Subtle Monogram Crest */}
                <div className="mb-4">
                  <Crest size="sm" animated={false} />
                </div>

                <div className="w-12 h-12 bg-[#58735B]/10 border border-[#58735B]/30 text-[#58735B] rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <p className="text-[10px] uppercase font-sans font-bold tracking-[0.25em] text-[#87434E] mb-1">
                  Confirmation Received
                </p>

                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#4A1F26] mb-4">
                  RSVP SUBMITTED SUCCESSFULLY
                </h3>

                <div className="w-16 h-px bg-[#D4AF37]/50 mx-auto mb-6" />

                {submittedGuest.willAttend === 'yes' ? (
                  <div className="space-y-3 font-serif">
                    <p className="text-lg text-stone-800">
                      Thank you for letting us know, <span className="font-semibold text-[#4A1F26]">{submittedGuest.fullName}</span>.
                    </p>
                    <p className="text-xl md:text-2xl text-[#58735B] font-serif italic font-medium">
                      &ldquo;We look forward to celebrating this sacred day with you!&rdquo;
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 font-serif">
                    <p className="text-lg text-stone-800">
                      Thank you for letting us know, <span className="font-semibold text-[#4A1F26]">{submittedGuest.fullName}</span>.
                    </p>
                    <p className="text-lg text-stone-700 italic">
                      We truly appreciate your response and will keep you in our prayers and hearts.
                    </p>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col items-center gap-4">
                  <p className="text-xs text-stone-500 font-sans italic">
                    Jacinta Mbilo &amp; Maurice Opiyo • Saturday, December 12, 2026
                  </p>

                  <button
                    onClick={() => setSubmittedGuest(null)}
                    className="text-stone-600 hover:text-[#4A1F26] text-xs font-sans font-bold tracking-wider uppercase flex items-center gap-1.5 cursor-pointer hover:underline transition-all"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Submit another response</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              /* CLEAN, SIMPLE RSVP FORM */
              <motion.div
                key="rsvp-input-form"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white border-2 border-[#D4AF37]/60 p-6 md:p-10 rounded-3xl shadow-xl relative text-stone-900 max-w-2xl mx-auto"
              >
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#87434E] via-[#D4AF37] to-[#58735B]" />

                <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200">
                  <h3 className="font-serif text-xl text-[#4A1F26] flex items-center gap-2 font-semibold">
                    <Heart className="w-5 h-5 text-[#87434E] fill-[#87434E]/20" />
                    <span>RSVP Response Form</span>
                  </h3>
                  {isFirebaseConfigured ? (
                    <span className="flex items-center gap-1.5 text-[9px] text-[#58735B] bg-[#E6EEE7] border border-[#58735B]/30 px-2.5 py-0.5 rounded-full font-sans font-bold uppercase tracking-wider shadow-xs">
                      <span className="w-1.5 h-1.5 bg-[#58735B] rounded-full animate-pulse" />
                      <span>Cloud Synced</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[9px] text-stone-500 bg-stone-100 border border-stone-200 px-2.5 py-0.5 rounded-full font-sans font-semibold uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                      <span>Local Sandbox</span>
                    </span>
                  )}
                </div>

                <form onSubmit={handleRsvpSubmit} className="space-y-5" id="rsvp-wedding-form">
                  {/* Full Name input */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest text-stone-700 font-sans font-bold flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#87434E]" />
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white border border-stone-300 focus:border-[#87434E] focus:ring-2 focus:ring-[#87434E]/20 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-all font-sans"
                    />
                  </div>

                  {/* Phone Number input */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest text-stone-700 font-sans font-bold flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#87434E]" />
                      <span>Phone Number</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +254 700 000 000"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-white border border-stone-300 focus:border-[#87434E] focus:ring-2 focus:ring-[#87434E]/20 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-all font-sans"
                    />
                  </div>

                  {/* Will Attend toggle buttons */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest text-stone-700 font-sans font-bold block">
                      Will you be joining us?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setWillAttend('yes')}
                        className={`py-3.5 text-xs uppercase tracking-wider font-sans font-bold border rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          willAttend === 'yes'
                            ? 'bg-[#87434E] border-[#87434E] text-white shadow-md'
                            : 'bg-white border-stone-300 text-stone-700 hover:text-stone-900'
                        }`}
                      >
                        <Check className="w-4 h-4 shrink-0" />
                        <span>Joyfully Accepts</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setWillAttend('no')}
                        className={`py-3.5 text-xs uppercase tracking-wider font-sans font-bold border rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          willAttend === 'no'
                            ? 'bg-[#E6EEE7] border-[#728E75] text-[#2B3C2D] shadow-xs'
                            : 'bg-white border-stone-300 text-stone-700 hover:text-stone-900'
                        }`}
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>Regretfully Declines</span>
                      </button>
                    </div>
                  </div>

                  {/* Custom Notes / Wishes */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest text-stone-700 font-sans font-bold flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>
                        Wishes for Jacinta &amp; Maurice / Special Notes{' '}
                        <span className="text-[10px] text-stone-400 font-normal">(Optional)</span>
                      </span>
                    </label>
                    <textarea
                      placeholder="Leave a message or blessing for Jacinta & Maurice..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="w-full bg-white border border-stone-300 focus:border-[#87434E] focus:ring-2 focus:ring-[#87434E]/20 rounded-xl px-4 py-3 text-sm text-stone-900 outline-none transition-all resize-none font-sans"
                    />
                  </div>

                  {/* Errors display */}
                  {errorMessage && (
                    <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-xs text-rose-700">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-[#87434E] via-[#A85866] to-[#4A1F26] hover:brightness-110 active:scale-98 disabled:opacity-50 text-white font-sans font-bold text-xs uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg border border-[#D4AF37]/40 mt-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#F8F3E3]" />
                        <span>Submit RSVP</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Floating RSVP Button */}
      <AnimatePresence>
        {showFloatingBtn && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 pointer-events-auto"
            id="floating-rsvp-button-wrapper"
          >
            <button
              onClick={scrollToRsvp}
              className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#87434E] via-[#A85866] to-[#87434E] hover:brightness-110 text-white font-sans font-extrabold text-xs uppercase tracking-wider rounded-full shadow-2xl active:scale-95 transition-all cursor-pointer border border-[#D4AF37]/60"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>RSVP NOW</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

