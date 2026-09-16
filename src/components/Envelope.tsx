import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import couplePortrait from '../assets/images/engagement_hands_ring_1786638744313.jpg';

interface EnvelopeProps {
  onOpen: () => void;
  onSealBreak?: () => void;
}

export default function Envelope({ onOpen, onSealBreak }: EnvelopeProps) {
  // Opening steps: 'closed' | 'opening-seal' | 'opening-flap' | 'card-rising' | 'complete'
  const [animationStep, setAnimationStep] = useState<
    'closed' | 'opening-seal' | 'opening-flap' | 'card-rising' | 'complete'
  >('closed');

  const handleOpen = () => {
    if (animationStep !== 'closed') return;

    if (onSealBreak) {
      onSealBreak();
    }

    // Step 1: Seal reacts
    setAnimationStep('opening-seal');

    // Step 2: Flap opens
    setTimeout(() => {
      setAnimationStep('opening-flap');
    }, 400);

    // Step 3: Card slides up
    setTimeout(() => {
      setAnimationStep('card-rising');
    }, 1100);

    // Step 4: Complete transition to main invitation
    setTimeout(() => {
      setAnimationStep('complete');
      onOpen();
    }, 2200);
  };

  const isFlapOpen =
    animationStep === 'opening-flap' ||
    animationStep === 'card-rising' ||
    animationStep === 'complete';

  const isCardRising =
    animationStep === 'card-rising' || animationStep === 'complete';

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: 'blur(10px)',
        transition: { duration: 0.9, ease: [0.4, 0.0, 0.2, 1] },
      }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#1C0205] p-3 sm:p-6 select-none"
    >
      {/* Ambient background atmosphere - Dusty Rose & Sage Green radial lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#B76E79]/30 blur-[120px] animate-pulse"
          style={{ animationDuration: '7s' }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#728E75]/30 blur-[120px] animate-pulse"
          style={{ animationDuration: '9s' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(32,8,13,0.88)_100%)]" />
      </div>

      {/* Main Container - Scaled for high precision on mobile viewports */}
      <div className="relative w-full max-w-[440px] sm:max-w-[500px] flex flex-col items-center justify-center z-10 my-auto">
        
        {/* Envelope Outer Frame - Luxurious Champagne Gold Paper */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-full aspect-[4/3] rounded-3xl shadow-[0_30px_90px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(212,175,55,0.35)] bg-gradient-to-b from-[#FAF0D7] via-[#ECD9A5] to-[#DFBF7A] border-2 border-[#D4AF37] overflow-hidden"
          style={{ perspective: 1200 }}
        >
          {/* Subtle Embossed Floral SVG Background Texture on Champagne Gold Paper */}
          <div className="absolute inset-0 opacity-[0.12] pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <pattern
                id="embossed-floral"
                x="0"
                y="0"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M40 0 C 45 15, 60 20, 75 20 C 60 25, 55 40, 55 55 C 40 45, 35 60, 20 60 C 25 45, 10 40, 10 25 C 25 25, 30 10, 40 0 Z"
                  fill="#BFA15F"
                />
                <circle cx="40" cy="40" r="4" fill="#58735B" />
                <path
                  d="M10 70 Q 25 55 40 70 T 70 70"
                  stroke="#58735B"
                  strokeWidth="1.2"
                  fill="none"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#embossed-floral)" />
            </svg>
          </div>

          {/* Champagne Gold and Sage Green Dual Decorative Borders */}
          <div className="absolute inset-2.5 border-2 border-[#D4AF37]/75 rounded-2xl pointer-events-none z-10" />
          <div className="absolute inset-4 border border-[#58735B]/50 rounded-xl pointer-events-none z-10" />

          {/* Corner Filigree Ornaments in Sage Green and Gold */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#58735B] pointer-events-none z-15" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#58735B] pointer-events-none z-15" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#58735B] pointer-events-none z-15" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#58735B] pointer-events-none z-15" />

          {/* INNER LINING (Revealed when flap opens) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2D3D30] via-[#202E23] to-[#141C15] flex items-center justify-center p-6 text-center">
            <div className="border border-[#D4AF37]/55 rounded-2xl p-4 w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
              <div className="w-16 h-16 rounded-full border border-[#D4AF37]/70 flex items-center justify-center text-[#F8F3E3] font-serif text-lg font-light tracking-widest bg-[#18231A]/60 shadow-inner">
                J&amp;M
              </div>
              <p className="font-serif italic text-xs text-[#EAD8A6] mt-2 tracking-widest uppercase">
                Holy Matrimony
              </p>
            </div>
          </div>

          {/* RISING INVITATION CARD (Glides out of envelope when flap opens) */}
          <motion.div
            initial={{ y: '0%', opacity: 0 }}
            animate={
              isCardRising
                ? { y: '-60%', opacity: 1, scale: 1.05 }
                : { y: '0%', opacity: 0 }
            }
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-6 top-6 bottom-6 bg-[#FAF7F3] rounded-2xl border-2 border-[#D4AF37]/85 shadow-2xl z-20 p-4 flex flex-col items-center justify-between text-stone-900 overflow-hidden"
          >
            <div className="text-center space-y-1">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#89632A] font-sans font-bold">
                Wedding Invitation
              </p>
              <h2 className="font-serif text-xl font-medium text-[#4A1F26] tracking-wide">
                Jacinta &amp; Maurice
              </h2>
            </div>

            {/* Timeless Monogram Crest Badge */}
            <div className="w-20 h-20 rounded-full border-2 border-[#D4AF37]/70 bg-gradient-to-br from-[#FAF7F3] to-[#F5E9EC] flex flex-col items-center justify-center shadow-md my-1 p-2">
              <span className="font-serif font-bold text-lg text-[#87434E] italic tracking-tight">
                J&amp;M
              </span>
              <span className="text-[7px] uppercase font-sans font-bold text-[#58735B] tracking-widest">
                12 • 12 • 2026
              </span>
            </div>

            <div className="text-center space-y-0.5 font-sans">
              <p className="text-[10px] font-bold text-[#58735B] uppercase tracking-wider">
                Saturday, December 12, 2026
              </p>
              <p className="text-[9px] text-stone-600 italic font-serif">
                Parklands Baptist Church &amp; Shinyanga House, Tigoni
              </p>
            </div>

            <div className="w-full py-1.5 bg-gradient-to-r from-[#87434E] via-[#D4AF37] to-[#58735B] text-white text-[9px] font-sans font-bold uppercase tracking-widest text-center rounded-lg shadow-sm">
              You Are Cordially Invited
            </div>
          </motion.div>

          {/* SVG GRADIENT DEFINITIONS FOR CHAMPAGNE GOLD ENVELOPE */}
          <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
            <defs>
              {/* Champagne Gold Flap Gradients */}
              <linearGradient id="gold-flap-top" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF2D6" />
                <stop offset="45%" stopColor="#EED9A3" />
                <stop offset="100%" stopColor="#D9BD7D" />
              </linearGradient>

              <linearGradient id="gold-flap-left" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ECD8A0" />
                <stop offset="100%" stopColor="#D5B672" />
              </linearGradient>

              <linearGradient id="gold-flap-right" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ECD8A0" />
                <stop offset="100%" stopColor="#D5B672" />
              </linearGradient>

              <linearGradient id="gold-flap-bottom" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#CBAC67" />
                <stop offset="40%" stopColor="#DECA93" />
                <stop offset="100%" stopColor="#EAD8A6" />
              </linearGradient>
            </defs>
          </svg>

          {/* ENVELOPE BASE POCKET FLAPS */}
          {/* Left Flap - Champagne Gold with Sage Green Botanical Sprig */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <svg
              className="w-full h-full drop-shadow-[2px_0_5px_rgba(0,0,0,0.18)]"
              viewBox="0 0 400 300"
              preserveAspectRatio="none"
            >
              <path d="M0 0 L200 150 L0 300 Z" fill="url(#gold-flap-left)" />
              {/* Gold Fold Stroke */}
              <path
                d="M0 0 L200 150 L0 300"
                stroke="#C4A14E"
                strokeWidth="1"
                opacity="0.8"
              />
              {/* Sage Green Inner Accent Trim Line */}
              <path
                d="M10 15 L190 150 L10 285"
                stroke="#58735B"
                strokeWidth="0.8"
                opacity="0.5"
                strokeDasharray="4 2"
              />
              {/* Embossed Sage Green Vine with Leaves */}
              <g stroke="#58735B" strokeWidth="1.2" fill="none" opacity="0.65">
                <path d="M25 50 Q 42 75 30 100 T 48 140" />
                <ellipse cx="28" cy="62" rx="4" ry="2" fill="#58735B" transform="rotate(-30 28 62)" />
                <ellipse cx="38" cy="85" rx="4" ry="2" fill="#58735B" transform="rotate(35 38 85)" />
                <ellipse cx="32" cy="115" rx="4" ry="2" fill="#58735B" transform="rotate(-25 32 115)" />
              </g>
              <circle cx="30" cy="100" r="2" fill="#58735B" opacity="0.8" />
            </svg>
          </div>

          {/* Right Flap - Champagne Gold with Sage Green Botanical Sprig */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <svg
              className="w-full h-full drop-shadow-[-2px_0_5px_rgba(0,0,0,0.18)]"
              viewBox="0 0 400 300"
              preserveAspectRatio="none"
            >
              <path d="M400 0 L200 150 L400 300 Z" fill="url(#gold-flap-right)" />
              {/* Gold Fold Stroke */}
              <path
                d="M400 0 L200 150 L400 300"
                stroke="#C4A14E"
                strokeWidth="1"
                opacity="0.8"
              />
              {/* Sage Green Inner Accent Trim Line */}
              <path
                d="M390 15 L210 150 L390 285"
                stroke="#58735B"
                strokeWidth="0.8"
                opacity="0.5"
                strokeDasharray="4 2"
              />
              {/* Embossed Sage Green Vine with Leaves */}
              <g stroke="#58735B" strokeWidth="1.2" fill="none" opacity="0.65">
                <path d="M375 50 Q 358 75 370 100 T 352 140" />
                <ellipse cx="372" cy="62" rx="4" ry="2" fill="#58735B" transform="rotate(30 372 62)" />
                <ellipse cx="362" cy="85" rx="4" ry="2" fill="#58735B" transform="rotate(-35 362 85)" />
                <ellipse cx="368" cy="115" rx="4" ry="2" fill="#58735B" transform="rotate(25 368 115)" />
              </g>
              <circle cx="370" cy="100" r="2" fill="#58735B" opacity="0.8" />
            </svg>
          </div>

          {/* Bottom Triangular Pocket Flap - Rich Champagne Gold with Sage Green Accents */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <svg
              className="w-full h-full drop-shadow-[0_-4px_8px_rgba(0,0,0,0.22)]"
              viewBox="0 0 400 300"
              preserveAspectRatio="none"
            >
              <path d="M0 300 L200 150 L400 300 Z" fill="url(#gold-flap-bottom)" />
              <path
                d="M0 300 L200 150 L400 300"
                stroke="#D4AF37"
                strokeWidth="1.5"
                opacity="0.9"
              />
              {/* Fine Sage Green Parallel Trim Line */}
              <path
                d="M18 296 L200 160 L382 296"
                stroke="#58735B"
                strokeWidth="1"
                opacity="0.65"
              />
              {/* Sage Green Laurel Accent Motif at Bottom Peak */}
              <g stroke="#58735B" strokeWidth="1" fill="none" opacity="0.6">
                <path d="M180 200 Q 200 185 220 200" />
                <path d="M185 210 Q 200 195 215 210" />
                <circle cx="200" cy="195" r="2.5" fill="#58735B" />
              </g>
            </svg>
          </div>

          {/* TOP TRIANGULAR FLAP (3D Animated Unfolding) - Champagne Gold & Sage Green */}
          <motion.div
            animate={
              isFlapOpen
                ? { rotateX: 180, opacity: 0.1, y: -10 }
                : { rotateX: 0, opacity: 1, y: 0 }
            }
            transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-0 z-30 origin-top pointer-events-none"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <svg
              className="w-full h-full drop-shadow-[0_10px_16px_rgba(0,0,0,0.3)]"
              viewBox="0 0 400 300"
              preserveAspectRatio="none"
            >
              <path d="M0 0 L200 150 L400 0 Z" fill="url(#gold-flap-top)" />
              
              {/* Primary Champagne Gold Fold Stroke */}
              <path
                d="M0 0 L200 150 L400 0"
                stroke="#D4AF37"
                strokeWidth="1.5"
                opacity="0.95"
              />

              {/* Parallel Sage Green Decorative Accent Stroke */}
              <path
                d="M15 4 L200 142 L385 4"
                stroke="#58735B"
                strokeWidth="1.2"
                opacity="0.75"
              />

              {/* Sage Green Botanical Olive Branch Garland along the Flap */}
              <g opacity="0.75" stroke="#58735B" strokeWidth="1" fill="none">
                {/* Left Sprig */}
                <path d="M110 30 Q 150 70 190 120" />
                <ellipse cx="130" cy="50" rx="4" ry="2" fill="#58735B" transform="rotate(-35 130 50)" />
                <ellipse cx="155" cy="78" rx="4" ry="2" fill="#58735B" transform="rotate(-25 155 78)" />
                <ellipse cx="178" cy="105" rx="4" ry="2" fill="#58735B" transform="rotate(-15 178 105)" />

                {/* Right Sprig */}
                <path d="M290 30 Q 250 70 210 120" />
                <ellipse cx="270" cy="50" rx="4" ry="2" fill="#58735B" transform="rotate(35 270 50)" />
                <ellipse cx="245" cy="78" rx="4" ry="2" fill="#58735B" transform="rotate(25 245 78)" />
                <ellipse cx="222" cy="105" rx="4" ry="2" fill="#58735B" transform="rotate(15 222 105)" />
                
                {/* Center Sage Green Botanical Pip */}
                <circle cx="200" cy="128" r="2.5" fill="#58735B" />
              </g>
            </svg>
          </motion.div>

          {/* CHAMPAGNE GOLD & SAGE GREEN J&M WAX SEAL (Centered on the Flap Tip) */}
          <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
            <AnimatePresence>
              {animationStep === 'closed' || animationStep === 'opening-seal' ? (
                <motion.div
                  initial={{ scale: 1 }}
                  animate={
                    animationStep === 'opening-seal'
                      ? { scale: [1, 1.25, 0], opacity: [1, 0.9, 0], rotate: [0, 15, -10] }
                      : { scale: 1, opacity: 1 }
                  }
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  onClick={handleOpen}
                  className="pointer-events-auto cursor-pointer select-none group flex flex-col items-center justify-center"
                >
                  {/* Radiant Backlight Pulse Glow in Champagne Gold & Sage */}
                  <div className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-[#D4AF37]/50 via-[#F6ECCC]/70 to-[#58735B]/40 blur-xl group-hover:scale-125 transition-all duration-300 animate-pulse" />

                  {/* Sage Green Velvet Ribbon Tails Behind Wax Seal */}
                  <div className="absolute -bottom-6 flex items-center justify-center gap-2 pointer-events-none">
                    <div className="w-3.5 h-10 bg-[#58735B] rounded-b-sm transform -rotate-15 shadow-md border-t border-[#D4AF37]" />
                    <div className="w-3.5 h-10 bg-[#465E49] rounded-b-sm transform rotate-15 shadow-md border-t border-[#D4AF37]" />
                  </div>

                  {/* 3D Wax Seal Body in Radiant Champagne Gold */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#FFF8E7] via-[#E8D49E] to-[#9E7D32] p-1 shadow-[0_14px_30px_rgba(20,30,22,0.6),_inset_0_2px_4px_rgba(255,255,255,0.9),_inset_0_-4px_8px_rgba(0,0,0,0.45)] border border-[#FFF8E7]/90 transform transition-transform duration-300 active:scale-95 group-hover:scale-105">
                    {/* Inner Seal Chamber with Sage Green Botanical Ring */}
                    <div className="w-full h-full rounded-full bg-gradient-to-tl from-[#8F7027] via-[#D4AF37] to-[#FFF3D6] flex items-center justify-center shadow-[inset_0_3px_6px_rgba(0,0,0,0.45)] border border-[#58735B]/60 relative overflow-hidden">
                      
                      {/* Monogram Crest Details */}
                      <div className="flex flex-col items-center justify-center text-center relative z-10">
                        {/* Sage Green Inner Wreath Accent Ring */}
                        <div className="absolute -inset-1 rounded-full border border-[#58735B]/50" />
                        
                        <span className="font-serif font-bold text-2xl sm:text-3xl tracking-tight text-[#2D220E] drop-shadow-[0_1px_2px_rgba(255,248,231,0.85)] italic">
                          J&amp;M
                        </span>
                        
                        <span className="text-[7px] font-sans font-extrabold uppercase tracking-[0.22em] text-[#3D3014]/90 mt-0.5">
                          12 • 12 • 2026
                        </span>
                      </div>

                      {/* Glossy Refraction Highlight */}
                      <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent -rotate-12 transform origin-top-left scale-150 pointer-events-none" />
                    </div>
                  </div>

                  {/* Sage Green "TAP TO OPEN" Call To Action Badge */}
                  <div className="mt-5 px-4 py-1.5 bg-[#2E3D30]/95 border border-[#D4AF37] rounded-full shadow-xl backdrop-blur-md flex items-center gap-1.5 text-[#F8F3E3] text-[10px] sm:text-xs font-sans font-bold uppercase tracking-widest animate-bounce">
                    <Sparkles className="w-3.5 h-3.5 text-[#EAD8A6] animate-spin" style={{ animationDuration: '4s' }} />
                    <span>TAP TO OPEN</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#EAD8A6]" />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Outer Caption Footer */}
        <div className="mt-6 text-center space-y-1">
          <p className="font-serif italic text-sm text-[#F8F3E3] tracking-wide flex items-center justify-center gap-2">
            <Heart className="w-3.5 h-3.5 text-[#B76E79] fill-[#B76E79]" />
            <span>The Wedding Invitation of Jacinta &amp; Maurice</span>
            <Heart className="w-3.5 h-3.5 text-[#B76E79] fill-[#B76E79]" />
          </p>
          <p className="text-[10px] uppercase font-sans tracking-widest text-stone-300">
            December 12, 2026 • Nairobi &amp; Tigoni, Kenya
          </p>
        </div>

      </div>
    </motion.div>
  );
}
