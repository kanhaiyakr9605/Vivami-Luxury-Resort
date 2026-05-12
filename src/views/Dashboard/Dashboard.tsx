import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Bell, 
  Search,
  ChevronDown,
  MoreVertical,
  Star,
  Settings,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  updateDoc 
} from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import { useAuth } from '../../components/AuthProvider';
import { useState, useEffect } from 'react';

const data = [
  { name: 'Mon', revenue: 4000, occupancy: 2400 },
  { name: 'Tue', revenue: 3000, occupancy: 1398 },
  { name: 'Wed', revenue: 2000, occupancy: 9800 },
  { name: 'Thu', revenue: 2780, occupancy: 3908 },
  { name: 'Fri', revenue: 1890, occupancy: 4800 },
  { name: 'Sat', revenue: 2390, occupancy: 3800 },
  { name: 'Sun', revenue: 3490, occupancy: 4300 },
];

const StatCard = ({ title, value, icon, trend, color }: { title: string, value: string, icon: any, trend: string, color: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4"
  >
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100`}>
        {icon}
      </div>
      <span className={`text-xs font-bold ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'} bg-gray-50 px-2 py-1 rounded-full uppercase tracking-tighter`}>
        {trend}
      </span>
    </div>
    <div>
      <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">{title}</p>
      <h3 className="text-2xl font-serif mt-1">{value}</h3>
    </div>
  </motion.div>
);

const ServiceRow = ({ request, onUpdateStatus }: { request: any, onUpdateStatus: (id: string, status: string) => void }) => (
  <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
    <td className="py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent font-bold text-xs uppercase">
          {request.guestName?.[0] || 'G'}
        </div>
        <div>
          <p className="text-sm font-bold">{request.guestName}</p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{request.type}</p>
        </div>
      </div>
    </td>
    <td className="py-4 text-xs font-medium text-gray-500">
      {request.createdAt?.toDate().toLocaleString()}
    </td>
    <td className="py-4 text-xs text-gray-500 max-w-xs truncate">{request.details}</td>
    <td className="py-4">
      <select 
        value={request.status}
        onChange={(e) => onUpdateStatus(request.id, e.target.value)}
        className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-gray-50 border-none outline-none cursor-pointer ${
          request.status === 'completed' ? 'text-green-600' : 
          request.status === 'pending' ? 'text-orange-600' : 'text-blue-600'
        }`}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </td>
    <td className="py-4 text-right">
      <button className="text-gray-300 hover:text-primary transition-colors">
        <MoreVertical size={16} />
      </button>
    </td>
  </tr>
);

export const Dashboard = () => {
  const { userProfile, loading } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'serviceRequests'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'serviceRequests', id), { status });
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
    </div>
  );

  if (!userProfile || userProfile.role !== 'admin') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-white p-12 text-center space-y-8">
        <div className="w-24 h-24 border-2 border-accent flex items-center justify-center rotate-45 mb-8">
          <ShieldCheck size={48} className="text-accent -rotate-45" />
        </div>
        <h2 className="text-4xl font-serif">Access Restricted</h2>
        <p className="max-w-md text-white/60 leading-relaxed font-light">
          This area is reserved for Vivami Estate Management. Please sign in with an authorized administrator account to continue.
        </p>
        <div className="pt-8 border-t border-white/10 w-full max-w-xs">
          <p className="text-[10px] uppercase font-bold tracking-widest text-accent mb-4">Current User</p>
          <p className="text-sm font-medium">{userProfile?.email || 'Unauthorized'}</p>
          <p className="text-[8px] uppercase tracking-widest text-white/30 mt-1">Role: {userProfile?.role || 'Guest'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-primary text-white p-8 flex flex-col fixed h-full z-50">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-8 border border-accent flex items-center justify-center rotate-45 shrink-0">
            <span className="text-accent font-serif -rotate-45 text-sm">V</span>
          </div>
          <span className="font-serif text-lg tracking-[0.2em] uppercase">Vivami Admin</span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { icon: <LayoutDashboard size={20} />, label: 'Overview', active: true },
            { icon: <Bell size={20} />, label: 'Services' },
            { icon: <Calendar size={20} />, label: 'Reservations' },
            { icon: <Users size={20} />, label: 'Guests' },
            { icon: <TrendingUp size={20} />, label: 'Analytics' },
            { icon: <ShieldCheck size={20} />, label: 'Staff' },
            { icon: <Settings size={20} />, label: 'Settings' }
          ].map((item, idx) => (
            <button 
              key={idx}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${item.active ? 'bg-accent text-black font-bold' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              {item.icon}
              <span className="text-xs uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/10">
          <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-accent/30">
               <img src={userProfile?.photoURL || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <p className="text-xs font-bold truncate max-w-[120px]">{userProfile?.displayName || 'Admin'}</p>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">Verified Principal</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-serif italic">Estate Intelligence</h1>
            <p className="text-text-secondary text-xs font-bold uppercase tracking-widest mt-1">Vivami Amalfi Coast • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search directives..." 
                className="bg-white border border-gray-100 rounded-full pl-12 pr-6 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-accent w-64"
              />
            </div>
            <button className="relative w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:border-accent group transition-colors">
              <Bell size={20} className="group-hover:text-accent transition-colors" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-white" />
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Revenue" value="$42,850" icon={<DollarSign size={24} />} trend="+12.5%" color="text-green-500" />
          <StatCard title="Active Services" value={requests.filter(r => r.status === 'pending' || r.status === 'in-progress').length.toString()} icon={<Bell size={24} />} trend="+2.4%" color="text-accent" />
          <StatCard title="Arrivals Today" value="8" icon={<Calendar size={24} />} trend="+3" color="text-blue-500" />
          <StatCard title="Guest Satisfaction" value="4.9" icon={<Star size={24} />} trend="+0.1" color="text-purple-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Service Requests */}
          <div className="lg:col-span-3 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-serif">Service Directives</h3>
              <div className="flex gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-orange-50 text-orange-500 px-3 py-1 rounded-full">
                  {requests.filter(r => r.status === 'pending').length} Pending
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-50 text-blue-500 px-3 py-1 rounded-full">
                  {requests.filter(r => r.status === 'in-progress').length} Active
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em] border-b border-gray-100 pb-4">
                    <th className="font-bold pb-4">Guest & Type</th>
                    <th className="font-bold pb-4">Timestamp</th>
                    <th className="font-bold pb-4">Special Instructions</th>
                    <th className="font-bold pb-4">Status Dispatch</th>
                    <th className="font-bold pb-4 text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(req => (
                    <ServiceRow key={req.id} request={req} onUpdateStatus={updateStatus} />
                  ))}
                  {requests.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-20 text-center text-gray-400 font-serif italic text-lg">No active service directives found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
