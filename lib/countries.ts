/**
 * Curated dial-code list for the enquiry form, ordered by relevance to
 * ACE's markets (UAE & Egypt first, then Gulf/MENA, then international).
 * Flags are derived from the ISO code via regional-indicator codepoints.
 */
export type Country = { iso: string; name: string; dial: string };

export const flag = (iso: string) =>
  String.fromCodePoint(...[...iso.toUpperCase()].map((c) => 0x1f1a5 + c.charCodeAt(0)));

export const countries: Country[] = [
  { iso: "AE", name: "United Arab Emirates", dial: "+971" },
  { iso: "EG", name: "Egypt", dial: "+20" },
  { iso: "SA", name: "Saudi Arabia", dial: "+966" },
  { iso: "QA", name: "Qatar", dial: "+974" },
  { iso: "KW", name: "Kuwait", dial: "+965" },
  { iso: "BH", name: "Bahrain", dial: "+973" },
  { iso: "OM", name: "Oman", dial: "+968" },
  { iso: "JO", name: "Jordan", dial: "+962" },
  { iso: "IQ", name: "Iraq", dial: "+964" },
  { iso: "LB", name: "Lebanon", dial: "+961" },
  { iso: "LY", name: "Libya", dial: "+218" },
  { iso: "SD", name: "Sudan", dial: "+249" },
  { iso: "MA", name: "Morocco", dial: "+212" },
  { iso: "TN", name: "Tunisia", dial: "+216" },
  { iso: "DZ", name: "Algeria", dial: "+213" },
  { iso: "TR", name: "Türkiye", dial: "+90" },
  { iso: "GB", name: "United Kingdom", dial: "+44" },
  { iso: "US", name: "United States", dial: "+1" },
  { iso: "DE", name: "Germany", dial: "+49" },
  { iso: "FR", name: "France", dial: "+33" },
  { iso: "IT", name: "Italy", dial: "+39" },
  { iso: "ES", name: "Spain", dial: "+34" },
  { iso: "NL", name: "Netherlands", dial: "+31" },
  { iso: "CH", name: "Switzerland", dial: "+41" },
  { iso: "GR", name: "Greece", dial: "+30" },
  { iso: "CY", name: "Cyprus", dial: "+357" },
  { iso: "IN", name: "India", dial: "+91" },
  { iso: "PK", name: "Pakistan", dial: "+92" },
  { iso: "CN", name: "China", dial: "+86" },
  { iso: "SG", name: "Singapore", dial: "+65" },
  { iso: "HK", name: "Hong Kong", dial: "+852" },
  { iso: "JP", name: "Japan", dial: "+81" },
  { iso: "KR", name: "South Korea", dial: "+82" },
  { iso: "AU", name: "Australia", dial: "+61" },
  { iso: "ZA", name: "South Africa", dial: "+27" },
  { iso: "NG", name: "Nigeria", dial: "+234" },
  { iso: "KE", name: "Kenya", dial: "+254" },
  { iso: "ET", name: "Ethiopia", dial: "+251" },
  { iso: "BR", name: "Brazil", dial: "+55" },
  { iso: "MX", name: "Mexico", dial: "+52" }
];
