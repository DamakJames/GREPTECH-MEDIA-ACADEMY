import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Eye, CheckCircle2, UserCheck, ArrowRight } from 'lucide-react';

export const AdmissionsProcessSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: FileText,
      title: 'Submit Application',
      description: 'Fill out the online application form with your personal details, chosen course, and passport photograph.',
    },
    {
      number: '02',
      icon: Eye,
      title: 'Portfolio & Creative Review',
      description: 'Our admissions faculty reviews your background, creative goals, and technical readiness.',
    },
    {
      number: '03',
      icon: CheckCircle2,
      title: 'Admission Decision',
      description: 'Successful applicants receive an official admission letter and fee schedule for enrollment.',
    },
    {
      number: '04',
      icon: UserCheck,
      title: 'Enrolment & Studio Orientation',
      description: 'Complete tuition payment, receive your student ID, and join the cohort studio induction.',
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange">
            <span className="w-5 h-[2px] bg-brand-orange"></span>
            HOW TO JOIN
            <span className="w-5 h-[2px] bg-brand-orange"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight">
            Our 4-Step Admissions Process
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            A transparent and structured path to launching your career in creative media.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-brand-light rounded-xl p-6 border border-gray-200/80 relative space-y-4 hover:border-brand-orange/60 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-brand-orange shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-gray-300">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-base font-bold text-brand-black">{step.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/admissions"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-orange hover:text-brand-orange-hover"
          >
            <span>Read Complete Admissions Policy & Requirements</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
