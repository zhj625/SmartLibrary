import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Library, ArrowRight } from 'lucide-react';
import { useAppContext } from '../App';

export const Login: React.FC = () => {
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
         <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/40 to-slate-900 z-0"></div>
         {/* Abstract Shapes */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
         
         <div className="relative z-10 text-center space-y-6">
             <div className="w-20 h-20 bg-white/5 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto border border-white/10 shadow-2xl">
                 <Library className="w-10 h-10 text-primary-400" />
             </div>
             <h1 className="text-4xl font-bold text-white tracking-tight">Welcome Back to <br/>SmartLib</h1>
             <p className="text-slate-400 text-sm tracking-widest uppercase">The Future of Knowledge Management</p>
         </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900">Member Login</h2>
                <p className="text-slate-500 mt-2 text-sm">Access your personalized library dashboard.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</label>
                <input 
                  type="email" 
                  defaultValue="alex@smartlib.com"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-slate-50 focus:bg-white transition-all font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Password</label>
                    <a href="#" className="text-xs font-semibold text-primary-600 hover:text-primary-700">Forgot?</a>
                </div>
                <input 
                  type="password" 
                  defaultValue="password"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-slate-50 focus:bg-white transition-all font-medium"
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all transform hover:-translate-y-1 shadow-lg shadow-primary-600/30 flex items-center justify-center gap-2"
              >
                Sign In <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-500">
                  New here?{' '}
                  <Link to="/register" className="text-slate-900 hover:text-primary-600 font-bold transition-colors">
                    Create an account
                  </Link>
                </p>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl text-center">
                <p className="text-xs text-slate-400 font-medium">Demo Account: alex@smartlib.com / password</p>
            </div>
        </div>
      </div>
    </div>
  );
};