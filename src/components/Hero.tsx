import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Sparkles } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';
import Crest from './Crest';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAF7F3] text-stone-900 py-16 md:py-24 border-b border-[#D4AF37]/30" id="hero-section">
      {/* 1. Subtle Radial Champagne Gold & Dusty Rose Wash Background */}
      <div className="absolute inset-0 z-0 opacity-45 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FFF7DC]/70 via-[#FAF7F3]/40 to-transparent" />
      
      {/* 2. Delicate Gold Linework Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.12]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="gold-grid-hero" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.5" fill="#D4AF37" />
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gold-grid-hero)" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4 max-w-4xl flex flex-col items-center text-center">
        
        {/* 1. HAND-CRAFTED J&M WEDDING MONOGRAM CREST AT THE VERY TOP */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="mb-6 flex items-center justify-center"
        >
          <Crest size="lg" animated={true} />
        </motion.div>

        {/* 2. TOP ANNOUNCEMENT & FAMILIES */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center justify-center gap-2 mb-4"
        >
          <div className="flex items-center gap-3">
            <span className="w-12 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <span className="text-[#87434E] text-[11px] md:text-xs tracking-[0.25em] font-sans font-bold uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              TOGETHER WITH OUR FAMILIES
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            </span>
            <span className="w-12 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>

          {/* FAMILY NAMES INTEGRATED ELEGANTLY */}
          <div className="text-[#4A1F26] font-serif text-base sm:text-lg md:text-xl font-medium tracking-wide mt-1 max-w-2xl px-4 leading-relaxed">
            <span>{WEDDING_DETAILS.parents.intro}</span>
          </div>

          <p className="text-stone-600 text-xs md:text-sm font-serif italic mt-1 max-w-lg">
            REQUEST THE HONOR OF YOUR PRESENCE AT THE WEDDING OF THEIR CHILDREN
          </p>
        </motion.div>

        {/* 3. COUPLE NAMES IN ELEGANT CALLIGRAPHY */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-center my-4"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight text-[#4A1F26] flex flex-col md:flex-row items-center justify-center gap-1 md:gap-4 font-normal">
            <span className="font-serif italic text-[#87434E] drop-shadow-xs">
              {WEDDING_DETAILS.bride.fullName}
            </span>
            <span className="text-[#D4AF37] font-serif italic text-3xl md:text-5xl font-light my-1 md:my-0">
              &amp;
            </span>
            <span className="font-serif italic text-[#87434E] drop-shadow-xs">
              {WEDDING_DETAILS.groom.fullName}
            </span>
          </h1>
        </motion.div>

        {/* 4. INVITATION DATE & VENUE SUMMARY BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-2xl bg-white border-2 border-[#D4AF37]/70 rounded-2xl p-5 md:p-6 my-6 shadow-xl relative overflow-hidden text-stone-900"
        >
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#87434E] via-[#D4AF37] to-[#58735B]" />
          
          <div className="flex flex-col md:flex-row items-center justify-around gap-4 text-center md:text-left">
            {/* Date */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#87434E]/10 border border-[#87434E]/30 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-[#87434E]" />
              </div>
              <div>
                <p className="text-[10px] text-stone-500 uppercase font-sans font-bold tracking-widest">Date</p>
                <p className="font-serif text-[#4A1F26] text-base md:text-lg font-bold">Saturday, December 12, 2026</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-stone-200" />

            {/* Time & Venue */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#58735B]/10 border border-[#58735B]/30 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#58735B]" />
              </div>
              <div className="text-center md:text-left">
                <p className="text-[10px] text-stone-500 uppercase font-sans font-bold tracking-widest">Venues</p>
                <p className="font-serif text-[#4A1F26] text-sm md:text-base font-medium">
                  {WEDDING_DETAILS.ceremony.venue}
                </p>
                <p className="text-xs text-stone-600 font-sans">
                  &amp; {WEDDING_DETAILS.reception.venue}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 5. BIBLE VERSE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="max-w-md mx-auto my-4 text-stone-700 italic font-serif text-sm md:text-base border-y border-[#D4AF37]/40 py-3"
        >
          <p className="mb-1">“I have found the one whom my soul loves.”</p>
          <p className="text-[#87434E] text-xs tracking-widest font-sans font-bold uppercase not-italic">Song of Solomon 3:4</p>
        </motion.div>

      </div>
    </section>
  );
}


