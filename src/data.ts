import { ProgramItem, ColorSwatch } from './types';

// Saturday, 12th December 2026 (EAT)
export const WEDDING_DATE = new Date('2026-12-12T10:00:00+03:00');

export const WEDDING_DETAILS = {
  couple: {
    bride: 'Jacinta',
    groom: 'Maurice',
    brideFull: 'Jacinta Mbilo',
    groomFull: 'Maurice Opiyo',
  },
  families: {
    brideFamily: 'Mr Joseph Mbilo & Late Mrs. Martha Nduku',
    groomFamily: 'Late Mr Joseph Odoyo & Late Mrs. Monica Agola',
    fullText: 'The family of Mr Joseph Mbilo & Late. Mrs. Martha Nduku & Late Mr Joseph Odoyo & Late Mrs. Monica Agola',
  },
  tagline: 'Two lives, two hearts, joined together in friendship and united forever in love.',
  ceremony: {
    time: '10:00 AM Prompt',
    venue: 'Parklands Baptist Church',
    address: 'Kippro Center, 20 Sports Rd, Nairobi',
    coordinates: { lat: -1.2667, lng: 36.8122 },
    mapEmbedUrl: 'https://maps.google.com/maps?q=Kippro+Center,+20+Sports+Rd,+Nairobi&t=&z=16&ie=UTF8&iwloc=&output=embed',
  },
  reception: {
    time: '1:00 PM',
    venue: 'Shinyanga House, Tigoni',
    address: 'Tigoni, Kiambu County, Kenya',
    coordinates: { lat: -1.1485, lng: 36.6853 },
    mapEmbedUrl: 'https://maps.google.com/maps?q=Shinyanga+House+Tigoni&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },
  rsvpDeadline: '30th November 2026',
  contacts: [
    { name: 'Jacinta Mbilo (Bride)', phone: '+254 722 000 000' },
    { name: 'Maurice Opiyo (Groom)', phone: '+254 733 000 000' },
  ],
  dressCode: {
    title: 'Dress Code',
    guideline: 'Elegant and Classy',
    themeColorsText: 'Dusty Rose, Sage Green, Champagne Gold',
  },
  themeColors: {
    dustyRose: {
      name: 'Dusty Rose',
      hex: '#C87D88',
      textColor: '#5C242C',
      description: 'A romantic, vintage rose blush tone embodying elegance, tender affection, and warmth.',
    },
    sageGreen: {
      name: 'Sage Green',
      hex: '#7A9A7B',
      textColor: '#243A25',
      description: 'An earthy, calming botanical green celebrating harmony, serenity, and fertile new beginnings.',
    },
    champagneGold: {
      name: 'Champagne Gold',
      hex: '#D4AF37',
      textColor: '#594411',
      description: 'A radiant, festive champagne gold accent representing celebration and enduring joy.',
    },
  },
  bibleVerses: [
    {
      text: 'The Lord God said, “It is not good for the man to be alone. I will make a helper suitable for him.”',
      reference: 'Genesis 2:18 (NIV)',
    },
    {
      text: 'Two are better than one, because they have a good return for their labor.',
      reference: 'Ecclesiastes 4:9 (NIV)',
    },
    {
      text: 'A wife of noble character who can find? She is worth far more than rubies.',
      reference: 'Proverbs 31:10 (NIV)',
    },
  ],
};

export const PROGRAM_ITEMS: ProgramItem[] = [
  {
    time: '10:00 AM',
    duration: '2 hours',
    title: 'Church Service & Holy Matrimony',
    description: 'Sacrament of Holy Matrimony and marriage service at Parklands Baptist Church.',
    bullets: ['Processional & Opening Hymn', 'Scripture Readings', 'Exchange of Sacred Vows & Rings', 'Signing of Marriage Certificate'],
    isChurch: true,
  },
  {
    time: '12:00 PM',
    duration: 'Departure',
    title: 'Leave for Reception',
    description: 'Guests and bridal party journey to Shinyanga House, Tigoni.',
    isChurch: false,
  },
  {
    time: '12:00 PM - 1:00 PM',
    duration: '1 hour',
    title: 'Photoshoot',
    description: 'Bridal party and family portrait photoshoot at scenic grounds.',
    isChurch: false,
  },
  {
    time: '1:00 PM - 2:00 PM',
    duration: '1 hour',
    title: 'Arrival and Lunch',
    description: 'Guest arrival at Shinyanga House, Tigoni, ushering to seats, and luncheon feast.',
    bullets: ['Arrival of Guests & Ushering', 'Opening Prayer for Meal', 'Luncheon Feast'],
    isChurch: false,
  },
  {
    time: '2:00 PM - 2:40 PM',
    duration: '40 mins',
    title: 'Photoshoot',
    description: 'Afternoon garden photoshoot in lush Tigoni with family and friends.',
    isChurch: false,
  },
  {
    time: '2:40 PM - 4:00 PM',
    duration: '1 hr 20 mins',
    title: 'Grand Entrance & Speeches',
    description: 'Celebratory entrance welcoming Jacinta & Maurice, followed by speeches and toasts.',
    bullets: ['Grand Entrance of Newlyweds', 'Speeches by Parents & Families', 'Friends & Guests Tributes'],
    isChurch: false,
  },
  {
    time: '4:00 PM - 4:45 PM',
    duration: '45 mins',
    title: 'Cake Cutting',
    description: 'Celebratory cutting of the wedding cake and presentation to parents and guests.',
    bullets: ['Cake Cutting Ceremony', 'Sharing with Parents', 'Toast to the Couple'],
    isChurch: false,
  },
  {
    time: '4:45 PM - 5:00 PM',
    duration: '15 mins',
    title: 'Vote of Thanks and Bouquet Toss',
    description: 'Words of gratitude from the newlyweds and the joyful bouquet toss.',
    bullets: ['Couple’s Vote of Thanks', 'Bouquet Toss'],
    isChurch: false,
  },
  {
    time: '5:00 PM - 5:15 PM',
    duration: '15 mins',
    title: 'Closing Prayers',
    description: 'Pastoral blessing and closing prayer to seal the joyous occasion.',
    bullets: ['Closing Prayer & Benediction'],
    isChurch: false,
  },
  {
    time: '5:15 PM Onwards',
    duration: 'Evening',
    title: 'Socializing and Departure',
    description: 'Music, evening socializing, and guest departure at leisure in scenic Tigoni.',
    isChurch: false,
  },
];

export const COLOR_SWATCHES: ColorSwatch[] = [
  {
    name: 'Dusty Rose',
    hex: '#C87D88',
    textColor: '#5C242C',
    description: 'A romantic, vintage blush rose embodying warmth, tenderness, and graceful sophistication.',
  },
  {
    name: 'Sage Green',
    hex: '#7A9A7B',
    textColor: '#243A25',
    description: 'A calming earthy botanical green representing life, renewal, and natural harmony in lush Tigoni.',
  },
  {
    name: 'Champagne Gold',
    hex: '#D4AF37',
    textColor: '#594411',
    description: 'A radiant, festive champagne gold adding royal radiance and timeless celebratory sparkle.',
  },
  {
    name: 'Soft Rose Quartz',
    hex: '#E8C5C8',
    textColor: '#6F3640',
    description: 'A delicate pastel tone complementing dusty rose for light and airy fabrics.',
  },
  {
    name: 'Deep Forest Sage',
    hex: '#4A624B',
    textColor: '#FFFFFF',
    description: 'A rich, grounding botanical green that balances the palette with striking contrast.',
  },
  {
    name: 'Ivory Cream Linen',
    hex: '#FAF6ED',
    textColor: '#544733',
    description: 'A classic, organic neutral base that ties all the vibrant colors together effortlessly.',
  },
];
