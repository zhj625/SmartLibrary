import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calendar, Star, CheckCircle, Clock, Sparkles, MessageCircle, Share2 } from 'lucide-react';
import { useAppContext } from '../App';
import { BookStatus } from '../types';
import { getBookSummary } from '../services/geminiService';

export const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { books, user, borrowBook, returnBook, addReview } = useAppContext();
  const [reviewText, setReviewText] = useState('');
  const [aiSummary, setAiSummary] = useState<string>('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  const book = books.find(b => b.id === id);

  useEffect(() => {
    if (book) {
      setLoadingSummary(true);
      getBookSummary(book.title, book.author).then(summary => {
        setAiSummary(summary);
        setLoadingSummary(false);
      });
    }
  }, [book]);

  if (!book) return <div className="p-10 text-center text-slate-500">Book not found</div>;

  const isBorrowedByUser = user?.borrowedBooks.includes(book.id);
  const canBorrow = book.status === BookStatus.AVAILABLE && !isBorrowedByUser;

  const handleBorrow = () => borrowBook(book.id);
  const handleReturn = () => returnBook(book.id);

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if(reviewText.trim()) {
        addReview(book.id, 5, reviewText);
        setReviewText('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      {/* Back Nav */}
      <button 
        onClick={() => navigate(-1)} 
        className="group flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
      >
        <div className="p-2 bg-white rounded-full border border-slate-200 mr-3 group-hover:border-primary-200 group-hover:bg-primary-50 transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:text-primary-600" />
        </div>
        Back to Library
      </button>

      {/* Immersive Header Card */}
      <div className="relative bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
         {/* Background Blur Image */}
         <div className="absolute inset-0 h-64 bg-slate-900 overflow-hidden">
            <img src={book.coverUrl} className="w-full h-full object-cover opacity-30 blur-xl scale-110" alt="bg" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
         </div>

         <div className="relative z-10 p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 items-start">
            {/* Cover Image */}
            <div className="md:col-span-1">
               <div className="rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white aspect-[2/3] transform transition-transform hover:scale-105 duration-500">
                  <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
               </div>
            </div>

            {/* Info */}
            <div className="md:col-span-2 lg:col-span-3 pt-4 space-y-6">
               <div>
                  <div className="flex items-center gap-3 mb-4">
                     <span className="px-3 py-1 bg-white/50 backdrop-blur-md border border-slate-200 rounded-full text-xs font-bold uppercase tracking-wider text-slate-600">
                        {book.category}
                     </span>
                     <span className="px-3 py-1 bg-white/50 backdrop-blur-md border border-slate-200 rounded-full text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" /> {book.publishedYear}
                     </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-2 tracking-tight">{book.title}</h1>
                  <p className="text-xl font-medium text-slate-500">by <span className="text-slate-800 underline decoration-primary-300 decoration-2 underline-offset-4">{book.author}</span></p>
               </div>

               {/* Stats Grid */}
               <div className="flex flex-wrap gap-4 md:gap-8 p-6 bg-slate-50/80 backdrop-blur-sm rounded-2xl border border-slate-100">
                  <div>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Community Rating</p>
                     <div className="flex items-center gap-1.5">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-2xl font-bold text-slate-900">{book.rating}</span>
                        <span className="text-sm text-slate-400 font-medium">/ 5.0</span>
                     </div>
                  </div>
                  <div className="w-px bg-slate-200"></div>
                  <div>
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Availability</p>
                     <div className={`flex items-center gap-2 font-bold text-lg ${book.status === BookStatus.AVAILABLE ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {book.status === BookStatus.AVAILABLE ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                        {book.status}
                     </div>
                  </div>
                  {book.dueDate && (
                     <>
                        <div className="w-px bg-slate-200"></div>
                         <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Due Date</p>
                            <div className="font-bold text-lg text-slate-800">{book.dueDate}</div>
                         </div>
                     </>
                  )}
               </div>

               {/* Buttons */}
               <div className="flex flex-wrap gap-4">
                  {canBorrow && (
                     <button 
                       onClick={handleBorrow}
                       className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-1 flex items-center gap-2"
                     >
                        <BookOpen className="w-5 h-5" />
                        Borrow Book
                     </button>
                  )}
                  {isBorrowedByUser && (
                      <button 
                        onClick={handleReturn}
                        className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-1 flex items-center gap-2"
                      >
                         <CheckCircle className="w-5 h-5" />
                         Return Book
                      </button>
                  )}
                  <button className="px-6 py-4 bg-white border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2">
                     <Share2 className="w-5 h-5" />
                     Share
                  </button>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Content */}
         <div className="lg:col-span-2 space-y-8">
            {/* AI Summary */}
            <div className="bg-gradient-to-br from-indigo-50 to-white p-1 rounded-3xl shadow-sm border border-indigo-100">
               <div className="bg-white/80 backdrop-blur-sm rounded-[22px] p-6 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Sparkles className="w-32 h-32 text-indigo-600" />
                   </div>
                   <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                      <div className="p-1.5 bg-indigo-100 rounded-lg text-indigo-600">
                         <Sparkles className="w-4 h-4" />
                      </div>
                      AI Analysis
                   </h3>
                   <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                      <p className="text-lg">{book.description}</p>
                      {loadingSummary ? (
                         <div className="flex items-center gap-2 text-indigo-500 mt-4 font-medium animate-pulse">
                            <Sparkles className="w-4 h-4" /> Generating deep insights...
                         </div>
                      ) : (
                         aiSummary && (
                            <div className="mt-6 pt-6 border-t border-indigo-50">
                               <p className="italic text-indigo-900 font-medium">"{aiSummary}"</p>
                            </div>
                         )
                      )}
                   </div>
               </div>
            </div>

            {/* Reviews */}
            <div>
               <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  Reviews <span className="text-sm font-normal text-slate-400 ml-2">({book.reviews.length})</span>
               </h3>
               
               <div className="space-y-4">
                  {book.reviews.map(review => (
                     <div key={review.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-200 to-slate-300 flex items-center justify-center text-slate-600 font-bold">
                                  {review.userName.charAt(0)}
                               </div>
                               <div>
                                  <h4 className="font-bold text-slate-900 text-sm">{review.userName}</h4>
                                  <div className="flex text-yellow-400 text-xs mt-0.5">
                                      {[...Array(5)].map((_, i) => (
                                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-slate-200'}`} />
                                      ))}
                                  </div>
                               </div>
                            </div>
                            <span className="text-xs font-medium text-slate-400">{review.date}</span>
                        </div>
                        <p className="text-slate-600 text-sm pl-13 leading-relaxed mt-2">{review.comment}</p>
                     </div>
                  ))}
                  
                  {book.reviews.length === 0 && (
                     <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <MessageCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-400 font-medium">No reviews yet. Be the first!</p>
                     </div>
                  )}
               </div>

               <div className="mt-8 bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
                  <form onSubmit={submitReview} className="relative">
                     <textarea 
                       className="w-full bg-slate-50 rounded-xl p-4 text-sm focus:bg-white focus:ring-2 focus:ring-primary-100 focus:outline-none transition-all resize-none min-h-[100px]"
                       placeholder="Share your thoughts with the community..."
                       value={reviewText}
                       onChange={(e) => setReviewText(e.target.value)}
                     />
                     <div className="absolute bottom-3 right-3">
                        <button type="submit" className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors">
                           Post Review
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};