import { useState, useEffect } from 'react';
import data from '../data.json';
import '../index.css';

const Doctors = () => {
  const doctors = data.doctors;
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // State for lightbox index
  const [showAllImages, setShowAllImages] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedDoctor || selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedDoctor, selectedImageIndex]);

  // Keyboard navigation for doctor gallery lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null || !selectedDoctor?.gallery) return;
      if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => (prev < selectedDoctor.gallery.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : selectedDoctor.gallery.length - 1));
      } else if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, selectedDoctor]);

  if (!doctors) return null;

  return (
    <section id="doctors" className="section bg-light">
      <div className="container">
        <div className="section-header">
          <span className="section-kicker">Our Experts</span>
          <h2 className="section-title">आयुर्वेदिक विशेषज्ञ चिकित्सक</h2>
          <p style={{ marginTop: '1rem', color: 'var(--color-text-soft)', fontSize: '1.1rem', maxWidth: '700px', marginInline: 'auto' }}>
            मिलिए हमारे अनुभवी और कुशल चिकित्सकों से जो आपके बेहतर स्वास्थ्य के लिए समर्पित हैं।
          </p>
        </div>

        <div className="grid grid-cols-2" style={{ gap: '3rem' }}>
          {doctors.map((doctor, index) => (
            <div 
              key={index} 
              className="glass-card doctor-card" 
              style={{
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1.5rem',
                borderTop: `4px solid ${index % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary)'}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  flexShrink: 0,
                  boxShadow: 'var(--shadow-md)',
                  border: '3px solid white'
                }}>
                  <img 
                    src={doctor.photo} 
                    alt={doctor.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { 
                      e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(doctor.name) + '&background=1f4f8b&color=fff&size=200';
                    }}
                  />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)', marginBottom: '0.25rem' }}>
                    {doctor.name}
                  </h3>
                  <div style={{ color: 'var(--color-secondary-dark)', fontWeight: '600', fontSize: '0.9rem' }}>
                    {doctor.speciality}
                  </div>
                </div>
              </div>

              <div style={{ color: 'var(--color-text-soft)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {doctor.bio.map((paragraph, i) => (
                  <p key={i} style={{ marginBottom: i !== doctor.bio.length - 1 ? '0.75rem' : '0' }}>
                    {paragraph.length > 200 && i === 0 ? paragraph.substring(0, 200) + '...' : paragraph} 
                  </p>
                ))}
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setShowAllImages(false);
                  }}
                  style={{ padding: '0.5rem 1.5rem', width: '100%' }}
                >
                  Know More About {doctor.name.split(' ')[1] || 'Doctor'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Doctor Details Modal */}
      {selectedDoctor && (
        <div className="modal-overlay" onClick={() => setSelectedDoctor(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedDoctor(null)}>✖</button>
            
            <div className="modal-header">
              <div className="modal-avatar">
                <img 
                  src={selectedDoctor.photo} 
                  alt={selectedDoctor.name} 
                  onError={(e) => { 
                    e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(selectedDoctor.name) + '&background=1f4f8b&color=fff&size=200';
                  }}
                />
              </div>
              <div>
                <h2 className="modal-title">{selectedDoctor.name}</h2>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  {selectedDoctor.degrees.map((degree, i) => (
                    <span key={i} className="degree-badge">{degree}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h3>विशेषज्ञता (Specialization)</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedDoctor.specialization.map((spec, sIndex) => (
                    <span key={sIndex} className="spec-badge">
                      ✓ {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="modal-section">
                <h3>संक्षिप्त परिचय (Brief Introduction)</h3>
                <div style={{ color: 'var(--color-text-soft)', lineHeight: '1.7' }}>
                  {selectedDoctor.bio.map((paragraph, i) => (
                    <p key={i} style={{ marginBottom: '1rem' }}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="modal-grid-2">
                <div className="modal-section">
                  <h3>Achievements (उपलब्धियां)</h3>
                  <ul className="custom-list">
                    {selectedDoctor.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
                  </ul>
                </div>
                <div className="modal-section">
                  <h3>Conferences (सम्मेलन)</h3>
                  <ul className="custom-list">
                    {selectedDoctor.conferences.map((conf, i) => <li key={i}>{conf}</li>)}
                  </ul>
                </div>
              </div>

              {selectedDoctor.gallery && selectedDoctor.gallery.length > 0 && (
                <div className="modal-section">
                  <h3>Personal Gallery</h3>
                  <div className="modal-gallery">
                    {(showAllImages ? selectedDoctor.gallery : selectedDoctor.gallery.slice(0, 4)).map((imgUrl, i) => (
                      <img 
                        key={i} 
                        src={imgUrl} 
                        alt={`${selectedDoctor.name} gallery ${i}`}
                        className="modal-gallery-img"
                        loading="lazy"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedImageIndex(i)}
                        onError={(e) => { 
                          e.target.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop'; 
                        }} 
                      />
                    ))}
                  </div>
                  {!showAllImages && selectedDoctor.gallery.length > 4 && (
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                      <button 
                        className="btn btn-secondary" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowAllImages(true);
                        }}
                        style={{ padding: '0.5rem 1.5rem', width: 'auto' }}
                      >
                        Show All Images
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Full View Lightbox Modal for Doctor Images */}
      {selectedImageIndex !== null && selectedDoctor?.gallery && (
        <div className="lightbox-overlay" onClick={() => setSelectedImageIndex(null)} style={{ zIndex: 3000 }}>
          <button className="lightbox-close" onClick={() => setSelectedImageIndex(null)}>✖</button>
          
          <button 
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : selectedDoctor.gallery.length - 1));
            }}
          >
            ←
          </button>

          <img 
            src={selectedDoctor.gallery[selectedImageIndex]} 
            alt={`${selectedDoctor.name} Gallery Image`} 
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()} 
          />

          <button 
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex((prev) => (prev < selectedDoctor.gallery.length - 1 ? prev + 1 : 0));
            }}
          >
            →
          </button>
        </div>
      )}
    </section>
  );
};

export default Doctors;
