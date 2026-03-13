import { useState, useEffect } from 'react';
import data from '../data.json';
import ContactForm from './ContactForm';

const ContactFooter = () => {
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
  return (
    <footer id="contact" className="site-footer">
      <div className="container">
        {/* Contact and Map Grid */}
        <div className="footer-grid">
          <div>
            <h3 className="footer-heading" style={{ fontSize: '1.5rem', color: 'white' }}>
              Kalash Chikitsalaya
            </h3>
            <p className="footer-text" style={{ marginTop: '1rem' }}>
              Specialized Ayurvedic clinic for piles, fissure, fistula and constipation
              treatment in Gorakhpur.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <p className="footer-text">
                <strong style={{ color: 'white' }}>Address:</strong><br />
                {data.contact.address}
              </p>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <a href="tel:+917607131682" className="btn btn-primary" style={{ width: 'max-content', padding: '0.5rem 1.25rem' }}>
                📅 Book Appointment: 7607131682
              </a>
              <a href="tel:05514000536" className="btn btn-secondary" style={{ width: 'max-content', padding: '0.5rem 1.25rem' }}>
                📞 Call Us: 05514000536
              </a>
              <a href="https://wa.me/919450878415" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: 'max-content', padding: '0.5rem 1.25rem', background: '#25D366', borderColor: '#25D366' }}>
                💬 WhatsApp
              </a>
              <button
                onClick={() => setShowMailModal(true)}
                className="btn btn-secondary"
                style={{ width: 'max-content', padding: '0.5rem 1.25rem', background: 'white', color: 'var(--color-primary-dark)' }}
              >
                ✉️ Mail Us
              </button>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#doctors">Our Experts</a></li>
              <li><a href="#diseases">Diseases Info</a></li>
              <li><a href="#gallery">Photo Gallery</a></li>
              <li><a href="#guidelines">Guidelines</a></li>
            </ul>
          </div>

          <div style={{ width: '100%', height: '100%' }}>
            <h4 className="footer-heading">Locate Us</h4>

            <div style={{ marginBottom: '1rem', width: '100%', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)' }}>
              <img
                src={data.images?.virtual_map?.src || "/images/Map.png"}
                alt={data.images?.virtual_map?.alt || "Virtual Route Map"}
                style={{ width: '100%', display: 'block', objectFit: 'contain' }}
                loading="lazy"
              />
            </div>

            <div style={{ width: '100%', height: '200px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)' }}>
              {/* Google Maps Embed using a generic Gorakhpur search query as fallback if exact place ID isn't directly embeddable, but I will pin it as closely as possible */}
              <iframe
                src={data.contact.mapEmbed || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14251.644405391629!2d83.37699119614488!3d26.746536585149363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991456a0c5cff9f%3A0xc3b44b8eb4af593b!2sKalash%20Chikitsalaya!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#94a3b8' }}>
              <a href={data.contact.mapLink} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-secondary-light)', textDecoration: 'underline' }}>
                Open in Google Maps App
              </a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Kalash Chikitsalaya. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem' }}>
            Website for informational purposes. Please consult the doctor for a proper diagnosis.
          </p>
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
    </footer>
  );
};

export default ContactFooter;
