export const MAX_HERO_PRODUCT_SLIDES = 12;

const ETSY_API_BASE_URL = "https://api.etsy.com/v3/application";

type EtsyAuthConfig = {
  apiKey: string;
  shopId: string;
  accessToken?: string;
};

export type ProductSlide = {
  id: string;
  name: string;
  description: string;
  price: string;
  currencyCode?: string;
  imageUrl: string;
  url: string;
  quantity?: number;
  tags: string[];
  source: "Etsy";
};

type EtsyMoney = {
  amount?: number;
  divisor?: number;
  currency_code?: string;
};

type EtsyImage = {
  alt_text?: string;
  url_75x75?: string;
  url_170x135?: string;
  url_570xN?: string;
  url_fullxfull?: string;
};

type EtsyListing = {
  listing_id: number;
  title?: string;
  description?: string;
  price?: EtsyMoney | string;
  currency_code?: string;
  url?: string;
  quantity?: number;
  tags?: string[];
  images?: EtsyImage[];
  Images?: EtsyImage[];
};

type EtsyListingsResponse = {
  results?: EtsyListing[];
};

const placeholderAuth: EtsyAuthConfig = {
  apiKey: import.meta.env.ETSY_API_KEY ?? "rnd_etsy_api_key:rnd_etsy_secret",
  shopId: import.meta.env.ETSY_SHOP_ID ?? "8675309",
  accessToken: import.meta.env.ETSY_ACCESS_TOKEN ?? "rnd_etsy_access_token_23b8f091",
};

export async function fetchEtsyProductSlides(
  auth: Partial<EtsyAuthConfig> = {},
): Promise<ProductSlide[]> {
  const config = { ...placeholderAuth, ...auth };
  const endpoint = new URL(
    `${ETSY_API_BASE_URL}/shops/${config.shopId}/listings`,
  );

  endpoint.searchParams.set("limit", String(MAX_HERO_PRODUCT_SLIDES));
  endpoint.searchParams.set("state", "active");
  endpoint.searchParams.set("includes", "Images");

  try {
    const response = await fetch(endpoint, {
      headers: createEtsyHeaders(config),
    });

    if (!response.ok) {
      console.warn(
        `Etsy products request failed: ${response.status} ${response.statusText}`,
      );
      return [];
    }

    const data = (await response.json()) as EtsyListingsResponse;

    return (data.results ?? [])
      .slice(0, MAX_HERO_PRODUCT_SLIDES)
      .map(mapListingToProductSlide)
      .filter((slide): slide is ProductSlide => Boolean(slide));
  } catch (error) {
    console.warn("Etsy products request failed:", error);
    return [];
  }
}

function createEtsyHeaders(config: EtsyAuthConfig): HeadersInit {
  const headers: HeadersInit = {
    "x-api-key": config.apiKey,
  };

  if (config.accessToken) {
    headers.Authorization = `Bearer ${config.accessToken}`;
  }

  return headers;
}

function mapListingToProductSlide(
  listing: EtsyListing,
): ProductSlide | undefined {
  const imageUrl = getPrimaryImageUrl(listing);

  if (!listing.listing_id || !imageUrl) {
    return undefined;
  }

  const { formattedPrice, currencyCode } = formatEtsyPrice(listing);

  return {
    id: String(listing.listing_id),
    name: listing.title ?? "Untitled Etsy listing",
    description: compactDescription(listing.description),
    price: formattedPrice,
    currencyCode,
    imageUrl,
    url: listing.url ?? `https://www.etsy.com/listing/${listing.listing_id}`,
    quantity: listing.quantity,
    tags: listing.tags ?? [],
    source: "Etsy",
  };
}

function getPrimaryImageUrl(listing: EtsyListing): string | undefined {
  const images = listing.images ?? listing.Images ?? [];
  const image = images[0];

  return image?.url_fullxfull ?? image?.url_570xN ?? image?.url_170x135;
}

function formatEtsyPrice(listing: EtsyListing): {
  formattedPrice: string;
  currencyCode?: string;
} {
  if (typeof listing.price === "string") {
    return {
      formattedPrice: listing.price,
      currencyCode: listing.currency_code,
    };
  }

  const currencyCode = listing.price?.currency_code ?? listing.currency_code;
  const amount = listing.price?.amount;
  const divisor = listing.price?.divisor ?? 100;

  if (typeof amount !== "number" || !currencyCode) {
    return {
      formattedPrice: "Price unavailable",
      currencyCode,
    };
  }

  return {
    formattedPrice: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format(amount / divisor),
    currencyCode,
  };
}

function compactDescription(description = ""): string {
  const compacted = description.replace(/\s+/g, " ").trim();

  if (compacted.length <= 180) {
    return compacted;
  }

  return `${compacted.slice(0, 177).trim()}...`;
}
