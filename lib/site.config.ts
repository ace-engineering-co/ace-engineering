/**
 * ACE ENGINEERING — SITE CONFIG
 * Every contact detail and external link lives here.
 * Edit this one file when the client sends final details.
 */
export const site = {
  name: "ACE Engineering",
  tagline: "Infrastructure Solutions",
  // WhatsApp number in international format, digits only (no +, no spaces)
  whatsapp: "971567099865",
  whatsappMessage: "Hello ACE Engineering — I'd like to discuss an infrastructure project.",
  email: "info@ace-engineering.co", // TODO: confirm inbox exists
  affiliateEmail: "info@ace-engineering.co", // TODO: confirm inbox exists
  phone: "+971 56 709 9865", // TODO: replace with the real UAE number
  phoneHref: "tel:+971567099865", // TODO: keep in sync with `phone`
  location: "United Arab Emirates",
  // Registered office address, grouped for display (each entry renders as a line)
  addressLines: [
    "SBAM0037, Compass Building, Al Shohada Road",
    "Al Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates"
  ],
  linkedin: "#" // TODO: add when available
};

export const waLink = () =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;
