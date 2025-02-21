'use client';

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // 在這裡填入你的 Firebase 配置
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only on client side
const app = typeof window !== 'undefined' ? (!getApps().length ? initializeApp(firebaseConfig) : getApps()[0]) : null;

// Initialize services
export const db = typeof window !== 'undefined' ? getFirestore(app) : null;
export const auth = typeof window !== 'undefined' ? getAuth(app) : null;
export const storage = typeof window !== 'undefined' ? getStorage(app) : null;
export const googleProvider = new GoogleAuthProvider();
