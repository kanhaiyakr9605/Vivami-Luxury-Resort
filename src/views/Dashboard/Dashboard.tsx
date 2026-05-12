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

const RecentBooking = ({ name, room, date, status, amount }: { name: string, room: string, date: string, status: string, amount: string }) => (
  <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
    <td className="py-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xs uppercase">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <p className="text-sm font-bold">{name}</p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{room}</p>
        </div>
      </div>
    </td>
    <td className="py-4 text-xs font-medium text-gray-500">{date}</td>
    <td className="py-4">
      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
        status === 'Confirmed' ? 'bg-green-50 text-green-600' : 
        status === 'Pending' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
      }`}>
        {status}
      </span>
    </td>
    <td className="py-4 text-sm font-bold text-right">{amount}</td>
    <td className="py-4 text-right">
      <button className="text-gray-300 hover:text-primary transition-colors">
        <MoreVertical size={16} />
      </button>
    </td>
  </tr>
);

export const Dashboard = () => {
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
            { icon: <Calendar size={20} />, label: 'Reservations' },
            { icon: <Users size={20} />, label: 'Guests' },
            { icon: <TrendingUp size={20} />, label: 'Analytics' },
            { icon: <ShieldCheck size={20} />, label: 'Staff' },
            { icon: <CreditCard size={20} />, label: 'Finances' },
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
            <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-serif italic text-xl">
              V
            </div>
            <div>
              <p className="text-xs font-bold">Admin Portal</p>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">VIV-001</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-serif italic">Operational Overview</h1>
            <p className="text-text-secondary text-xs font-bold uppercase tracking-widest mt-1">Vivami Amalfi Coast • Tuesday, May 05</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search bookings..." 
                className="bg-white border border-gray-100 rounded-full pl-12 pr-6 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-accent w-64"
              />
            </div>
            <button className="relative w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-white" />
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Revenue" value="$128,450" icon={<DollarSign size={24} />} trend="+12.5%" color="text-green-500" />
          <StatCard title="Total Bookings" value="2,450" icon={<Calendar size={24} />} trend="+5.2%" color="text-accent" />
          <StatCard title="Average Stay" value="4.5 Days" icon={<Users size={24} />} trend="-2.1%" color="text-blue-500" />
          <StatCard title="Efficiency" value="98.2%" icon={<TrendingUp size={24} />} trend="+0.4%" color="text-purple-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-serif">Revenue Performance</h3>
              <select className="bg-gray-50 border-none text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg focus:outline-none">
                <option>Weekly View</option>
                <option>Monthly View</option>
              </select>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#9CA3AF' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#9CA3AF' }}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Occupancy Chart */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-serif mb-8">Occupancy Rate</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#9CA3AF' }} 
                  />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                  <Bar dataKey="occupancy" fill="#0B0B0B" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Bookings Table */}
          <div className="lg:col-span-3 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-serif">Recent Reservations</h3>
              <button className="text-accent text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                View Full Log <ChevronDown size={14} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em] border-b border-gray-100 pb-4">
                    <th className="font-bold pb-4">Guest</th>
                    <th className="font-bold pb-4">Stay Dates</th>
                    <th className="font-bold pb-4">Status</th>
                    <th className="font-bold pb-4 text-right">Total Price</th>
                    <th className="font-bold pb-4 text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  <RecentBooking name="Elena Gilbert" room="Oceanic Suite" date="May 12 - May 18" status="Confirmed" amount="$5,240.00" />
                  <RecentBooking name="Stefan Salvatore" room="Royal Penthouse" date="May 15 - May 22" status="In Progress" amount="$8,450.00" />
                  <RecentBooking name="Caroline Forbes" room="Garden Villa" date="May 11 - May 14" status="Pending" amount="$2,120.00" />
                  <RecentBooking name="Klaus Mikaelson" room="Sky Loft" date="May 20 - May 25" status="Confirmed" amount="$12,000.00" />
                  <RecentBooking name="Bonnie Bennett" room="Deluxe View" date="May 08 - May 10" status="Confirmed" amount="$1,850.00" />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
