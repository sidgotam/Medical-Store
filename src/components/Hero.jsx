import { useState, useEffect } from 'react';
import data from '../data.json';
import ContactForm from './ContactForm';

const Hero = () => {
  const [showMailModal, setShowMailModal] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (showMailModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMailModal]);

  const heroData = data.images?.hero || { src: "/images/clinic.jpg", alt: "Kalash Chikitsalaya Clinic" };
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="section-kicker">Since 2010 · Gorakhpur</div>
          <h1>
            Specialized Ayurvedic Treatment for <br />
            <span>Piles, Fissure & Fistula</span>
          </h1>
          <p className="hero-subtitle">
            Kalash Chikitsalaya offers effective and minimally invasive Ayurvedic
            treatment for anorectal diseases using advanced Ksharsutra therapy. 
            Experience holistic healing with our expert doctors.
          </p>
          <div className="hero-actions">
            <a href="tel:+917607131682" className="btn btn-primary">
              Book Appointment
            </a>
            <a 
              href="https://wa.me/919450878415" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
            >
              WhatsApp
            </a>
            <button 
              onClick={() => setShowMailModal(true)} 
              className="btn btn-secondary" 
              style={{ background: 'white', color: 'var(--color-primary-dark)' }}
            >
              ✉️ Mail Us
            </button>
          </div>
        </div>
        
        <div className="hero-image-wrapper">
          <img 
            src={heroData.src} 
            alt={heroData.alt} 
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1542868729-d7c34dcb91e3?q=80&w=2671&auto=format&fit=crop";
            }}
            style={{ width: '100%', height: '500px', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Mail Us Modal Overlay */}
      {showMailModal && (
        <div className="modal-overlay" onClick={() => setShowMailModal(false)} style={{ zIndex: 3000 }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', background: 'white', padding: 0 }}>
            <button className="modal-close" onClick={() => setShowMailModal(false)} style={{ top: '1rem', right: '1rem', zIndex: 10 }}>✖</button>
            <div className="modal-body" style={{ padding: 0 }}>
              <ContactForm />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
