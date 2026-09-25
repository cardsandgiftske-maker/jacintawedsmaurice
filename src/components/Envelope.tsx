import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
  onSealBreak?: () => void;
}

export default function Envelope({ onOpen, onSealBreak }: EnvelopeProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isSealed, setIsSealed] = useState(true);

  const handleOpen = () => {
    if (!isSealed) return;
    setIsSealed(false);
    
    if (onSealBreak) {
      onSealBreak();
    }
    
    // Stagger the opening of the envelope flaps after the seal breaks
    setTimeout(() => {
      setIsOpened(true);
    }, 800);

    // Call parent onOpen after envelope slides/fades away
    setTimeout(() => {
      onOpen();
    }, 1800);
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        filter: 'blur(8px)',
        transition: { duration: 1.0, ease: [0.43, 0.13, 0.23, 0.96] }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-stone-900 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-850 via-stone-900 to-black p-4 md:p-6"
    >
      {/* Ambient background flora/glow simulation with Dusty Rose and Sage Green */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-dustyrose-600/30 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-sage-600/25 blur-3xl animate-pulse" style={{ animationDuration: '11s' }} />
      </div>

      {/* Main interactive container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ 
          opacity: 0, 
          scale: 1.15, 
          y: -30, 
          transition: { duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] } 
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full max-w-[430px] aspect-[9/16] max-h-[90vh] bg-stone-950/40 backdrop-blur-sm rounded-[40px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-stone-800/60 flex items-center justify-center overflow-hidden"
      >
        {/* Phone screen boundary or card viewport */}
        <div className="relative w-full h-full bg-[#FCFAF7] rounded-[32px] overflow-hidden shadow-inner flex flex-col justify-between">
          
          {/* Top header on the invitation screen */}
          <div className="w-full text-center pt-8 px-6 z-10">
            <span className="text-[10px] tracking-[0.25em] uppercase font-sans font-extrabold text-dustyrose-700">
              Wedding Invitation
            </span>
            <h1 className="font-serif text-xl tracking-[0.1em] text-stone-900 font-semibold mt-1">
              JACINTA &amp; MAURICE
            </h1>
            <p className="text-[11px] font-serif italic text-stone-500 mt-0.5">
              Saturday, 12th December 2026
            </p>
          </div>

          {/* Central Envelope Area */}
          <div className="relative flex-1 w-full flex items-center justify-center px-4">
            
            {/* The Envelope Base */}
            <div className="relative w-full aspect-[4/3] bg-[#EFEAE2] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#DFD8CD] overflow-hidden flex items-center justify-center">
              
              {/* Backing Inner Lining (Sage with subtle champagne gold sparkles, seen as flap unfolds) */}
              <div className="absolute inset-0 bg-[#2D3B2D] flex flex-col items-center justify-center text-center p-4">
                <div className="w-16 h-16 rounded-full border border-champagne-300/40 flex items-center justify-center opacity-60">
                  <span className="font-serif text-champagne-200 text-sm tracking-widest font-semibold">J&amp;M</span>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400/15 via-transparent to-transparent opacity-70" />
              </div>

              {/* Envelope Flaps Wrapper */}
              <div className="absolute inset-0 overflow-hidden">
                
                {/* 1. Left Flap (Cream with subtle floral embossing) */}
                <motion.svg 
                  animate={isOpened ? { x: '-100%', opacity: 0 } : { x: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
                  className="absolute inset-0 w-full h-full drop-shadow-[4px_0_6px_rgba(0,0,0,0.06)]"
                  viewBox="0 0 400 300"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path d="M0 0 L200 150 L0 300 Z" fill="#EAE4D9" />
                  <path d="M0 0 L200 150 L0 300" stroke="#DFD8CD" strokeWidth="1" />
                  
                  {/* Delicate embossed floral pattern lines */}
                  <path d="M15 35 C 30 50, 45 45, 50 60 C 55 75, 40 90, 60 105" stroke="#F8F6F0" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                  <path d="M10 210 C 25 195, 40 200, 45 185 C 50 170, 35 155, 55 140" stroke="#F8F6F0" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                  <circle cx="50" cy="60" r="1.5" fill="#F8F6F0" opacity="0.6" />
                  <circle cx="45" cy="185" r="1.5" fill="#F8F6F0" opacity="0.6" />
                </motion.svg>

                {/* 2. Right Flap */}
                <motion.svg 
                  animate={isOpened ? { x: '100%', opacity: 0 } : { x: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
                  className="absolute inset-0 w-full h-full drop-shadow-[-4px_0_6px_rgba(0,0,0,0.06)]"
                  viewBox="0 0 400 300"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path d="M400 0 L200 150 L400 300 Z" fill="#EAE4D9" />
                  <path d="M400 0 L200 150 L400 300" stroke="#DFD8CD" strokeWidth="1" />
                  
                  {/* Delicate embossed floral pattern lines */}
                  <path d="M385 35 C 370 50, 355 45, 350 60 C 345 75, 360 90, 340 105" stroke="#F8F6F0" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                  <path d="M390 210 C 375 195, 360 200, 355 185 C 350 170, 365 155, 345 140" stroke="#F8F6F0" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                  <circle cx="350" cy="60" r="1.5" fill="#F8F6F0" opacity="0.6" />
                  <circle cx="355" cy="185" r="1.5" fill="#F8F6F0" opacity="0.6" />
                </motion.svg>

                {/* 3. Bottom Flap */}
                <motion.svg 
                  animate={isOpened ? { y: '100%', opacity: 0 } : { y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.15 }}
                  className="absolute inset-0 w-full h-full drop-shadow-[0_-5px_8px_rgba(0,0,0,0.05)]"
                  viewBox="0 0 400 300"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path d="M0 300 L200 150 L400 300 Z" fill="#E5DFD3" opacity="0.95" />
                  <path d="M0 300 L200 150 L400 300" stroke="#DFD8CD" strokeWidth="1" />
                  
                  {/* Elegant decorative center leaf stem on bottom flap */}
                  <path d="M200 280 L200 210" stroke="#F8F6F0" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" opacity="0.7" />
                  <path d="M190 240 C 195 235, 198 235, 200 240" stroke="#F8F6F0" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                  <path d="M210 240 C 205 235, 202 235, 200 240" stroke="#F8F6F0" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                  <path d="M185 260 C 192 255, 195 255, 200 260" stroke="#F8F6F0" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                  <path d="M215 260 C 208 255, 205 255, 200 260" stroke="#F8F6F0" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                </motion.svg>

                {/* 4. Top Flap (Folds upwards) */}
                <motion.svg 
                  animate={isOpened ? { 
                    rotateX: 180, 
                    transformOrigin: 'top',
                    y: '-10%',
                    opacity: 0,
                    zIndex: 0
                  } : { 
                    rotateX: 0,
                    transformOrigin: 'top',
                    y: 0,
                    opacity: 1,
                    zIndex: 20
                  }}
                  transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
                  className="absolute inset-0 w-full h-full drop-shadow-[0_6px_10px_rgba(0,0,0,0.1)]"
                  viewBox="0 0 400 300"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path d="M0 0 L200 150 L400 0 Z" fill="#ECE6DB" />
                  <path d="M0 0 L200 150 L400 0" stroke="#DFD8CD" strokeWidth="1" />
                  
                  {/* Subtle leafy ornaments on the top flap */}
                  <path d="M140 30 C 170 60, 230 60, 260 30" stroke="#F8F6F0" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                  <path d="M160 45 C 180 55, 220 55, 240 45" stroke="#F8F6F0" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
                  <circle cx="200" cy="55" r="2" fill="#F8F6F0" opacity="0.6" />
                </motion.svg>

              </div>

              {/* 5. Elegant Luxury Golden Wax Seal / Crest Overlay with J & M Monogram */}
              <AnimatePresence>
                {isSealed && (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ 
                      scale: 1.6, 
                      opacity: 0,
                      rotate: 15,
                      filter: 'blur(4px)'
                    }}
                    transition={{ 
                      type: 'spring',
                      stiffness: 150,
                      damping: 15,
                      exit: { duration: 0.7, ease: 'easeIn' }
                    }}
                    onClick={handleOpen}
                    className="absolute z-30 cursor-pointer select-none group"
                    style={{ transformPerspective: 1000 }}
                  >
                    {/* Glowing Backlight Halo Glow in Radiant Gold */}
                    <div className="absolute -inset-6 rounded-full bg-amber-400/40 blur-xl group-hover:bg-amber-300/55 transition-all duration-300 animate-pulse" style={{ animationDuration: '3s' }} />

                    {/* Realistic 3D Wax Seal Body in Radiant Metallic Gold */}
                    <div className="relative w-28 h-28 rounded-full flex items-center justify-center p-1 bg-gradient-to-br from-[#F5D882] via-[#D4AF37] to-[#8C6D1F] shadow-[0_12px_28px_rgba(180,135,30,0.5),_inset_0_3px_5px_rgba(255,255,255,0.65),_inset_0_-4px_8px_rgba(70,50,10,0.5)] border border-[#C59E36] transition-transform duration-300 active:scale-95 group-hover:scale-105">
                      
                      {/* Organic wavy/dripping edge border layer in rich gold */}
                      <div className="absolute -inset-1.5 rounded-full border-[3px] border-[#B88E2D]/60 opacity-90" />
                      
                      {/* Inner Circular Well of the golden crest */}
                      <div className="w-22 h-22 rounded-full bg-gradient-to-tl from-[#9C7A23] via-[#C8A13B] to-[#E9CB72] flex items-center justify-center shadow-[inset_0_4px_8px_rgba(70,50,10,0.6),_0_2px_2px_rgba(255,255,255,0.35)] border border-[#7D5E16] relative overflow-hidden">
                        
                        {/* Golden monograms inside the wax seal */}
                        <div className="flex flex-col items-center justify-center text-center select-none pointer-events-none">
                          {/* Fine luxury gold circular border line */}
                          <div className="absolute inset-2.5 rounded-full border border-amber-100/60" />
                          
                          {/* Stylized Gold monogram lettering J & M */}
                          <svg className="w-14 h-14" viewBox="0 0 100 100" fill="none">
                            <defs>
                              <linearGradient id="gold-seal" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFFFFF" />
                                <stop offset="25%" stopColor="#FFF2D1" />
                                <stop offset="60%" stopColor="#F5DC8C" />
                                <stop offset="100%" stopColor="#C99E37" />
                              </linearGradient>
                              <filter id="subtle-shadow" x="-10%" y="-10%" width="120%" height="120%">
                                <feDropShadow dx="1" dy="2" stdDeviation="1.2" floodColor="#422E06" floodOpacity="0.65" />
                              </filter>
                            </defs>
                            
                            {/* Handcrafted Serif Calligraphy monogram JM */}
                            <g filter="url(#subtle-shadow)">
                              {/* Letter J */}
                              <text 
                                x="34" 
                                y="58" 
                                fontFamily="'Playfair Display', 'Didot', 'Georgia', serif" 
                                fontSize="34" 
                                fontWeight="light"
                                fontStyle="italic"
                                fill="url(#gold-seal)"
                                textAnchor="middle"
                              >
                                J
                              </text>
                              {/* Intertwining ampersand symbol */}
                              <text 
                                x="49" 
                                y="53" 
                                fontFamily="'Playfair Display', 'Didot', 'Georgia', serif" 
                                fontSize="17" 
                                fontStyle="italic"
                                fill="url(#gold-seal)"
                                opacity="0.9"
                                textAnchor="middle"
                              >
                                &amp;
                              </text>
                              {/* Letter M */}
                              <text 
                                x="66" 
                                y="58" 
                                fontFamily="'Playfair Display', 'Didot', 'Georgia', serif" 
                                fontSize="34" 
                                fontWeight="light"
                                fontStyle="italic"
                                fill="url(#gold-seal)"
                                textAnchor="middle"
                              >
                                M
                              </text>
                            </g>
                          </svg>
                        </div>
                        
                        {/* Realistic glass-like highlight reflect overlay */}
                        <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent -rotate-12 transform origin-top-left scale-150 pointer-events-none" />
                      </div>
                    </div>

                    {/* Interactive feedback indicator: high-visibility call-to-action badge */}
                    <div className="absolute top-full mt-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-center z-40">
                      <p className="font-sans font-bold text-xs uppercase tracking-widest text-stone-900 bg-white/95 border-2 border-amber-400 px-4 py-1.5 rounded-full shadow-lg flex items-center justify-center gap-2 animate-bounce" style={{ animationDuration: '2s' }}>
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
          <div className="w-full text-center pb-10 px-6 z-10 flex flex-col items-center gap-1">
            <p className="font-serif text-[13px] text-stone-700 tracking-wide italic">
              The Sacrament of Holy Matrimony &amp; Wedding Celebration
            </p>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}
