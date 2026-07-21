/**
 * Delivery platform links.
 * Paste the full URLs from the Instagram bio here.
 * GrubHub:  tap the GrubHub link in the bio → copy the full URL from your browser address bar
 * UberEats: same for the Uber Eats link
 */
export const DELIVERY_PLATFORMS = [
  {
    id: 'grubhub' as const,
    name: 'GrubHub',
    url: 'https://www.grubhub.com/restaurant/miss-oz-ice-cream--dessert-cafe-portland/', // ← REPLACE with full URL
  },
  {
    id: 'ubereats' as const,
    name: 'Uber Eats',
    url: 'https://www.ubereats.com/store/miss-oz-ice-cream-cafe-aka/', // ← REPLACE with full URL
  },
] as const;

export type PlatformId = typeof DELIVERY_PLATFORMS[number]['id'];
