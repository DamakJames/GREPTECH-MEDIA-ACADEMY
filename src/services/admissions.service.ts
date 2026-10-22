import {
  collection,
  addDoc,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, isFirebaseConfigured } from '../lib/firebase';
import { ApplicationFormData } from '../types';

export interface ApplicationRecord {
  id?: string;
  referenceId: string;
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  residentialAddress: string;
  selectedCourse: string;
  previousExperience: string;
  educationalBackground: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  privacyConsent: boolean;
  passportPhotoUrl?: string;
  status: 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'enrolled';
  adminNotes?: string;
  submittedAt: string;
}

const STORAGE_KEY = 'greptech_mock_applications';

// Seed sample application for demo
const getLocalApplications = (): ApplicationRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
  return [
    {
      referenceId: 'GMA-2026-7842',
      fullName: 'Blessing Okafor',
      phone: '+234 812 345 6789',
      email: 'blessing.okafor@example.com',
      dateOfBirth: '2001-06-15',
      residentialAddress: 'Victoria Island, Lagos, Nigeria',
      selectedCourse: 'cinematography-filmmaking',
      previousExperience: 'intermediate',
      educationalBackground: 'Bachelors Degree',
      emergencyContact: {
        name: 'Chinedu Okafor',
        phone: '+234 803 111 2233',
        relationship: 'Parent',
      },
      privacyConsent: true,
      passportPhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      status: 'under_review',
      adminNotes: 'Strong creative portfolio. Scheduled for virtual interview.',
      submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      referenceId: 'GMA-2026-4190',
      fullName: 'Tariq Al-Hassan',
      phone: '+234 809 987 6543',
      email: 'tariq.alhassan@example.com',
      dateOfBirth: '1999-11-20',
      residentialAddress: 'Garki, Abuja, Nigeria',
      selectedCourse: 'foley-sound-production',
      previousExperience: 'beginner',
      educationalBackground: 'Higher National Diploma',
      emergencyContact: {
        name: 'Aisha Al-Hassan',
        phone: '+234 802 444 5566',
        relationship: 'Spouse',
      },
      privacyConsent: true,
      passportPhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      status: 'accepted',
      adminNotes: 'Official admission offer issued. Awaiting tuition confirmation.',
      submittedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
  ];
};

const saveLocalApplications = (apps: ApplicationRecord[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  } catch (e) {
    console.warn('LocalStorage save error:', e);
  }
};

export const AdmissionsService = {
  /**
   * Submit an admission application
   */
  async submitApplication(data: ApplicationFormData) {
    const generatedRef = 'GMA-2026-' + Math.floor(1000 + Math.random() * 9000);
    const nowIso = new Date().toISOString();

    // Create record object
    const newRecord: ApplicationRecord = {
      referenceId: generatedRef,
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      residentialAddress: data.residentialAddress,
      selectedCourse: data.selectedCourse,
      previousExperience: data.previousExperience,
      educationalBackground: data.educationalBackground,
      emergencyContact: data.emergencyContact,
      privacyConsent: data.privacyConsent,
      status: 'submitted',
      adminNotes: 'Application received and placed in review queue.',
      submittedAt: nowIso,
    };

    // Save to local cache for instant lookup
    const local = getLocalApplications();
    local.unshift(newRecord);
    saveLocalApplications(local);

    // If Firebase is configured, write to Cloud Firestore & Storage
    if (isFirebaseConfigured && db) {
      try {
        let passportPhotoUrl = '';
        if (data.passportPhoto && storage) {
          const photoRef = ref(storage, `applications/${generatedRef}/passport.jpg`);
          const uploadResult = await uploadBytes(photoRef, data.passportPhoto, {
            contentType: data.passportPhoto.type,
          });
          passportPhotoUrl = await getDownloadURL(uploadResult.ref);
          newRecord.passportPhotoUrl = passportPhotoUrl;
        }

        const docRef = await addDoc(collection(db, 'applications'), {
          ...newRecord,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        newRecord.id = docRef.id;
      } catch (err) {
        console.error('[AdmissionsService] Firebase write error:', err);
      }
    }

    return {
      success: true,
      referenceId: generatedRef,
      record: newRecord,
      message: 'Application submitted successfully.',
    };
  },

  /**
   * Look up admission application status by Reference ID and optional Email
   */
  async checkStatus(referenceId: string, email?: string): Promise<{ found: boolean; application?: ApplicationRecord; message?: string }> {
    const cleanRef = referenceId.trim().toUpperCase();

    // 1. Try Firebase if configured
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'applications'), where('referenceId', '==', cleanRef));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const docData = snapshot.docs[0].data() as ApplicationRecord;
          if (email && docData.email.toLowerCase() !== email.trim().toLowerCase()) {
            return { found: false, message: 'Reference number exists, but does not match this email address.' };
          }
          return { found: true, application: { id: snapshot.docs[0].id, ...docData } };
        }
      } catch (e) {
        console.warn('[AdmissionsService] Firebase lookup fallback to local:', e);
      }
    }

    // 2. Check local applications
    const local = getLocalApplications();
    const match = local.find((a) => a.referenceId.toUpperCase() === cleanRef);

    if (match) {
      if (email && match.email.toLowerCase() !== email.trim().toLowerCase()) {
        return { found: false, message: 'Reference number exists, but does not match this email address.' };
      }
      return { found: true, application: match };
    }

    return { found: false, message: 'No application found with reference ID: ' + cleanRef };
  },

  /**
   * Get all applications for the Admin review dashboard
   */
  async getAllApplications(): Promise<ApplicationRecord[]> {
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as ApplicationRecord) }));
        }
      } catch (e) {
        console.warn('[AdmissionsService] Firestore getAll fallback:', e);
      }
    }
    return getLocalApplications();
  },

  /**
   * Update application status (Admin review action)
   */
  async updateStatus(
    referenceId: string,
    status: ApplicationRecord['status'],
    adminNotes?: string
  ): Promise<boolean> {
    // Update local cache
    const local = getLocalApplications();
    const item = local.find((a) => a.referenceId.toUpperCase() === referenceId.toUpperCase());
    if (item) {
      item.status = status;
      if (adminNotes !== undefined) item.adminNotes = adminNotes;
      saveLocalApplications(local);
    }

    // Update Firestore if configured
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'applications'), where('referenceId', '==', referenceId));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const docId = snapshot.docs[0].id;
          await updateDoc(doc(db, 'applications', docId), {
            status,
            adminNotes: adminNotes || '',
            updatedAt: serverTimestamp(),
          });
        }
      } catch (e) {
        console.error('[AdmissionsService] Update status in Firestore failed:', e);
      }
    }

    return true;
  },
};
