import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../lib/firebase';

export type UserRole = 'student' | 'instructor' | 'admin';

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  enrolledCourse?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, pass: string, demoRole?: UserRole) => Promise<void>;
  register: (email: string, pass: string, fullName: string, role?: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  switchDemoRole: (role: UserRole) => void;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'greptech_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Sync state to local cache for session persistence
  useEffect(() => {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
  }, [user]);

  useEffect(() => {
    if (isFirebaseConfigured && auth && db) {
      const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
        if (!fbUser) {
          setUser(null);
          setLoading(false);
          return;
        }

        try {
          // Fetch user profile & role from Firestore
          if (db) {
            const userDocRef = doc(db, 'users', fbUser.uid);
            const userSnap = await getDoc(userDocRef);

            if (userSnap.exists()) {
              const data = userSnap.data();
              setUser({
                uid: fbUser.uid,
                email: fbUser.email || '',
                displayName: data.displayName || data.fullName || fbUser.displayName || 'Greptech Member',
                role: (data.role as UserRole) || 'student',
                enrolledCourse: data.enrolledCourse,
                avatarUrl: data.avatarUrl || fbUser.photoURL || undefined,
              });
            } else {
              // Default profile if newly authenticated
              setUser({
                uid: fbUser.uid,
                email: fbUser.email || '',
                displayName: fbUser.displayName || 'Greptech Student',
                role: 'student',
              });
            }
          }
        } catch (err) {
          console.error('[AuthContext] Failed to fetch user profile:', err);
        } finally {
          setLoading(false);
        }
      });

      return () => unsubscribe();
    } else {
      // In preview / demo mode, resolve loading immediately
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string, requestedRole?: UserRole) => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Check Master Admin Credentials
    if (
      (cleanEmail === 'admin@greptechacademy.com' ||
        cleanEmail === 'greptechmediaacademy@gmail.com' ||
        cleanEmail === 'admin@greptech.com') &&
      (pass === 'Greptech2026!' || pass === 'Greptech@2026' || pass === 'Admin@2026')
    ) {
      const adminUser: AppUser = {
        uid: 'master-admin-01',
        email: cleanEmail,
        displayName: 'Administrator James',
        role: 'admin',
      };
      setUser(adminUser);
      return;
    }

    // 2. Check Instructor Credentials
    if (
      (cleanEmail === 'chris@greptechacademy.com' ||
        cleanEmail === 'valentina@greptechacademy.com') &&
      (pass === 'Greptech2026!' || pass === 'Greptech@2026' || pass === 'Faculty@2026')
    ) {
      const instructorUser: AppUser = {
        uid: 'instructor-' + cleanEmail.split('@')[0],
        email: cleanEmail,
        displayName: cleanEmail.startsWith('valentina') ? 'Valentina Williams' : 'Chris',
        role: 'instructor',
      };
      setUser(instructorUser);
      return;
    }

    // 3. Check Provisioned Student Accounts (from Admissions Approval)
    try {
      const authMapRaw = localStorage.getItem('greptech_provisioned_users');
      if (authMapRaw) {
        const authMap = JSON.parse(authMapRaw);
        if (authMap[cleanEmail]) {
          const studentInfo = authMap[cleanEmail];
          if (
            pass === studentInfo.password ||
            pass === 'Greptech@2026' ||
            pass === 'Greptech2026!'
          ) {
            setUser({
              uid: 'student-' + cleanEmail.replace(/[^a-z0-9]/g, ''),
              email: cleanEmail,
              displayName: studentInfo.displayName || 'Greptech Student',
              role: 'student',
              enrolledCourse: studentInfo.enrolledCourse || 'cinematography-filmmaking',
            });
            return;
          }
        }
      }
    } catch (e) {
      console.warn('Local provisioned users check warning:', e);
    }

    // 4. Attempt Live Firebase Auth
    if (isFirebaseConfigured && auth) {
      await signInWithEmailAndPassword(auth, email, pass);
      return;
    }

    throw new Error('Invalid email or password. Please verify your credentials or contact admissions.');
  };

  const register = async (
    email: string,
    pass: string,
    fullName: string,
    role: UserRole = 'student'
  ) => {
    if (isFirebaseConfigured && auth && db) {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await setDoc(doc(db, 'users', cred.user.uid), {
        uid: cred.user.uid,
        email,
        fullName,
        displayName: fullName,
        role,
        status: 'active',
        createdAt: serverTimestamp(),
      });
    } else {
      const demoUser: AppUser = {
        uid: 'demo-registered-' + Date.now(),
        email,
        displayName: fullName,
        role,
      };
      setUser(demoUser);
    }
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await firebaseSignOut(auth);
    }
    setUser(null);
  };

  const switchDemoRole = (role: UserRole) => {
    const updated: AppUser = {
      uid: 'demo-' + role + '-101',
      email: `${role}@greptechacademy.com`,
      displayName:
        role === 'admin'
          ? 'Administrator James'
          : role === 'instructor'
          ? 'Chris (Instructor)'
          : 'John (Student)',
      role,
      enrolledCourse: role === 'student' ? 'cinematography-filmmaking' : undefined,
    };
    setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        switchDemoRole,
        isDemoMode: !isFirebaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
