import React from 'react';
import { Shirt, Sparkles, Heart } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

export default function DressCode() {
  return (
    <section className="relative py-20 md:py-28 bg-[#FAF7F3] text-stone-900 border-t border-[#D4AF37]/30" id="dress-code-section">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200/20 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="text-[#87434E] text-xs font-bold tracking-widest uppercase font-sans flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>The Attire</span>
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-stone-900 mb-3">Dress Code</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
        </div>

        {/* Dress Code Card */}
        <div className="bg-white border-2 border-[#D4AF37]/60 p-8 md:p-12 rounded-3xl shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#87434E] via-[#D4AF37] to-[#58735B]" />

          <div className="w-16 h-16 rounded-full bg-[#87434E]/10 border border-[#87434E]/20 text-[#87434E] flex items-center justify-center mx-auto shadow-xs">
            <Shirt className="w-8 h-8" />
          </div>

          <div className="inline-block px-6 py-2 bg-gradient-to-r from-[#87434E]/10 via-[#D4AF37]/10 to-[#58735B]/10 border border-[#D4AF37]/40 rounded-full text-[#4A1F26] text-xs font-sans font-extrabold uppercase tracking-widest shadow-xs">
            Guest Attire Guide
          </div>

          <p className="text-stone-800 text-xl md:text-2xl font-serif italic leading-relaxed max-w-xl mx-auto font-medium">
            &ldquo;{WEDDING_DETAILS.dressCode.headline}&rdquo;
          </p>

          <div className="pt-6 border-t border-stone-200 flex items-center justify-center gap-2 text-stone-600 text-xs font-serif italic">
            <Heart className="w-4 h-4 text-[#87434E] fill-[#87434E]/20" />
            <span>We look forward to celebrating in joy and elegance with you!</span>
          </div>
        </div>
      </div>
    </section>
  );
}
