import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { ApplyPage } from './pages/ApplyPage';
import { OnlineTrainingPage } from './pages/OnlineTrainingPage';
import { StudentProjectsPage } from './pages/StudentProjectsPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { SuccessStoriesPage } from './pages/SuccessStoriesPage';
import { MediaPage } from './pages/MediaPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { CertificateVerifyPage } from './pages/CertificateVerifyPage';

// Scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-brand-light font-sans text-brand-black antialiased selection:bg-brand-orange selection:text-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:slug" element={<CourseDetailPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/apply" element={<ApplyPage />} />
            <Route path="/online-training" element={<OnlineTrainingPage />} />
            <Route path="/student-projects" element={<StudentProjectsPage />} />
            <Route path="/facilities" element={<FacilitiesPage />} />
            <Route path="/success-stories" element={<SuccessStoriesPage />} />
            <Route path="/media" element={<MediaPage />} />
            <Route path="/media/:slug" element={<ArticleDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/certificate/verify" element={<CertificateVerifyPage />} />
            <Route path="/certificate/verify/:certificateId" element={<CertificateVerifyPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

