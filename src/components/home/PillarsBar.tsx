import React from 'react';
import { Camera, Users, FolderKanban, Briefcase } from 'lucide-react';

export const PillarsBar: React.FC = () => {
  const pillars = [
    {
      icon: Camera,
      title: 'Practical Training',
      subtitle: 'Learn by doing',
    },
    {
      icon: Users,
      title: 'Expert Mentorship',
      subtitle: 'Learn from industry professionals',
    },
    {
      icon: FolderKanban,
      title: 'Portfolio Development',
      subtitle: 'Graduate with real projects',
    },
    {
      icon: Briefcase,
      title: 'Career Support',
      subtitle: 'Build a professional future',
    },
  ];

  return (
    <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">
      <div className="bg-white rounded-xl shadow-brand-light border border-gray-200/80 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 lg:divide-x divide-gray-100">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className={`flex items-center gap-4 ${
                idx > 0 ? 'pt-4 sm:pt-0 lg:pl-6' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-lg bg-orange-50 border border-orange-100/60 flex items-center justify-center text-brand-orange shrink-0">
                <Icon className="w-5 h-5 text-brand-orange" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-brand-black tracking-tight">
                  {pillar.title}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">{pillar.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

