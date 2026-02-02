'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, CheckCircle, MessageCircle, Mail, Phone, X } from 'lucide-react';
import { useSettings } from '@/app/contexts/SettingsContext';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { settings } = useSettings();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Save to database
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          country: 'Contact Form',
          medicalCondition: `Subject: ${formData.subject}\n\n${formData.message}`,
          status: 'new',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setShowOptions(true);
      } else {
        setError(result.error || 'Failed to submit form');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendVia = (method: 'whatsapp' | 'email' | 'sms') => {
    const message = `Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0ASubject: ${formData.subject}%0AMessage: ${formData.message}`;
    
    switch (method) {
      case 'whatsapp':
        const whatsappNumber = settings?.whatsappNumber?.replace(/\D/g, '') || '';
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        break;
      case 'email':
        const email = settings?.siteEmail || 'info@manalhealthcare.com';
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`)}`;
        break;
      case 'sms':
        const phoneNumber = settings?.sitePhone?.replace(/\D/g, '') || '';
        window.location.href = `sms:${phoneNumber}?body=${encodeURIComponent(`Name: ${formData.name}, Subject: ${formData.subject}, Message: ${formData.message}`)}`;
        break;
    }
    
    setSubmitted(true);
    setShowOptions(false);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
      <p className="text-gray-600 mb-8">
        Fill out the form below and our team will get back to you within 24 hours.
      </p>

      {submitted ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-20 h-20 bg-[#209f00] rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 text-center">
            Your message has been sent successfully. We'll be in touch soon.
          </p>
        </div>
      ) : showOptions ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-16 h-16 bg-[#209f00] rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Message Saved!</h3>
          <p className="text-gray-600 text-center mb-6">
            Choose how you'd like to send your message:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md">
            <Button
              onClick={() => handleSendVia('whatsapp')}
              className="flex flex-col items-center gap-2 bg-green-500 hover:bg-green-600 text-white rounded-xl py-6"
            >
              <MessageCircle className="w-8 h-8" />
              <span>WhatsApp</span>
            </Button>
            
            <Button
              onClick={() => handleSendVia('email')}
              className="flex flex-col items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-6"
            >
              <Mail className="w-8 h-8" />
              <span>Email</span>
            </Button>
            
            <Button
              onClick={() => handleSendVia('sms')}
              className="flex flex-col items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl py-6"
            >
              <Phone className="w-8 h-8" />
              <span>SMS</span>
            </Button>
          </div>
          
          <Button
            onClick={() => {
              setShowOptions(false);
              setSubmitted(true);
              setTimeout(() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
              }, 3000);
            }}
            variant="ghost"
            className="mt-4 text-gray-500"
          >
            <X className="w-4 h-4 mr-2" />
            Skip and close
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}
          
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#209f00] focus:border-transparent outline-none transition-all"
              placeholder="John Doe"
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#209f00] focus:border-transparent outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#209f00] focus:border-transparent outline-none transition-all"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
              Subject *
            </label>
            <select
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#209f00] focus:border-transparent outline-none transition-all"
            >
              <option value="">Select a subject</option>
              <option value="appointment">Book an Appointment</option>
              <option value="inquiry">General Inquiry</option>
              <option value="feedback">Feedback</option>
              <option value="support">Patient Support</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#209f00] focus:border-transparent outline-none transition-all resize-none"
              placeholder="Tell us how we can help you..."
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#209f00] hover:bg-emerald-600 text-white rounded-xl py-6 text-lg font-semibold disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
