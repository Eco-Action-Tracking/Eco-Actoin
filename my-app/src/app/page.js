 

'use client';

import React from 'react';
// import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
// import Whatdo from '../components/Whatdo';
// import Footer from '../components/Footer';
import ClothingLifecycle from '../components/ClothingLifecycle';
// import CommunityShowcase from '../components/CommunityShowcase';
import EnvironmentalImpact from '@/components/EnvironmentalImpact';
import EcoFAQs from '@/components/EcoFAQs';
import AvailableEvents from '../components/availableEvents/available'
// "use client";
// import React, { useEffect, useState } from "react"; // تأكد من استيراد useState و useEffect
// import { motion } from "framer-motion";
// import {
//   ChevronRight,
//   Recycle,
//   Shirt,
//   Leaf,
//   Sun,
//   Wind,
//   Droplet,
//   Heart,
// } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* <Header /> */}
      <Hero />
      <Services />
      {/* <Whatdo /> */}
      <AvailableEvents/>
      <ClothingLifecycle />
      {/* <CommunityShowcase /> */}
      <EnvironmentalImpact />
      <EcoFAQs />
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;