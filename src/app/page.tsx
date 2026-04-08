"use client";

import { useState } from "react";
import Loader from "@/components/Loader";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import WhoWeSupport from "@/components/WhoWeSupport";
import HowItWorks from "@/components/HowItWorks";
import MapPlaceholder from "@/components/MapPlaceholder";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />
      {loaded && (
        <>
          <ScrollProgress />
          <Header />
          <main>
            <Hero />
            <WhatWeDo />
            <WhoWeSupport />
            <HowItWorks />
            <MapPlaceholder />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
