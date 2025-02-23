export interface BusinessCard {
  id?: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  bio?: string;
  backgroundImage?: string;
  avatarImage?: string;
  userEmail: string;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  avatar?: string;
  website?: string;
  language: 'en' | 'zh';
}
