import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Library, 
  LayoutDashboard, 
  MessageSquareText, 
  LogOut, 
  Bell, 
  Menu, 
  X, 
  User as UserIcon,
  ShieldCheck,
  Home,
  UserCircle,
  Search,
  Sparkles
} from 'lucide-react';
import { useAppContext } from '../App';
import { UserRole } from '../types';

export const Layout: React.FC = () => {
  const { user, logout, notifications, toggleRole } = useAppContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
    <NavLink 
      to={to} 
      className={({ isActive }) => `
        group flex items-center px-4 py-3.5 text-sm font-medium rounded-2xl transition-all duration-300
        ${isActive 
          ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 translate-x-1' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}
      `}
      onClick={() => setIsSidebarOpen(false)}
    >
      <Icon className={`w-5 h-5 mr-3 transition-transform duration-300 group-hover:scale-110`} />
      {label}
    </NavLink>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans selection:bg-primary-200">
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200/60
          transform transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          lg:translate-x-0 lg:static lg:inset-auto
          ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="flex items-center justify-between p-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                <Library className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">SmartLib</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2 overflow-y-auto no-scrollbar">
            <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Menu</div>
            <NavItem to="/home" icon={Home} label="Discover" />
            <NavItem to="/library" icon={Library} label="Library Catalog" />
            <NavItem to="/librarian" icon={Sparkles} label="AI Assistant" />
            
            <div className="mt-8 px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Account</div>
            <NavItem to="/profile" icon={UserCircle} label="My Profile" />
            {user?.role === UserRole.ADMIN && (
              <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            )}
          </nav>

          {/* User Profile */}
          <div className="p-4 m-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/profile')}>
               <div className="relative">
                 <img src={user?.avatarUrl} alt="User" className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                 <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
               </div>
               <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.role === UserRole.ADMIN ? 'Admin Access' : 'Student Member'}</p>
               </div>
            </div>
            <button 
              onClick={handleLogout}
              className="mt-3 w-full flex items-center justify-center px-4 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all duration-300"
            >
              <LogOut className="w-3 h-3 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex flex-col flex-1 min-w-0 transition-all duration-300">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 transition-all duration-300">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-bold text-slate-800 hidden sm:block animate-fade-in">
              {location.pathname === '/home' && 'Welcome Back, ' + user?.name?.split(' ')[0]}
              {location.pathname === '/library' && 'Browse Collection'}
              {location.pathname === '/profile' && 'Your Profile'}
              {location.pathname === '/librarian' && 'AI Assistant'}
              {location.pathname === '/dashboard' && 'System Overview'}
            </h2>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
             {/* Role Toggle */}
             <button 
                onClick={toggleRole}
                className={`
                  hidden sm:flex items-center px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-300
                  ${user?.role === UserRole.ADMIN 
                    ? 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' 
                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'}
                `}
             >
                {user?.role === UserRole.ADMIN ? <ShieldCheck className="w-3 h-3 mr-1.5"/> : <UserIcon className="w-3 h-3 mr-1.5"/>}
                {user?.role === UserRole.ADMIN ? 'Admin Mode' : 'Student Mode'}
             </button>

             {/* Search Trigger (Visual Only) */}
             <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                <Search className="w-5 h-5" />
             </button>

             {/* Notifications */}
             <div className="relative group">
                <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                  )}
                </button>
             </div>
          </div>
        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto w-full animate-fade-in-up">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};