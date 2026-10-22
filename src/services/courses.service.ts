import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { coursesData } from '../data/courses';
import { Course } from '../types';

export const CoursesService = {
  /**
   * Get all courses (from Firestore if configured, otherwise from local data)
   */
  async getAllCourses(): Promise<Course[]> {
    if (!isFirebaseConfigured || !db) {
      return coursesData;
    }

    try {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      if (querySnapshot.empty) {
        return coursesData;
      }
      const courses: Course[] = [];
      querySnapshot.forEach((doc) => {
        courses.push({ id: doc.id, ...(doc.data() as Omit<Course, 'id'>) });
      });
      return courses;
    } catch (error) {
      console.warn('[CoursesService] Firestore read failed, using local courses:', error);
      return coursesData;
    }
  },

  /**
   * Get a single course by its slug
   */
  async getCourseBySlug(slug: string): Promise<Course | undefined> {
    if (!isFirebaseConfigured || !db) {
      return coursesData.find((c) => c.slug === slug);
    }

    try {
      const docRef = doc(db, 'courses', slug);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return { id: snapshot.id, ...(snapshot.data() as Omit<Course, 'id'>) };
      }
      return coursesData.find((c) => c.slug === slug);
    } catch (e) {
      console.warn('[CoursesService] Fetching course by slug fallback:', e);
      return coursesData.find((c) => c.slug === slug);
    }
  },
};

