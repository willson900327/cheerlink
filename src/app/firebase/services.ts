'use client';

import { collection, addDoc, getDoc, getDocs, query, where, doc, updateDoc, deleteDoc, FirestoreError } from 'firebase/firestore';
import { db } from './config';
import { BusinessCard } from '../types/businessCard';
import { getSession } from 'next-auth/react';

const CARDS_COLLECTION = 'businessCards';

// 保存名片
export async function saveBusinessCard(cardData: BusinessCard) {
  if (!db) throw new Error('Firebase is not initialized');
  
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
  if (!db) throw new Error('Firebase is not initialized');
  
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
    throw error;
  }
}

// 獲取名片
export async function getBusinessCard(id: string) {
  if (!db) throw new Error('Firebase is not initialized');
  
  try {
    const docRef = doc(db, CARDS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as BusinessCard;
  } catch (error) {
    console.error('Error getting business card:', error);
    throw error;
  }
}

// 更新名片
export async function updateBusinessCard(cardId: string, cardData: Partial<BusinessCard>) {
  if (!db) throw new Error('Firebase is not initialized');
  
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      throw new Error('Please sign in to update a business card');
    }

    const docRef = doc(db, CARDS_COLLECTION, cardId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Card not found');
    }
    
    const existingCard = docSnap.data();
    if (existingCard.userId !== session.user.email) {
      throw new Error('You do not have permission to update this card');
    }

    await updateDoc(docRef, {
      ...cardData,
      updatedAt: new Date().toISOString(),
    });

    return {
      id: cardId,
      ...existingCard,
      ...cardData,
      updatedAt: new Date().toISOString(),
    } as BusinessCard;
  } catch (error) {
    console.error('Error updating business card:', error);
    throw error;
  }
}

// 刪除名片
export async function deleteBusinessCard(cardId: string) {
  if (!db) throw new Error('Firebase is not initialized');
  
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      throw new Error('Please sign in to delete a business card');
    }

    const docRef = doc(db, CARDS_COLLECTION, cardId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Card not found');
    }
    
    const card = docSnap.data();
    if (card.userId !== session.user.email) {
      throw new Error('You do not have permission to delete this card');
    }

    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting business card:', error);
    throw error;
  }
}
