import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Hero } from './components/Hero'
import { InfoCards } from './components/InfoCards'
import { Services } from './components/Services'
import { AboutSection } from './components/AboutSection'
import { ServicesMarquee } from './components/ServicesMarquee'
import { Testimonials } from './components/Testimonials'
import { LabTestBooking } from './components/LabTestBooking'
import { DoctorsShowcase } from './components/DoctorsShowcase'
import { NewsletterSection } from './components/NewsletterSection'
import { BlogSection } from './components/BlogSection'
import { FAQSection } from './components/FAQSection'

const page = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <InfoCards />
        <Services />
        <AboutSection />
        <ServicesMarquee />
        <Testimonials />
        <LabTestBooking />
        <DoctorsShowcase />
        <NewsletterSection />
        <BlogSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}

export default page