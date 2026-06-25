"use client";

import { useState } from "react";
import Marquee from "@/components/Marquee";

const budgetOptions = ["Under $5,000","$5,000 – $15,000","$15,000 – $50,000","$50,000+","Let's discuss"];
const serviceOptions = ["Basic Business Website","POS System","E-commerce Platform","Web & Mobile Development","Custom Website Design & Build","Enterprise Software","Not sure yet"];

const inputCls =
  "w-full bg-transparent border border-ink/15 focus:border-accent outline-none " +
  "font-mono text-sm text-ink placeholder:text-ink/25 " +
  "px-4 py-3.5 transition-colors duration-200";

const selectCls =
  "w-full bg-canvas border border-ink/15 focus:border-accent outline-none " +
  "font-mono text-sm text-ink " +
  "px-4 py-3.5 transition-colors duration-200 cursor-pointer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", company:"", service:"", budget:"", message:"" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-canvas pt-14">

      {/* Page header */}
      <section className="px-6 md:px-10 lg:px-16 pt-20 pb-16 border-b border-ink/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7">
            <p className="font-mono text-xs tracking-[0.22em] text-ink/40 uppercase mb-5 anim-up" style={{ animationDelay: "0.05s" }}>
              Fortechz · Contact
            </p>
            <h1 className="font-display font-bold text-ink text-6xl md:text-8xl lg:text-9xl tracking-[-0.05em] uppercase leading-[0.85] anim-up" style={{ animationDelay: "0.12s" }}>
              Let&apos;s<br />Talk
            </h1>
          </div>
          <div className="md:col-span-5 flex flex-col justify-end">
            <p className="font-mono text-sm text-ink/55 leading-[1.9] anim-up" style={{ animationDelay: "0.22s" }}>
              We respond to every serious enquiry within one business day. Tell us what you&apos;re building and we&apos;ll let you know if we&apos;re the right fit.
            </p>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee />

      <div className="px-6 md:px-10 lg:px-16 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">

        {/* Form */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="space-y-5 anim-up">
              <div className="w-8 h-px bg-accent" />
              <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">Message received</p>
              <h2 className="font-display font-bold text-ink text-4xl tracking-[-0.04em] uppercase">We&apos;ll be in touch.</h2>
              <p className="font-mono text-sm text-ink/55 leading-[1.85] max-w-md">
                Thank you for reaching out. A member of the Fortechz team will review your enquiry and respond within one business day.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name:"", email:"", company:"", service:"", budget:"", message:"" }); }}
                className="font-mono text-xs tracking-[0.14em] text-canvas uppercase px-5 py-3 bg-accent hover:bg-accent/90 btn-glow transition-all duration-200"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 anim-up" style={{ animationDelay: "0.1s" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="font-mono text-xs tracking-[0.18em] text-ink/40 uppercase block">
                    Full name <span className="text-accent">*</span>
                  </label>
                  <input id="name" name="name" type="text" required value={form.name}
                    onChange={handleChange} placeholder="Your name" className={inputCls} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="font-mono text-xs tracking-[0.18em] text-ink/40 uppercase block">
                    Email <span className="text-accent">*</span>
                  </label>
                  <input id="email" name="email" type="email" required value={form.email}
                    onChange={handleChange} placeholder="you@company.com" className={inputCls} />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="font-mono text-xs tracking-[0.18em] text-ink/40 uppercase block">
                  Company / Organisation
                </label>
                <input id="company" name="company" type="text" value={form.company}
                  onChange={handleChange} placeholder="Your company name (optional)" className={inputCls} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="service" className="font-mono text-xs tracking-[0.18em] text-ink/40 uppercase block">Service needed</label>
                  <select id="service" name="service" value={form.service} onChange={handleChange} className={selectCls}>
                    <option value="">Select a service</option>
                    {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="budget" className="font-mono text-xs tracking-[0.18em] text-ink/40 uppercase block">Budget range</label>
                  <select id="budget" name="budget" value={form.budget} onChange={handleChange} className={selectCls}>
                    <option value="">Select a range</option>
                    {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="font-mono text-xs tracking-[0.18em] text-ink/40 uppercase block">
                  Project brief <span className="text-accent">*</span>
                </label>
                <textarea id="message" name="message" required rows={6} value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us what you're building, the problem you're solving, and any constraints or timelines to be aware of."
                  className={inputCls + " resize-none"} />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto font-mono text-xs tracking-[0.14em] text-canvas uppercase
                           px-8 py-4 bg-accent hover:bg-accent/90 btn-glow
                           transition-all duration-300"
              >
                Send enquiry →
              </button>
            </form>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-5 space-y-10 anim-up" style={{ animationDelay: "0.18s" }}>
          <div className="space-y-3">
            <div className="w-6 h-px bg-accent" />
            <p className="font-mono text-xs tracking-[0.2em] text-ink/30 uppercase">Response time</p>
            <p className="font-display font-bold text-ink text-2xl tracking-[-0.04em] uppercase">Within 1 business day</p>
            <p className="font-mono text-sm text-ink/50 leading-[1.8]">
              Every enquiry is read by a human. No auto-responders, no sales scripts.
            </p>
          </div>

          <div className="w-full h-px bg-ink/[0.07]" />

          <div className="space-y-3">
            <p className="font-mono text-xs tracking-[0.2em] text-ink/30 uppercase">Direct email</p>
            <a href="mailto:fortechzpvt@gmail.com"
               className="font-mono text-sm text-accent hover:text-accent/70 transition-colors duration-200 block">
              fortechzpvt@gmail.com
            </a>
          </div>

          <div className="w-full h-px bg-ink/[0.07]" />

          <div className="space-y-4">
            <p className="font-mono text-xs tracking-[0.2em] text-ink/30 uppercase">What to include</p>
            {[
              "What you're trying to build or fix",
              "Your timeline and launch goals",
              "Any existing systems we'd integrate with",
              "Your approximate budget",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="block w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                <p className="font-mono text-sm text-ink/50 leading-[1.7]">{item}</p>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-ink/[0.07]" />

          <div className="space-y-3">
            <p className="font-mono text-xs tracking-[0.2em] text-ink/30 uppercase">System status</p>
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="font-mono text-xs text-ink/40 tracking-[0.12em] uppercase">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
