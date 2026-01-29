"use client";

import Translate from '@/app/components/Translate';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function TranslationDemoPage() {
  const { currentLanguage } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-4 text-sm text-gray-600">
            <Translate>Currently reading in</Translate>: {currentLanguage.flag} {currentLanguage.name}
          </div>
          
          <h1 className="text-4xl font-bold mb-4">
            <Translate>Translation Demo Page</Translate>
          </h1>
          
          <p className="text-lg text-gray-600">
            <Translate>This page demonstrates the automatic translation feature. Click the Language button in the navbar to change languages.</Translate>
          </p>
        </div>

        {/* Demo Sections */}
        <div className="space-y-8">
          {/* Hero Section Demo */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-[#209F00]">
              <Translate>Hero Section Example</Translate>
            </h2>
            
            <h3 className="text-3xl font-semibold mb-3">
              <Translate>Enhancing Lives, Reviving Health for a Better Tomorrow</Translate>
            </h3>
            
            <p className="text-gray-700 mb-4">
              <Translate>Your trusted partner in Medical Tourism in India, connecting you with top hospitals and experienced doctors.</Translate>
            </p>
            
            <Button className="bg-[#209F00] hover:bg-green-700">
              <Translate>Get a quote</Translate>
            </Button>
          </Card>

          {/* Services Demo */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-[#209F00]">
              <Translate>Our Services</Translate>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-bold mb-2">
                  <Translate>Brain and Spine Surgery</Translate>
                </h3>
                <p className="text-sm text-gray-600">
                  <Translate>Expert brain and spine surgery services with world-class facilities and experienced medical professionals.</Translate>
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-bold mb-2">
                  <Translate>Cancer Treatment</Translate>
                </h3>
                <p className="text-sm text-gray-600">
                  <Translate>Expert cancer treatment services with world-class facilities and experienced medical professionals.</Translate>
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-bold mb-2">
                  <Translate>Cardiac Surgery</Translate>
                </h3>
                <p className="text-sm text-gray-600">
                  <Translate>Expert cardiac surgery services with world-class facilities and experienced medical professionals.</Translate>
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-bold mb-2">
                  <Translate>Cosmetic Surgery</Translate>
                </h3>
                <p className="text-sm text-gray-600">
                  <Translate>Expert cosmetic surgery services with world-class facilities and experienced medical professionals.</Translate>
                </p>
              </div>
            </div>
          </Card>

          {/* Common Phrases */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-[#209F00]">
              <Translate>Common Phrases</Translate>
            </h2>
            
            <div className="space-y-2">
              <p><strong><Translate>Welcome</Translate></strong> - Welcome</p>
              <p><strong><Translate>Thank you</Translate></strong> - Thank you</p>
              <p><strong><Translate>Contact Us</Translate></strong> - Contact Us</p>
              <p><strong><Translate>Learn More</Translate></strong> - Learn More</p>
              <p><strong><Translate>Get Started</Translate></strong> - Get Started</p>
              <p><strong><Translate>Book Appointment</Translate></strong> - Book Appointment</p>
              <p><strong><Translate>Our Doctors</Translate></strong> - Our Doctors</p>
              <p><strong><Translate>Our Hospitals</Translate></strong> - Our Hospitals</p>
            </div>
          </Card>

          {/* Instructions */}
          <Card className="p-6 bg-green-50 border-green-200">
            <h2 className="text-2xl font-bold mb-4 text-[#209F00]">
              <Translate>How to Test</Translate>
            </h2>
            
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <Translate>Click the Language button in the navigation bar</Translate>
              </li>
              <li>
                <Translate>Select a language from the popup (try Hindi, Spanish, or French)</Translate>
              </li>
              <li>
                <Translate>Wait 1-2 seconds for the translation to complete</Translate>
              </li>
              <li>
                <Translate>All text on this page will automatically translate</Translate>
              </li>
              <li>
                <Translate>Your language preference is saved for future visits</Translate>
              </li>
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
}
