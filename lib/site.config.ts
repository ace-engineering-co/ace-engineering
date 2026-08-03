/**
 * ACE ENGINEERING — SITE CONFIG
 * Every contact detail and external link lives here.
 * Edit this one file when contact details change.
 */
export const site = {
  name: "ACE Engineering",
  // WhatsApp number in international format, digits only (no +, no spaces)
  whatsapp: "971567099865",
  whatsappMessage: "Hello ACE Engineering — I'd like to discuss an infrastructure project.",
  email: "info@ace-engineering.co",
  affiliateEmail: "info@ace-engineering.co",
  phone: "+971 56 709 9865",
  phoneHref: "tel:+971567099865", // keep in sync with `phone`
  // Registered office address, grouped for display (each entry renders as a line)
  addressLines: [
    "SBAM0037, Compass Building, Al Shohada Road",
    "Al Hamra Industrial Zone-FZ, Ras Al Khaimah, United Arab Emirates"
  ]
};

export const waLink = () =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;
