import { Router, type IRouter } from "express";
import { Resend } from "resend";
import { logger } from "../lib/logger";
import { resolveContactEmail } from "../lib/contactEmail";
import { buildEmail, type FieldRow } from "../lib/emailTemplates";

const router: IRouter = Router();

const TO_EMAIL = resolveContactEmail(process.env.CONTACT_EMAIL, "hello@missozicecream.com");
const FROM_EMAIL = process.env.FROM_EMAIL ?? "Miss Oz Website <noreply@missozicecream.com>";

let resend: Resend | null = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
} else {
  logger.warn("RESEND_API_KEY not set — inquiry emails will be logged only");
}

type InquiryType = "wholesale" | "event" | "general";

const SUBJECT_MAP: Record<InquiryType, string> = {
  wholesale: "🥛 New Wholesale Inquiry — Miss Oz Website",
  event:     "🎉 New Parties & Weddings Inquiry — Miss Oz Website",
  general:   "New Inquiry — Miss Oz Website",
};

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

  const rows: FieldRow[] = [
    { label: "Name", value: payload.name },
    { label: "Email", value: payload.email, isEmail: true },
    ...(payload.phone ? [{ label: "Phone", value: payload.phone }] : []),
    { label: "Message", value: payload.message, multiline: true },
  ];

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: payload.email,
      subject: SUBJECT_MAP[inquiryType],
      html: buildEmail({ purpose: inquiryType, rows }),
    });

    if (error) {
      logger.error({ resendError: error }, "Resend rejected the email");
      res.status(502).json({ error: "Email service rejected the message" });
      return;
    }

    logger.info({ emailId: data?.id }, "Notification email sent");
    res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Failed to send inquiry email");
    res.status(500).json({ error: "Could not send inquiry" });
  }
});

export default router;
