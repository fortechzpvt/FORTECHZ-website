require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  const { name, email, company, service, budget, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  const htmlContent = `
    <div style="font-family:monospace;max-width:600px;margin:0 auto;color:#1a1a1a;">
      <h2 style="border-bottom:2px solid #e5e5e5;padding-bottom:12px;margin-bottom:24px;">
        New Enquiry — Fortechz
      </h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;color:#666;width:140px;vertical-align:top;">Name</td>
          <td style="padding:8px 0;font-weight:bold;">${escape(name)}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#666;vertical-align:top;">Email</td>
          <td style="padding:8px 0;"><a href="mailto:${escape(email)}" style="color:#0066cc;">${escape(email)}</a></td>
        </tr>
        ${company ? `<tr><td style="padding:8px 0;color:#666;vertical-align:top;">Company</td><td style="padding:8px 0;">${escape(company)}</td></tr>` : ""}
        ${service ? `<tr><td style="padding:8px 0;color:#666;vertical-align:top;">Service</td><td style="padding:8px 0;">${escape(service)}</td></tr>` : ""}
        ${budget ? `<tr><td style="padding:8px 0;color:#666;vertical-align:top;">Budget</td><td style="padding:8px 0;">${escape(budget)}</td></tr>` : ""}
      </table>
      <div style="margin-top:24px;padding:16px;background:#f5f5f5;border-left:3px solid #0066cc;">
        <p style="margin:0 0 8px;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Project Brief</p>
        <p style="margin:0;white-space:pre-wrap;">${escape(message)}</p>
      </div>
    </div>
  `;

  try {
    // Making a secure HTTP POST request directly to Resend's API endpoint (Bypasses SMTP completely)
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev", // Free tier default sending address
        to: "fortechzpvt@gmail.com",   // Your inbox destination
        reply_to: email,
        subject: `New Enquiry from ${name}${company ? ` · ${company}` : ""}`,
        html: htmlContent,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Resend API error");
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Mail error:", err.message);
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`Fortechz backend running on port ${PORT}`);
});

function escape(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
