import Link from "next/link";

export const metadata = {
  title: "About Us | LakshRise Media",
  description: "Founder profile and company background for LakshRise Media."
};

export default function AboutPage() {
  return (
    <main className="about-shell min-h-screen px-5 py-10 sm:px-8">
      <section className="mx-auto max-w-6xl">
        <nav className="mb-10 flex items-center justify-between text-white/90">
          <Link href="/" className="nav-logo">
            <span style={{ color: "#fff" }}>LakshRise</span> <span className="text-ember">Media</span>
          </Link>
          <Link href="/" className="nav-cta">
            Back to Home
          </Link>
        </nav>

        <div className="about-card grid gap-8 p-6 md:grid-cols-[320px_1fr] md:p-10">
          <div className="founder-photo-wrap">
            <img
              src="/images/founder-lakshminarsimha-v.png"
              alt="Lakshminarsimha Bhatrachar V, Founder and CEO of LakshRise Media"
              className="founder-photo"
            />
          </div>

          <div>
            <div className="section-label mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              About Us
            </div>

            <h1 className="hero-title text-white">Founder & CEO</h1>
            <p className="mt-2 text-xl font-semibold text-[var(--accent-orange)]">Lakshminarsimha Bhatrachar V</p>

            <p className="mt-6 text-base leading-8 text-white/80">
              I am the Founder and CEO of LakshRise Media. I graduated with a B.Tech in Computer Science,
              specializing in Artificial Intelligence and Machine Learning, from Garden City University.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="about-info-card">
                <div className="about-info-label">Role</div>
                <div className="about-info-value">Founder & CEO, LakshRise Media</div>
              </div>
              <div className="about-info-card">
                <div className="about-info-label">Education</div>
                <div className="about-info-value">B.Tech (Computer Science), AI & ML</div>
              </div>
              <div className="about-info-card sm:col-span-2">
                <div className="about-info-label">College</div>
                <div className="about-info-value">Garden City University</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}