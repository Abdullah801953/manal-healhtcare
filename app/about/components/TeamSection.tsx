import Image from 'next/image';
import { Linkedin, Mail } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;

}

export function TeamSection() {
  const team: TeamMember[] = [
    {
      name: 'Mohammad Ashraf ',
      role: 'Director & Co-Founder',
      image: '/ashraf.png',
    },
    {
      name: 'Shadab Imran',
      role: 'Finance & Operations Manager & Co-Founder',
      image: '/filename.png',
    },
    {
      name: 'Mohd Modabbir',
      role: 'General Manager & Co-Founder',
      image: '/mod.jpeg',
    },

  ];

  return (
    <section className="py-20 px-3 xs:px-4 sm:px-6 lg:px-10 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Meet Our Leadership
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experienced professionals dedicated to your health and wellbeing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-72 bg-linear-to-b from-gray-100 to-white">
                <div className="absolute inset-0 flex items-end justify-center pb-6">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="192px"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-[#209f00] font-semibold mb-3">
                  {member.role}
                </p>
              

                <div className="flex justify-center gap-3">
                  <button className="p-2 bg-gray-200 hover:bg-[#209f00] hover:text-white rounded-full transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-gray-200 hover:bg-[#209f00] hover:text-white rounded-full transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
