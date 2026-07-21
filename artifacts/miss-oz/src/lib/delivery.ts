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
    url: 'https://www.grubhub.com/restaurant/miss-oz-ice-cream--dessert-1105-nw-johnson-st-portland/5707432?utm_source=grubhub_iosapp&utm_medium=content_owned&utm_campaign=menushare&utm_content=share-link',
  },
  {
    id: 'ubereats' as const,
    name: 'Uber Eats',
    url: 'https://www.ubereats.com/store/miss-oz-ice-cream-cafe-aka-cool-moon-ice-cream/YEfj7ZgZS2m7Wm2og7PphQ?diningMode=DELIVERY',
  },
] as const;

export type PlatformId = typeof DELIVERY_PLATFORMS[number]['id'];
