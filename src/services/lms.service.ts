import {
  collection,
  addDoc,
  doc,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  orderBy,
  setDoc,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';

export interface Lesson {
  id: string;
  courseSlug: string;
  moduleTitle: string;
  title: string;
  youtubeUrl: string;
  youtubeVideoId: string;
  description: string;
  durationMinutes: number;
  order: number;
  createdAt: string;
}

export interface Assignment {
  id: string;
  courseSlug: string;
  title: string;
  instructions: string;
  dueDate: string;
  maxPoints: number;
  createdAt: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  assignmentTitle: string;
  courseSlug: string;
  studentEmail: string;
  studentName: string;
  submissionLink: string;
  notes: string;
  submittedAt: string;
  status: 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
}

export interface EnrolledLearner {
  uid: string;
  email: string;
  displayName: string;
  enrolledCourse: string;
  selectedDuration?: string;
  status: 'active' | 'completed' | 'suspended';
  approvedAt: string;
}

// Storage keys for local persistence fallback
const STORAGE_LESSONS = 'greptech_lms_lessons';
const STORAGE_ASSIGNMENTS = 'greptech_lms_assignments';
const STORAGE_SUBMISSIONS = 'greptech_lms_submissions';
const STORAGE_LEARNERS = 'greptech_lms_learners';

/**
 * Extracts a YouTube Video ID from any standard YouTube URL
 * Handles: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID, etc.
 */
export const extractYouTubeId = (url: string): string => {
  if (!url) return '';
  const trimmed = url.trim();
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  if (match && match[1]) {
    return match[1];
  }
  // If user only typed the 11 character ID directly
  if (trimmed.length === 11 && !trimmed.includes('/') && !trimmed.includes('.')) {
    return trimmed;
  }
  return '';
};

// Default starter lessons so newly approved students immediately have curriculum to watch
const DEFAULT_LESSONS: Lesson[] = [
  {
    id: 'les-1',
    courseSlug: 'cinematography-filmmaking',
    moduleTitle: 'Module 1: Camera Optics & Sensor Fundamentals',
    title: 'Understanding Shutter Angle, Frame Rates & Motion Blur',
    youtubeUrl: 'https://www.youtube.com/watch?v=843e9u3q_5A',
    youtubeVideoId: '843e9u3q_5A',
    description: 'Learn why cinema cameras use a 180-degree shutter rule instead of fractions of a second, and how this governs natural cinematic cadence.',
    durationMinutes: 24,
    order: 1,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'les-2',
    courseSlug: 'cinematography-filmmaking',
    moduleTitle: 'Module 2: Practical Lighting & Contrast Ratio',
    title: 'Three-Point Cinematic Lighting Masterclass',
    youtubeUrl: 'https://www.youtube.com/watch?v=j_Sov3xLqDA',
    youtubeVideoId: 'j_Sov3xLqDA',
    description: 'Master key light motivation, soft negative fill, and edge backlight separation in a professional soundstage.',
    durationMinutes: 32,
    order: 2,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'les-3',
    courseSlug: 'professional-photography',
    moduleTitle: 'Module 1: Studio Flash & Strobe Techniques',
    title: 'Studio Portrait Lighting & Modifier Selection',
    youtubeUrl: 'https://www.youtube.com/watch?v=3gA3y2jX7qE',
    youtubeVideoId: '3gA3y2jX7qE',
    description: 'Explore beauty dishes, octaboxes, and rim flags to sculpt editorial portraits with commercial precision.',
    durationMinutes: 28,
    order: 1,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'les-4',
    courseSlug: 'graphic-design',
    moduleTitle: 'Module 1: Brand Typography & Visual Hierarchy',
    title: 'Typographic Contrast & Editorial Grid Systems',
    youtubeUrl: 'https://www.youtube.com/watch?v=sByzHoiYFX0',
    youtubeVideoId: 'sByzHoiYFX0',
    description: 'Constructing robust modular grids in Adobe InDesign and Illustrator for corporate visual identities.',
    durationMinutes: 30,
    order: 1,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
];

// Default starter assignments
const DEFAULT_ASSIGNMENTS: Assignment[] = [
  {
    id: 'assign-1',
    courseSlug: 'cinematography-filmmaking',
    title: 'Cinematic Mood Lighting Exercise (Practical Lab)',
    instructions: 'Set up a dramatic portrait frame using a motivated key light and solid negative fill. Capture a 15-second cinematic clip and upload your YouTube or Vimeo unlisted link.',
    dueDate: '2026-11-15',
    maxPoints: 100,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'assign-2',
    courseSlug: 'professional-photography',
    title: 'High-Key Commercial Studio Portrait Submission',
    instructions: 'Submit a 3-image editorial series shot with a strobe softbox and fill reflector. Ensure color calibration in Adobe Lightroom.',
    dueDate: '2026-11-20',
    maxPoints: 100,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'assign-3',
    courseSlug: 'graphic-design',
    title: 'Comprehensive Brand Style Guide (PDF/Drive Link)',
    instructions: 'Design a primary logo mark, secondary typography hierarchy, and a 4-color corporate palette in Illustrator. Submit your cloud link.',
    dueDate: '2026-11-22',
    maxPoints: 100,
    createdAt: new Date().toISOString(),
  },
];

export const LMSService = {
  // ==========================================
  // 1. LESSONS & SYLLABUS MANAGEMENT
  // ==========================================
  async getLessonsByCourse(courseSlug: string): Promise<Lesson[]> {
    let localLessons: Lesson[] = [];
    try {
      const stored = localStorage.getItem(STORAGE_LESSONS);
      localLessons = stored ? JSON.parse(stored) : DEFAULT_LESSONS;
    } catch {
      localLessons = DEFAULT_LESSONS;
    }

    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'lessons'), where('courseSlug', '==', courseSlug));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const list: Lesson[] = [];
          snapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...(docSnap.data() as Omit<Lesson, 'id'>) });
          });
          list.sort((a, b) => a.order - b.order);
          return list;
        }
      } catch (err) {
        console.warn('[LMSService] Firestore lessons fetch fallback:', err);
      }
    }

    return localLessons.filter((l) => l.courseSlug === courseSlug).sort((a, b) => a.order - b.order);
  },

  async getAllLessons(): Promise<Lesson[]> {
    let localLessons: Lesson[] = [];
    try {
      const stored = localStorage.getItem(STORAGE_LESSONS);
      localLessons = stored ? JSON.parse(stored) : DEFAULT_LESSONS;
    } catch {
      localLessons = DEFAULT_LESSONS;
    }

    if (isFirebaseConfigured && db) {
      try {
        const snapshot = await getDocs(collection(db, 'lessons'));
        if (!snapshot.empty) {
          const list: Lesson[] = [];
          snapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...(docSnap.data() as Omit<Lesson, 'id'>) });
          });
          return list;
        }
      } catch (err) {
        console.warn('[LMSService] Fetch all lessons fallback:', err);
      }
    }

    return localLessons;
  },

  async createLesson(lessonData: Omit<Lesson, 'id' | 'createdAt' | 'youtubeVideoId'>): Promise<Lesson> {
    const youtubeVideoId = extractYouTubeId(lessonData.youtubeUrl);
    const newLesson: Lesson = {
      ...lessonData,
      id: 'les-' + Date.now(),
      youtubeVideoId,
      createdAt: new Date().toISOString(),
    };

    // Update local cache
    try {
      const existing = await this.getAllLessons();
      existing.push(newLesson);
      localStorage.setItem(STORAGE_LESSONS, JSON.stringify(existing));
    } catch (e) {
      console.warn('Local storage save lesson warning:', e);
    }

    // Write to Firestore if configured
    if (isFirebaseConfigured && db) {
      try {
        const docRef = await addDoc(collection(db, 'lessons'), {
          ...newLesson,
          createdAt: serverTimestamp(),
        });
        newLesson.id = docRef.id;
      } catch (err) {
        console.error('[LMSService] Firestore create lesson failed:', err);
      }
    }

    return newLesson;
  },

  async deleteLesson(lessonId: string): Promise<void> {
    try {
      const existing = await this.getAllLessons();
      const filtered = existing.filter((l) => l.id !== lessonId);
      localStorage.setItem(STORAGE_LESSONS, JSON.stringify(filtered));
    } catch (e) {
      console.warn('Delete lesson local storage warning:', e);
    }

    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'lessons', lessonId));
      } catch (e) {
        console.error('Delete lesson from firestore warning:', e);
      }
    }
  },

  // ==========================================
  // 2. ASSIGNMENTS & TASKS MANAGEMENT
  // ==========================================
  async getAssignmentsByCourse(courseSlug: string): Promise<Assignment[]> {
    let local: Assignment[] = [];
    try {
      const stored = localStorage.getItem(STORAGE_ASSIGNMENTS);
      local = stored ? JSON.parse(stored) : DEFAULT_ASSIGNMENTS;
    } catch {
      local = DEFAULT_ASSIGNMENTS;
    }

    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'assignments'), where('courseSlug', '==', courseSlug));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const list: Assignment[] = [];
          snapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...(docSnap.data() as Omit<Assignment, 'id'>) });
          });
          return list;
        }
      } catch (e) {
        console.warn('Assignments fetch fallback:', e);
      }
    }

    return local.filter((a) => a.courseSlug === courseSlug);
  },

  async getAllAssignments(): Promise<Assignment[]> {
    let local: Assignment[] = [];
    try {
      const stored = localStorage.getItem(STORAGE_ASSIGNMENTS);
      local = stored ? JSON.parse(stored) : DEFAULT_ASSIGNMENTS;
    } catch {
      local = DEFAULT_ASSIGNMENTS;
    }

    if (isFirebaseConfigured && db) {
      try {
        const snapshot = await getDocs(collection(db, 'assignments'));
        if (!snapshot.empty) {
          const list: Assignment[] = [];
          snapshot.forEach((docSnap) => {
            list.push({ id: docSnap.id, ...(docSnap.data() as Omit<Assignment, 'id'>) });
          });
          return list;
        }
      } catch (e) {
        console.warn('Assignments fetch all fallback:', e);
      }
    }

    return local;
  },

  async createAssignment(data: Omit<Assignment, 'id' | 'createdAt'>): Promise<Assignment> {
    const newAssignment: Assignment = {
      ...data,
      id: 'assign-' + Date.now(),
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = await this.getAllAssignments();
      existing.push(newAssignment);
      localStorage.setItem(STORAGE_ASSIGNMENTS, JSON.stringify(existing));
    } catch (e) {
      console.warn('Save assignment locally error:', e);
    }

    if (isFirebaseConfigured && db) {
      try {
        const docRef = await addDoc(collection(db, 'assignments'), {
          ...newAssignment,
          createdAt: serverTimestamp(),
        });
        newAssignment.id = docRef.id;
      } catch (err) {
        console.error('Firestore assignment creation error:', err);
      }
    }

    return newAssignment;
  },

  async deleteAssignment(assignmentId: string): Promise<void> {
    try {
      const existing = await this.getAllAssignments();
      const filtered = existing.filter((a) => a.id !== assignmentId);
      localStorage.setItem(STORAGE_ASSIGNMENTS, JSON.stringify(filtered));
    } catch (e) {
      console.warn('Delete assignment cache error:', e);
    }

    if (isFirebaseConfigured && db) {
      try {
        await deleteDoc(doc(db, 'assignments', assignmentId));
      } catch (e) {
        console.error('Firestore delete assignment error:', e);
      }
    }
  },

  // ==========================================
  // 3. STUDENT ASSIGNMENT SUBMISSIONS
  // ==========================================
  async submitAssignment(data: Omit<AssignmentSubmission, 'id' | 'submittedAt' | 'status'>): Promise<AssignmentSubmission> {
    const newSubmission: AssignmentSubmission = {
      ...data,
      id: 'sub-' + Date.now(),
      submittedAt: new Date().toISOString(),
      status: 'submitted',
    };

    try {
      const raw = localStorage.getItem(STORAGE_SUBMISSIONS);
      const list: AssignmentSubmission[] = raw ? JSON.parse(raw) : [];
      list.unshift(newSubmission);
      localStorage.setItem(STORAGE_SUBMISSIONS, JSON.stringify(list));
    } catch (e) {
      console.warn('Save submission locally error:', e);
    }

    if (isFirebaseConfigured && db) {
      try {
        const docRef = await addDoc(collection(db, 'submissions'), {
          ...newSubmission,
          createdAt: serverTimestamp(),
        });
        newSubmission.id = docRef.id;
      } catch (e) {
        console.error('Firestore submission write error:', e);
      }
    }

    return newSubmission;
  },

  async getSubmissions(courseSlug?: string): Promise<AssignmentSubmission[]> {
    let list: AssignmentSubmission[] = [];
    try {
      const raw = localStorage.getItem(STORAGE_SUBMISSIONS);
      list = raw ? JSON.parse(raw) : [];
    } catch {
      list = [];
    }

    if (isFirebaseConfigured && db) {
      try {
        const snapshot = await getDocs(collection(db, 'submissions'));
        if (!snapshot.empty) {
          const cloudList: AssignmentSubmission[] = [];
          snapshot.forEach((d) => {
            cloudList.push({ id: d.id, ...(d.data() as Omit<AssignmentSubmission, 'id'>) });
          });
          list = cloudList;
        }
      } catch (e) {
        console.warn('Submissions fetch fallback:', e);
      }
    }

    if (courseSlug) {
      return list.filter((s) => s.courseSlug === courseSlug);
    }
    return list;
  },

  async gradeSubmission(
    submissionId: string,
    grade: number,
    feedback: string
  ): Promise<void> {
    try {
      const raw = localStorage.getItem(STORAGE_SUBMISSIONS);
      if (raw) {
        const list: AssignmentSubmission[] = JSON.parse(raw);
        const idx = list.findIndex((s) => s.id === submissionId);
        if (idx !== -1) {
          list[idx].grade = grade;
          list[idx].feedback = feedback;
          list[idx].status = 'graded';
          localStorage.setItem(STORAGE_SUBMISSIONS, JSON.stringify(list));
        }
      }
    } catch (e) {
      console.warn('Grade submission cache warning:', e);
    }

    if (isFirebaseConfigured && db) {
      try {
        await updateDoc(doc(db, 'submissions', submissionId), {
          grade,
          feedback,
          status: 'graded',
          gradedAt: serverTimestamp(),
        });
      } catch (e) {
        console.error('Firestore grade submission error:', e);
      }
    }
  },

  // ==========================================
  // 4. APPROVED LEARNERS & DIRECT PORTAL ACCESS
  // ==========================================
  async getEnrolledLearners(): Promise<EnrolledLearner[]> {
    let list: EnrolledLearner[] = [];
    try {
      const raw = localStorage.getItem(STORAGE_LEARNERS);
      list = raw ? JSON.parse(raw) : [];
    } catch {
      list = [];
    }

    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'users'), where('role', '==', 'student'));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const cloudLearners: EnrolledLearner[] = [];
          snapshot.forEach((d) => {
            const data = d.data();
            cloudLearners.push({
              uid: d.id,
              email: data.email || '',
              displayName: data.displayName || data.fullName || 'Student',
              enrolledCourse: data.enrolledCourse || 'cinematography-filmmaking',
              selectedDuration: data.selectedDuration,
              status: data.status || 'active',
              approvedAt: data.approvedAt || new Date().toISOString(),
            });
          });
          return cloudLearners;
        }
      } catch (e) {
        console.warn('Enrolled learners fetch fallback:', e);
      }
    }

    return list;
  },

  /**
   * Approves an applicant and provisions their dedicated Student Portal credentials
   */
  async approveAndProvisionStudent(params: {
    fullName: string;
    email: string;
    courseSlug: string;
    duration?: string;
    referenceId: string;
  }): Promise<{ email: string; temporaryPassword: string; portalUrl: string }> {
    const temporaryPassword = 'Greptech@2026';
    const learner: EnrolledLearner = {
      uid: 'student-' + Date.now(),
      email: params.email,
      displayName: params.fullName,
      enrolledCourse: params.courseSlug,
      selectedDuration: params.duration || '3 Months (Standard)',
      status: 'active',
      approvedAt: new Date().toISOString(),
    };

    // Save to local learners cache
    try {
      const existing = await this.getEnrolledLearners();
      const updated = existing.filter((l) => l.email !== params.email);
      updated.unshift(learner);
      localStorage.setItem(STORAGE_LEARNERS, JSON.stringify(updated));

      // Also register into local authorized users map so they can log in immediately
      const authMapKey = 'greptech_provisioned_users';
      const authMapRaw = localStorage.getItem(authMapKey);
      const authMap = authMapRaw ? JSON.parse(authMapRaw) : {};
      authMap[params.email.toLowerCase()] = {
        email: params.email,
        password: temporaryPassword,
        displayName: params.fullName,
        role: 'student',
        enrolledCourse: params.courseSlug,
      };
      localStorage.setItem(authMapKey, JSON.stringify(authMap));
    } catch (e) {
      console.warn('Save learner cache warning:', e);
    }

    // Provision in Firestore `/users`
    if (isFirebaseConfigured && db) {
      try {
        const userDocRef = doc(collection(db, 'users'));
        await setDoc(userDocRef, {
          email: params.email,
          fullName: params.fullName,
          displayName: params.fullName,
          role: 'student',
          enrolledCourse: params.courseSlug,
          selectedDuration: params.duration,
          referenceId: params.referenceId,
          status: 'active',
          temporaryPassword,
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        console.warn('[LMSService] Firestore user provisioning warning:', err);
      }
    }

    return {
      email: params.email,
      temporaryPassword,
      portalUrl: window.location.origin + '/login',
    };
  },
};
