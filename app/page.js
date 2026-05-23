"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Check,
  LockKeyhole,
  Megaphone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Zap
} from "lucide-react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const fallbackServices = [
  {
    title: "Conversion Websites",
    description: "Next.js experiences built for speed, trust, SEO, and measurable enquiries.",
    icon: "Rocket"
  },
  {
    title: "Performance Media",
    description: "Paid acquisition, retargeting, campaign landing pages, and creative testing.",
    icon: "Megaphone"
  },
  {
    title: "Secure Growth Stack",
    description: "JWT auth, OAuth, analytics, forms, dashboards, and secure API workflows.",
    icon: "ShieldCheck"
  }
];

const icons = {
  Rocket,
  Megaphone,
  ShieldCheck,
  BarChart3,
  LockKeyhole,
  Zap
};

function SectionLabel({ children }) {
  return (
    <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider section-label">
      <Sparkles size={14} />
      {children}
    </div>
  );
}

export default function Home() {
  const [services, setServices] = useState(fallbackServices);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    fetch(`${apiUrl}/api/services`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Service unavailable"))))
      .then((data) => setServices(data.services || fallbackServices))
      .catch(() => setServices(fallbackServices));
  }, []);

  useEffect(() => {
    function closeMobileNavOnDesktop() {
      if (window.innerWidth >= 768) setMobileNavOpen(false);
    }

    window.addEventListener("resize", closeMobileNavOnDesktop);
    return () => window.removeEventListener("resize", closeMobileNavOnDesktop);
  }, []);

  const metrics = useMemo(
    () => [
      ["42%", "average lift in lead quality"],
      ["99.9%", "secure uptime target"],
      ["3.1s", "target load on mobile"],
      ["24/7", "monitor-ready stack"]
    ],
    []
  );

  async function submitLead(event) {
    event.preventDefault();
    setStatus("sending");

    try {
      const csrf = await fetch(`${apiUrl}/api/security/csrf-token`, {
        credentials: "include"
      }).then((res) => res.json());

      const response = await fetch(`${apiUrl}/api/leads`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "CSRF-Token": csrf.csrfToken
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) throw new Error("Lead failed");
      setStatus("sent");
      setForm({ name: "", email: "", company: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const demoWorks = [
    {
      id: 1,
      title: "Reel - Cafe Launch",
      description: "Short Reels creative that drove 120% CTR.",
      thumb: "/images/work1.svg",
      video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    },
    {
      id: 2,
      title: "Ad Creative - Local Salon",
      description: "Branding-first promo with strong CTA.",
      thumb: "/images/work2.svg",
      video: null
    },
    {
      id: 3,
      title: "IG Story Series",
      description: "Swipeable stories with product teasers.",
      thumb: "/images/work3.svg",
      video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    },
    {
      id: 4,
      title: "Landing Page Hero",
      description: "Conversion-optimized hero with video.",
      thumb: "/images/work4.svg",
      video: null
    }
  ];

  return (
    <main className="min-h-screen overflow-hidden">
      <section className="mesh relative min-h-[92vh] px-5 py-5 sm:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between py-3 text-white main-nav">
          <a href="#" className="nav-logo" aria-label="LakshRise Media home">
            <img
              src="/images/logo.png"
              alt="LakshRise Media"
              className="site-logo"
            />
          </a>
          <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-white/75 nav-center">
            <a href="#services" className="nav-link active">Home</a>
            <a href="/about" className="nav-link">About Us</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#portfolio" className="nav-link">Work</a>
            <a href="#blog" className="nav-link">Blog</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#contact" className="nav-cta hidden md:inline-flex">Contact Us</a>
            <button
              type="button"
              className="menu-toggle inline-flex h-10 items-center gap-2 rounded-md bg-white/8 px-4 text-sm font-semibold text-white transition hover:bg-white/12 md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen((prev) => !prev)}
            >
              {mobileNavOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6L18 18M18 6L6 18" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18M3 12h18M3 18h18" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
            </button>
          </div>
        </nav>

        {mobileNavOpen && (
          <div className="mobile-nav-panel md:hidden">
            <a href="#services" className="mobile-nav-link" onClick={() => setMobileNavOpen(false)}>Home</a>
            <a href="/about" className="mobile-nav-link" onClick={() => setMobileNavOpen(false)}>About Us</a>
            <a href="#services" className="mobile-nav-link" onClick={() => setMobileNavOpen(false)}>Services</a>
            <a href="#portfolio" className="mobile-nav-link" onClick={() => setMobileNavOpen(false)}>Work</a>
            <a href="#blog" className="mobile-nav-link" onClick={() => setMobileNavOpen(false)}>Blog</a>
            <a href="#contact" className="nav-cta mobile-nav-cta" onClick={() => setMobileNavOpen(false)}>Contact Us</a>
          </div>
        )}

        <div className="mx-auto grid max-w-7xl items-center gap-10 pb-12 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <SectionLabel>AI-Powered Digital Growth</SectionLabel>
            <h1 className="max-w-4xl hero-title tracking-normal text-white">
              AI-Powered Digital Marketing That <span className="text-ember">Grows Your Business</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              We help local businesses attract more customers with short videos, smart strategies & AI-driven growth.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md px-6 font-bold text-white shadow-lift cta-gradient"
              >
                Get a Free Audit <Rocket size={18} />
              </a>
              <a
                href="#services"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/10 bg-white/6 px-6 font-bold text-white/90 transition hover:border-white/20"
              >
                Our Services <ShieldCheck size={18} />
              </a>
            </div>

            <div className="features-row">
              <div className="feature-pill"><span className="feature-icon">🎬</span><span>Short Video Marketing</span></div>
              <div className="feature-pill"><span className="feature-icon">📱</span><span>Social Media Management</span></div>
              <div className="feature-pill"><span className="feature-icon">📈</span><span>Paid Ads & Growth</span></div>
              <div className="feature-pill"><span className="feature-icon">🎨</span><span>Branding & Design</span></div>
              <div className="feature-pill"><span className="feature-icon">✍️</span><span>AI Content Creation</span></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="laptop-mock">
              <img src="/images/hero-laptop.svg" alt="laptop mock" className="w-full h-auto rounded-md" />
            </div>

            <div className="phone-mock">
              <div className="phone-screen">
                <video
                  className="w-full h-full object-cover rounded-xl"
                  src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="portfolio" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>Our Creative Work</SectionLabel>
          <h2 className="text-4xl font-black text-white sm:text-5xl">Selected reels, ads, and campaigns</h2>
          <p className="mt-3 text-white/70 max-w-2xl">A small selection of demo creatives and campaign assets to show our approach to reels, ads and landing pages.</p>

          <div className="mt-8 portfolio-grid">
            {demoWorks.map((work) => (
              <div
                key={work.id}
                className="portfolio-card"
                onClick={() => {
                  setSelectedWork(work);
                  setPortfolioOpen(true);
                }}
              >
                <img src={work.thumb} alt={work.title} />
                <div className="portfolio-overlay">
                  <div className="text-sm font-semibold">{work.title}</div>
                  <div className="text-xs mt-1 text-white/70">{work.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(([value, label]) => (
            <div key={label} className="border-l-2 border-ember py-2 pl-4">
              <div className="text-3xl font-black text-ink">{value}</div>
              <div className="mt-1 text-sm font-medium text-ink/60">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionLabel>What we build</SectionLabel>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-2xl text-4xl font-black tracking-normal text-white sm:text-5xl md:text-6xl lg:text-6xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-purple)] to-[var(--accent-orange)]">Fast media systems</span> with the product discipline of a secure SaaS platform.
            </h2>
            <p className="max-w-md text-white/60">
              The backend can serve real service data from MongoDB, while the frontend stays resilient with high-quality fallback content.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {services.map((service) => {
              const Icon = icons[service.icon] || Rocket;
              return (
                <motion.article
                  key={service.title}
                  whileHover={{ y: -6 }}
                  className="glass-card service-card rounded-lg p-6"
                >
                  <div className="mb-6 service-icon">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-xl font-extrabold text-white">{service.title}</h3>
                  <p className="mt-3 leading-7 text-white/70">{service.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="security" className="bg-ink px-5 py-20 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div>
            <SectionLabel>Hardened by default</SectionLabel>
            <h2 className="text-4xl font-black tracking-normal sm:text-5xl">
              Security is built into the request path, auth path, and deployment path.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Helmet headers",
              "Rate limiting",
              "HTTPS enforcement",
              "CSRF tokens",
              "JWT bearer auth",
              "OAuth providers",
              "Mongo sanitization",
              "CORS allowlist"
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-md bg-white/8 p-4">
                <Check className="text-mint" size={18} />
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] items-start">
          <div>
            <SectionLabel>Start the rise</SectionLabel>
            <h2 className="text-4xl font-black tracking-normal text-white sm:text-5xl">
              Tell us where growth is stuck.
            </h2>
            <p className="mt-5 leading-8 text-white/70">
              The form submits to the Express API with CSRF protection, validation, rate limiting, and MongoDB persistence.
            </p>
          </div>
          <div className="contact-card-wrap">
            <form onSubmit={submitLead} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  className="input-field"
                  placeholder="Name"
                  required
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                />
                <input
                  className="input-field"
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                />
              </div>
              <input
                className="input-field"
                placeholder="Company"
                value={form.company}
                onChange={(event) => setForm({ ...form, company: event.target.value })}
              />
              <textarea
                className="input-field textarea-field"
                placeholder="What should LakshRise Media help you build?"
                required
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
              />
              <div className="flex items-center gap-4">
                <button
                  className="submit-btn"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Send secure enquiry"}
                  <ArrowRight size={18} />
                </button>
                <span className="contact-cta-badge">Start The Rise</span>
              </div>
              {status === "sent" && <p className="text-sm font-semibold text-primary">Enquiry received securely.</p>}
              {status === "error" && (
                <p className="text-sm font-semibold text-red-500">
                  The API is not reachable yet. Start the backend and try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {portfolioOpen && selectedWork && (
        <div className="portfolio-modal-backdrop" onClick={() => setPortfolioOpen(false)}>
          <div className="portfolio-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="portfolio-modal-close" onClick={() => setPortfolioOpen(false)}>✕</button>
            <h3 className="text-2xl font-black text-white">{selectedWork.title}</h3>
            <p className="mt-2 text-white/70">{selectedWork.description}</p>
            <div className="mt-4">
              {selectedWork.video ? (
                <video src={selectedWork.video} controls className="w-full rounded-md" />
              ) : (
                <img src={selectedWork.thumb} alt={selectedWork.title} className="w-full rounded-md" />
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
