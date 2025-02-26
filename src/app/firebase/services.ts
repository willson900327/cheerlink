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

    // 確保有 language 字段
    if (!cardData.language) {
      const pathname = window.location.pathname;
      cardData.language = pathname.split('/')[1] === 'en' ? 'en' : 'zh';
    }

    // 如果用戶已登入，保存到 Firebase
    if (session?.user?.email) {
      const docRef = await addDoc(collection(db, CARDS_COLLECTION), {
        ...cardData,
        userId: session.user.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // 更新文件，將其 ID 設置為卡片的 ID
      await updateDoc(docRef, {
        id: docRef.id
      });

      return docRef.id;
    }
    
    // 如果用戶未登入，保存到 localStorage
    const savedCards = localStorage.getItem('tempBusinessCards');
    const existingCards = savedCards ? JSON.parse(savedCards) : [];
    const tempId = `temp_${Date.now()}`;
    const newCard = {
      ...cardData,
      id: tempId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedCards = [...existingCards, newCard];
    localStorage.setItem('tempBusinessCards', JSON.stringify(updatedCards));
    return tempId;

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
    // 先從 localStorage 查找
    const savedCards = localStorage.getItem('tempBusinessCards');
    if (savedCards) {
      const cards = JSON.parse(savedCards);
      const localCard = cards.find((c: BusinessCard) => c.id === id);
      if (localCard) {
        return localCard;
      }
    }

    // 如果在 localStorage 中找不到，則從 Firebase 查找
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

// 獲取名片
export async function getBusinessCards(userId: string) {
  if (!db) throw new Error('Firebase is not initialized');

  try {
    const q = query(collection(db, CARDS_COLLECTION), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as BusinessCard);
  } catch (error) {
    console.error('Error getting business cards:', error);
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

    // 更新時保留 ID
    const updateData = {
      ...cardData,
      id: cardId,
      updatedAt: new Date().toISOString(),
    };

    await updateDoc(docRef, updateData);

    return {
      ...existingCard,
      ...updateData,
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
