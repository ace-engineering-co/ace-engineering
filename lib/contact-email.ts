import { site } from "./site.config";

/**
 * Renders the internal notification email sent when the contact form is
 * submitted, and the automated acknowledgment sent to the inquirer.
 * Table-based HTML (email clients don't support modern CSS), branded with
 * the ACE navy header and inline logo (cid:ace-logo).
 */

export type ContactSubmission = {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  sector: string;
  load: string;
  location: string;
  message: string;
};

const NAVY = "#05162D";
const ACCENT = "#7FA6D9";
const TEXT = "#22314A";
const MUTED = "#6B7A93";
const HAIRLINE = "#E3E9F2";

/* Contact details shown in the confirmation email, from the single config */
const INFO_EMAIL = site.email;
const PHONE_DISPLAY = site.phone;
const ADDRESS_LINE = site.addressLines.join(", ");

/** Escape user-supplied text for safe interpolation into HTML. */
const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const row = (label: string, value: string) => `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid ${HAIRLINE};font:600 11px/1.4 'Courier New',monospace;letter-spacing:1px;text-transform:uppercase;color:${MUTED};vertical-align:top;width:170px;">${label}</td>
    <td style="padding:10px 0 10px 16px;border-bottom:1px solid ${HAIRLINE};font:400 14px/1.5 Arial,Helvetica,sans-serif;color:${TEXT};">${value || "&mdash;"}</td>
  </tr>`;

export function renderContactEmail(d: ContactSubmission): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Inquiry — ${d.company} (${d.sector})`;

  const html = `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#F2F5FA;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F2F5FA;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:94%;background:#ffffff;border:1px solid ${HAIRLINE};">
          <tr>
            <td style="background:${NAVY};padding:26px 32px;">
              <img src="cid:ace-logo" alt="ACE Engineering" width="180" style="display:block;border:0;outline:none;width:180px;height:auto;" />
            </td>
          </tr>
          <tr>
            <td style="border-top:3px solid ${ACCENT};padding:30px 32px 8px;">
              <p style="margin:0;font:600 11px/1.4 'Courier New',monospace;letter-spacing:2px;text-transform:uppercase;color:${ACCENT};">Website inquiry</p>
              <h1 style="margin:10px 0 4px;font:700 24px/1.2 Arial,Helvetica,sans-serif;color:${NAVY};">New consultation request</h1>
              <p style="margin:0 0 18px;font:400 13px/1.5 Arial,Helvetica,sans-serif;color:${MUTED};">Submitted through the ace-engineering.co contact form.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${HAIRLINE};">
                ${row("Full name", esc(d.name))}
                ${row("Job title", esc(d.title))}
                ${row("Company", esc(d.company))}
                ${row("Email", `<a href="mailto:${esc(d.email)}" style="color:${NAVY};">${esc(d.email)}</a>`)}
                ${row("Mobile", esc(d.phone))}
                ${row("Sector", esc(d.sector))}
                ${row("Power requirement", esc(d.load))}
                ${row("Project location", esc(d.location))}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 32px 30px;">
              <p style="margin:0 0 8px;font:600 11px/1.4 'Courier New',monospace;letter-spacing:1px;text-transform:uppercase;color:${MUTED};">Requirement</p>
              <div style="border-left:3px solid ${ACCENT};background:#F7FAFD;padding:14px 18px;font:400 14px/1.65 Arial,Helvetica,sans-serif;color:${TEXT};white-space:pre-wrap;">${esc(d.message)}</div>
            </td>
          </tr>
          <tr>
            <td style="background:${NAVY};padding:16px 32px;">
              <p style="margin:0;font:400 11px/1.6 Arial,Helvetica,sans-serif;color:#8FA1BC;">ACE Engineering — Integrated Infrastructure Solutions<br/>Reply directly to this email to respond to the inquirer.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    "NEW CONSULTATION REQUEST — ace-engineering.co",
    "",
    `Full name:         ${d.name}`,
    `Job title:         ${d.title || "—"}`,
    `Company:           ${d.company}`,
    `Email:             ${d.email}`,
    `Mobile:            ${d.phone}`,
    `Sector:            ${d.sector}`,
    `Power requirement: ${d.load || "—"}`,
    `Project location:  ${d.location || "—"}`,
    "",
    "Requirement:",
    d.message,
    "",
    "Reply directly to this email to respond to the inquirer."
  ].join("\n");

  return { subject, html, text };
}

