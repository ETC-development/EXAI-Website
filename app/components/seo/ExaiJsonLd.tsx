import { getSiteUrl } from "@/lib/site";

/** Structured data for the landing page (Event + Organization). */
export function ExaiJsonLd() {
  const base = getSiteUrl();

  const organization = {
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: "ENSIA Tech Community",
    url: base,
  };

  const event = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${base}/#event`,
    name: "EXAI — AI Datathon",
    description:
      "High-level AI datathon by ENSIA Tech Community. Teams tackle advanced machine learning, computer vision, NLP, and data challenges.",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    startDate: "2026-05-07T09:00:00+01:00",
    endDate: "2026-05-09T18:00:00+01:00",
    location: {
      "@type": "Place",
      name: "ENSIA",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Algiers",
        addressCountry: "DZ",
      },
    },
    organizer: organization,
    image: [`${base}/logos/1-05.png`],
    url: base,
    offers: {
      "@type": "Offer",
      url: `${base}/register`,
      price: "0",
      priceCurrency: "DZD",
      availability: "https://schema.org/InStock",
    },
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, event],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
