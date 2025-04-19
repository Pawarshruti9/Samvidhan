import React from 'react';
import Navbar from '../../components/navbar/navbar.jsx'
import HistoryHeroSection from "../../components/historypage_elements/historyheroSection.jsx";
import Footer from '../../components/footer/footer.jsx';
import Section1 from '../../components/historypage_elements/section1.jsx';
import Section2 from '../../components/historypage_elements/section2.jsx';
import Section3 from '../../components/historypage_elements/section3.jsx';
import Section4 from '../../components/historypage_elements/section4.jsx';
import ImageSection from '../../components/historypage_elements/imageSection.jsx';

function HomePage() {
  return (
<>
  <Navbar/>
  <HistoryHeroSection />
  <Section1/>
  <Section2/>
  <Section3/>
  <Section4/>
  <ImageSection/>
  <Footer/>
</>
  );
}

export default HomePage;
