import { 
  signInWithCustomToken, 
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from './config';

// 監聽 auth 狀態變化
onAuthStateChanged(auth, (user) => {
  console.log('Firebase auth state changed:', user ? 'User logged in' : 'User logged out');
});

export const signInWithToken = async (token: string) => {
  try {
    const userCredential = await signInWithCustomToken(auth, token);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in with custom token:', error);
    throw error;
  }
};

export const signOutFirebase = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out from Firebase:', error);
    throw error;
  }
};
