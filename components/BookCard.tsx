import React from 'react';
import { Book, BookStatus } from '../types';
import { Heart, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BookCardProps {
  book: Book;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  variant?: 'portrait' | 'landscape'; // Added for flexibility
}

export const BookCard: React.FC<BookCardProps> = ({ book, isFavorite, onToggleFavorite, variant = 'portrait' }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="group relative flex flex-col gap-3 cursor-pointer"
      onClick={() => navigate(`/book/${book.id}`)}
    >
      {/* Cover Image Container */}
      <div className={`
        relative overflow-hidden rounded-2xl shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:shadow-indigo-500/20 group-hover:-translate-y-2
        ${variant === 'landscape' ? 'aspect-video' : 'aspect-[2/3]'}
      `}>
        <img 
          src={book.coverUrl} 
          alt={book.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
           <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <button 
                className="w-full py-2 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold rounded-lg hover:bg-white hover:text-slate-900 transition-colors"
              >
                View Details
              </button>
           </div>
        </div>

        {/* Status Badge (Top Left) */}
        {book.status !== BookStatus.AVAILABLE && (
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase rounded-md flex items-center gap-1">
               <Clock className="w-3 h-3" /> {book.status}
            </span>
          </div>
        )}

        {/* Favorite Button (Top Right) */}
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(book.id); }}
          className="absolute top-2 right-2 p-2 rounded-full bg-slate-900/10 backdrop-blur-sm text-white hover:bg-white hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
        </button>
      </div>

      {/* Minimalist Info Below */}
      <div className="space-y-1">
        <h3 className="font-bold text-slate-900 text-sm leading-tight line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {book.title}
        </h3>
        <div className="flex items-center justify-between">
           <p className="text-xs text-slate-500 truncate max-w-[70%]">{book.author}</p>
           <div className="flex items-center gap-1">
             <Star className="w-3 h-3 text-yellow-400 fill-current" />
             <span className="text-xs font-bold text-slate-700">{book.rating}</span>
           </div>
        </div>
      </div>
    </div>
  );
};