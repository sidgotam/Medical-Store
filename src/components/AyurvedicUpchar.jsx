import data from '../data.json';

const AyurvedicUpchar = () => {
  const upcharData = data.ayurvedic_upchar;

  if (!upcharData) return null;

  return (
    <section id="upchar" className="section" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-kicker">Ayurvedic Treatment</span>
          <h2 className="section-title" style={{ color: 'var(--color-primary-dark)' }}>
            {upcharData.section_title}
          </h2>
          <p style={{ marginTop: '1rem', color: 'var(--color-text-soft)', fontSize: '1.1rem', maxWidth: '700px', marginInline: 'auto' }}>
            {upcharData.description}
          </p>
        </div>

        <div className="grid grid-cols-3">
          {upcharData.therapies.map((therapy, index) => (
            <div 
              key={index} 
              className="glass-card" 
              style={{
                display: 'flex', 
                flexDirection: 'column', 
                borderTop: `4px solid ${index % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary)'}` 
              }}
            >
              <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
                {therapy.title}
              </h3>
              <p style={{ color: 'var(--color-text-soft)', marginBottom: '1.5rem', lineHeight: '1.7', flexGrow: 1 }}>
                {therapy.content}
              </p>
              
              <div style={{ background: 'var(--color-surface-hover)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <ul className="custom-list">
                  {therapy.benefits.map((benefit, bIndex) => (
                    <li key={bIndex} style={{ fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AyurvedicUpchar;
