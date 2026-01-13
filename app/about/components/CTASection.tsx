import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Ready to Experience Quality Healthcare?
        </h2>
        <p className="text-xl text-gray-600 mb-10">
          Join thousands of satisfied patients who trust us with their health and wellbeing.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/doctors">
            <Button className="bg-[#209f00] hover:bg-emerald-600 text-white rounded-full px-8 py-6 text-lg">
              <Calendar className="w-5 h-5 mr-2" />
              Book an Appointment
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="border-2 border-[#209f00] text-[#209f00] hover:bg-[#209f00] hover:text-white rounded-full px-8 py-6 text-lg">
              Contact Us
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
