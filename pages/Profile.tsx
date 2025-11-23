import React from 'react';
import { useAppContext } from '../App';
import { BookOpen, Award, CheckCircle, Clock, RotateCcw, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  const { user, books, returnBook } = useAppContext();
  const navigate = useNavigate();

  if (!user) return null;

  const borrowedBooksList = books.filter(b => user.borrowedBooks.includes(b.id));

  // Determine credit score color
  const getCreditColor = (score: number) => {
      if (score >= 750) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      if (score >= 600) return 'text-amber-600 bg-amber-50 border-amber-100';
      return 'text-red-600 bg-red-50 border-red-100';
  };

  const creditStyle = getCreditColor(user.creditScore);

  return (
    <div className="space-y-8">
      {/* Header Profile Section */}
      <div className="relative bg-white rounded-3xl p-8 shadow-sm border border-slate-100 overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-16 -mt-16 z-0"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary-500 to-purple-500">
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full rounded-full object-cover border-4 border-white" />
                </div>
                <div className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow-md">
                    <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-2">
                <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
                <p className="text-slate-500 font-medium">{user.email}</p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                    <span className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-wide">
                        {user.role === 'ADMIN' ? 'Administrator' : 'Premium Member'}
                    </span>
                    <span className="px-4 py-1.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-full text-xs font-bold uppercase tracking-wide">
                        ID: #839201
                    </span>
                </div>
            </div>
            
            {/* Credit Score Card */}
            <div className={`p-6 rounded-2xl border text-center min-w-[200px] ${creditStyle}`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4" />
                    <p className="text-xs font-bold uppercase tracking-wider">Credit Score</p>
                </div>
                <div className="text-5xl font-extrabold tracking-tight">
                    {user.creditScore}
                </div>
                <p className="text-xs font-semibold mt-2 opacity-80">Excellent Standing</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: My Books */}
          <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center">
                      <BookOpen className="w-6 h-6 mr-3 text-primary-600" />
                      Active Loans
                  </h2>
                  <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-lg border border-slate-200">
                     {borrowedBooksList.length} / 5 limit
                  </span>
              </div>
              
              <div className="grid gap-4">
                  {borrowedBooksList.length > 0 ? borrowedBooksList.map(book => (
                      <div key={book.id} className="group bg-white p-4 rounded-2xl border border-slate-100 hover:border-primary-100 flex flex-col sm:flex-row items-center gap-5 hover:shadow-lg transition-all duration-300">
                          <div className="w-20 h-28 shrink-0 overflow-hidden rounded-lg shadow-md cursor-pointer" onClick={() => navigate(`/book/${book.id}`)}>
                             <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="flex-1 text-center sm:text-left">
                              <h3 className="font-bold text-lg text-slate-800 cursor-pointer hover:text-primary-600" onClick={() => navigate(`/book/${book.id}`)}>{book.title}</h3>
                              <p className="text-sm text-slate-500 mb-3">{book.author}</p>
                              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                                  <Clock className="w-3.5 h-3.5" /> Due: {book.dueDate}
                              </div>
                          </div>
                          <div className="flex sm:flex-col gap-3 w-full sm:w-auto">
                              <button 
                                onClick={() => returnBook(book.id)}
                                className="flex-1 px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
                              >
                                  Return
                              </button>
                              <button className="flex-1 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-bold rounded-xl transition-colors">
                                  Renew
                              </button>
                          </div>
                      </div>
                  )) : (
                      <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-200 text-center">
                          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                              <BookOpen className="w-8 h-8 text-slate-300" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-900">No books borrowed</h3>
                          <p className="text-slate-500 mb-6">Your reading list is currently empty.</p>
                          <button onClick={() => navigate('/library')} className="px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors">
                              Browse Catalog
                          </button>
                      </div>
                  )}
              </div>
          </div>

          {/* Right Column: Achievements */}
          <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center">
                  <Award className="w-6 h-6 mr-3 text-yellow-500" />
                  Achievements
              </h2>
              <div className="bg-white rounded-3xl border border-slate-100 p-2 shadow-sm">
                  {user.achievements.map(ach => (
                      <div key={ach.id} className="p-4 hover:bg-slate-50 rounded-2xl transition-colors flex items-start gap-4 mb-1 last:mb-0">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-100 to-amber-100 flex items-center justify-center shrink-0 shadow-inner">
                              <CheckCircle className="w-6 h-6 text-amber-600" />
                          </div>
                          <div>
                              <h4 className="font-bold text-slate-900 text-sm">{ach.title}</h4>
                              <p className="text-xs text-slate-500 mb-1 leading-relaxed">{ach.description}</p>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-100 inline-block px-2 py-0.5 rounded">Unlocked {ach.unlockedAt}</p>
                          </div>
                      </div>
                  ))}
                  
                  {/* Locked Achievement Simulation */}
                  <div className="p-4 flex items-start gap-4 opacity-60 grayscale relative overflow-hidden">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0">
                          <RotateCcw className="w-6 h-6 text-slate-400" />
                      </div>
                      <div>
                          <h4 className="font-bold text-slate-800 text-sm">Review Master</h4>
                          <p className="text-xs text-slate-500">Write 5 reviews</p>
                          <div className="mt-2 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                             <div className="h-full w-1/5 bg-slate-400"></div>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1 text-right">1/5 Completed</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};