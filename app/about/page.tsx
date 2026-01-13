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
  keywords: 'about manal healthcare, healthcare provider, medical services, patient care, healthcare excellence, certified hospital, community health',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <AboutHero />
      <MissionVision />
      <StatsSection />
      <WhyChooseUs />
      <OurStory />
      <ValuesSection />
      <Accreditations />
      <TeamSection />
      <CommunityImpact />
      <Testimonials />
      <CTASection />
    </div>
  );
}
