import { Router, type IRouter } from "express";
import { Resend } from "resend";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const TO_EMAIL = process.env.CONTACT_EMAIL ?? "hello@missozicecream.com";
const FROM_EMAIL = process.env.FROM_EMAIL ?? "Miss Oz Website <noreply@missozicecream.com>";

let resend: Resend | null = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
} else {
  logger.warn("RESEND_API_KEY not set — inquiry emails will be logged only");
}

type InquiryType = "wholesale" | "event" | "general";

const SUBJECT_MAP: Record<InquiryType, string> = {
  wholesale: "New Wholesale Inquiry — Miss Oz Website",
  event:     "New Event Inquiry — Miss Oz Website",
  general:   "New Inquiry — Miss Oz Website",
};

function buildHtml(data: {
  name: string;
  email: string;
  phone?: string;
  type: InquiryType;
  message: string;
}): string {
  const typeLabel = { wholesale: "Wholesale", event: "Private Event", general: "General" }[data.type];
  return `
<table style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1d0e0d;border-collapse:collapse">
  <tr><td style="background:#630f39;padding:24px 28px">
    <h2 style="margin:0;color:#f7ecd2;font-size:22px;font-weight:400;letter-spacing:1px">${typeLabel} Inquiry</h2>
    <p style="margin:4px 0 0;color:rgba(247,236,210,0.7);font-size:13px">via missozicecream.com</p>
  </td></tr>
  <tr><td style="padding:24px 28px;background:#fdf6e3;border:1px solid #e8d5aa">
    <table style="width:100%;border-collapse:collapse">
      <tr><td style="padding:6px 0;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#6b4a2e;width:90px;vertical-align:top">Name</td>
          <td style="padding:6px 0;font-size:16px">${escHtml(data.name)}</td></tr>
      <tr><td style="padding:6px 0;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#6b4a2e;vertical-align:top">Email</td>
          <td style="padding:6px 0;font-size:16px"><a href="mailto:${escHtml(data.email)}" style="color:#630f39">${escHtml(data.email)}</a></td></tr>
      ${data.phone ? `<tr><td style="padding:6px 0;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#6b4a2e;vertical-align:top">Phone</td>
          <td style="padding:6px 0;font-size:16px">${escHtml(data.phone)}</td></tr>` : ""}
      <tr><td style="padding:12px 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#6b4a2e;vertical-align:top">Message</td>
          <td style="padding:12px 0 6px;font-size:16px;white-space:pre-wrap;line-height:1.6">${escHtml(data.message)}</td></tr>
    </table>
  </td></tr>
  <tr><td style="padding:14px 28px;background:#f0e8d5;text-align:center;font-size:11px;color:#6b4a2e;letter-spacing:1px">
    Miss Oz Ice Cream &amp; Dessert Cafe · Pearl District, Portland
  </td></tr>
</table>`.trim();
}

function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ── POST /api/inquire ────────────────────────────────────────────────────── */
router.post("/inquire", async (req, res) => {
  const { name, email, phone, type = "general", message } = req.body ?? {};

  if (typeof name !== "string" || !name.trim()) {
    res.status(400).json({ error: "Name is required" });
    return;
  }
  if (typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({ error: "Valid email is required" });
    return;
  }
  if (typeof message !== "string" || !message.trim()) {
    res.status(400).json({ error: "Message is required" });
    return;
  }

  const inquiryType: InquiryType = ["wholesale", "event", "general"].includes(type)
    ? (type as InquiryType)
    : "general";

  const payload = {
    name: name.trim().slice(0, 80),
    email: email.trim().slice(0, 120),
    phone: typeof phone === "string" ? phone.trim().slice(0, 30) : undefined,
    type: inquiryType,
    message: message.trim().slice(0, 1200),
  };

  logger.info({ inquiry: { ...payload, email: "[redacted]" } }, "Inquiry received");

  if (!resend) {
    // No API key — log and acknowledge (useful in local dev without Resend)
    res.json({ ok: true, note: "Email not sent (RESEND_API_KEY not configured)" });
    return;
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: payload.email,
      subject: SUBJECT_MAP[inquiryType],
      html: buildHtml(payload),
    });

    res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Failed to send inquiry email");
    res.status(500).json({ error: "Could not send inquiry" });
  }
});

export default router;
