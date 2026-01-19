import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export function ContactInfo() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['Main: (00) 875 784 5682', 'Emergency: (00) 875 784 5683'],
      link: 'tel:+008757845682',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@manalhealthcare.com', 'support@manalhealthcare.com'],
      link: 'mailto:info@manalhealthcare.com',
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['238, Arimantab, Moska - USA', 'Postal Code: 12345'],
      link: 'https://maps.google.com',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Fri: 8:00 AM - 8:00 PM', 'Sat - Sun: 9:00 AM - 5:00 PM'],
      link: null,
    },
  ];

  const departments = [
    { name: 'Emergency Department', phone: '(00) 875 784 5683', available: '24/7' },
    { name: 'Appointment Booking', phone: '(00) 875 784 5684', available: 'Mon-Fri, 8AM-6PM' },
    { name: 'Patient Records', phone: '(00) 875 784 5685', available: 'Mon-Fri, 9AM-5PM' },
    { name: 'Billing & Insurance', phone: '(00) 875 784 5686', available: 'Mon-Fri, 9AM-5PM' },
  ];

  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
        
        <div className="space-y-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-[#209f00]/5 transition-colors"
              >
                <div className="shrink-0 w-12 h-12 bg-[#209f00] rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
                  {method.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600">
                      {method.link && idx === 0 ? (
                        <a
                          href={method.link}
                          className="hover:text-[#209f00] transition-colors"
                          target={method.link.startsWith('http') ? '_blank' : undefined}
                          rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {detail}
                        </a>
                      ) : (
                        detail
                      )}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Departments */}
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <MessageCircle className="w-8 h-8 text-[#209f00]" />
          <h3 className="text-2xl font-bold text-gray-900">Department Direct Lines</h3>
        </div>
        
        <div className="space-y-4">
          {departments.map((dept, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-[#209f00] transition-colors"
            >
              <div>
                <h4 className="font-semibold text-gray-900">{dept.name}</h4>
                <p className="text-sm text-gray-500">{dept.available}</p>
              </div>
              <a
                href={`tel:${dept.phone.replace(/\D/g, '')}`}
                className="text-[#209f00] font-semibold hover:underline mt-2 sm:mt-0"
              >
                {dept.phone}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="h-64 bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Map Integration</p>
            <p className="text-sm text-gray-500">Google Maps / OpenStreetMap</p>
          </div>
        </div>
      </div>
    </div>
  );
}
