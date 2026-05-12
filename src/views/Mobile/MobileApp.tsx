import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Search, 
  Calendar, 
  User, 
  MapPin, 
  Star, 
  ChevronLeft, 
  Heart,
  Bell,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  Wifi,
  Waves,
  Wind
} from 'lucide-react';
import { useState, useEffect } from 'react';

type Screen = 'splash' | 'home' | 'search' | 'room-detail' | 'booking' | 'profile';

export const MobileApp = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    if (currentScreen === 'splash') {
      setTimeout(() => setCurrentScreen('home'), 2500);
    }
  }, [currentScreen]);

  const SplashScreen = () => (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-primary flex flex-col items-center justify-center z-[100]"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-24 h-24 border-2 border-accent flex items-center justify-center rotate-45 mb-10"
      >
        <span className="text-accent font-serif -rotate-45 text-4xl">V</span>
      </motion.div>
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-white font-serif text-3xl tracking-[0.3em] uppercase"
      >
        Vivami
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
        className="text-white/50 absolute bottom-12 text-[10px] uppercase tracking-widest"
      >
        Luxury Redefined
      </motion.p>
    </motion.div>
  );

  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 flex justify-around items-center py-4 px-6 z-50 rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
      {[
        { id: 'home', icon: <Home size={22} />, label: 'Home' },
        { id: 'search', icon: <Search size={22} />, label: 'Explore' },
        { id: 'booking', icon: <Calendar size={22} />, label: 'Book' },
        { id: 'profile', icon: <User size={22} />, label: 'Profile' }
      ].map((item) => (
        <button 
          key={item.id}
          onClick={() => setCurrentScreen(item.id as Screen)}
          className={`flex flex-col items-center gap-1 transition-all ${currentScreen === item.id ? 'text-accent scale-110' : 'text-gray-300'}`}
        >
          {item.icon}
          <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
        </button>
      ))}
    </div>
  );

  const SearchScreen = () => (
    <div className="px-6 pt-24 pb-32 space-y-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Where would you like to go?" 
          className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:border-accent"
        />
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-serif">Quick Categories</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Beachside', icon: <Waves size={20} /> },
            { label: 'City View', icon: <MapPin size={20} /> },
            { label: 'Penthouses', icon: <Star size={20} /> },
            { label: 'Private Villas', icon: <Home size={20} /> }
          ].map((cat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col items-center gap-3 cursor-pointer"
            >
              <div className="text-accent">{cat.icon}</div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{cat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-serif">Recent Searches</h3>
          <button className="text-[10px] font-bold uppercase tracking-widest text-accent">Clear All</button>
        </div>
        <div className="space-y-4">
          {['Amalfi Coast, Italy', 'Royal Suite', 'Sunset Villa'].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 text-sm text-gray-500 font-medium pb-4 border-b border-gray-50">
              <Calendar size={14} className="text-gray-300" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const BookingScreen = () => (
    <div className="px-6 pt-24 pb-32 space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-serif">Create Booking</h2>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Reserve your stay</p>
      </div>

      {bookingStep === 1 ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="space-y-4">
            <label className="text-[10px] uppercase font-bold text-gray-400">Select Date</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <span className="block text-[8px] uppercase font-bold text-gray-400 mb-1">Check In</span>
                <span className="text-sm font-bold">12 May, 2026</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <span className="block text-[8px] uppercase font-bold text-gray-400 mb-1">Check Out</span>
                <span className="text-sm font-bold">18 May, 2026</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] uppercase font-bold text-gray-400">Guests</label>
            <div className="flex justify-between items-center bg-gray-50 p-5 rounded-2xl border border-gray-100">
              <button className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">-</button>
              <div className="text-center">
                <span className="text-lg font-bold">2 Adults</span>
                <p className="text-[8px] uppercase font-bold text-gray-400">No children</p>
              </div>
              <button className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">+</button>
            </div>
          </div>

          <div className="pt-8">
            <button 
              onClick={() => setBookingStep(2)}
              className="w-full bg-primary text-white py-5 rounded-2xl font-bold uppercase tracking-widest shadow-lg"
            >
              Continue to Payment
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center space-y-8 pt-10">
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
            <Star size={48} fill="currentColor" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-serif">Booking Confirmed!</h3>
            <p className="text-gray-500 text-sm">Your luxury experience begins soon. Check your email for the invitation.</p>
          </div>
          <div className="w-full bg-primary p-6 rounded-3xl text-white text-left space-y-4">
            <div className="flex justify-between border-b border-white/10 pb-4">
              <span className="text-[10px] uppercase font-bold opacity-50">Reservation ID</span>
              <span className="text-[10px] uppercase font-bold">#VVM-9821</span>
            </div>
            <div className="flex justify-between">
              <div>
                <span className="block text-[8px] uppercase font-bold opacity-50">Room</span>
                <span className="text-sm font-serif italic">Oceanic Suite</span>
              </div>
              <div className="text-right">
                <span className="block text-[8px] uppercase font-bold opacity-50">Total</span>
                <span className="text-sm font-bold text-accent">$5,240.00</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => { setCurrentScreen('home'); setBookingStep(1); }}
            className="text-accent text-xs font-bold uppercase tracking-widest"
          >
            Back to Home
          </button>
        </motion.div>
      )}
    </div>
  );

  const HomeScreen = () => (
    <div className="pb-32">
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-40 px-6 py-6 flex justify-between items-center border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
            <img src="https://i.pravatar.cc/150?u=vivami" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Good Morning</p>
            <h2 className="text-sm font-bold">Mr. Alexander</h2>
          </div>
        </div>
        <button className="relative w-10 h-10 border border-gray-100 rounded-full flex items-center justify-center text-gray-600">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white" />
        </button>
      </header>
      
      <div className="mt-24 px-6 space-y-8">
        {/* Hero Card */}
        <div className="relative h-48 rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800" 
            alt="Offer" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent p-6 flex flex-col justify-center">
            <span className="bg-accent text-black text-[8px] font-bold uppercase px-2 py-1 rounded-full w-fit mb-2">Summer Exclusive</span>
            <h3 className="text-white text-xl font-serif mb-2 leading-tight">30% Off Your <br /> First Stay</h3>
            <button className="text-accent text-[10px] font-bold uppercase tracking-widest border-b border-accent pb-1 w-fit">Claim Now</button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {['All Rooms', 'Dining', 'Pool', 'Spa', 'Concierge'].map((cat, idx) => (
            <button 
              key={cat} 
              className={`whitespace-nowrap px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest border ${idx === 0 ? 'bg-primary text-white border-primary' : 'border-gray-100 text-gray-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recommendation */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-serif">Top Picks For You</h3>
            <button className="text-accent text-[10px] font-bold uppercase tracking-widest">See All</button>
          </div>
          <div className="space-y-6">
            {[
              { id: 1, name: 'Oceanic Suite', price: '$850', rating: 4.9, img: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=600' },
              { id: 2, name: 'Mountain View', price: '$650', rating: 4.8, img: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=600' }
            ].map((room) => (
              <div 
                key={room.id}
                onClick={() => { setSelectedRoom(room); setCurrentScreen('room-detail'); }}
                className="flex gap-4 bg-white p-3 rounded-3xl border border-gray-50 shadow-sm transition-transform active:scale-95"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                  <img src={room.img} alt={room.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col justify-center gap-1 flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-serif text-base">{room.name}</h4>
                    <Heart size={16} className="text-gray-300" />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold">
                    <MapPin size={10} className="text-accent" /> Amalfi Coast
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm font-bold text-accent">{room.price} <span className="text-[10px] text-gray-400 font-normal">/ Night</span></p>
                    <div className="flex items-center gap-1 text-[10px] font-bold">
                      <Star size={10} fill="#D4AF37" color="#D4AF37" /> {room.rating}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const RoomDetail = () => (
    <div className="pb-32">
      <div className="relative h-[450px]">
        <img src={selectedRoom?.img} className="w-full h-full object-cover" alt="Detail" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        
        <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center">
          <button onClick={() => setCurrentScreen('home')} className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white">
            <ChevronLeft size={20} />
          </button>
          <button className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white">
            <Heart size={20} />
          </button>
        </header>

        <div className="absolute bottom-8 left-0 w-full px-6">
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <div className="bg-accent/20 backdrop-blur-md text-accent text-[8px] font-bold uppercase px-3 py-1 rounded-full w-fit border border-accent/30">
                Exclusive Villa
              </div>
              <h2 className="text-white text-3xl font-serif">{selectedRoom?.name}</h2>
              <div className="flex items-center gap-2 text-white/70 text-xs">
                <MapPin size={12} className="text-accent" /> Amalfi Coast, Italy
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
              <p className="text-white text-lg font-bold">{selectedRoom?.price}</p>
              <p className="text-white/50 text-[10px] uppercase font-bold tracking-widest">Night</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 px-6 space-y-8">
        <div className="flex justify-between items-center bg-gray-50 p-6 rounded-3xl">
          <div className="flex flex-col items-center gap-2">
            <Wifi size={20} className="text-accent" />
            <span className="text-[10px] font-bold uppercase text-gray-400">WiFi</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Waves size={20} className="text-accent" />
            <span className="text-[10px] font-bold uppercase text-gray-400">Pool</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Wind size={20} className="text-accent" />
            <span className="text-[10px] font-bold uppercase text-gray-400">AC</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Star size={20} className="text-accent" />
            <span className="text-[10px] font-bold uppercase text-gray-400">Gym</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-serif">Description</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Experience the pinnacle of luxury in our Oceanic Suite. Featuring hand-picked designer furniture, a private balcony facing the sapphire sea, and world-class service.
          </p>
        </div>

        <div className="fixed bottom-0 left-0 w-full p-6 bg-white border-t border-gray-100 z-50">
          <button className="bg-primary text-white w-full py-5 rounded-2xl font-bold uppercase tracking-widest shadow-xl active:scale-95 transition-transform">
            Book This Room
          </button>
        </div>
      </div>
    </div>
  );

  const SignUpScreen = () => (
    <div className="px-6 pt-24 pb-32 space-y-10">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 border border-accent flex items-center justify-center rotate-45 mb-4">
          <span className="text-accent font-serif -rotate-45 text-2xl">V</span>
        </div>
        <h2 className="text-3xl font-serif">Create Your Account</h2>
        <p className="text-gray-400 text-sm">Join the elite world of Vivami</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-gray-400 ml-2">Full Name</label>
          <input type="text" placeholder="Alexander Vivar" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-sm focus:outline-none focus:border-accent" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-gray-400 ml-2">Email Address</label>
          <input type="email" placeholder="alex@vivami.com" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-sm focus:outline-none focus:border-accent" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold text-gray-400 ml-2">Password</label>
          <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 text-sm focus:outline-none focus:border-accent" />
        </div>
        <div className="flex items-center gap-3 ml-2">
          <input type="checkbox" className="w-4 h-4 rounded accent-accent" />
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">I agree to the terms of luxury</span>
        </div>
        
        <button 
          onClick={() => { setIsNewUser(false); setCurrentScreen('profile'); }}
          className="w-full bg-primary text-white py-5 rounded-2xl font-bold uppercase tracking-widest shadow-lg mt-4"
        >
          Create Account
        </button>

        <div className="text-center">
          <button onClick={() => setIsNewUser(false)} className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Already have an account? Sign In</button>
        </div>
      </div>
    </div>
  );
  const ProfileScreen = () => {
    if (isNewUser) return <SignUpScreen />;

    return (
      <div className="px-6 pt-24 pb-32">
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-accent p-1">
              <img 
                src="https://i.pravatar.cc/150?u=vivami" 
                className="w-full h-full object-cover rounded-full" 
                alt="Profile"
                referrerPolicy="no-referrer"
              />
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-accent rounded-full border-4 border-white flex items-center justify-center text-black">
              <Settings size={18} />
            </button>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-serif italic text-primary">Alexander Vivar</h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Elite Member • 1,240 pts</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { icon: <User size={20} />, label: 'Personal Information' },
            { icon: <Calendar size={20} />, label: 'My Bookings', action: () => setCurrentScreen('booking') },
            { icon: <CreditCard size={20} />, label: 'Payment Methods' },
            { icon: <Heart size={20} />, label: 'Wishlist' },
            { icon: <Settings size={20} />, label: 'AppSettings' },
            { icon: <LogOut size={20} color="#FF6B6B" />, label: 'Logout', highlight: true, action: () => setIsNewUser(true) }
          ].map((item, idx) => (
            <button 
              key={idx}
              onClick={item.action}
              className={`w-full flex items-center justify-between p-5 rounded-2xl border ${item.highlight ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}
            >
              <div className="flex items-center gap-4">
                <span className={`p-2 rounded-xl bg-white shadow-sm ${item.highlight ? 'text-red-500' : 'text-accent'}`}>{item.icon}</span>
                <span className={`text-sm font-bold ${item.highlight ? 'text-red-500' : 'text-gray-600'}`}>{item.label}</span>
              </div>
              <ChevronRight size={18} className={item.highlight ? 'text-red-300' : 'text-gray-300'} />
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-full bg-white font-sans text-primary">
      <AnimatePresence>
        {currentScreen === 'splash' && <SplashScreen key="splash" />}
      </AnimatePresence>

      <div className="max-w-[420px] mx-auto min-h-screen relative shadow-2xl bg-white overflow-hidden">
        <AnimatePresence mode="wait">
          {currentScreen === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HomeScreen />
            </motion.div>
          )}
          {currentScreen === 'search' && (
            <motion.div key="search" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <SearchScreen />
            </motion.div>
          )}
          {currentScreen === 'room-detail' && (
            <motion.div key="room-detail" initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: -100 }} transition={{ type: 'spring', damping: 20 }}>
              <RoomDetail />
            </motion.div>
          )}
          {currentScreen === 'booking' && (
            <motion.div key="booking" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <BookingScreen />
            </motion.div>
          )}
          {currentScreen === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <ProfileScreen />
            </motion.div>
          )}
        </AnimatePresence>

        {currentScreen !== 'splash' && currentScreen !== 'room-detail' && <BottomNav />}
      </div>
    </div>
  );
};
