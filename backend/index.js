require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Globally allow requests from any frontend origin (Fixes CORS once and for all)
app.use(cors({ origin: '*' }));

app.use(express.json());

// Upgraded Transporter: Configured for Explicit TLS submission via IPv4 to bypass Render limitations
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use TLS/STARTTLS
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  family: 4 // Forces Node.js to use IPv4 instead of hitting unreachable IPv6 networks
});

app.post("/api/contact", async (req, res) => {
  const { name, email, company, service, budget, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  const mailOptions = {
    from: `"Fortechz Enquiries" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: email,
    subject: `New Enquiry from ${name}${company ? ` · ${company}` : ""}`,
    html: `
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
            <td style="padding:8px 0;">
              <a href="mailto:${escape(email)}" style="color:#0066cc;">${escape(email)}</a>
            </td>
          </tr>
          ${company ? `
          <tr>
            <td style="padding:8px 0;color:#666;vertical-align:top;">Company</td>
            <td style="padding:8px 0;">${escape(company)}</td>
          </tr>` : ""}
          ${service ? `
          <tr>
            <td style="padding:8px 0;color:#666;vertical-align:top;">Service</td>
            <td style="padding:8px 0;">${escape(service)}</td>
          </tr>` : ""}
          ${budget ? `
          <tr>
            <td style="padding:8px 0;color:#666;vertical-align:top;">Budget</td>
            <td style="padding:8px 0;">${escape(budget)}</td>
          </tr>` : ""}
        </table>

        <div style="margin-top:24px;padding:16px;background:#f5f5f5;border-left:3px solid #0066cc;">
          <p style="margin:0 0 8px;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">
            Project Brief
          </p>
          <p style="margin:0;white-space:pre-wrap;">${escape(message)}</p>
        </div>

        <p style="margin-top:24px;font-size:11px;color:#999;">
          Sent from the Fortechz contact form · Reply directly to respond to ${escape(name)}
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
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
