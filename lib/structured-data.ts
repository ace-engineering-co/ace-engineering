import { site } from "./site.config";
import { siteUrl } from "./seo";

/**
 * Schema.org JSON-LD rendered once on the home page. Kept in sync with the
 * visible content: solutions mirror components/Services.tsx, contact and
 * address come from site.config.
 */

const services = [
  {
    name: "Power generation solutions",
    description:
      "Reliable and scalable power generation tailored to mission-critical, industrial, temporary and captive power applications — gas and diesel generator sets, gas and industrial turbines."
  },
  {
    name: "Electrical infrastructure",
    description:
      "Distribution, protection, control and monitoring systems — LV and MV switchgear, generator control and synchronization panels, protection systems, power management and SCADA."
  },
  {
    name: "Packaged infrastructure",
    description:
      "Custom-engineered packages combining equipment, fabrication, modularization and site-ready integration — acoustic enclosures, containerized packages, e-houses, tanks, skids and structural steel."
  },
  {
    name: "Offshore infrastructure",
    description:
      "Specialized asset solutions supporting offshore energy, marine logistics and infrastructure projects — liftboats, jack-up barges, tugboats and offshore support vessels."
  },
  {
    name: "Project development & advisory",
    description:
      "Opportunity assessment, feasibility support, technology and supplier evaluation, CAPEX/OPEX analysis, delivery strategy and commercial structuring."
  }
];

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: site.name,
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
      email: site.email,
      telephone: site.phone.replace(/\s/g, ""),
      address: {
        "@type": "PostalAddress",
        streetAddress: "SBAM0037, Compass Building, Al Shohada Road, Al Hamra Industrial Zone-FZ",
        addressLocality: "Ras Al Khaimah",
        addressCountry: "AE"
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.email,
        telephone: site.phone.replace(/\s/g, ""),
        availableLanguage: "en"
      },
      areaServed: ["Middle East", "Africa", "Europe", "North America"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Infrastructure solutions",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.name,
            description: s.description,
            provider: { "@id": `${siteUrl}/#organization` }
          }
        }))
      }
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: site.name,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en"
    }
  ]
};
