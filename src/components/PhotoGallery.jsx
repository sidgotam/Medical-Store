import { useState, useEffect } from 'react';
import data from '../data.json';

const PhotoGallery = () => {
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null); // use index instead of object

  // We pull the centralized gallery array from JSON config
  const photos = data.gallery || [];

  // Determine how many images to show on the main page
  const displayedPhotos = photos.slice(0, 4);

  // Prevent background scrolling when either modal is open
  useEffect(() => {
    if (showGalleryModal || selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showGalleryModal, selectedIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
      } else if (e.key === 'Escape') {
        if (selectedIndex !== null) {
          setSelectedIndex(null);
        } else if (showGalleryModal) {
          setShowGalleryModal(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, showGalleryModal, photos.length]);

  return (
    <section id="gallery" className="section bg-light">
      <div className="container">
        <div className="section-header">
          <span className="section-kicker">Clinic View</span>
          <h2 className="section-title">Our Image Gallery</h2>
          <p style={{color: 'var(--color-text-soft)', marginTop: '1rem', maxWidth: '600px', marginInline: 'auto'}}>
            Take a look at our state-of-the-art facilities and comfortable environment designed for your fastest recovery.
          </p>
        </div>

        <div className="masonry-grid">
          {displayedPhotos.map((photo, i) => (
            <div 
              className="masonry-item" 
              key={i} 
              onClick={() => setSelectedIndex(i)}
              title="Click to view full screen"
            >
              <img 
                src={photo.src} 
                alt={photo.alt}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => { 
                  // Fallback to a placeholder just in case a specific path doesn't load
                  e.target.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop'; 
                }} 
              />
              <div className="masonry-item-overlay">
                <h3 className="masonry-item-title">{photo.alt}</h3>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button 
            onClick={() => setShowGalleryModal(true)}
            className="btn btn-primary"
            style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}
          >
            View All Images
          </button>
        </div>
      </div>

      {/* Main Complete Gallery Modal */}
      {showGalleryModal && (
        <div className="modal-overlay" onClick={() => setShowGalleryModal(false)} style={{ zIndex: 2000 }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2rem', maxWidth: '1000px' }}>
            <button className="modal-close" onClick={() => setShowGalleryModal(false)}>✖</button>
            <h2 className="section-title" style={{ marginBottom: '2rem' }}>Complete Image Gallery</h2>
            
            <div className="masonry-grid" style={{ padding: '1rem' }}>
              {photos.map((photo, i) => (
                <div 
                  className="masonry-item" 
                  key={`modal-${i}`} 
                  onClick={() => setSelectedIndex(i)}
                  title="Click to view full screen"
                >
                  <img 
                    src={photo.src} 
                    alt={photo.alt}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={(e) => { 
                      e.target.src = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop'; 
                    }} 
                  />
                  <div className="masonry-item-overlay">
                    <h3 className="masonry-item-title">{photo.alt}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Full View Lightbox Modal (Higher Z-Index) */}
      {selectedIndex !== null && (
        <div className="lightbox-overlay" onClick={() => setSelectedIndex(null)} style={{ zIndex: 3000 }}>
          <button className="lightbox-close" onClick={() => setSelectedIndex(null)}>✖</button>
          
          <button 
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
            }}
          >
            ←
          </button>

          <img 
            src={photos[selectedIndex].src} 
            alt={photos[selectedIndex].alt} 
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()} 
          />
          <div className="lightbox-caption">{photos[selectedIndex].alt}</div>

          <button 
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
            }}
          >
            →
          </button>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;
