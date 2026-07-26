/**
 * ACE ENGINEERING — SITE CONFIG
 * Every contact detail and external link lives here.
 * Edit this one file when the client sends final details.
 */
export const site = {
  name: "ACE Engineering",
  tagline: "Infrastructure Solutions",
  // WhatsApp number in international format, digits only (no +, no spaces)
  whatsapp: "971500000000",
  whatsappMessage: "Hello ACE Engineering — I'd like to discuss an infrastructure project.",
  email: "info@ace-engineering.co", // TODO: confirm inbox exists
  affiliateEmail: "affiliate@ace-engineering.co", // TODO: confirm inbox exists
  phone: "+971 4 000 0000", // TODO: replace with the real UAE number
  phoneHref: "tel:+97140000000", // TODO: keep in sync with `phone`
  location: "United Arab Emirates · Egypt",
  linkedin: "#" // TODO: add when available
};

export const waLink = () =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;
