"use client";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";

/**
 * International phone input, isolated so Contact can load it lazily:
 * react-phone-number-input ships libphonenumber metadata plus 265 inline
 * flag SVGs (~80 KB of JS) that would otherwise sit in the critical bundle
 * for one below-the-fold field. Inline flags are required — the default
 * flag images come from an external CDN, which the CSP blocks.
 */
export default function PhoneField({
  value,
  invalid,
  inputClassName,
  onChange,
  onBlur
}: {
  value: string;
  invalid: boolean;
  inputClassName: string;
  onChange: (value: string, isValid: boolean) => void;
  onBlur: () => void;
}) {
  return (
    <PhoneInput
      international
      defaultCountry="AE"
      flags={flags}
      countryCallingCodeEditable={false}
      value={value || undefined}
      onChange={(v) => onChange(v || "", v ? isValidPhoneNumber(v) : false)}
      onBlur={onBlur}
      numberInputProps={{
        id: "c-phone",
        name: "phone",
        required: true,
        autoComplete: "tel",
        "aria-invalid": invalid,
        "aria-describedby": invalid ? "c-err-phone" : undefined,
        className: inputClassName
      }}
      className={invalid ? "phone-invalid" : undefined}
    />
  );
}
