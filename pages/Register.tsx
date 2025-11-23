import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Library, UserPlus, ArrowRight } from 'lucide-react';
import { useAppContext } from '../App';

export const Register: React.FC = () => {
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
         <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-900/40 z-0"></div>
         <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary-500/20 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]"></div>
         
         <div className="relative z-10 text-white space-y-8 max-w-lg">
             <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-xl">
                 <Library className="w-8 h-8 text-white" />
             </div>
             <h1 className="text-5xl font-bold leading-tight">Begin Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-indigo-300">Intellectual Journey</span></h1>
             <p className="text-slate-300 text-lg leading-relaxed">Join a community of scholars and explorers. Access thousands of books and AI-powered insights instantly.</p>
             
             <div className="flex gap-4 pt-4">
                 <div className="flex -space-x-4">
                     {[1,2,3,4].map(i => (
                         <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-700"></div>
                     ))}
                 </div>
                 <p className="text-sm font-medium text-slate-400 flex items-center">Join 2,000+ members</p>
             </div>
         </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md space-y-8">
            <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
                <p className="text-slate-500 mt-2">Enter your details to get started.</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white transition-all font-medium"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white transition-all font-medium"
                      placeholder="Doe"
                      required
                    />
                  </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white transition-all font-medium"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-white transition-all font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all transform hover:-translate-y-1 shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2"
              >
                Create Account <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="text-center">
                <p className="text-sm text-slate-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary-600 hover:text-primary-700 font-bold">
                    Sign In
                  </Link>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};