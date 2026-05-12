import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  Car, 
  Utensils, 
  User, 
  LogOut, 
  Bell, 
  Clock, 
  MessageSquare,
  ChevronRight,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Smartphone,
  Shield,
  Menu as MenuIcon
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../components/AuthProvider';
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  db, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile
} from '../../lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, onSnapshot, orderBy, doc, setDoc } from 'firebase/firestore';

const LoginView = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignup) {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        
        // Firebase Auth only supports email for this specific method, 
        // so we'll treat emailOrPhone as email for signup.
        const userCredential = await createUserWithEmailAndPassword(auth, formData.emailOrPhone, formData.password);
        
        // Update profile
        await updateProfile(userCredential.user, {
          displayName: formData.name
        });

        // Initialize user doc
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: formData.emailOrPhone,
          displayName: formData.name,
          phone: formData.phone,
          role: userCredential.user.email === 'kanhaiyakr199@gmail.com' ? 'admin' : 'guest',
          createdAt: serverTimestamp(),
        });

      } else {
        await signInWithEmailAndPassword(auth, formData.emailOrPhone, formData.password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-light px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl max-w-lg w-full space-y-8 border border-white/20"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-2 border-accent flex items-center justify-center rotate-45 mx-auto mb-6">
            <span className="text-accent font-serif -rotate-45 text-3xl">V</span>
          </div>
          <h2 className="text-3xl font-serif">{isSignup ? 'Create Account' : 'Guest Sign In'}</h2>
          <p className="text-text-secondary text-sm px-8">
            {isSignup 
              ? 'Join Vivami for a personalized luxury experience.' 
              : 'Welcome back to your private sanctuary.'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignup && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="Full Name"
                required
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-accent"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Email or Phone Number"
              required
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-accent"
              value={formData.emailOrPhone}
              onChange={(e) => setFormData({...formData, emailOrPhone: e.target.value})}
            />
          </div>

          {isSignup && (
            <div className="relative">
              <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="tel"
                placeholder="Phone (e.g. +1 234 567 890)"
                required
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-accent"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          )}

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-12 py-4 text-sm focus:outline-none focus:border-accent"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {isSignup && (
            <div className="relative">
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-accent"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          )}

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center"
            >
              {error}
            </motion.p>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Processing...' : isSignup ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
          <div className="relative flex justify-center text-xs"><span className="px-4 bg-white text-gray-400 uppercase tracking-widest text-[8px] font-bold">Or continue with</span></div>
        </div>

        <button 
          onClick={() => signInWithPopup(auth, googleProvider)}
          className="w-full flex items-center justify-center gap-4 bg-white border border-gray-200 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-50 transition-all shadow-sm"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          Google
        </button>

        <button 
          onClick={() => setIsSignup(!isSignup)}
          className="w-full text-center text-[10px] font-bold uppercase tracking-[0.2em] text-accent hover:underline"
        >
          {isSignup ? 'Already have an account? Sign In' : 'New to Vivami? Create account'}
        </button>
      </motion.div>
    </div>
  );
};

const ServiceCard = ({ icon, title, description, onClick, color }: any) => (
  <motion.button 
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-4 group"
  >
    <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center ${color} bg-opacity-10 text-opacity-100 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <div className="space-y-1">
      <h3 className="font-serif text-lg">{title}</h3>
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{description}</p>
    </div>
  </motion.button>
);

export const GuestDashboard = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('services');
  const [notification, setNotification] = useState<string | null>(null);
  const [myRequests, setMyRequests] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'serviceRequests'),
      where('guestId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMyRequests(docs);
    });

    return () => unsubscribe();
  }, [user]);

  const requestService = async (type: string, details: string = '') => {
    if (!user) return;
    
    try {
      await addDoc(collection(db, 'serviceRequests'), {
        guestId: user.uid,
        guestName: user.displayName || user.email,
        type,
        status: 'pending',
        details,
        createdAt: serverTimestamp(),
      });
      setNotification(`Your request for a ${type} has been sent!`);
      setTimeout(() => setNotification(null), 4000);
    } catch (error) {
      console.error("Error requesting service:", error);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-bg-light">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full" />
    </div>
  );

  if (!user) return <LoginView />;

  return (
    <div className="min-h-screen bg-bg-light pb-32">
      <header className="bg-primary text-white p-8 md:p-12 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/20 rounded-full blur-[100px] -mr-40 -mt-40" />
        <div className="relative flex justify-between items-start max-w-7xl mx-auto">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-[1.5rem] border-2 border-accent p-1 overflow-hidden bg-white/5 backdrop-blur-sm">
              {user.photoURL ? (
                <img src={user.photoURL} alt="User" className="w-full h-full object-cover rounded-[1.2rem]" />
              ) : (
                <div className="w-full h-full bg-accent/20 flex items-center justify-center text-accent font-serif font-bold text-xl rounded-[1.2rem]">
                  {user.displayName?.[0] || 'V'}
                </div>
              )}
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-accent mb-1">Elysian Collection</p>
              <h2 className="text-3xl font-serif italic leading-tight">Welcome, {user.displayName?.split(' ')[0] || 'Guest'}</h2>
            </div>
          </div>
          <button onClick={() => signOut(auth)} className="bg-white/10 p-4 rounded-2xl hover:bg-white/20 transition-all active:scale-95 group">
            <LogOut size={22} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="mt-12 flex gap-4 overflow-x-auto no-scrollbar pb-2 max-w-7xl mx-auto">
          {[
            { id: 'services', label: 'Services', icon: <Bell size={14} /> },
            { id: 'menu', label: 'Menu Card', icon: <Utensils size={14} /> },
            { id: 'requests', label: 'Active Requests', icon: <Clock size={14} /> }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-accent text-black shadow-[0_10px_20px_-10px_rgba(var(--accent-rgb),0.5)]' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-12">
        <AnimatePresence mode="wait">
          {notification && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-8 bg-black text-accent p-6 rounded-[2rem] flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl border border-accent/20 sticky top-10 z-50 backdrop-blur-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                  <Bell size={16} />
                </div>
                <span>{notification}</span>
              </div>
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_#C8A97E]" />
            </motion.div>
          )}
        </AnimatePresence>

        {activeTab === 'services' && (
          <div className="space-y-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <ServiceCard 
                icon={<Coffee size={32} />} 
                title="Call Waiter" 
                description="Instant assistance" 
                color="text-accent"
                onClick={() => requestService('waiter', 'Service requested at table/room')}
              />
              <ServiceCard 
                icon={<Car size={32} />} 
                title="Book Taxi" 
                description="Private Transfer" 
                color="text-blue-500"
                onClick={() => requestService('taxi', 'Private luxury transfer requested')}
              />
              <ServiceCard 
                icon={<Utensils size={32} />} 
                title="Room Service" 
                description="Fine Dining" 
                color="text-emerald-500"
                onClick={() => setActiveTab('menu')}
              />
              <ServiceCard 
                icon={<MessageSquare size={32} />} 
                title="Concierge" 
                description="Butler Service" 
                color="text-purple-500"
                onClick={() => requestService('concierge', 'Dedicated butler assistance')}
              />
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
               <div className="absolute left-0 top-0 w-2 h-full bg-accent" />
              <div className="space-y-4 text-center md:text-left">
                <span className="bg-accent/10 text-accent px-4 py-1 rounded-full text-[8px] font-bold uppercase tracking-[0.3em]">Current Residency</span>
                <h3 className="text-3xl font-serif italic">Grand Horizon Suite • Room 702</h3>
                <div className="flex items-center gap-6 text-text-secondary text-xs font-medium justify-center md:justify-start">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-accent" />
                    Checkout: May 18, 2026
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-accent" />
                    Guests: 2 Adults
                  </div>
                </div>
              </div>
              <div className="w-24 h-24 rounded-3xl border-2 border-gray-50 flex flex-col items-center justify-center bg-gray-50/50">
                <span className="text-accent font-serif font-bold text-3xl">702</span>
                <span className="text-[8px] uppercase font-bold tracking-widest text-gray-400">Wing B</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="space-y-10 pb-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-1 text-center md:text-left">
                <h3 className="text-3xl font-serif italic">The Gastronomy Card</h3>
                <p className="text-xs text-gray-400 font-medium">Curated by Chef de Cuisine</p>
              </div>
              <div className="flex gap-3">
                {['Breakfast', 'Lunch', 'Prime Cuts', 'Cellar'].map(cat => (
                  <button key={cat} className="text-[10px] uppercase font-bold tracking-widest text-gray-400 bg-white border border-gray-100 px-6 py-3 rounded-2xl hover:border-accent hover:text-accent transition-all">{cat}</button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: 'Lobster Risotto', price: '$42', desc: 'Fresh local lobster with arborio rice and saffron infusion.', cat: 'Lunch' },
                { name: 'Gold Leaf Steak', price: '$85', desc: 'Wagyu beef charred to perfection with 24k edible gold.', cat: 'Prime Cuts' },
                { name: 'Black Truffle Pasta', price: '$38', desc: 'Handcrafted tagliatelle with shaved Perigord truffles.', cat: 'Lunch' },
                { name: 'Amalfi Lemon Tart', price: '$18', desc: 'Zesty mountain lemons with shortcrust pastry.', cat: 'Dessert' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex justify-between items-center group cursor-pointer hover:border-accent hover:shadow-xl transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h4 className="font-serif text-xl">{item.name}</h4>
                      <span className="text-[8px] uppercase font-bold tracking-widest text-accent bg-accent/5 px-2 py-0.5 rounded-full">{item.cat}</span>
                    </div>
                    <p className="text-xs text-gray-400 max-w-xs leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="text-right space-y-3">
                    <p className="text-primary font-bold text-xl">{item.price}</p>
                    <button className="bg-gray-50 group-hover:bg-accent group-hover:text-black p-3 rounded-xl transition-all active:scale-90">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-10">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-serif italic">Your Service Timeline</h3>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{myRequests.length} Active</span>
            </div>
            
            <div className="space-y-6">
              {myRequests.length > 0 ? myRequests.map((req, idx) => (
                <motion.div 
                  key={req.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      req.status === 'completed' ? 'bg-green-50 text-green-500' : 'bg-accent/5 text-accent'
                    }`}>
                      {req.type === 'waiter' ? <Coffee size={24} /> : 
                       req.type === 'taxi' ? <Car size={24} /> : 
                       req.type === 'concierge' ? <User size={24} /> : <Bell size={24} />}
                    </div>
                    <div>
                      <h4 className="font-serif text-lg capitalize">{req.type} Request</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        {req.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 italic">"{req.details}"</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        req.status === 'pending' ? 'bg-orange-100 text-orange-500' : 
                        req.status === 'completed' ? 'bg-green-100 text-green-500' : 'bg-blue-100 text-blue-500'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${req.status === 'pending' ? 'animate-pulse bg-orange-500' : req.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'}`} />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${
                        req.status === 'pending' ? 'text-orange-500' : 
                        req.status === 'completed' ? 'text-green-500' : 'text-blue-500'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                    <button className="text-[8px] uppercase font-bold tracking-widest text-gray-300 hover:text-red-500 transition-colors">Cancel</button>
                  </div>
                </motion.div>
              )) : (
                <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock size={32} className="text-gray-300" />
                  </div>
                  <h4 className="font-serif text-xl text-gray-400">No active requests</h4>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-gray-300 mt-2">Services will appear here once requested</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
