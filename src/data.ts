import { ProgramItem, ColorSwatch } from './types';

// Wedding Date: December 12, 2026 at 10:00 AM EAT
export const WEDDING_DATE = new Date('2026-12-12T10:00:00+03:00'); // East Africa Time

// RSVP Closure Date: November 30, 2026
export const RSVP_DEADLINE = new Date('2026-11-30T23:59:59+03:00');

export const MPESA_DETAILS = {
  paybillName: 'Jacinta & Maurice Wedding Gift',
  paybill: '000000',
  accountNumber: 'Your Name',
  accountName: 'Jacinta & Maurice Wedding'
};

export const WEDDING_DETAILS = {
  date: 'December 12, 2026',
  dateFormatted: 'Saturday, 12th December 2026',
  time: '10:00 AM EAT',
  couple: {
    bride: 'Jacinta',
    groom: 'Maurice',
    brideFull: 'Jacinta Mbilo',
    groomFull: 'Maurice Opiyo',
  },
  bride: {
    name: 'Jacinta',
    fullName: 'Jacinta Mbilo',
  },
  groom: {
    name: 'Maurice',
    fullName: 'Maurice Opiyo',
  },
  parents: {
    intro: 'The family of Mr Joseph Mbilo & Late. Mrs. Martha Nduku & Late Mr Joseph Odoyo & Late Mrs. Monica Agola',
    familyText: 'The family of Mr Joseph Mbilo & Late. Mrs. Martha Nduku & Late Mr Joseph Odoyo & Late Mrs. Monica Agola',
    groomParents: 'Late Mr Joseph Odoyo & Late Mrs. Monica Agola',
    brideParents: 'Mr Joseph Mbilo & Late. Mrs. Martha Nduku',
  },
  ceremony: {
    time: '10:00 AM',
    title: 'Church Matrimony Service',
    venue: 'Parklands Baptist Church',
    address: 'Parklands Baptist Church, Westlands / Parklands, Nairobi, Kenya',
    coordinates: { lat: -1.2655, lng: 36.8095 },
    mapEmbedUrl: 'https://maps.google.com/maps?q=Parklands%20Baptist%20Church%20Nairobi&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },
  reception: {
    time: '12:45 PM cocktail; 2:00 PM Grand Entrance',
    title: 'Cocktail & Grand Reception',
    venue: 'Shinyanga House, Tigoni',
    address: 'Shinyanga House, Tigoni, Limuru, Kenya',
    coordinates: { lat: -1.1448, lng: 36.6853 },
    mapEmbedUrl: 'https://maps.google.com/maps?q=Shinyanga%20House%20Tigoni&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },
  rsvpDeadline: '30th November 2026',
  dressCode: {
    title: 'Dress Code',
    headline: 'Be colourful and elegant. FYI outshine the decorations',
    description: 'Be colourful and elegant. FYI outshine the decorations',
  },
  gifting: {
    note: 'Your presence is our greatest gift of all. However, if you wish to bless us further consider and enveloped one.',
  },
  contacts: [
    { name: 'Jacinta RSVP', phone: '+254 700 000 000' },
    { name: 'Maurice RSVP', phone: '+254 700 000 000' },
  ],
  registry: {
    note: 'Your presence is our greatest gift of all. However, if you wish to bless us further consider and enveloped one.',
    paybillName: 'Jacinta & Maurice Wedding Gift',
    paybill: '4816979',
    accountName: 'Your Name',
  },
  bibleVerses: [
    {
      text: 'I have found the one whom my soul loves.',
      reference: 'Song of Solomon 3:4',
    },
    {
      text: 'Love is patient, love is kind. It always protects, always trusts, always hopes, always perseveres.',
      reference: '1 Corinthians 13:4,7',
    },
    {
      text: 'When the time is right, I, the Lord will make it happen.',
      reference: 'Isaiah 60:22',
    }
  ]
};

export const PROGRAM_ITEMS: ProgramItem[] = [
  {
    time: '10:00 AM – 12:00 PM',
    duration: '2 hours',
    title: 'Church Matrimony Service',
    description: 'Sacrament of Holy Matrimony service at Parklands Baptist Church.',
    bullets: ['Processional & Opening Hymn', 'Word of Exhortation', 'Exchange of Vows & Rings', 'Nuptial Blessing', 'Signing of Marriage Certificate & Family Photos'],
    isChurch: true,
  },
  {
    time: '12:00 PM – 12:45 PM',
    duration: '45 mins',
    title: 'Guest Transfer to Tigoni',
    description: 'Guests make the scenic journey from Parklands to Shinyanga House in Tigoni.',
    isChurch: false,
  },
  {
    time: '12:45 PM – 2:00 PM',
    duration: '1 hour 15 mins',
    title: 'Cocktail & Garden Welcome',
    description: 'Guests arrive at Shinyanga House, Tigoni for welcome drinks, hors d’oeuvres, and ambient music.',
    bullets: ['Welcome Mocktails & Canapés', 'Guest Seating & Scenic Garden Views', 'Acoustic Musical Interlude'],
    isChurch: false,
  },
  {
    time: '2:00 PM – 3:30 PM',
    duration: '1.5 hours',
    title: 'Grand Entrance & Luncheon Feast',
    description: 'Joyous reception of the newlyweds followed by an exquisite luncheon feast.',
    bullets: ['Grand Entrance of Bridal Party & Couple', 'Opening Prayer & Food Blessing', 'Sumptuous Wedding Feast'],
    isChurch: false,
  },
  {
    time: '3:30 PM – 4:30 PM',
    duration: '1 hour',
    title: 'Speeches & Tributes',
    description: 'Heartfelt words of blessing, counsel, and love from the Mbilo and Opiyo families and friends.',
    bullets: ['Family Speeches', 'Friends & Mentors Tributes', 'Couple Response & Toast'],
    isChurch: false,
  },
  {
    time: '4:30 PM – 5:30 PM',
    duration: '1 hour',
    title: 'Cake Cutting & Dancing',
    description: 'Cutting of the celebration cake, presentation to parents, followed by music and dancing.',
    bullets: ['Cake Cutting Ceremony', 'Honoring of Parents', 'First Dance & General Celebration'],
    isChurch: false,
  },
  {
    time: '5:30 PM onwards',
    duration: 'Evening',
    title: 'Evening Fellowship & Departure',
    description: 'Evening tea, congratulations, and departure at leisure. Thank you for gracing our day!',
    isChurch: false,
  },
];

export const COLOR_SWATCHES: ColorSwatch[] = [
  {
    name: 'Dusty Rose',
    hex: '#B76E79',
    textColor: '#FFFFFF',
    description: 'A delicate, romantic muted rose petal hue representing enduring affection, gentleness, and grace.'
  },
  {
    name: 'Sage Green',
    hex: '#7B997F',
    textColor: '#FFFFFF',
    description: 'A serene, refreshing botanical sage tone symbolizing harmony, growth, peace, and new beginnings.'
  },
  {
    name: 'Champagne Gold',
    hex: '#D4AF37',
    textColor: '#2E2205',
    description: 'A warm, luminous metallic champagne gold representing celebratory joy, radiance, and timeless elegance.'
  }
];

