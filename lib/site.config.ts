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
  email: "info@ace-engineering.com", // TODO: replace with real inbox
  affiliateEmail: "partners@ace-engineering.com", // TODO: replace
  phone: "+971 0 000 0000", // TODO: replace
  location: "Ras Al Khaimah, United Arab Emirates", // TODO: confirm
  linkedin: "#" // TODO: add when available
};

export const waLink = () =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;
