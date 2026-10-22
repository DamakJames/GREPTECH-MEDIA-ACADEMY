import React from 'react';
import { Hero } from '../components/home/Hero';
import { PillarsBar } from '../components/home/PillarsBar';
import { FeaturedCourses } from '../components/home/FeaturedCourses';
import { WhyGreptech } from '../components/home/WhyGreptech';
import { StudentProjectsSection } from '../components/home/StudentProjectsSection';
import { FacilitiesPreview } from '../components/home/FacilitiesPreview';
import { AdmissionsProcessSection } from '../components/home/AdmissionsProcessSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { ArticlesPreview } from '../components/home/ArticlesPreview';
import { FAQAccordion } from '../components/common/FAQAccordion';
import { CTABanner } from '../components/home/CTABanner';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Pillars Bar (Floating dock) */}
      <PillarsBar />

      {/* 3. Featured Courses */}
      <FeaturedCourses />

      {/* 4. Why Choose Greptech (Dark Section) */}
      <WhyGreptech />

      {/* 5. Student Projects & Creative Portfolio */}
      <StudentProjectsSection />

      {/* 6. Facilities & Equipment */}
      <FacilitiesPreview />

      {/* 7. Admissions Process */}
      <AdmissionsProcessSection />

      {/* 8. Student Testimonials */}
      <TestimonialsSection />

      {/* 9. Latest Articles & Media Resources */}
      <ArticlesPreview />

      {/* 10. Frequently Asked Questions */}
      <FAQAccordion />

      {/* 11. Final Admissions CTA */}
      <CTABanner />
    </div>
  );
};
