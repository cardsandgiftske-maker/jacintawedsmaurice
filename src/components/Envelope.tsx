import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
  onSealBreak?: () => void;
}

export default function Envelope({ onOpen, onSealBreak }: EnvelopeProps) {
  const [isSealed, setIsSealed] = useState(true);
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isCardEmerging, setIsCardEmerging] = useState(false);

  const handleOpen = () => {
    if (!isSealed) return;
    setIsSealed(false);

    if (onSealBreak) {
      onSealBreak();
    }

    // Step 1: Open top flap
    setTimeout(() => {
      setIsFlapOpen(true);
    }, 350);

    // Step 2: Slide the invitation card up out of the envelope
    setTimeout(() => {
      setIsCardEmerging(true);
    }, 750);

    // Step 3: Transition to main experience
    setTimeout(() => {
      onOpen();
    }, 2800);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        filter: 'blur(8px)',
        transition: { duration: 1.0, ease: [0.43, 0.13, 0.23, 0.96] },
      }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-stone-900 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-850 via-stone-900 to-black p-4 md:p-6"
    >
      {/* Ambient background flora/glow simulation */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute top-10 left-10 w-96 h-96 rounded-full bg-amber-600/20 blur-3xl animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl animate-pulse"
          style={{ animationDuration: '11s' }}
        />
      </div>

      {/* Main interactive envelope container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{
          opacity: 0,
          scale: 1.12,
          y: -20,
          transition: { duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] },
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-[430px] aspect-[9/16] max-h-[90vh] bg-stone-950/40 backdrop-blur-sm rounded-[40px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-stone-800/60 flex items-center justify-center overflow-hidden"
      >
        {/* Phone screen boundary or card viewport */}
        <div className="relative w-full h-full bg-[#FAF7F2] rounded-[32px] overflow-hidden shadow-inner flex flex-col justify-between select-none">
          {/* Top header on the invitation screen */}
          <motion.div
            animate={isCardEmerging ? { opacity: 0, y: -15 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full text-center pt-8 px-6 z-10"
          >
            <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-extrabold text-amber-700">
              Wedding Invitation
            </span>
            <h1 className="font-serif text-xl tracking-[0.1em] text-stone-900 font-semibold mt-1">
              JACINTA &amp; MAURICE
            </h1>
            <p className="text-[11px] font-serif italic text-stone-500 mt-0.5">
              Saturday, 12th December 2026
            </p>
          </motion.div>

          {/* Central Envelope Area with overflow visible for card extraction */}
          <div className="relative flex-1 w-full flex items-center justify-center px-4 overflow-visible">
            {/* The Envelope Outer Box */}
            <div className="relative w-full aspect-[4/3] flex items-center justify-center">
              {/* 1. Envelope Back Panel & Luxurious Warm Cream / Champagne Lining (NO GREEN) */}
              <div className="absolute inset-0 bg-[#EAE3D6] rounded-2xl shadow-[0_12px_35px_rgba(0,0,0,0.14)] border border-[#DFD8CD] overflow-hidden">
                {/* Elegant Cream & Subtle Champagne Foil Interior Lining */}
                <div className="absolute inset-2 rounded-xl bg-gradient-to-b from-[#F7F3EB] to-[#ECE5D8] border border-amber-300/40 flex flex-col items-center justify-center p-4">
                  <div className="w-16 h-16 rounded-full border border-amber-300/50 flex items-center justify-center opacity-60">
                    <span className="font-serif text-amber-800 text-sm tracking-widest font-semibold">J &amp; M</span>
                  </div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400/10 via-transparent to-transparent opacity-80" />
                </div>
              </div>

              {/* 2. THE PHYSICAL INVITATION CARD (Slides out of the envelope) */}
              <motion.div
                initial={{ y: 25, scale: 0.94, opacity: 0.85 }}
                animate={
                  isCardEmerging
                    ? { y: -125, scale: 1.03, opacity: 1, zIndex: 40 }
                    : { y: 25, scale: 0.94, opacity: 0.85, zIndex: 10 }
                }
                transition={{
                  duration: 1.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => {
                  if (isCardEmerging) onOpen();
                }}
                className={`absolute w-[92%] aspect-[4/3.2] bg-[#FFFDF9] rounded-xl border border-amber-300/90 shadow-[0_18px_45px_rgba(0,0,0,0.22)] p-4 flex flex-col justify-between text-center cursor-pointer transition-shadow hover:shadow-[0_22px_55px_rgba(0,0,0,0.28)] ${
                  isCardEmerging ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
              >
                {/* Luxury double gold border line */}
                <div className="absolute inset-1.5 rounded-lg border border-amber-200/80 pointer-events-none" />

                {/* Card Top: Mini Crest & Monogram */}
                <div className="pt-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F5D882] via-[#D4AF37] to-[#A37B24] mx-auto flex items-center justify-center shadow-xs text-white text-[10px] font-serif font-bold tracking-widest">
                    J&amp;M
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.22em] font-sans font-bold text-amber-800 block mt-1">
                    Wedding Invitation
                  </span>
                </div>

                {/* Card Center: Couple Names in ONE clean color */}
                <div className="my-auto py-1">
                  <h2 className="font-serif text-2xl md:text-3xl text-stone-900 font-normal tracking-wide">
                    Jacinta &amp; Maurice
                  </h2>
                  <div className="w-12 h-[1px] bg-amber-400 mx-auto my-1.5" />
                  <p className="font-serif italic text-xs text-stone-600">
                    The Sacrament of Holy Matrimony
                  </p>
                </div>

                {/* Card Bottom: Date & Venue */}
                <div className="pb-1 text-[11px] font-sans">
                  <p className="font-bold text-stone-800 tracking-wider uppercase text-[10px]">
                    Saturday, 12th December 2026
                  </p>
                  <p className="text-stone-500 text-[9.5px] mt-0.5">
                    Parklands Baptist Church • Shinyanga House, Tigoni
                  </p>
                </div>

                {/* Tap to enter cue */}
                {isCardEmerging && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                  >
                    <span className="text-[10px] font-sans uppercase tracking-widest text-amber-800 bg-amber-50/90 border border-amber-200 px-3 py-1 rounded-full shadow-xs">
                      Tap card to open
                    </span>
                  </motion.div>
                )}
              </motion.div>

              {/* 3. Envelope Front Pocket (Left, Right, and Bottom Flaps) */}
              {/* Left Flap */}
              <div className="absolute inset-0 pointer-events-none z-20">
                <svg
                  className="absolute inset-0 w-full h-full drop-shadow-[2px_0_4px_rgba(0,0,0,0.05)]"
                  viewBox="0 0 400 300"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path d="M0 0 L200 150 L0 300 Z" fill="#EAE4D9" />
                  <path d="M0 0 L200 150 L0 300" stroke="#DFD8CD" strokeWidth="1" />
                </svg>

                {/* Right Flap */}
                <svg
                  className="absolute inset-0 w-full h-full drop-shadow-[-2px_0_4px_rgba(0,0,0,0.05)]"
                  viewBox="0 0 400 300"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path d="M400 0 L200 150 L400 300 Z" fill="#EAE4D9" />
                  <path d="M400 0 L200 150 L400 300" stroke="#DFD8CD" strokeWidth="1" />
                </svg>

                {/* Bottom Flap */}
                <svg
                  className="absolute inset-0 w-full h-full drop-shadow-[0_-3px_5px_rgba(0,0,0,0.06)]"
                  viewBox="0 0 400 300"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path d="M0 300 L200 150 L400 300 Z" fill="#E4DED2" />
                  <path d="M0 300 L200 150 L400 300" stroke="#DFD8CD" strokeWidth="1" />
                </svg>
              </div>

              {/* 4. Top Flap with 3D Fold Animation */}
              <motion.div
                initial={false}
                animate={
                  isFlapOpen
                    ? {
                        rotateX: 180,
                        zIndex: 5,
                      }
                    : {
                        rotateX: 0,
                        zIndex: 35,
                      }
                }
                transition={{
                  duration: 0.8,
                  ease: [0.77, 0, 0.175, 1],
                }}
                style={{
                  transformOrigin: 'top center',
                  transformStyle: 'preserve-3d',
                }}
                className="absolute inset-0 pointer-events-none"
              >
                <svg
                  className="w-full h-full drop-shadow-[0_6px_10px_rgba(0,0,0,0.12)]"
                  viewBox="0 0 400 300"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path d="M0 0 L200 150 L400 0 Z" fill="#ECE6DB" />
                  <path d="M0 0 L200 150 L400 0" stroke="#DFD8CD" strokeWidth="1" />
                  {/* Subtle embossed border */}
                  <path
                    d="M30 15 L200 140 L370 15"
                    stroke="#F8F6F0"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                </svg>
              </motion.div>

              {/* 5. Golden Wax Seal with Crest (Sits on top flap when closed) */}
              <AnimatePresence>
                {isSealed && (
                  <motion.div
                    key="wax-seal"
                    initial={{ scale: 1, opacity: 1 }}
                    exit={{
                      scale: 1.3,
                      opacity: 0,
                      filter: 'blur(4px)',
                      transition: { duration: 0.4, ease: 'easeOut' },
                    }}
                    onClick={handleOpen}
                    className="absolute z-40 cursor-pointer select-none group"
                  >
                    {/* Glowing Backlight Halo in Radiant Gold */}
                    <div
                      className="absolute -inset-6 rounded-full bg-amber-400/40 blur-xl group-hover:bg-amber-300/55 transition-all duration-300 animate-pulse"
                      style={{ animationDuration: '3s' }}
                    />

                    {/* Realistic 3D Wax Seal Body in Radiant Metallic Gold */}
                    <div className="relative w-28 h-28 rounded-full flex items-center justify-center p-1 bg-gradient-to-br from-[#F5D882] via-[#D4AF37] to-[#8C6D1F] shadow-[0_12px_28px_rgba(180,135,30,0.5),_inset_0_3px_5px_rgba(255,255,255,0.65),_inset_0_-4px_8px_rgba(70,50,10,0.5)] border border-[#C59E36] transition-transform duration-300 active:scale-95 group-hover:scale-105">
                      {/* Organic wavy/dripping edge border layer in rich gold */}
                      <div className="absolute -inset-1.5 rounded-full border-[3px] border-[#B88E2D]/60 opacity-90" />

                      {/* Inner Circular Well of the golden crest */}
                      <div className="w-22 h-22 rounded-full bg-gradient-to-tl from-[#9C7A23] via-[#C8A13B] to-[#E9CB72] flex items-center justify-center shadow-[inset_0_4px_8px_rgba(70,50,10,0.6),_0_2px_2px_rgba(255,255,255,0.35)] border border-[#7D5E16] relative overflow-hidden">
                        {/* Golden monograms inside the wax seal */}
                        <div className="flex flex-col items-center justify-center text-center select-none pointer-events-none">
                          <div className="absolute inset-2.5 rounded-full border border-amber-100/60" />

                          {/* Stylized Gold monogram lettering J & M */}
                          <svg className="w-14 h-14" viewBox="0 0 100 100" fill="none">
                            <defs>
                              <linearGradient id="gold-seal-env" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFFFFF" />
                                <stop offset="25%" stopColor="#FFF2D1" />
                                <stop offset="60%" stopColor="#F5DC8C" />
                                <stop offset="100%" stopColor="#C99E37" />
                              </linearGradient>
                              <filter id="seal-shadow" x="-10%" y="-10%" width="120%" height="120%">
                                <feDropShadow dx="1" dy="2" stdDeviation="1.2" floodColor="#422E06" floodOpacity="0.65" />
                              </filter>
                            </defs>

                            <g filter="url(#seal-shadow)">
                              <text
                                x="34"
                                y="58"
                                fontFamily="'Playfair Display', 'Didot', 'Georgia', serif"
                                fontSize="34"
                                fontWeight="light"
                                fontStyle="italic"
                                fill="url(#gold-seal-env)"
                                textAnchor="middle"
                              >
                                J
                              </text>
                              <text
                                x="49"
                                y="53"
                                fontFamily="'Playfair Display', 'Didot', 'Georgia', serif"
                                fontSize="17"
                                fontStyle="italic"
                                fill="url(#gold-seal-env)"
                                opacity="0.9"
                                textAnchor="middle"
                              >
                                &amp;
                              </text>
                              <text
                                x="66"
                                y="58"
                                fontFamily="'Playfair Display', 'Didot', 'Georgia', serif"
                                fontSize="34"
                                fontWeight="light"
                                fontStyle="italic"
                                fill="url(#gold-seal-env)"
                                textAnchor="middle"
                              >
                                M
                              </text>
                            </g>
                          </svg>
                        </div>

                        {/* Highlight reflection */}
                        <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent -rotate-12 transform origin-top-left scale-150 pointer-events-none" />
                      </div>
                    </div>

                    {/* Interactive feedback indicator: high-visibility call-to-action badge */}
                    <div className="absolute top-full mt-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-center z-40">
                      <p
                        className="font-sans font-bold text-xs uppercase tracking-widest text-stone-900 bg-white/95 border-2 border-amber-400 px-4 py-1.5 rounded-full shadow-lg flex items-center justify-center gap-2 animate-bounce"
                        style={{ animationDuration: '2s' }}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '4s' }} />
                        <span className="text-stone-900">Tap Seal to Open</span>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Footer Details */}
          <motion.div
            animate={isCardEmerging ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full text-center pb-8 px-6 z-10 flex flex-col items-center gap-1"
          >
            <p className="font-serif text-[13px] text-stone-700 tracking-wide italic">
              The Sacrament of Holy Matrimony &amp; Wedding Celebration
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
