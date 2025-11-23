export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum BookStatus {
  AVAILABLE = 'Available',
  BORROWED = 'Borrowed',
  RESERVED = 'Reserved'
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  category: string;
  description: string;
  status: BookStatus;
  isbn: string;
  rating: number;
  publishedYear: number;
  reviews: Review[];
  dueDate?: string; // If borrowed
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
  unlockedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  borrowedBooks: string[]; // Book IDs
  favorites: string[]; // Book IDs
  creditScore: number;
  achievements: Achievement[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  date: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface DashboardStats {
  totalBooks: number;
  activeUsers: number;
  borrowedCount: number;
  overdueCount: number;
}