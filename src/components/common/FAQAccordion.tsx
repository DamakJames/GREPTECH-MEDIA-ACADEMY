import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Who can apply for courses at Greptech Media Academy?',
      answer:
        'Our courses are engineered for aspiring creatives, developing professionals, career switchers, and content creators. Whether you are starting with zero technical background or looking to refine your commercial portfolio, our hands-on curriculum meets you where you are.',
    },
    {
      question: 'Do I need my own camera or production equipment to enroll?',
      answer:
        'No. Greptech Media Academy provides full access to industry-grade cinema cameras, mirrorless photo cameras, studio lighting, audio microphones, editing suites, and broadcast switchers during your practical lab sessions.',
    },
    {
      question: 'What are the training formats and schedules?',
      answer:
        'We offer intensive 3-month practical in-studio training cohorts with flexible schedules (weekday batches and weekend executive batches) designed to fit around work and academic commitments.',
    },
    {
      question: 'Are digital certificates provided upon graduation?',
      answer:
        'Yes. Graduates who successfully complete their coursework, assignments, and capstone projects receive an official Greptech Media Academy Certificate with a unique digital verification ID and QR code for public validation.',
    },
    {
      question: 'How do I check the status of my admission application?',
      answer:
        'Once submitted, your application is reviewed by our admissions panel within 3-5 business days. You can track your application status anytime using your registered email address and application reference.',
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange">
            <span className="w-5 h-[2px] bg-brand-orange"></span>
            GOT QUESTIONS?
            <span className="w-5 h-[2px] bg-brand-orange"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Clear answers to help you make an informed decision about your media training.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="text-base font-bold text-brand-black">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-orange shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-brand-light/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
