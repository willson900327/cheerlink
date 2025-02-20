import { collection, addDoc, getDoc, getDocs, query, where, doc, updateDoc, deleteDoc, FirestoreError } from 'firebase/firestore';
import { db } from './config';
import { BusinessCard } from '../types/businessCard';
import { getSession } from 'next-auth/react';

const CARDS_COLLECTION = 'businessCards';

// 保存名片
export async function saveBusinessCard(cardData: BusinessCard) {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      throw new Error('Please sign in to create a business card');
    }

    const docRef = await addDoc(collection(db, CARDS_COLLECTION), {
      ...cardData,
      userId: session.user.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return {
      ...cardData,
      id: docRef.id,
      userId: session.user.email,
    };
  } catch (error) {
    console.error('Error saving business card:', error);
    if (error instanceof FirestoreError && error.code === 'permission-denied') {
      throw new Error('Permission denied. Please check if you are properly signed in.');
    }
    throw error;
  }
}

// 獲取用戶的所有名片
export async function getUserBusinessCards(userEmail: string) {
  try {
    if (!userEmail) {
      throw new Error('User email is required');
    }

    const cardsRef = collection(db, CARDS_COLLECTION);
    const q = query(cardsRef, where('userId', '==', userEmail));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as BusinessCard));
  } catch (error) {
    console.error('Error getting user business cards:', error);
    throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
  }
}

// 獲取名片
export async function getBusinessCard(id: string) {
  try {
    const docRef = doc(db, CARDS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Card not found');
    }
    
    return {
      ...docSnap.data() as BusinessCard,
      id: docSnap.id,
    };
  } catch (error) {
    console.error('Error getting business card:', error);
    throw error;
  }
}

// 更新名片
export async function updateBusinessCard(cardId: string, cardData: Partial<BusinessCard>) {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      throw new Error('Please sign in to update the business card');
    }

    const cardRef = doc(db, CARDS_COLLECTION, cardId);
    const cardDoc = await getDoc(cardRef);

    if (!cardDoc.exists()) {
      throw new Error('Card not found');
    }

    // 檢查是否是名片的擁有者
    if (cardDoc.data().userId !== session.user.email) {
      throw new Error('You do not have permission to update this card');
    }

    await updateDoc(cardRef, {
      ...cardData,
      updatedAt: new Date().toISOString(),
    });

    return {
      id: cardId,
      ...cardData,
      userId: session.user.email,
    };
  } catch (error) {
    console.error('Error updating business card:', error);
    throw error;
  }
}

// 刪除名片
export async function deleteBusinessCard(cardId: string) {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      throw new Error('Please sign in to delete the business card');
    }

    const cardRef = doc(db, CARDS_COLLECTION, cardId);
    const cardDoc = await getDoc(cardRef);

    if (!cardDoc.exists()) {
      throw new Error('Card not found');
    }

    // 檢查是否是名片的擁有者
    if (cardDoc.data().userId !== session.user.email) {
      throw new Error('You do not have permission to delete this card');
    }

    await deleteDoc(cardRef);
    return true;
  } catch (error) {
    console.error('Error deleting business card:', error);
    throw error;
  }
}
