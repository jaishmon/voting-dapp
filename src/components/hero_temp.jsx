export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-glow" />

      {/* Eyebrow */}
      <div className="hero-eyebrow">
        <div className="hero-eyebrow-line" />
        <span>Go Everywhere · Reach Everywhere</span>
        <div className="hero-eyebrow-line" />
      </div>

      {/* Title */}
      <div className="hero-title-main">BLOCKCHAIN</div>
      <div className="hero-title-ghost">UNIVERSE</div>

      {/* CTA */}
      <a href="#voting" className="hero-cta">
        Get Started
        <span className="hero-cta-arrow">›</span>
      </a>

      {/* Scroll */}
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}