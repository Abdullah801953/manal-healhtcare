import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export function SocialConnect() {
  const socials = [
    { icon: Facebook, name: 'Facebook', link: '#', color: 'hover:bg-blue-600' },
    { icon: Twitter, name: 'Twitter', link: '#', color: 'hover:bg-sky-500' },
    { icon: Instagram, name: 'Instagram', link: '#', color: 'hover:bg-pink-600' },
    { icon: Linkedin, name: 'LinkedIn', link: '#', color: 'hover:bg-blue-700' },
    { icon: Youtube, name: 'YouTube', link: '#', color: 'hover:bg-red-600' },
  ];

  return (
    <section className="py-20 px-3 xs:px-4 sm:px-6 lg:px-10 bg-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Connect With Us
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Follow us on social media for health tips, news, and updates
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {socials.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-3 px-6 py-4 bg-gray-100 rounded-xl transition-all ${social.color} hover:text-white`}
              >
                <Icon className="w-6 h-6" />
                <span className="font-semibold">{social.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
