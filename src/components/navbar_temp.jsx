import { useEffect, useState } from "react";

export default function Navbar({ connected, userAddress, onConnect }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const short = userAddress
    ? userAddress.slice(0, 6) + "..." + userAddress.slice(-4)
    : null;

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      {/* Logo */}
      <a href="#hero" className="logo">
        MOSKIN <span className="logo-dot" />
      </a>

      {/* Links */}
      <div className="nav-links">
        <a href="#hero">Technology</a>
        <a href="#voting">Mission</a>
        <a href="#voting">Ecosystem</a>
      </div>

      {/* Connect */}
      {connected ? (
        <button className="connect-btn connected">
          <span className="connect-dot" />
          {short}
        </button>
      ) : (
        <button className="connect-btn" onClick={onConnect}>
          Connect →
        </button>
      )}
    </nav>
  );
}