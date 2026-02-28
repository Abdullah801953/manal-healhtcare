import { AboutHero } from './components/AboutHero';
import { MissionVision } from './components/MissionVision';
import { StatsSection } from './components/StatsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { OurStory } from './components/OurStory';
import { ValuesSection } from './components/ValuesSection';
import { TeamSection } from './components/TeamSection';
import { Accreditations } from './components/Accreditations';
import { CommunityImpact } from './components/CommunityImpact';
import { Testimonials } from './components/Testimonials';
import { CTASection } from './components/CTASection';

export const metadata = {
  title: 'About Us - Leading Healthcare Provider | Manal Healthcare',
  description: 'Learn about Manal Healthcare - 25 years of excellence in healthcare services. Discover our mission, values, award-winning team, and commitment to community health. Trusted by 50,000+ patients.',
  keywords: 'about manal healthcare, healthcare provider, medical services, patient care, healthcare excellence, certified hospital, community health, medical tourism India, healthcare awards, accredited hospital',
  openGraph: {
    title: 'About Manal Healthcare - 25 Years of Healthcare Excellence',
    description: 'Leading healthcare provider trusted by 50,000+ patients. Award-winning medical services with certified professionals.',
    type: 'website',
    images: [{
      url: '/doctor-img 1.png',
      width: 1200,
      height: 630,
      alt: 'Manal Healthcare Team',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Manal Healthcare - Healthcare Excellence',
    description: 'Leading healthcare provider trusted by 50,000+ patients.',
    images: ['/doctor-img 1.png'],
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <AboutHero />
      <MissionVision />
      <StatsSection />
      <WhyChooseUs />
   
      <ValuesSection />
 
      <TeamSection />
     
      <CTASection />
    </div>
  );
}
