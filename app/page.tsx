import type { Metadata } from "next";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Hero } from "./components/Hero";
import { InfoCards } from "./components/InfoCards";
import { Services } from "./components/Services";
import { AboutSection } from "./components/AboutSection";
import { ServicesMarquee } from "./components/ServicesMarquee";
import { LabTestBooking } from "./components/LabTestBooking";
import { DoctorsShowcase } from "./components/DoctorsShowcase";
import { NewsletterSection } from "./components/NewsletterSection";
import { BlogSection } from "./components/BlogSection";
import { FAQSection } from "./components/FAQSection";
import { OurServices } from "./components/OurServices";
import { Testimonials } from "./components/Testimonials";

/* =======================
   PAGE LEVEL SEO
======================= */
export const metadata: Metadata = {
  title: "Best Medical Tourism in India | Top Hospitals & Doctors",
  description:
    "Manal Healthcare connects you with top hospitals, experienced doctors, and affordable medical tourism services in India. Trusted by 3000+ patients.",
  alternates: {
    canonical: "https://manalhealthcare.com",
  },
};

const Page = () => {
  return (
    <>
      <Header />

      <main id="main-content">
        {/* ✅ SINGLE H1 FOR SEO */}
        <h1 className="sr-only">
          Medical Tourism in India – Top Hospitals & Doctors | Manal Healthcare
        </h1>

        <Hero />
        <InfoCards />
        <Services />
        <AboutSection />
        <OurServices />
        <ServicesMarquee />
      <Testimonials/>
        <LabTestBooking />
        <DoctorsShowcase />
        <NewsletterSection />
        <BlogSection />
        <FAQSection />
      </main>

      <Footer />
    </>
  );
};

export default Page;
