import williamMorris from '../img/products/20251025_114735.jpg';
import scandi from '../img/products/20251202_154953edit.png';
import libertyCarnaby from '../img/products/20251214_151825.jpg';

export type IntegrationCard = {
  title: string;
  body: string;
};

export type ProductTeaser = {
  title: string;
  description: string;
  price: string;
  href: string;
  imgPath: string;
  source?: string;
};

export const homepageCards: IntegrationCard[] = [
  {
    title: 'Etsy Product Sync',
    body: 'Reserve this space for featured listings once Etsy API data is connected through a server endpoint.',
  },
  {
    title: 'Headless CMS Blocks',
    body: 'Use this column for seasonal copy and campaigns managed from a CMS model.',
  },
  {
    title: 'Ops + Reliability',
    body: 'Track integration health, API limits, and content freshness in one lightweight layer.',
  },
];

export const featuredTeasers: ProductTeaser[] = [
  {
    title: 'William Morris Collection',
    description: 'High quality, sophisticated and appealing bags for the luxurious look.',
    price: '',
    href: 'https://www.etsy.com/uk/listing/4413632133/william-morris-fabricchristmas-bageco',
    imgPath: williamMorris.src,
    source: 'Etsy',
  },
  {
    title: 'Scandi Fabric Collection',
    description: 'Scandinavian designs, beautiful and radiant bags.',
    price: '',
    href: 'https://www.etsy.com/uk/listing/4414866324/scandi-fabricchristmas-bageco',
    imgPath: scandi.src,
    source: 'Etsy',
  },
  {
    title: 'Liberty Carnaby Collection',
    description: 'New to our Liberty range of bags.',
    price: '',
    href: 'https://www.etsy.com/uk/shop/LoveFromPipandKip?section_id=56173223',
    imgPath: libertyCarnaby.src,
    source: 'Etsy',
  },
];
