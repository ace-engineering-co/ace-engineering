/**
 * Renders the internal notification email sent when the contact form is
 * submitted. Table-based HTML (email clients don't support modern CSS),
 * branded with the ACE navy header and inline logo (cid:ace-logo).
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
  const subject = `Enquiry — ${d.company} (${d.sector})`;

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
              <p style="margin:0;font:600 11px/1.4 'Courier New',monospace;letter-spacing:2px;text-transform:uppercase;color:${ACCENT};">Website enquiry</p>
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
              <p style="margin:0;font:400 11px/1.6 Arial,Helvetica,sans-serif;color:#8FA1BC;">ACE Engineering — Integrated Infrastructure Solutions<br/>Reply directly to this email to respond to the enquirer.</p>
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
    "Reply directly to this email to respond to the enquirer."
  ].join("\n");

  return { subject, html, text };
}
