import data from '../data.json';

const Facilities = () => {
  const { title, items } = data.facilities;

  return (
    <section id="facilities" className="section bg-light">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">{title}</h2>
          <div className="section-divider mx-auto"></div>
        </div>
        
        <div className="facilities-grid">
          {items.map((item, index) => (
            <div key={index} className="facility-card">
              <div className="facility-icon">
                ✓
              </div>
              <p className="facility-text">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
