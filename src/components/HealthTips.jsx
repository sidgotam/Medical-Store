import data from '../data.json';

const HealthTips = () => {
  const { before_treatment, after_treatment } = data.patient_guidelines;
  const { title, tips } = data.health_tips_section;

  return (
    <section id="guidelines" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-kicker">Patient Care</span>
          <h2 className="section-title">Guidelines & Tips</h2>
        </div>

        <div className="grid grid-cols-2" style={{ marginBottom: '3rem' }}>
          <div className="glass-card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
            <h3 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
              Before Treatment (इलाज से पहले)
            </h3>
            <ul className="custom-list">
              {before_treatment.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div className="glass-card" style={{ borderLeft: '4px solid var(--color-secondary)' }}>
            <h3 style={{ color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
              After Treatment (इलाज के बाद)
            </h3>
            <ul className="custom-list">
              {after_treatment.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="glass-card" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', color: 'white' }}>
          <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.25rem' }}>
            {title}
          </h3>
          <ul className="custom-list">
            {tips.map((tip, i) => (
              <li key={i} style={{ color: 'rgba(255,255,255,0.9)' }}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HealthTips;
