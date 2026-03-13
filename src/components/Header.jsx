import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Doctors", href: "#doctors" },
    { label: "Diseases Info", href: "#diseases" },
    { label: "Ayurvedic Upchar", href: "#upchar" },
    { label: "Facilities", href: "#facilities" },
    { label: "Gallery", href: "#gallery" },
    { label: "Guidelines", href: "#guidelines" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="container header-inner">
          <a href="#home" className="brand">
            <img
              src="/Logo/KalashLogo.png"
              alt="Kalash Chikitsalaya Logo"
              style={{ height: '50px', width: 'auto', borderRadius: '8px' }}
            />
            <div className="brand-text">
              <span className="brand-name">Kalash Chikitsalaya</span>
              <span className="brand-tag">सुश्रुत क्षारकर्म एवं पंचकर्म रिसर्च सेन्टर</span>
            </div>
          </a>

          <nav className="nav-links">
            {navItems.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
            <a href="tel:+917607131682" className="btn btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
              Book Now
            </a>
          </nav>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            ☰
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', fontSize: '2rem' }}
        >
          ✕
        </button>
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <a
          href="tel:+917607131682"
          className="btn btn-primary"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Book Appointment
        </a>
      </div>
    </>
  );
};

export default Header;
