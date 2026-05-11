import { BUSINESS } from "./businessData";

const BASE_URL = BUSINESS.url;

export const physicianSchema = {
  "@context": "https://schema.org",
  "@type": ["Physician", "MedicalBusiness", "LocalBusiness"],
  "@id": `${BASE_URL}/#physician`,
  name: BUSINESS.name,
  description: BUSINESS.description,
  url: BASE_URL,
  logo: BUSINESS.logo,
  image: BUSINESS.image,
  telephone: BUSINESS.telephone,
  email: BUSINESS.email,
  medicalSpecialty: BUSINESS.medicalSpecialty,
  availableLanguage: BUSINESS.availableLanguage,
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Credit Card, Debit Card",
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.streetAddress,
    addressLocality: BUSINESS.address.addressLocality,
    addressRegion: BUSINESS.address.addressRegion,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.geo.latitude,
    longitude: BUSINESS.geo.longitude,
  },
  areaServed: [
    { "@type": "City", name: "Quito" },
    { "@type": "AdministrativeArea", name: "Pichincha, Ecuador" },
  ],
  openingHoursSpecification: BUSINESS.openingHours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.dayOfWeek,
    opens: h.opens,
    closes: h.closes,
  })),
  sameAs: BUSINESS.sameAs,
  founder: { "@id": `${BASE_URL}/#person` },
  employee: { "@id": `${BASE_URL}/#person` },
};

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BASE_URL}/#person`,
  name: BUSINESS.doctorName,
  jobTitle: BUSINESS.jobTitle,
  image: BUSINESS.image,
  url: BASE_URL,
  telephone: BUSINESS.telephone[0],
  email: BUSINESS.email,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: BUSINESS.alumniOf,
  },
  worksFor: { "@id": `${BASE_URL}/#physician` },
  knowsAbout: [
    "Pediatría",
    "Neonatología",
    "Asesoría nutricional infantil",
    "Desarrollo infantil",
    "Nutrición pediátrica",
    "Control del niño sano",
    "Alergias infantiles",
  ],
  knowsLanguage: [{ "@type": "Language", name: "Spanish", alternateName: "es" }],
  sameAs: BUSINESS.sameAs,
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: BUSINESS.name,
  inLanguage: "es-EC",
  publisher: { "@id": `${BASE_URL}/#physician` },
};

export const faqSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
});

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: item.name,
    item: item.url,
  })),
});
