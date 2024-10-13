import React from "react";
import Navbar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import AppNavBar from "../components/AppNavBar";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      <AppNavBar />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default HomePage;
