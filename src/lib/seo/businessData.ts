// Datos canónicos del negocio - única fuente de verdad NAP (Name, Address, Phone)
export const BUSINESS = {
  name: "Dr. Jacinto Salazar - Pediatra",
  doctorName: "Dr. Jacinto Salazar Vargas",
  jobTitle: "Médico Pediatra",
  description:
    "Pediatra con más de 30 años de experiencia en Carcelén, Quito. Atención personalizada, control del niño sano, asesoría nutricional y seguimiento del desarrollo infantil.",
  url: "https://www.drjacintosalazarvargas.com",
  logo: "https://www.drjacintosalazarvargas.com/favicon.svg",
  image:
    "https://storage.googleapis.com/gpt-engineer-file-uploads/e4cW6vF6gYYMoZkBGDeQTn7ZhQB3/social-images/social-1775583867163-WhatsApp_Image_2026-04-07_at_11.39.27_AMsdsd.webp",
  telephone: ["+593998396186", "+59322485286"],
  email: "jacinto_salazar1958@hotmail.com",
  address: {
    streetAddress: "Rodrigo Muñoz N81-46",
    addressLocality: "Quito",
    addressRegion: "Pichincha",
    postalCode: "170147",
    addressCountry: "EC",
    neighborhood: "Carcelén",
  },
  geo: {
    latitude: -0.103,
    longitude: -78.479,
  },
  alumniOf: "Universidad Central del Ecuador",
  medicalSpecialty: "Pediatric",
  availableLanguage: [
    { "@type": "Language", name: "Spanish", alternateName: "es" },
  ],
  // Lun-Vie 8-12, Sábados 9-12
  openingHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "12:00",
    },
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "15:00",
      closes: "20:00",
    },
    {
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "12:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/profile.php?id=100063639666756",
    "https://www.instagram.com/pediatra.jacintosalazar/",
  ],
} as const;
