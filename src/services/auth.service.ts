import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../lib/firebase';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  role?: 'student' | 'instructor' | 'admin';
}

export const AuthService = {
  /**
   * Listen to auth state changes
   */
  onAuthStateChanged(callback: (user: AuthUser | null) => void) {
    if (!isFirebaseConfigured || !auth) {
      // In preview mode, return empty unsubscribe
      callback(null);
      return () => {};
    }

    return onAuthStateChanged(auth, async (user: User | null) => {
      if (!user) {
        callback(null);
        return;
      }

      // Read custom claims / role if token exists
      const idTokenResult = await user.getIdTokenResult();
      const role = (idTokenResult.claims.role as 'student' | 'instructor' | 'admin') || 'student';

      callback({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role,
      });
    });
  },

  /**
   * Sign in with Email and Password
   */
  async signIn(email: string, pass: string) {
    if (!isFirebaseConfigured || !auth) {
      console.log('[AuthService] Simulated preview sign-in for:', email);
      return {
        uid: 'demo-user-123',
        email,
        displayName: email.split('@')[0],
        role: 'student',
      };
    }

    const credential = await signInWithEmailAndPassword(auth, email, pass);
    return credential.user;
  },

  /**
   * Sign out current user
   */
  async signOut() {
    if (!isFirebaseConfigured || !auth) return;
    await signOut(auth);
  },
};

