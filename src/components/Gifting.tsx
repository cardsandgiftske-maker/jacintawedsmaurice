import React, { useState } from 'react';
import { Gift, Copy, Check, Sparkles, Mail, Heart } from 'lucide-react';
import { MPESA_DETAILS, WEDDING_DETAILS } from '../data';

export default function Gifting() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section className="relative py-20 md:py-28 bg-[#FAF7F3] text-stone-900 border-t border-[#D4AF37]/30" id="gifting-section">
      {/* Background Radial Gold Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-200/20 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-[#87434E] text-xs font-bold tracking-widest uppercase font-sans flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Love &amp; Blessings</span>
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-[#4A1F26] font-semibold mb-3">
            Gift Options &amp; Blessings
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
          
          {/* Couple's exact gifting message */}
          <div className="mt-5 p-5 max-w-xl mx-auto rounded-2xl bg-white border border-[#D4AF37]/40 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#87434E]/10 text-[#87434E] flex items-center justify-center mx-auto mb-2.5">
              <Mail className="w-5 h-5 text-[#87434E]" />
            </div>
            <p className="text-stone-800 text-base md:text-lg font-serif italic leading-relaxed">
              &ldquo;{WEDDING_DETAILS.registry.note}&rdquo;
            </p>
          </div>
        </div>

        {/* MPesa / Enveloped Gifting Card */}
        <div className="bg-white border-2 border-[#D4AF37]/60 p-8 md:p-10 rounded-3xl shadow-xl text-stone-900 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#87434E] via-[#D4AF37] to-[#58735B]" />

          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#87434E]/10 text-[#87434E] flex items-center justify-center border border-[#87434E]/20">
              <Gift className="w-6 h-6 text-[#87434E]" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#4A1F26]">
              Digital &amp; Enveloped Gifting
            </h3>
          </div>

          <div className="space-y-4 max-w-md mx-auto">
            {/* Paybill Number */}
            <div className="flex items-center justify-between p-4 bg-stone-50 border border-stone-200 rounded-2xl shadow-xs">
              <div>
                <span className="text-[10px] text-stone-500 font-sans uppercase font-bold tracking-widest block">Paybill Number</span>
                <span className="text-xl font-mono font-bold text-[#4A1F26]">{MPESA_DETAILS.paybill}</span>
              </div>
              <button
                onClick={() => copyToClipboard(MPESA_DETAILS.paybill, 'paybill')}
                className="px-3 py-2 bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                {copiedField === 'paybill' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#87434E]" />}
                <span>{copiedField === 'paybill' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Account Number */}
            <div className="flex items-center justify-between p-4 bg-stone-50 border border-stone-200 rounded-2xl shadow-xs">
              <div>
                <span className="text-[10px] text-stone-500 font-sans uppercase font-bold tracking-widest block">Account Number</span>
                <span className="text-xl font-mono font-bold text-[#4A1F26]">{MPESA_DETAILS.accountNumber}</span>
              </div>
              <button
                onClick={() => copyToClipboard(MPESA_DETAILS.accountNumber, 'account')}
                className="px-3 py-2 bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                {copiedField === 'account' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#87434E]" />}
                <span>{copiedField === 'account' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Account Name */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl shadow-xs text-center">
              <span className="text-[10px] text-stone-500 font-sans uppercase font-bold tracking-widest block">Account Name</span>
              <span className="text-base font-serif font-bold text-[#87434E]">{MPESA_DETAILS.accountName}</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-200 text-center text-xs text-stone-600 font-serif italic flex items-center justify-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-[#87434E] fill-[#87434E]/20" />
            <span>Thank you dearly for your love, prayers, and generosity!</span>
          </div>
        </div>
      </div>
    </section>
  );
}

