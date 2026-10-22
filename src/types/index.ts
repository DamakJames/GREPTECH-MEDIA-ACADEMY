export interface Course {
  id: string;
  slug: string;
  title: string;
  category: 'visual' | 'audio' | 'design' | 'production';
  duration: string;
  format: string;
  shortDescription: string;
  fullOverview: string;
  image: string;
  highResImage: string;
  learningOutcomes: string[];
  curriculum: {
    week: number;
    title: string;
    topics: string[];
  }[];
  practicalProjects: string[];
  equipmentProvided: string[];
  softwareCovered: string[];
  instructor: {
    name: string;
    role: string;
    bio: string;
    avatar: string;
  };
  tuitionFee: string;
  startDate: string;
  certification: string;
  featured: boolean;
}

export interface StudentProject {
  id: string;
  title: string;
  studentName: string;
  category: 'Photography' | 'Films' | 'Designs' | 'Audio' | 'Content';
  image: string;
  description: string;
  year: string;
}

export interface Facility {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  keyGear: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string[];
  category: string;
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  readTime: string;
  coverImage: string;
}

export interface Testimonial {
  id: string;
  name: string;
  course: string;
  quote: string;
  careerRole: string;
  avatar: string;
  cohort: string;
}

export interface ApplicationFormData {
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  residentialAddress: string;
  selectedCourse: string;
  previousExperience: 'beginner' | 'intermediate' | 'advanced';
  educationalBackground: string;
  passportPhoto: File | null;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  privacyConsent: boolean;
}

