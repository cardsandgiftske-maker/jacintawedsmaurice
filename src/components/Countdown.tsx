import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Sparkles, Heart } from 'lucide-react';
import { WEDDING_DATE } from '../data';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = WEDDING_DATE.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPassed: false,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative py-16 md:py-20 bg-white text-stone-900 border-b border-[#D4AF37]/30 overflow-hidden"
      id="countdown-section"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFF9E6]/60 via-white to-white pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 max-w-4xl text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F3] border border-[#D4AF37]/40 text-[#87434E] text-xs font-sans font-bold uppercase tracking-widest mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>The Wedding Countdown</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          </div>

          <h2 className="text-3xl md:text-5xl font-serif text-[#4A1F26] font-semibold mb-3">
            Counting Down Every Moment
          </h2>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-3" />

          <p className="text-stone-600 font-serif italic text-sm md:text-base max-w-lg mx-auto">
            Until Jacinta and Maurice unite in Holy Matrimony on Saturday, December 12, 2026
          </p>
        </motion.div>

        {/* Countdown Cards Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6"
        >
          {/* Days */}
          <div className="relative group">
            <div className="flex flex-col items-center justify-center bg-[#FAF7F3] border-2 border-[#D4AF37]/60 rounded-3xl p-5 md:p-7 min-w-[85px] sm:min-w-[110px] md:min-w-[130px] shadow-lg hover:shadow-xl transition-all">
              <span className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-[#87434E] tracking-tight">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-stone-600 font-sans font-extrabold mt-2">
                Days
              </span>
            </div>
          </div>

          {/* Hours */}
          <div className="relative group">
            <div className="flex flex-col items-center justify-center bg-[#FAF7F3] border-2 border-[#D4AF37]/60 rounded-3xl p-5 md:p-7 min-w-[85px] sm:min-w-[110px] md:min-w-[130px] shadow-lg hover:shadow-xl transition-all">
              <span className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-[#87434E] tracking-tight">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-stone-600 font-sans font-extrabold mt-2">
                Hours
              </span>
            </div>
          </div>

          {/* Minutes */}
          <div className="relative group">
            <div className="flex flex-col items-center justify-center bg-[#FAF7F3] border-2 border-[#D4AF37]/60 rounded-3xl p-5 md:p-7 min-w-[85px] sm:min-w-[110px] md:min-w-[130px] shadow-lg hover:shadow-xl transition-all">
              <span className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-[#87434E] tracking-tight">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-stone-600 font-sans font-extrabold mt-2">
                Minutes
              </span>
            </div>
          </div>

          {/* Seconds */}
          <div className="relative group">
            <div className="flex flex-col items-center justify-center bg-[#FAF7F3] border-2 border-[#D4AF37]/60 rounded-3xl p-5 md:p-7 min-w-[85px] sm:min-w-[110px] md:min-w-[130px] shadow-lg hover:shadow-xl transition-all">
              <span className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-[#87434E] tracking-tight">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-stone-600 font-sans font-extrabold mt-2">
                Seconds
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bottom Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex items-center justify-center gap-2 text-stone-500 text-xs font-serif italic"
        >
          <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Beginning at 10:00 AM EAT • Parklands Baptist Church</span>
          <Heart className="w-3.5 h-3.5 text-[#87434E] fill-[#87434E]/20" />
        </motion.div>
      </div>
    </section>
  );
}
