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

  const login = async (email: string, pass: string, demoRole: UserRole = 'student') => {
    if (isFirebaseConfigured && auth) {
      await signInWithEmailAndPassword(auth, email, pass);
    } else {
      // Simulated preview login
      const demoUser: AppUser = {
        uid: 'demo-' + demoRole + '-101',
        email,
        displayName:
          demoRole === 'admin'
            ? 'Administrator James'
            : demoRole === 'instructor'
            ? 'Chris (Instructor)'
            : 'John (Student)',
        role: demoRole,
        enrolledCourse: demoRole === 'student' ? 'cinematography-filmmaking' : undefined,
      };
      setUser(demoUser);
    }
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
