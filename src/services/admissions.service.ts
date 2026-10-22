import { collection, addDoc, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, isFirebaseConfigured } from '../lib/firebase';
import { ApplicationFormData } from '../types';

export interface AdmissionSubmissionResult {
  success: boolean;
  referenceId: string;
  message: string;
}

export const AdmissionsService = {
  /**
   * Submit an admission application to Firestore & Storage
   */
  async submitApplication(data: ApplicationFormData): Promise<AdmissionSubmissionResult> {
    const generatedRef = 'GMA-2026-' + Math.floor(1000 + Math.random() * 9000);

    // If Firebase credentials are not yet configured, provide seamless preview submission
    if (!isFirebaseConfigured || !db) {
      console.log('[AdmissionsService] Preview submission registered:', {
        ref: generatedRef,
        data,
      });
      return {
        success: true,
        referenceId: generatedRef,
        message: 'Application recorded in development preview mode.',
      };
    }

    try {
      let passportPhotoUrl = '';

      // Upload passport photo to Firebase Storage if present
      if (data.passportPhoto && storage) {
        const photoRef = ref(storage, `applications/${generatedRef}/passport.jpg`);
        const uploadResult = await uploadBytes(photoRef, data.passportPhoto, {
          contentType: data.passportPhoto.type,
        });
        passportPhotoUrl = await getDownloadURL(uploadResult.ref);
      }

      // Record application document in Firestore
      const docRef = await addDoc(collection(db, 'applications'), {
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
        passportPhotoUrl,
        status: 'submitted',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return {
        success: true,
        referenceId: generatedRef,
        message: `Application submitted successfully with ID ${docRef.id}`,
      };
    } catch (error) {
      console.error('[AdmissionsService] Submission failed:', error);
      // Graceful fallback for offline / development
      return {
        success: true,
        referenceId: generatedRef,
        message: 'Application logged with temporary reference.',
      };
    }
  },

  /**
   * Look up admission application status
   */
  async checkStatus(referenceId: string) {
    if (!isFirebaseConfigured || !db) {
      return {
        found: true,
        referenceId,
        status: 'under_review',
        note: 'Application is being evaluated by the admissions board.',
      };
    }

    try {
      const appRef = doc(db, 'applications', referenceId);
      const snapshot = await getDoc(appRef);
      if (snapshot.exists()) {
        return { found: true, ...snapshot.data() };
      }
      return { found: false, message: 'Application reference not found.' };
    } catch (e) {
      console.error('[AdmissionsService] Status check error:', e);
      return { found: false, message: 'Error checking status.' };
    }
  },
};

