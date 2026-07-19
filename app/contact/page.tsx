"use client";

import { useState } from "react";
import Marquee from "@/components/Marquee";

const budgetOptions = ["Under ", "LKR25,000 to LKR50,000", "LKR50,000 to LKR300,000", "LKR300,000+", "Let's discuss"];
const serviceOptions = ["Basic Business Website", "POS System", "Ecommerce Platform", "Web & Mobile Development", "Custom Website Design & Build", "Enterprise Software", "Not sure yet"];

const inputCls = "w-full bg-transparent border border-ink/15 focus:border-accent outline-none font-mono text-sm text-ink placeholder:text-ink/25 px-4 py-3.5 transition-colors duration-200";
const selectCls = "w-full bg-canvas border border-ink/15 focus:border-accent outline-none font-mono text-sm text-ink px-4 py-3.5 transition-colors duration-200 cursor-pointer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", budget: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Direct call to your Render backend
      const res = await fetch("https://fortechz-website.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send message. Please try again later.");
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-canvas pt-14">
      <section className="px-6 md:px-10 lg:px-16 pt-20 pb-16 border-b border-ink/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7">
            <p className="font-mono text-xs tracking-[0.22em] text-ink/40 uppercase mb-5">Fortechz · Contact</p>
            <h1 className="font-display font-bold text-ink text-6xl md:text-8xl lg:text-9xl tracking-[-0.05em] uppercase leading-[0.85]">Let&apos;s<br />Talk</h1>
          </div>
          <div className="md:col-span-5 flex flex-col justify-end">
            <p className="font-mono text-sm text-ink/55 leading-[1.9]">We respond to every serious enquiry within one business day. Tell us what you&apos;re building and we&apos;ll let you know if we&apos;re the right fit.</p>
          </div>
        </div>
      </section>

      <Marquee />

      <div className="px-6 md:px-10 lg:px-16 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="space-y-5">
              <div className="w-8 h-px bg-accent" />
              <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">Message received</p>
              <h2 className="font-display font-bold text-ink text-4xl uppercase">We&apos;ll be in touch.</h2>
              <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", service: "", budget: "", message: "" }); }} className="font-mono text-xs tracking-[0.14em] text-canvas uppercase px-5 py-3 bg-accent hover:bg-accent/90">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Full name" className={inputCls} />
                <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Email" className={inputCls} />
              </div>
              <input name="company" type="text" value={form.company} onChange={handleChange} placeholder="Company (optional)" className={inputCls} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select name="service" value={form.service} onChange={handleChange} className={selectCls}>
                  <option value="">Select a service</option>
                  {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <select name="budget" value={form.budget} onChange={handleChange} className={selectCls}>
                  <option value="">Select a range</option>
                  {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <textarea name="message" required rows={6} value={form.message} onChange={handleChange} placeholder="Project brief" className={inputCls + " resize-none"} />
              {error && <p className="text-red-400 font-mono text-xs">{error}</p>}
              <button type="submit" disabled={loading} className="px-8 py-4 bg-accent text-canvas uppercase font-mono text-xs">
                {loading ? "Sending…" : "Send enquiry →"}
              </button>
            </form>
          )}
        </div>
        <div className="lg:col-span-5 space-y-10">
          <p className="font-mono text-xs tracking-[0.2em] text-ink/30 uppercase">Response time</p>
          <p className="font-display font-bold text-ink text-2xl uppercase">Within 1 business day</p>
        </div>
      </div>
    </main>
  );
}
