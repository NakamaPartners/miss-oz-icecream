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
  logger.warn("RESEND_API_KEY not set — mailing list signups will be logged only");
}

/* ── POST /api/subscribe ──────────────────────────────────────────────────── */
router.post("/subscribe", async (req, res) => {
  const { email } = req.body ?? {};

  if (typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({ error: "Valid email is required" });
    return;
  }

  const safeEmail = email.trim().slice(0, 120);

  logger.info({ email: "[redacted]" }, "Mailing list signup received");

  if (!resend) {
    res.json({ ok: true, note: "Email not sent (RESEND_API_KEY not configured)" });
    return;
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: safeEmail,
      subject: "New Mailing List Signup — Miss Oz Website",
      html: `
<table style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#1d0e0d;border-collapse:collapse">
  <tr><td style="background:#630f39;padding:24px 28px">
    <h2 style="margin:0;color:#f7ecd2;font-size:22px;font-weight:400;letter-spacing:1px">New Mailing List Signup</h2>
    <p style="margin:4px 0 0;color:rgba(247,236,210,0.7);font-size:13px">via missozicecream.com</p>
  </td></tr>
  <tr><td style="padding:24px 28px;background:#fdf6e3;border:1px solid #e8d5aa">
    <table style="width:100%;border-collapse:collapse">
      <tr>
        <td style="padding:6px 0;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#6b4a2e;width:90px;vertical-align:top">Email</td>
        <td style="padding:6px 0;font-size:16px"><a href="mailto:${safeEmail}" style="color:#630f39">${safeEmail}</a></td>
      </tr>
    </table>
  </td></tr>
  <tr><td style="padding:14px 28px;background:#f0e8d5;text-align:center;font-size:11px;color:#6b4a2e;letter-spacing:1px">
    Miss Oz Ice Cream &amp; Dessert Cafe · Pearl District, Portland
  </td></tr>
</table>`.trim(),
    });

    res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Failed to send signup notification email");
    res.status(500).json({ error: "Could not send signup notification" });
  }
});

export default router;
