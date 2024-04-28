import React from "react";
import Banner from '../components/Banner';
import CounterItem from '../components/CounterItem';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import Estimate from '../components/Estimate';
 

const HomePage = () => {
  return (
    <div>
       <Banner />
       <CounterItem />
       <AboutSection />
       <ServicesSection />
       <Estimate />
    </div>
  );
};

export default HomePage;