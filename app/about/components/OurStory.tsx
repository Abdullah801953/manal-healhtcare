export function OurStory() {
  const timeline = [
    {
      year: '2000',
      title: 'The Beginning',
      description: 'Founded with a vision to provide accessible, quality healthcare to the community. Started with a single clinic and a team of dedicated healthcare professionals.',
    },
    {
      year: '2005',
      title: 'Expansion',
      description: 'Opened multiple specialty centers and expanded services to include advanced diagnostic facilities, surgical units, and emergency care departments.',
    },
    {
      year: '2010',
      title: 'Innovation',
      description: 'Introduced cutting-edge medical technology and pioneered minimally invasive surgical procedures. Launched telemedicine services for remote patient consultations.',
    },
    {
      year: '2015',
      title: 'Recognition',
      description: 'Received national accreditation for excellence in patient care and safety. Established partnerships with leading medical research institutions.',
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Implemented comprehensive electronic health records system and AI-powered diagnostic tools. Enhanced patient experience with mobile health applications.',
    },
    {
      year: '2025',
      title: 'Leading the Future',
      description: 'Continuing to set standards in healthcare delivery with personalized medicine, advanced robotics, and sustainable healthcare practices for future generations.',
    },
  ];

  return (
    <section className="py-20 px-3 xs:px-4 sm:px-6 lg:px-10 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Story: 25 Years of Excellence
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From humble beginnings to becoming a trusted name in healthcare, our journey has been 
            marked by dedication, innovation, and an unwavering commitment to patient wellbeing.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#209f00]/30 transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Year badge */}
                <div className="absolute left-8 md:left-1/2 w-16 h-16 bg-[#209f00] rounded-full flex items-center justify-center transform md:-translate-x-1/2 shadow-lg z-10">
                  <span className="text-white font-bold">{item.year}</span>
                </div>

                {/* Content */}
                <div className={`flex-1 ml-28 md:ml-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
