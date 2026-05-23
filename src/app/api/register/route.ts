import { NextResponse } from "next/server";
import { siteConfig } from "@/content/site";

/**
 * Receives a registration submission from the website form and emails it to
 * the studio via Brevo's transactional email API. When the family provides an
 * email address, it also sends them a branded confirmation.
 *
 * Reads three environment variables (see .env.local):
 *   BREVO_API_KEY  – Brevo transactional API key (xkeysib-…)
 *   BREVO_SENDER   – the "from" address; must be a verified sender / domain in Brevo
 *   STUDIO_INBOX   – where the registration is delivered
 */

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

/* Brand palette, kept in sync with the site theme. */
const COLORS = {
  ink: "#0e0b0c",
  paper: "#ece7df",
  card: "#ffffff",
  text: "#1a1416",
  muted: "#6b625c",
  cream: "#f4ede2",
  brand: "#d81f2e",
  line: "#e4ddd2",
};

/** Escape user input before placing it in HTML. */
function esc(value: unknown): string {
  return String(value ?? "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/**
 * Wraps body content in a responsive, email-client-safe shell:
 * a dark header band with the wordmark, a light card, and a footer.
 */
function shell(preheader: string, bodyHtml: string): string {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${COLORS.paper};">
  <span style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.paper};padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:${COLORS.card};border:1px solid ${COLORS.line};">
        <tr>
          <td style="background:${COLORS.ink};padding:28px 32px;">
            <span style="font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;letter-spacing:-0.5px;color:${COLORS.cream};">Heartbeat<span style="color:${COLORS.brand};">.</span></span>
            <div style="margin-top:4px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${COLORS.brand};">Latin &amp; Ballroom Dance Studio</div>
          </td>
        </tr>
        <tr><td style="padding:32px;font-family:Arial,Helvetica,sans-serif;">${bodyHtml}</td></tr>
        <tr>
          <td style="background:${COLORS.ink};padding:22px 32px;font-family:Arial,sans-serif;font-size:12px;line-height:1.6;color:#9c9089;">
            ${esc(siteConfig.name)}<br>
            Victoria, Mahé · Seychelles
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* ---- Studio notification ---------------------------------------------- */

function studioEmail(data: Record<string, string | string[]>): string {
  const days = Array.isArray(data.days) ? data.days.join(", ") : data.days;

  const row = (label: string, value: unknown) =>
    `<tr>
       <td style="padding:7px 0;color:${COLORS.muted};font-size:13px;width:42%;vertical-align:top;">${label}</td>
       <td style="padding:7px 0;color:${COLORS.text};font-size:14px;font-weight:600;">${esc(value)}</td>
     </tr>`;

  const section = (title: string, rows: string) =>
    `<p style="margin:26px 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${COLORS.brand};font-weight:700;">${title}</p>
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${COLORS.line};">${rows}</table>`;

  return `
    <h1 style="margin:0 0 6px;font-family:Georgia,serif;font-size:24px;color:${COLORS.text};">New registration</h1>
    <p style="margin:0 0 8px;font-size:14px;color:${COLORS.muted};">A new dancer has registered through the website.</p>

    ${section("Student", `
      ${row("Full name", data["student-name"])}
      ${row("Date of birth", data.dob)}
      ${row("Age", data.age)}
      ${row("Gender", data.gender)}
      ${row("School / occupation", data.school)}`)}

    ${section("Parent / Guardian", `
      ${row("Name", data["guardian-name"])}
      ${row("Relationship", data.relationship)}
      ${row("Phone", data["guardian-phone"])}
      ${row("Alt. contact", data["alt-phone"])}
      ${row("Email", data["guardian-email"])}`)}

    ${section("Residential", `
      ${row("Home address", data.address)}
      ${row("District", data.district)}`)}

    ${section("Programme & Schedule", `
      ${row("Package", data.package)}
      ${row("Programme", data.programme)}
      ${row("Level", data.level)}
      ${row("Preferred days", days)}
      ${row("Preferred time", data.time)}`)}

    ${section("Transport", `
      ${row("Required", data.transport)}
      ${row("Pick-up", data.pickup)}
      ${row("Drop-off", data.dropoff)}`)}

    ${section("Emergency & Medical", `
      ${row("Emergency contact", data["emergency-name"])}
      ${row("Emergency number", data["emergency-phone"])}
      ${row("Medical notes", data.medical)}`)}

    ${section("Consent", `
      ${row("Photo / video consent", data.photoConsent)}`)}`;
}

/* ---- Family confirmation ---------------------------------------------- */

function confirmationEmail(data: Record<string, string | string[]>): string {
  const greetingName = esc(
    (data["guardian-name"] as string) ||
      (data["student-name"] as string) ||
      "there",
  );
  const studentName = esc(data["student-name"]);
  const phone = siteConfig.contact.primaryPhone;

  const step = (n: number, text: string) =>
    `<tr>
       <td style="padding:6px 12px 6px 0;color:${COLORS.brand};font-family:Georgia,serif;font-size:15px;font-weight:700;vertical-align:top;">${n}</td>
       <td style="padding:6px 0;color:${COLORS.text};font-size:14px;line-height:1.6;">${text}</td>
     </tr>`;

  return `
    <h1 style="margin:0 0 14px;font-family:Georgia,serif;font-size:24px;color:${COLORS.text};">Registration received</h1>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.7;color:${COLORS.text};">Hi ${greetingName},</p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:${COLORS.text};">
      Thank you for registering ${studentName} with Heartbeat Latin &amp; Ballroom Dance Studio.
      We've received the details and the studio team will be in touch to confirm class placement.
    </p>

    <p style="margin:0 0 8px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${COLORS.brand};font-weight:700;">What happens next</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${COLORS.line};padding-top:8px;">
      ${step(1, "We review your registration and match a class to the dancer's age and level.")}
      ${step(2, "The studio confirms class placement and the timetable with you.")}
      ${step(3, "You visit the studio to meet the team and settle in.")}
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;background:${COLORS.paper};border:1px solid ${COLORS.line};">
      <tr><td style="padding:18px 20px;font-size:14px;line-height:1.7;color:${COLORS.text};">
        <strong>Need to reach us sooner?</strong><br>
        Call or WhatsApp <a href="tel:${phone.replace(/\s/g, "")}" style="color:${COLORS.brand};text-decoration:none;">${esc(phone)}</a><br>
        Email <a href="mailto:${esc(siteConfig.contact.email)}" style="color:${COLORS.brand};text-decoration:none;">${esc(siteConfig.contact.email)}</a>
      </td></tr>
    </table>

    <p style="margin:24px 0 0;font-size:14px;line-height:1.7;color:${COLORS.muted};">
      Dance with confidence,<br>The Heartbeat team
    </p>`;
}

/* ---- Brevo send helper ------------------------------------------------- */

async function sendEmail(
  apiKey: string,
  payload: Record<string, unknown>,
): Promise<Response> {
  return fetch(BREVO_ENDPOINT, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function POST(request: Request) {
  const apiKey = process.env.BREVO_API_KEY;
  const sender = process.env.BREVO_SENDER;
  const studioInbox = process.env.STUDIO_INBOX;

  if (!apiKey || !sender || !studioInbox) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  let data: Record<string, string | string[]>;
  try {
    data = (await request.json()) as Record<string, string | string[]>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "company" field. Silently accept and drop.
  if (data.company) return NextResponse.json({ ok: true });

  const studentName = esc(data["student-name"]);
  const guardianEmail = String(data["guardian-email"] ?? "").trim();
  const senderObj = { name: "Heartbeat Dance Studio", email: sender };

  // 1. Notify the studio (this is the critical send).
  const studioRes = await sendEmail(apiKey, {
    sender: senderObj,
    to: [{ email: studioInbox, name: "Heartbeat Studio" }],
    replyTo: guardianEmail
      ? { email: guardianEmail, name: studentName }
      : undefined,
    subject: `New registration from ${studentName}`,
    htmlContent: shell(
      `New registration from ${studentName}`,
      studioEmail(data),
    ),
  });

  if (!studioRes.ok) {
    const detail = await studioRes.text();
    console.error("Brevo studio send failed:", studioRes.status, detail);
    return NextResponse.json(
      { error: "Could not send registration." },
      { status: 502 },
    );
  }

  // 2. Confirm to the family (best-effort — don't fail the whole request).
  if (guardianEmail && isEmail(guardianEmail)) {
    try {
      const confirmRes = await sendEmail(apiKey, {
        sender: senderObj,
        to: [{ email: guardianEmail, name: studentName }],
        replyTo: { email: studioInbox, name: "Heartbeat Studio" },
        subject: "Your Heartbeat Dance Studio registration has been received",
        htmlContent: shell(
          "Thanks for registering with Heartbeat Dance Studio.",
          confirmationEmail(data),
        ),
      });
      if (!confirmRes.ok) {
        console.error(
          "Brevo confirmation send failed:",
          confirmRes.status,
          await confirmRes.text(),
        );
      }
    } catch (err) {
      console.error("Brevo confirmation send threw:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
