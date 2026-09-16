import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Compass, ArrowUpRight, Calendar, Clock, Sparkles } from 'lucide-react';
import { WEDDING_DETAILS } from '../data';

export default function LocationMap() {
  const [activeVenue, setActiveVenue] = useState<'ceremony' | 'reception'>('ceremony');

  const venueInfo = activeVenue === 'ceremony' ? WEDDING_DETAILS.ceremony : WEDDING_DETAILS.reception;

  const getNavigationUrl = () => {
    const venueName = encodeURIComponent(venueInfo.venue + ' ' + venueInfo.address);
    return `https://www.google.com/maps/search/?api=1&query=${venueName}`;
  };

  return (
    <section className="relative py-20 md:py-28 bg-[#FAF7F3] text-stone-900 border-t border-[#D4AF37]/30" id="maps-section">
      {/* Background Radial Gold Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200/20 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[#87434E] text-xs font-bold tracking-widest uppercase font-sans flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Ceremony &amp; Celebration</span>
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#4A1F26] font-semibold mb-3">When &amp; Where</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
          <p className="text-stone-700 text-sm md:text-base mt-3 max-w-xl mx-auto italic font-serif">
            Addresses, driving directions, and timelines for our ceremony at Parklands Baptist Church and reception at Shinyanga House, Tigoni.
          </p>
        </div>

        {/* Date, Location, Time Info Panel */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto bg-white border-2 border-[#D4AF37]/60 p-6 rounded-3xl shadow-xl mb-12 text-stone-900 relative">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#87434E] via-[#D4AF37] to-[#58735B]" />

          {/* Calendar Card */}
          <div className="flex flex-col items-center text-center p-3">
            <div className="w-10 h-10 rounded-full bg-[#87434E]/10 text-[#87434E] flex items-center justify-center mb-2">
              <Calendar className="w-5 h-5 text-[#87434E]" />
            </div>
            <p className="text-[10px] text-stone-500 uppercase tracking-widest font-sans font-bold mb-1">The Date</p>
            <p className="text-sm text-stone-800 font-serif font-medium">Saturday</p>
            <p className="text-base text-[#87434E] font-serif font-bold">{WEDDING_DETAILS.dateFormatted}</p>
          </div>

          {/* Time Card */}
          <div className="flex flex-col items-center text-center p-3 border-y sm:border-y-0 sm:border-x border-stone-200">
            <div className="w-10 h-10 rounded-full bg-[#58735B]/10 text-[#58735B] flex items-center justify-center mb-2">
              <Clock className="w-5 h-5 text-[#58735B]" />
            </div>
            <p className="text-[10px] text-stone-500 uppercase tracking-widest font-sans font-bold mb-1">Ceremony Time</p>
            <p className="text-sm text-[#4A1F26] font-serif font-bold">10:00 AM</p>
            <p className="text-xs text-[#58735B] font-sans mt-1 font-bold">Reception: 12:45 PM</p>
          </div>

          {/* Venue Card */}
          <div className="flex flex-col items-center text-center p-3">
            <div className="w-10 h-10 rounded-full bg-[#87434E]/10 text-[#87434E] flex items-center justify-center mb-2">
              <MapPin className="w-5 h-5 text-[#87434E]" />
            </div>
            <p className="text-[10px] text-stone-500 uppercase tracking-widest font-sans font-bold mb-1">Sanctuary</p>
            <p className="text-sm text-stone-800 font-serif font-medium leading-tight">{WEDDING_DETAILS.ceremony.venue}</p>
            <p className="text-xs text-stone-600 font-sans mt-1">Parklands, Nairobi, Kenya</p>
          </div>
        </div>

        {/* Location Toggle Selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white border border-[#D4AF37]/60 p-1.5 rounded-full shadow-md">
            <button
              onClick={() => setActiveVenue('ceremony')}
              className={`px-6 py-2.5 text-xs md:text-sm font-sans font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 cursor-pointer ${
                activeVenue === 'ceremony' ? 'bg-[#87434E] text-white shadow-md' : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>1. Ceremony (10:00 AM)</span>
            </button>
            <button
              onClick={() => setActiveVenue('reception')}
              className={`px-6 py-2.5 text-xs md:text-sm font-sans font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 cursor-pointer ${
                activeVenue === 'reception' ? 'bg-[#87434E] text-white shadow-md' : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Navigation className="w-4 h-4" />
              <span>2. Reception (12:45 PM)</span>
            </button>
          </div>
        </div>

        {/* Info + Map Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Venue Details Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border-2 border-[#D4AF37]/60 rounded-3xl shadow-xl relative overflow-hidden text-stone-900">
            {/* Venue Photo header */}
            <div className="relative h-56 w-full overflow-hidden border-b border-stone-200">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeVenue}
                  src={
                    activeVenue === 'ceremony'
                      ? 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&q=80&w=1000'
                      : 'https://images.unsplash.com/photo-1519225429980-715cb0215aed?auto=format&fit=crop&q=80&w=1000'
                  }
                  alt={venueInfo.venue}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
              <div className="space-y-5 z-10">
                <span className="text-[10px] tracking-widest uppercase font-sans font-extrabold text-[#87434E] px-3 py-1 bg-[#87434E]/10 rounded-full border border-[#87434E]/20 inline-block">
                  {activeVenue === 'ceremony' ? 'Part A: Holy Matrimony' : 'Part B: Reception & Banquet'}
                </span>

                <div className="space-y-1.5">
                  <h3 className="font-serif text-2xl lg:text-3xl text-[#4A1F26] leading-tight font-bold">
                    {venueInfo.venue}
                  </h3>
                  <p className="text-[#58735B] text-xs tracking-wider uppercase font-sans font-bold">
                    {activeVenue === 'ceremony' ? 'Sacred Vows & Worship' : 'Cocktails, Lunch & Grand Entrance'}
                  </p>
                </div>

                <div className="space-y-3.5 pt-4 border-t border-stone-200">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#87434E] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] text-stone-400 uppercase tracking-widest font-sans font-bold">Address</p>
                      <p className="text-sm text-stone-800 leading-normal mt-0.5 font-medium">{venueInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#87434E] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] text-stone-400 uppercase tracking-widest font-sans font-bold">Schedule &amp; Time</p>
                      <p className="text-sm text-stone-800 mt-0.5 font-bold">
                        {activeVenue === 'ceremony' ? '10:00 AM sharp' : '12:45 PM cocktail • 2:00 PM Grand Entrance'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Driving navigation CTA button */}
              <div className="mt-8 pt-5 border-t border-stone-200 z-10">
                <a
                  href={getNavigationUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#87434E] to-[#4A1F26] hover:brightness-110 font-sans font-bold uppercase tracking-wider text-xs text-white rounded-2xl transition-all shadow-md border border-[#D4AF37]/40 group cursor-pointer"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-4 h-4 text-[#F8F3E3] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Map Iframe */}
          <div className="lg:col-span-7 bg-stone-100 border-2 border-[#D4AF37]/60 rounded-3xl overflow-hidden min-h-[380px] lg:min-h-auto flex shadow-xl relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVenue}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full min-h-[380px] flex"
              >
                <iframe
                  title={`Map of ${venueInfo.venue}`}
                  src={venueInfo.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  className="w-full min-h-[400px] border-0 filter contrast-[0.98] hover:contrast-100 transition-all duration-500"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

