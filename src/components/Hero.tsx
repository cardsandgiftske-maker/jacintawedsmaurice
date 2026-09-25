import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock } from 'lucide-react';
import { WEDDING_DATE, WEDDING_DETAILS } from '../data';
import Crest from './Crest';
import coupleHandsImg from '../assets/images/couple_hands_wedding_1790328935151.jpg';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export default function Hero() {
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

  const verses = WEDDING_DETAILS.bibleVerses.slice(0, 3);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FCFAF7] text-stone-850 py-16" id="hero-section">
      {/* Background Image with Warm Paper Vignette/Overlay - Couple Hands Only */}
      <div className="absolute inset-0 z-0">
        <img
          src={coupleHandsImg}
          alt="Jacinta and Maurice Hands Joined in Love"
          className="w-full h-full object-cover object-center opacity-[0.28] scale-105 filter brightness-[1.02] contrast-[0.98]"
          referrerPolicy="no-referrer"
        />
        {/* Gradients tailored to Dusty Rose, Sage Green & Champagne */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FCFAF7] via-[#FCFAF7]/85 to-[#FCFAF7]/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#FCFAF7]/45 to-[#FCFAF7]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center max-w-4xl">
        {/* Elegant Crest at the top of the hero */}
        <div className="mb-4">
          <Crest size="md" animated={true} />
        </div>

        {/* Family Names Presentation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-4 bg-white/70 backdrop-blur-xs border border-champagne-300/60 rounded-2xl px-5 py-3 shadow-xs"
        >
          <p className="text-dustyrose-700 font-sans tracking-[0.2em] text-[10px] md:text-xs uppercase font-bold mb-1">
            Together with their Families
          </p>
          <p className="text-stone-800 font-serif text-xs md:text-sm leading-relaxed italic">
            The family of <span className="font-semibold text-stone-900 not-italic">Mr Joseph Mbilo &amp; Late Mrs. Martha Nduku</span>
            <br />
            &amp;
            <br />
            The family of <span className="font-semibold text-stone-900 not-italic">Late Mr Joseph Odoyo &amp; Late Mrs. Monica Agola</span>
          </p>
          <p className="text-stone-500 font-serif text-xs md:text-sm mt-1">
            cordially invite you to celebrate the holy matrimony and wedding celebration of their children
          </p>
        </motion.div>

        {/* Main Title: Jacinta & Maurice */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-light tracking-tight text-stone-900 mb-3"
        >
          <span className="block mb-1 md:inline md:mb-0 text-dustyrose-800 font-medium">Jacinta</span>
          <span className="font-display font-light text-champagne-500 mx-4 text-4xl md:text-6xl italic">&amp;</span>
          <span className="block mt-1 md:inline md:mt-0 text-sage-800 font-medium">Maurice</span>
        </motion.h1>

        {/* Full Names Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-serif text-stone-600 text-sm md:text-base tracking-widest uppercase mb-5"
        >
          Jacinta Mbilo &amp; Maurice Opiyo
        </motion.p>

        {/* Date & Time Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="inline-flex flex-wrap items-center justify-center gap-2.5 px-5 py-2.5 bg-champagne-50/90 border border-champagne-300 rounded-full text-stone-850 text-xs md:text-sm font-sans font-semibold tracking-wider uppercase mb-6 shadow-xs"
        >
          <div className="flex items-center gap-1.5 text-dustyrose-700">
            <Calendar className="w-4 h-4" />
            <span>Saturday, 12th December 2026</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-stone-300 hidden sm:inline-block" />
          <div className="flex items-center gap-1.5 text-sage-800">
            <Clock className="w-4 h-4" />
            <span>10:00 AM Prompt</span>
          </div>
        </motion.div>

        {/* Biblical Quotes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full mx-auto mb-10"
        >
          {verses.map((verse, idx) => (
            <div
              key={`hero-verse-${idx}`}
              className="bg-white/90 border border-stone-200/90 rounded-2xl p-4 md:p-5 flex flex-col justify-between text-center shadow-xs hover:border-dustyrose-300 transition-all"
            >
              <p className="font-serif italic text-stone-800 text-sm md:text-base leading-relaxed mb-3">
                “{verse.text}”
              </p>
              <p className="text-dustyrose-700 font-sans text-[11px] font-bold tracking-widest uppercase not-italic">
                — {verse.reference}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Countdown timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col items-center mb-8"
        >
          <h3 className="text-[10px] text-stone-500 uppercase tracking-widest font-sans font-bold mb-4">
            Countdown to 12th December 2026
          </h3>
          
          <div className="flex gap-3 md:gap-4 text-center">
            {/* Days block */}
            <div className="flex flex-col bg-white border border-stone-200/80 rounded-xl px-4 py-3 min-w-[70px] md:min-w-[90px] shadow-xs">
              <span className="text-2xl md:text-4xl font-serif font-light text-dustyrose-700">{timeLeft.days}</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-sans mt-1">Days</span>
            </div>

            {/* Hours block */}
            <div className="flex flex-col bg-white border border-stone-200/80 rounded-xl px-4 py-3 min-w-[70px] md:min-w-[90px] shadow-xs">
              <span className="text-2xl md:text-4xl font-serif font-light text-dustyrose-700">{timeLeft.hours}</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-sans mt-1">Hours</span>
            </div>

            {/* Minutes block */}
            <div className="flex flex-col bg-white border border-stone-200/80 rounded-xl px-4 py-3 min-w-[70px] md:min-w-[90px] shadow-xs">
              <span className="text-2xl md:text-4xl font-serif font-light text-dustyrose-700">{timeLeft.minutes}</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-sans mt-1">Mins</span>
            </div>

            {/* Seconds block */}
            <div className="flex flex-col bg-white border border-stone-200/80 rounded-xl px-4 py-3 min-w-[70px] md:min-w-[90px] shadow-xs">
              <span className="text-2xl md:text-4xl font-serif font-light text-dustyrose-700">{timeLeft.seconds}</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-sans mt-1">Secs</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Subtle fade overlay */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FCFAF7] to-transparent pointer-events-none" />
    </section>
  );
}
