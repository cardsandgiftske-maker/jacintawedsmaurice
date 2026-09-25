import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Award, Compass, Music, MessageCircle, Gift, Cake, LogOut, Utensils, Navigation, Heart } from 'lucide-react';
import { PROGRAM_ITEMS } from '../data';

export default function Program() {
  const [activeTab, setActiveTab] = useState<'all' | 'church' | 'reception'>('all');

  const filteredItems = PROGRAM_ITEMS.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'church') return item.isChurch;
    return !item.isChurch;
  });

  const getIconForTitle = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('matrimony') || t.includes('church') || t.includes('service')) return <Award className="w-4 h-4 text-dustyrose-700" />;
    if (t.includes('leave') || t.includes('transit')) return <Navigation className="w-4 h-4 text-dustyrose-600" />;
    if (t.includes('photo') || t.includes('shoot')) return <Compass className="w-4 h-4 text-sage-800" />;
    if (t.includes('arrival') || t.includes('lunch') || t.includes('feast')) return <Utensils className="w-4 h-4 text-champagne-600" />;
    if (t.includes('entrance') || t.includes('dancing')) return <Music className="w-4 h-4 text-dustyrose-700" />;
    if (t.includes('speech') || t.includes('presentation')) return <MessageCircle className="w-4 h-4 text-stone-700" />;
    if (t.includes('cake')) return <Cake className="w-4 h-4 text-champagne-600" />;
    if (t.includes('thanks') || t.includes('bouquet') || t.includes('vote')) return <Gift className="w-4 h-4 text-dustyrose-700" />;
    if (t.includes('prayer') || t.includes('closing')) return <Heart className="w-4 h-4 text-dustyrose-700" />;
    return <LogOut className="w-4 h-4 text-sage-800" />;
  };

  return (
    <section className="relative py-24 bg-[#FAF7F2] text-stone-800 border-t border-stone-200/60" id="program-section">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-dustyrose-700 text-xs font-bold tracking-widest uppercase font-sans">The Wedding Schedule</span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-stone-900 mt-2 mb-4">Wedding Programme</h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-champagne-500/50 to-transparent mx-auto" />
          <p className="text-stone-600 text-sm md:text-base mt-4 max-w-xl mx-auto italic font-serif">
            “Two are better than one, because they have a good return for their labor.” <br />
            <span className="text-dustyrose-800 uppercase font-sans text-xs tracking-wider font-semibold not-italic block mt-1">— Ecclesiastes 4:9</span>
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white border border-stone-200 p-1.5 rounded-full shadow-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 text-xs md:text-sm font-sans font-medium uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                activeTab === 'all' ? 'bg-dustyrose-700 text-white font-semibold shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Full Schedule
            </button>
            <button
              onClick={() => setActiveTab('church')}
              className={`px-5 py-2 text-xs md:text-sm font-sans font-medium uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                activeTab === 'church' ? 'bg-dustyrose-700 text-white font-semibold shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Church (10 AM)
            </button>
            <button
              onClick={() => setActiveTab('reception')}
              className={`px-5 py-2 text-xs md:text-sm font-sans font-medium uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                activeTab === 'reception' ? 'bg-sage-700 text-white font-semibold shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Reception (Tigoni)
            </button>
          </div>
        </div>

        {/* Program Timeline */}
        <div className="relative border-l-2 border-champagne-300/80 ml-5 md:ml-10 pl-6 md:pl-10 space-y-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={`program-item-${index}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="relative"
            >
              {/* Timeline Node */}
              <div className="absolute -left-[45px] md:-left-[61px] top-1.5 w-9 h-9 rounded-full bg-white border-2 border-champagne-500 flex items-center justify-center shadow-xs z-10">
                {getIconForTitle(item.title)}
              </div>

              {/* Program Detail Card */}
              <div className="bg-white border border-stone-200/80 rounded-2xl p-5 md:p-6 hover:border-champagne-400 transition-all shadow-xs hover:shadow-md group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-stone-100 mb-3">
                  {/* Time Badge */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-champagne-50 text-stone-900 border border-champagne-300 px-3 py-1 rounded-full text-xs font-sans font-bold tracking-wide">
                      <Clock className="w-3.5 h-3.5 text-dustyrose-700" />
                      <span>{item.time}</span>
                    </span>
                    <span className="text-[11px] text-stone-500 font-sans font-medium">({item.duration})</span>
                  </div>

                  {/* Category Pill */}
                  <span className={`text-[9px] uppercase tracking-wider font-sans font-bold px-2.5 py-1 rounded-full self-start sm:self-auto ${
                    item.isChurch 
                      ? 'bg-dustyrose-50 text-dustyrose-800 border border-dustyrose-200' 
                      : 'bg-sage-100/80 text-sage-900 border border-sage-200'
                  }`}>
                    {item.isChurch ? 'Church Ceremony' : 'Tigoni Reception'}
                  </span>
                </div>

                {/* Title and Description */}
                <h4 className="text-lg md:text-xl font-serif font-medium text-stone-900 group-hover:text-dustyrose-800 transition-colors">
                  {item.title}
                </h4>

                {item.description && (
                  <p className="text-stone-600 text-xs md:text-sm mt-1.5 leading-relaxed font-sans">
                    {item.description}
                  </p>
                )}

                {/* Bullets if available */}
                {item.bullets && item.bullets.length > 0 && (
                  <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-600 font-sans">
                    {item.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-champagne-500" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Card */}
        <div className="mt-14 text-center bg-white border border-stone-200 p-6 rounded-2xl max-w-xl mx-auto shadow-xs">
          <p className="font-serif text-stone-900 italic text-base">
            “We eagerly look forward to sharing every precious moment of this day with you.”
          </p>
          <p className="text-xs text-dustyrose-700 font-sans font-semibold uppercase tracking-wider mt-2">
            Jacinta &amp; Maurice
          </p>
        </div>
      </div>
    </section>
  );
}
