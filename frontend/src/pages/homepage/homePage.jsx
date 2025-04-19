import React from 'react';
import Navbar from '../../components/navbar/navbar.jsx'
import HeroSection from "../../components/homepage_elements/heroSection.jsx";
import AboutSection from "../../components/homepage_elements/aboutSection.jsx";
import BgSection from "../../components/homepage_elements/bgSection.jsx";
import SignificanceSection from '../../components/homepage_elements/significanceSection.jsx';
import ConstitutionCards from '../../components/homepage_elements/constituionCard.jsx';
import HistorySection from '../../components/homepage_elements/historySection.jsx';
import GameSection from '../../components/homepage_elements/gameSection.jsx';
import Footer from '../../components/footer/footer.jsx';

function HomePage() {
  return (
<>
  <Navbar/>
  <HeroSection/>
  <AboutSection/>
  <BgSection/>
  <SignificanceSection/>
  <HistorySection/>
  <ConstitutionCards/>
  <GameSection/>
  <Footer/>
</>
  );
}

export default HomePage;
