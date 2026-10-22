import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, Send, CheckCircle2, MapPin } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-brand-light min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange">
            <span className="w-5 h-[2px] bg-brand-orange"></span>
            GET IN TOUCH
            <span className="w-5 h-[2px] bg-brand-orange"></span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-brand-black tracking-tight">
            Connect with Greptech
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Have questions about upcoming cohorts, admission requirements, or equipment? Our team is ready to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-black text-white p-8 rounded-2xl border border-brand-border space-y-6 shadow-xl">
              <h2 className="text-xl font-bold text-white border-b border-brand-border pb-3">
                Official Communication Channels
              </h2>

              <ul className="space-y-6">
                <li>
                  <a
                    href="https://wa.me/2348077566926"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 text-gray-300 hover:text-brand-orange transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 shrink-0 group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                        WhatsApp (Instant Response)
                      </span>
                      <span className="text-base font-bold text-white block mt-0.5">
                        +234 807 756 6926
                      </span>
                      <span className="text-[11px] text-gray-400">Click to chat with an admissions counselor</span>
                    </div>
                  </a>
                </li>

                <li>
                  <a
                    href="tel:+2348077566926"
                    className="flex items-start gap-4 text-gray-300 hover:text-brand-orange transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-brand-orange shrink-0 group-hover:scale-105 transition-transform">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                        Telephone Inquiries
                      </span>
                      <span className="text-base font-bold text-white block mt-0.5">
                        +234 807 756 6926
                      </span>
                      <span className="text-[11px] text-gray-400">Monday – Friday: 9am – 5pm</span>
                    </div>
                  </a>
                </li>

                <li>
                  <a
                    href="mailto:Greptechmediaacademy@gmail.com"
                    className="flex items-start gap-4 text-gray-300 hover:text-brand-orange transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-brand-orange shrink-0 group-hover:scale-105 transition-transform">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                        Official Email
                      </span>
                      <span className="text-sm font-bold text-white block mt-0.5 break-all">
                        Greptechmediaacademy@gmail.com
                      </span>
                      <span className="text-[11px] text-gray-400">Admissions & partnership inquiries</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-brand-black">Message Received</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Thank you for reaching out to Greptech Media Academy. Our team will review your message and reply via email or WhatsApp shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-lg text-xs font-bold text-brand-orange bg-orange-50 hover:bg-orange-100 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold text-brand-black border-b border-gray-100 pb-3">
                  Send Us a Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-brand-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-brand-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Phone Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-brand-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      Inquiry Topic
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-brand-orange"
                    >
                      <option value="Admissions">Admissions & Enrollment</option>
                      <option value="Course Inquiries">Course Curriculum & Details</option>
                      <option value="Tuition">Tuition & Schedules</option>
                      <option value="Facilities">Studio Facilities Tour</option>
                      <option value="Other">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you would like to know..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-brand-orange"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors shadow-brand-glow transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

