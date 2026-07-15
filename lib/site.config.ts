/**
 * ACE ENGINEERING — SITE CONFIG
 * Every contact detail and external link lives here.
 * Edit this one file when the client sends final details.
 */
export const site = {
  name: "ACE Engineering",
  tagline: "Power Solutions",
  // WhatsApp number in international format, digits only (no +, no spaces)
  whatsapp: "971500000000",
  whatsappMessage: "Hello ACE Engineering — I'd like to discuss a power requirement.",
  email: "info@ace-engineering.co", // TODO: confirm inbox exists
  affiliateEmail: "affiliate@ace-engineering.co", // TODO: confirm inbox exists
  phone: "+971 0 000 0000", // TODO: replace
  location: "United Arab Emirates · Egypt",
  linkedin: "#" // TODO: add when available
};

export const waLink = () =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;
