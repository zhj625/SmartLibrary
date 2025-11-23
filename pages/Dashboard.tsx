import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { BookOpen, Users, AlertCircle, TrendingUp } from 'lucide-react';
import { useAppContext } from '../App';
import { BookStatus } from '../types';

export const Dashboard: React.FC = () => {
  const { books, user } = useAppContext();

  // Calculate Stats
  const totalBooks = books.length;
  const borrowedBooks = books.filter(b => b.status === BookStatus.BORROWED).length;
  const overdueBooks = books.filter(b => b.dueDate && new Date(b.dueDate) < new Date()).length;
  
  // Mock Data for Charts
  const categoryData = books.reduce((acc, book) => {
    const existing = acc.find(item => item.name === book.category);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ name: book.category, count: 1 });
    }
    return acc;
  }, [] as { name: string, count: number }[]);

  const activityData = [
      { name: 'Mon', borrowed: 4, returned: 2 },
      { name: 'Tue', borrowed: 3, returned: 5 },
      { name: 'Wed', borrowed: 6, returned: 1 },
      { name: 'Thu', borrowed: 2, returned: 4 },
      { name: 'Fri', borrowed: 8, returned: 3 },
      { name: 'Sat', borrowed: 5, returned: 5 },
      { name: 'Sun', borrowed: 3, returned: 2 },
  ];

  const StatCard = ({ title, value, icon: Icon, color, subtext }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wide">{title}</h3>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="flex items-baseline">
        <span className="text-3xl font-bold text-slate-800">{value}</span>
      </div>
      <p className="text-xs text-slate-400 mt-2">{subtext}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <div className="text-sm text-slate-500">Overview for {new Date().toLocaleDateString()}</div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Books" 
          value={totalBooks} 
          icon={BookOpen} 
          color="bg-blue-500" 
          subtext="+2 added this week"
        />
        <StatCard 
          title="Active Loans" 
          value={borrowedBooks} 
          icon={TrendingUp} 
          color="bg-emerald-500" 
          subtext="15% increase from last month"
        />
        <StatCard 
          title="Total Users" 
          value="142" 
          icon={Users} 
          color="bg-violet-500" 
          subtext="+12 new members"
        />
        <StatCard 
          title="Overdue" 
          value={overdueBooks} 
          icon={AlertCircle} 
          color="bg-rose-500" 
          subtext="Action required"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
           <h3 className="text-lg font-bold text-slate-800 mb-6">Book Distribution by Category</h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={categoryData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                 <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                 <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Weekly Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
           <h3 className="text-lg font-bold text-slate-800 mb-6">Weekly Borrowing Activity</h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={activityData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                 <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                 <Line type="monotone" dataKey="borrowed" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                 <Line type="monotone" dataKey="returned" stroke="#10b981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};