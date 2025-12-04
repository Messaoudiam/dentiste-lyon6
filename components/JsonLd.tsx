export default function JsonLd() {
  const siteUrl = 'https://www.dr-martin-dentiste.fr'

  // LocalBusiness / Dentist Schema
  const dentistSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': `${siteUrl}/#dentist`,
    name: 'Cabinet Dentaire Dr. Martin',
    image: `${siteUrl}/images/cabinet-dentaire-lyon.jpg`,
    logo: `${siteUrl}/logo.png`,
    description:
      'Cabinet dentaire à Lyon 6ème. Le Dr. Martin propose des soins dentaires de qualité : implants, esthétique dentaire, orthodontie, soins conservateurs et urgences dentaires.',
    url: siteUrl,
    telephone: '+33478XXXXXX',
    email: 'contact@dr-martin-dentiste.fr',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '45 Cours Franklin Roosevelt',
      addressLocality: 'Lyon',
      postalCode: '69006',
      addressRegion: 'Auvergne-Rhône-Alpes',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.7372,
      longitude: 4.8708,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '12:00',
      },
    ],
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card, Carte Vitale',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 45.7372,
        longitude: 4.8708,
      },
      geoRadius: '20000',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Marie L.',
        },
        datePublished: '2024-01-15',
        reviewBody:
          "Un cabinet moderne et accueillant. Le Dr. Martin m'a mise en confiance dès la première consultation. Une approche vraiment humaine.",
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Thomas D.',
        },
        datePublished: '2024-02-20',
        reviewBody:
          'Implant réalisé avec une précision remarquable. Aucune douleur et un résultat parfait. Je recommande vivement !',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
    ],
    medicalSpecialty: [
      'Dentistry',
      'Orthodontics',
      'Implantology',
      'Cosmetic Dentistry',
      'Periodontics',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services dentaires',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Soins conservateurs',
            description:
              'Traitement des caries, détartrage et soins préventifs',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Implantologie',
            description: 'Pose d\'implants dentaires de haute qualité',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Esthétique dentaire',
            description: 'Blanchiment, facettes céramiques',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Orthodontie',
            description: 'Alignement dentaire avec gouttières transparentes',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Urgences dentaires',
            description: 'Prise en charge rapide des douleurs et traumatismes',
          },
        },
      ],
    },
    sameAs: [
      'https://www.facebook.com/dr-martin-dentiste',
      'https://www.instagram.com/dr-martin-dentiste',
      'https://www.linkedin.com/company/dr-martin-dentiste',
    ],
  }

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'Cabinet Dentaire Dr. Martin',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+33478XXXXXX',
      contactType: 'customer service',
      availableLanguage: ['French'],
      areaServed: 'FR',
    },
  }

  // WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'Cabinet Dentaire Dr. Martin Lyon',
    description: 'Cabinet dentaire à Lyon 6ème - Dr. Martin chirurgien-dentiste',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'fr-FR',
  }

  // BreadcrumbList Schema (for homepage)
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: siteUrl,
      },
    ],
  }

  // Person Schema (for the dentist)
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: 'Dr. Sophie Martin',
    jobTitle: 'Chirurgien-Dentiste',
    description:
      'Chirurgien-dentiste diplômé de la Faculté d\'Odontologie de Lyon avec plus de 15 ans d\'expérience.',
    image: `${siteUrl}/images/dr-martin.jpg`,
    worksFor: {
      '@id': `${siteUrl}/#dentist`,
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Faculté d\'Odontologie de Lyon',
    },
    knowsAbout: [
      'Implantologie',
      'Esthétique dentaire',
      'Orthodontie',
      'Parodontologie',
      'Chirurgie dentaire',
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dentistSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  )
}

// Export helper for page-specific breadcrumbs
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  const siteUrl = 'https://www.dr-martin-dentiste.fr'

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  )
}

// Export helper for FAQ pages
export function FAQJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[]
}) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  )
}

// Export helper for service pages
export function ServiceJsonLd({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  const siteUrl = 'https://www.dr-martin-dentiste.fr'

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name,
    description,
    url: url.startsWith('http') ? url : `${siteUrl}${url}`,
    procedureType: 'Dental',
    howPerformed: 'By a qualified dentist',
    preparation: 'Consultation préalable recommandée',
    provider: {
      '@id': `${siteUrl}/#dentist`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
    />
  )
}
