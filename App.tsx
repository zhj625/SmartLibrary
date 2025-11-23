import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Library } from './pages/Library';
import { Dashboard } from './pages/Dashboard';
import { BookDetails } from './pages/BookDetails';
import { AILibrarian } from './components/AILibrarian';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { User, Book, BookStatus, Notification, UserRole } from './types';
import { CURRENT_USER, INITIAL_BOOKS, MOCK_NOTIFICATIONS } from './constants';

// --- Context Definition ---
interface AppContextType {
  user: User | null;
  books: Book[];
  notifications: Notification[];
  login: () => void;
  logout: () => void;
  toggleRole: () => void;
  borrowBook: (bookId: string) => void;
  returnBook: (bookId: string) => void;
  toggleFavorite: (bookId: string) => void;
  addReview: (bookId: string, rating: number, comment: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};

// --- Main App Component ---
const AppContent: React.FC = () => {
  const { user } = useAppContext();
  const location = useLocation();

  if (!user && location.pathname !== '/login' && location.pathname !== '/register') {
      return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
           <Route path="/" element={<Navigate to="/home" replace />} />
           <Route path="/home" element={<Home />} />
           <Route path="/library" element={<Library />} />
           <Route path="/profile" element={<Profile />} />
           <Route path="/book/:id" element={<BookDetails />} />
           <Route path="/dashboard" element={user?.role === UserRole.ADMIN ? <Dashboard /> : <Navigate to="/home" />} />
           <Route path="/librarian" element={<AILibrarian />} />
        </Route>
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  // --- Global State ---
  const [user, setUser] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  // Simulate login
  const login = () => {
    setUser(CURRENT_USER);
  };

  const logout = () => {
    setUser(null);
  };

  const toggleRole = () => {
    if (user) {
      setUser({
        ...user,
        role: user.role === UserRole.USER ? UserRole.ADMIN : UserRole.USER
      });
    }
  };

  const borrowBook = (bookId: string) => {
    if (!user) return;
    
    // Update book status
    setBooks(prev => prev.map(b => 
      b.id === bookId ? { ...b, status: BookStatus.BORROWED, dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0] } : b
    ));

    // Update user record
    setUser(prev => prev ? { ...prev, borrowedBooks: [...prev.borrowedBooks, bookId] } : null);

    // Add notification
    setNotifications(prev => [{
      id: Date.now().toString(),
      title: 'Book Borrowed',
      message: 'You successfully borrowed a book. Due in 14 days.',
      read: false,
      date: 'Just now',
      type: 'success'
    }, ...prev]);
  };

  const returnBook = (bookId: string) => {
    if (!user) return;

    setBooks(prev => prev.map(b => 
      b.id === bookId ? { ...b, status: BookStatus.AVAILABLE, dueDate: undefined } : b
    ));

    setUser(prev => prev ? { ...prev, borrowedBooks: prev.borrowedBooks.filter(id => id !== bookId) } : null);

     setNotifications(prev => [{
      id: Date.now().toString(),
      title: 'Book Returned',
      message: 'Thank you for returning the book on time. Your credit score increased!',
      read: false,
      date: 'Just now',
      type: 'info'
    }, ...prev]);
  };

  const toggleFavorite = (bookId: string) => {
    if (!user) return;
    const isFav = user.favorites.includes(bookId);
    setUser({
      ...user,
      favorites: isFav ? user.favorites.filter(id => id !== bookId) : [...user.favorites, bookId]
    });
  };

  const addReview = (bookId: string, rating: number, comment: string) => {
      if(!user) return;
      setBooks(prev => prev.map(b => {
          if (b.id === bookId) {
              const newReview = {
                  id: Date.now().toString(),
                  userId: user.id,
                  userName: user.name,
                  rating,
                  comment,
                  date: new Date().toISOString().split('T')[0]
              };
              return { ...b, reviews: [...b.reviews, newReview] };
          }
          return b;
      }));
  };

  return (
    <AppContext.Provider value={{ user, books, notifications, login, logout, toggleRole, borrowBook, returnBook, toggleFavorite, addReview }}>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;