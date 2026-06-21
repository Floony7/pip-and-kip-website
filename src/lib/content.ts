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
    title: 'Handmade Ocean-Blue Tote',
    description: 'A lightweight carryall inspired by the site palette for spring collections.',
    price: '$42',
    href: '#',
    imgPath: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1000&q=85",
    source: 'Etsy',
  },
  {
    title: 'Mint Ceramic Trinket Tray',
    description: 'Small-batch tray for desks and vanities, ideal for limited seasonal drops.',
    price: '$24',
    href: '#',
    imgPath: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=85",
    source: 'CMS Feature',
  },
  {
    title: 'Coastal Print Gift Set',
    description: 'Curated bundle format that maps cleanly to CMS-driven campaign content.',
    price: '$36',
    href: '#',
    imgPath: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=85",
    source: 'Etsy',
  },
];
