import { Router, type IRouter } from "express";
import { Resend } from "resend";
import { logger } from "../lib/logger";
import { resolveContactEmail } from "../lib/contactEmail";
import { buildEmail } from "../lib/emailTemplates";

const router: IRouter = Router();

const TO_EMAIL = resolveContactEmail(process.env.CONTACT_EMAIL, "hello@missozicecream.com");
const FROM_EMAIL = process.env.FROM_EMAIL ?? "Miss Oz Website <noreply@missozicecream.com>";

let resend: Resend | null = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
} else {
  logger.warn("RESEND_API_KEY not set — guestbook entries will be logged only");
}

/* ── POST /api/guestbook ──────────────────────────────────────────────────── */
router.post("/guestbook", async (req, res) => {
  const { name, note } = req.body ?? {};

  if (typeof name !== "string" || !name.trim()) {
    res.status(400).json({ error: "Name is required" });
    return;
  }
  if (typeof note !== "string" || !note.trim()) {
    res.status(400).json({ error: "Note is required" });
    return;
  }

  const safeName = name.trim().slice(0, 40);
  const safeNote = note.trim().slice(0, 180);

  logger.info({ guestbook: { name: safeName } }, "Guestbook entry received");

  if (!resend) {
    res.json({ ok: true, note: "Email not sent (RESEND_API_KEY not configured)" });
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: `✒️ Guestbook: ${safeName} signed the book`,
      html: buildEmail({
        purpose: "guestbook",
        rows: [
          {
            label: "Signed",
            value: new Date().toLocaleDateString("en-US", { dateStyle: "long", timeZone: "America/Los_Angeles" }),
          },
        ],
        quote: { text: safeNote, attribution: safeName },
        replyHint: false,
      }),
    });

    if (error) {
      logger.error({ resendError: error }, "Resend rejected the email");
      res.status(502).json({ error: "Email service rejected the message" });
      return;
    }

    logger.info({ emailId: data?.id }, "Notification email sent");
    res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Failed to send guestbook notification email");
    res.status(500).json({ error: "Could not send guestbook notification" });
  }
});

export default router;