/**
 * Renders the automated acknowledgment sent to the inquirer after a
 * successful submission. Formal business tone; same branded frame as the
 * internal notification (navy header, cid:ace-logo).
 */
export function renderConfirmationEmail(d: ContactSubmission): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = "Acknowledgment of your inquiry — ACE Engineering";
  const summaryLine = [d.company, d.sector, d.load, d.location]
    .filter(Boolean)
    .map(esc)
    .join(" &middot; ");

  const html = `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#F2F5FA;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F2F5FA;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:94%;background:#ffffff;border:1px solid ${HAIRLINE};">
          <tr>
            <td style="background:${NAVY};padding:26px 32px;">
              <img src="cid:ace-logo" alt="ACE Engineering" width="180" style="display:block;border:0;outline:none;width:180px;height:auto;" />
            </td>
          </tr>
          <tr>
            <td style="border-top:3px solid ${ACCENT};padding:30px 32px 6px;">
              <p style="margin:0;font:600 11px/1.4 'Courier New',monospace;letter-spacing:2px;text-transform:uppercase;color:${ACCENT};">Acknowledgment of inquiry</p>
              <h1 style="margin:10px 0 4px;font:700 22px/1.25 Arial,Helvetica,sans-serif;color:${NAVY};">Your consultation request has been received.</h1>
              <p style="margin:16px 0 0;font:400 14px/1.65 Arial,Helvetica,sans-serif;color:${TEXT};">Dear ${esc(d.name)},</p>
              <p style="margin:12px 0 0;font:400 14px/1.65 Arial,Helvetica,sans-serif;color:${TEXT};">Thank you for contacting ACE Engineering. We confirm receipt of your consultation request. Each inquiry is reviewed against our solutions, markets and delivery capability, and a member of our team will contact you shortly.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 32px 8px;">
              <p style="margin:0 0 8px;font:600 11px/1.4 'Courier New',monospace;letter-spacing:1px;text-transform:uppercase;color:${MUTED};">Summary of your inquiry</p>
              <div style="border-left:3px solid ${ACCENT};background:#F7FAFD;padding:14px 18px;font:400 13px/1.7 Arial,Helvetica,sans-serif;color:${TEXT};">
                <strong>${summaryLine}</strong>
                <div style="margin-top:8px;color:${MUTED};white-space:pre-wrap;">${esc(d.message)}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 26px;">
              <p style="margin:0;font:400 13px/1.7 Arial,Helvetica,sans-serif;color:${TEXT};">Should you wish to reach us in the meantime, please contact <a href="mailto:${INFO_EMAIL}" style="color:${NAVY};font-weight:bold;">${INFO_EMAIL}</a> or ${PHONE_DISPLAY}.</p>
              <p style="margin:16px 0 0;font:400 13px/1.7 Arial,Helvetica,sans-serif;color:${TEXT};">Yours sincerely,<br/><strong>ACE Engineering</strong></p>
            </td>
          </tr>
          <tr>
            <td style="background:${NAVY};padding:16px 32px;">
              <p style="margin:0;font:400 11px/1.7 Arial,Helvetica,sans-serif;color:#8FA1BC;">ACE Engineering — Integrated Infrastructure Solutions<br/>${ADDRESS_LINE}<br/><span style="color:#5F7392;">This is an automated acknowledgment of your inquiry. Please do not reply to this email — our team will respond to you directly.</span></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    "ACKNOWLEDGMENT OF INQUIRY — ACE Engineering",
    "",
    `Dear ${d.name},`,
    "",
    "Thank you for contacting ACE Engineering. We confirm receipt of your",
    "consultation request. Each inquiry is reviewed against our solutions,",
    "markets and delivery capability, and a member of our team will contact",
    "you shortly.",
    "",
    "Summary of your inquiry:",
    [d.company, d.sector, d.load, d.location].filter(Boolean).join(" · "),
    d.message,
    "",
    `Should you wish to reach us in the meantime, please contact ${INFO_EMAIL}`,
    `or ${PHONE_DISPLAY}.`,
    "",
    "Yours sincerely,",
    "ACE Engineering",
    "",
    "This is an automated acknowledgment of your inquiry. Please do not reply",
    "to this email — our team will respond to you directly."
  ].join("\n");

  return { subject, html, text };
}
