import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Play, Sparkles, TrendingUp, Zap, Star, Compass } from 'lucide-react';
import { useAppContext } from '../App';
import { BookCard } from '../components/BookCard';
import { Book } from '../types';

export const Home: React.FC = () => {
  const { books, user, toggleFavorite } = useAppContext();
  const navigate = useNavigate();
  
  // Refs for manual scrolling rows
  const sciFiRef = useRef<HTMLDivElement>(null);

  const featuredBook = books[0];
  const trendingBooks = [...books].sort((a, b) => b.rating - a.rating);
  const newArrivals = [...books].reverse();
  const sciFiBooks = books.filter(b => b.category === 'Sci-Fi' || b.category === 'Technology');

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 600;
      ref.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  // --- Components for this page ---
  
  const SectionHeader = ({ title, icon: Icon, onScrollLeft, onScrollRight, hideControls = false }: any) => (
    <div className="flex items-center justify-between mb-6 px-1">
      <div className="flex items-center gap-3">
        <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-slate-400" />}
          {title}
        </h2>
      </div>
      {!hideControls && (
        <div className="flex gap-2">
          <button onClick={onScrollLeft} className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-500 transition-colors">
              <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={onScrollRight} className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-500 transition-colors">
              <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );

  // Manual Scroll Rail (kept for Sci-Fi section or others)
  const HorizontalRail = ({ books, scrollRef }: any) => (
    <div 
      ref={scrollRef}
      className="flex overflow-x-auto gap-6 pb-8 -mx-4 px-4 scroll-smooth snap-x snap-mandatory no-scrollbar"
    >
      {books.map((book: any, idx: number) => (
         <div key={book.id} className="min-w-[160px] md:min-w-[200px] snap-start">
             <BookCard 
                book={book} 
                isFavorite={user?.favorites.includes(book.id) || false}
                onToggleFavorite={toggleFavorite}
             />
         </div>
      ))}
      <div className="min-w-[50px] snap-start"></div> {/* Spacer */}
    </div>
  );

  // Auto Infinite Scroll Rail (Marquee)
  const AutoScrollingRail = ({ books, direction = 'normal' }: { books: Book[], direction?: 'normal' | 'reverse' }) => {
    // Duplicate content to ensure seamless loop
    // We create enough copies to ensure it fills wide screens and loops smoothly
    const content = [...books, ...books]; 

    return (
      <div className="relative w-full overflow-hidden -mx-4 group">
        {/* Gradient Masks for smooth fade out at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <div 
          className={`flex gap-6 py-4 w-max ${direction === 'normal' ? 'animate-marquee' : 'animate-marquee-reverse'} pause-on-hover`}
        >
          {content.map((book, idx) => (
            <div key={`${book.id}-auto-${idx}`} className="min-w-[160px] md:min-w-[200px] transform transition-transform duration-300 hover:scale-105">
              <BookCard 
                book={book} 
                isFavorite={user?.favorites.includes(book.id) || false}
                onToggleFavorite={toggleFavorite}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen space-y-16 pb-20">
      
      {/* --- 1. Cinematic Hero Section --- */}
      <section className="relative w-full aspect-[16/10] md:aspect-[21/9] lg:aspect-[2.5/1] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl group">
        {/* Background Image with Blur */}
        <div className="absolute inset-0">
           <img 
             src={featuredBook.coverUrl} 
             alt="Hero BG" 
             className="w-full h-full object-cover opacity-40 blur-sm scale-105 group-hover:scale-100 transition-transform duration-1000" 
           />
           {/* Gradient Overlay */}
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center p-8 md:p-16">
            <div className="max-w-2xl space-y-6">
                <div className="flex items-center gap-3 animate-fade-in-up">
                    <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-lg shadow-indigo-600/20">
                        Featured Book
                    </span>
                    <div className="flex text-yellow-400 gap-0.5">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                    </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-lg animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                    {featuredBook.title}
                </h1>

                <p className="text-lg md:text-xl text-slate-200 font-medium line-clamp-2 max-w-lg animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                    {featuredBook.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-4 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                    <button 
                        onClick={() => navigate(`/book/${featuredBook.id}`)}
                        className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-indigo-50 transition-all flex items-center gap-2 shadow-xl hover:scale-105"
                    >
                        <Play className="w-5 h-5 fill-current" />
                        Read Now
                    </button>
                    <button 
                        onClick={() => toggleFavorite(featuredBook.id)}
                        className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
                    >
                        + Add to List
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* --- 2. Quick Actions Strip (Glass) --- */}
      <section className="-mt-10 relative z-10 px-4">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-4 shadow-xl shadow-slate-200/50 flex flex-wrap items-center justify-between gap-6">
             <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-1">
                 <button onClick={() => navigate('/library')} className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 whitespace-nowrap transition-colors">
                    <Compass className="w-5 h-5" /> Explore
                 </button>
                 <button onClick={() => navigate('/librarian')} className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 whitespace-nowrap transition-colors">
                    <Zap className="w-5 h-5" /> AI Assistant
                 </button>
                 <div className="w-px h-6 bg-slate-200"></div>
                 {['Sci-Fi', 'Business', 'History', 'Design'].map(cat => (
                     <button key={cat} className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                        {cat}
                     </button>
                 ))}
             </div>
             
             {/* Credit Pill */}
             <div className="hidden md:flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl">
                 <div className="text-xs font-bold text-slate-400 uppercase">Your Credit</div>
                 <div className="text-sm font-black text-slate-900">{user?.creditScore}</div>
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             </div>
        </div>
      </section>

      {/* --- 3. Auto Scroll Rail: Trending (Moves Left) --- */}
      <section>
        <SectionHeader 
            title="Trending Now" 
            icon={TrendingUp}
            hideControls={true}
        />
        <AutoScrollingRail books={trendingBooks} direction="normal" />
      </section>

      {/* --- 4. Auto Scroll Rail: New Arrivals (Moves Right for variety or Left) --- 
          Let's keep it Left (normal) for consistency, or Reverse for visual interest. 
          Usually consistent flow is better, but let's try Reverse for "New Arrivals" to make it distinct.
      */}
      <section>
         <SectionHeader 
            title="New Arrivals" 
            icon={Sparkles}
            hideControls={true}
        />
        <AutoScrollingRail books={newArrivals} direction="normal" />
      </section>

      {/* --- 5. Feature Banner (Mid-Page Break) --- */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl">
         <div className="absolute top-0 right-0 p-20 opacity-10">
            <Sparkles className="w-64 h-64 text-white" />
         </div>
         <div className="relative z-10 flex flex-col md:flex-row items-center p-8 md:p-12 gap-8">
            <div className="flex-1 space-y-4 text-center md:text-left">
                <h3 className="text-3xl font-bold">Unsure what to read next?</h3>
                <p className="text-indigo-100 text-lg max-w-md">Our AI Librarian analyzes your reading history to provide personalized recommendations instantly.</p>
                <button 
                  onClick={() => navigate('/librarian')}
                  className="mt-4 px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors inline-flex items-center gap-2"
                >
                    <Zap className="w-5 h-5" /> Ask AI Librarian
                </button>
            </div>
            <div className="hidden md:block w-px h-32 bg-indigo-500/50"></div>
            <div className="flex-1 flex gap-4 overflow-hidden opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
                 {/* Visual decoration of books */}
                 {[0, 1, 2].map(i => books[i] && (
                     <img key={i} src={books[i].coverUrl} className="w-24 h-36 object-cover rounded-lg transform rotate-3 hover:rotate-0 transition-all" alt="decor" />
                 ))}
            </div>
         </div>
      </section>

      {/* --- 6. Manual Rail: Tech & Sci-Fi --- */}
      <section>
         <SectionHeader 
            title="Tech & Sci-Fi Collection" 
            icon={Zap}
            onScrollLeft={() => scroll(sciFiRef, 'left')} 
            onScrollRight={() => scroll(sciFiRef, 'right')} 
        />
        <HorizontalRail books={sciFiBooks} scrollRef={sciFiRef} />
      </section>

    </div>
  );
};