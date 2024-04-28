import React from "react";
import Navbar from '../components/Navbar';
import AboutPageTitle from '../components/AboutPageTitle';
import FullAboutSection from '../components/FullAboutSection';
import CounterItem from '../components/CounterItem';
import WatchArea from "../components/WatchArea";
import LoveSection from "../components/LoveSection";

const AboutPage = () => {
  return (
    <div>
       <Navbar />
       <AboutPageTitle title="About Us" />
       <FullAboutSection />
       <CounterItem />
       <WatchArea />
       <LoveSection />
    </div>
  );
};

export default AboutPage;