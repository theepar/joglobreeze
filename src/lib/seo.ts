import { Metadata } from 'next'

export function generateMetadata({
  title,
  description,
  keywords,
  url,
  images
}: {
  title: string
  description: string
  keywords?: string[]
  url?: string
  images?: string[]
}): Metadata {
  return {
    title,
    description,
    keywords: keywords ?? [],
    openGraph: {
      title,
      description,
      url: url ?? 'https://joglobreeze.vercel.app/',
      siteName: 'Joglo Breeze',
      images: images?.map(image => ({
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      })) ?? [],
      locale: 'id_ID',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images ?? [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export function generateLocalBusinessSchema({
  name,
  description,
  url,
  telephone,
  email,
  address,
  geo,
  image,
  priceRange,
  amenities,
  starRating,
  aggregateRating,
  checkinTime,
  checkoutTime,
  numberOfRooms,
  paymentAccepted,
  currenciesAccepted,
  smokingAllowed,
  petsAllowed,
  sameAs
}: {
  name: string
  description: string
  url: string
  telephone: string
  email: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo: {
    latitude: string
    longitude: string
  }
  image: string[]
  priceRange: string
  amenities: Array<{ name: string; value: boolean }>
  starRating: { ratingValue: string; bestRating: string }
  aggregateRating: { ratingValue: string; reviewCount: string }
  checkinTime: string
  checkoutTime: string
  numberOfRooms: string
  paymentAccepted: string[]
  currenciesAccepted: string[]
  smokingAllowed: boolean
  petsAllowed: boolean
  sameAs: string[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name,
    description,
    url,
    telephone,
    email,
    address: {
      "@type": "PostalAddress",
      ...address
    },
    geo: {
      "@type": "GeoCoordinates",
      ...geo
    },
    image,
    priceRange,
    amenityFeature: amenities.map(amenity => ({
      "@type": "LocationFeatureSpecification",
      name: amenity.name,
      value: amenity.value
    })),
    starRating: {
      "@type": "Rating",
      ...starRating
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ...aggregateRating
    },
    checkinTime,
    checkoutTime,
    numberOfRooms,
    paymentAccepted,
    currenciesAccepted,
    smokingAllowed,
    petsAllowed,
    sameAs
  }
}
