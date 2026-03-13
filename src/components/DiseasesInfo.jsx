import { useState } from 'react';
import data from '../data.json';

const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="accordion-item">
      <button 
        className={`accordion-header ${isOpen ? 'active' : ''}`}
        onClick={onClick}
      >
        <span>{item.name}</span>
        <span className="accordion-icon">▼</span>
      </button>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          <strong>About: </strong> {item.about}
        </p>
        
        <div className="disease-grid">
          {item.causes && (
            <div className="list-block">
              <h4>Causes (कारण)</h4>
              <ul className="custom-list">
                {item.causes.map((cause, i) => <li key={i}>{cause}</li>)}
              </ul>
            </div>
          )}
          
          {item.symptoms && (
            <div className="list-block">
              <h4>Symptoms (लक्षण)</h4>
              <ul className="custom-list">
                {item.symptoms.map((sym, i) => <li key={i}>{sym}</li>)}
              </ul>
            </div>
          )}

          {item.precautions && (
            <div className="list-block">
              <h4>Precautions (सावधानियां)</h4>
              <ul className="custom-list">
                {item.precautions.map((prec, i) => <li key={i}>{prec}</li>)}
              </ul>
            </div>
          )}

          {item.treatment && (
            <div className="list-block">
              <h4>Treatment (इलाज)</h4>
              <ul className="custom-list">
                {item.treatment.map((treat, i) => <li key={i}>{treat}</li>)}
              </ul>
            </div>
          )}

          {item.foods_to_eat && (
            <div className="list-block">
              <h4>What to Eat (क्या खाएं)</h4>
              <ul className="custom-list">
                {item.foods_to_eat.map((food, i) => <li key={i}>{food}</li>)}
              </ul>
            </div>
          )}

          {item.foods_to_avoid && (
            <div className="list-block">
              <h4>What to Avoid (क्या न खाएं)</h4>
              <ul className="custom-list">
                {item.foods_to_avoid.map((food, i) => <li key={i}>{food}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DiseasesInfo = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const diseases = data.medical_information.diseases_detail;

  return (
    <section id="diseases" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-kicker">रोग की विस्तृत जानकारी</span>
          <h2 className="section-title">Anorectal Diseases Information</h2>
        </div>
        
        <div className="accordion">
          {diseases.map((disease, index) => (
            <AccordionItem 
              key={index}
              item={disease}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiseasesInfo;
