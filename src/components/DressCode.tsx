import React from 'react';
import { Sparkles, Shirt } from 'lucide-react';

export default function DressCode() {
  return (
    <section className="relative py-20 bg-[#FCFAF7] text-stone-850 border-t border-stone-200/60" id="dress-code-section">
      <div className="container mx-auto px-4 max-w-2xl relative z-10 text-center">
        {/* Section Header */}
        <span className="text-dustyrose-700 text-[11px] font-bold tracking-[0.2em] uppercase font-sans block mb-2">
          THE ATTIRE
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-normal text-stone-900 tracking-tight">
          Dress Code
        </h2>
        <div className="w-16 h-[1px] bg-champagne-400 mx-auto my-4" />

        {/* Clean, Simple Dress Code Card */}
        <div className="bg-white border border-stone-200/80 rounded-3xl p-8 md:p-10 shadow-sm mt-6">
          <div className="w-12 h-12 rounded-full bg-champagne-100/80 text-champagne-700 flex items-center justify-center mx-auto mb-4 border border-champagne-200">
            <Shirt className="w-5 h-5 text-stone-800" />
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-stone-50 border border-stone-200 shadow-2xs mb-4">
            <Sparkles className="w-4 h-4 text-champagne-600" />
            <span className="font-serif text-xl md:text-2xl text-stone-900 font-medium tracking-wide">
              Elegant and Classy
            </span>
          </div>

          <p className="text-stone-600 text-sm md:text-base max-w-lg mx-auto italic font-serif leading-relaxed">
            We kindly invite our guests to celebrate with us in elegant and classy attire befitting this joyous occasion.
          </p>
        </div>
      </div>
    </section>
  );
}
