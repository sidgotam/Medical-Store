import './index.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Doctors from './components/Doctors';
import DiseasesInfo from './components/DiseasesInfo';
import AyurvedicUpchar from './components/AyurvedicUpchar';
import PhotoGallery from './components/PhotoGallery';
import HealthTips from './components/HealthTips';
import Facilities from './components/Facilities';
import ContactFooter from './components/ContactFooter';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Doctors />
        <DiseasesInfo />
        <AyurvedicUpchar />
        <Facilities />
        <PhotoGallery />
        <HealthTips />
      </main>
      <ContactFooter />
    </div>
  );
}

export default App;
