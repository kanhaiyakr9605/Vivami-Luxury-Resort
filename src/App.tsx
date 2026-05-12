/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { WebsiteLayout } from './views/Website/WebsiteLayout';
import { MobileApp } from './views/Mobile/MobileApp';
import { Dashboard } from './views/Dashboard/Dashboard';
import { GuestDashboard } from './views/GuestDashboard/GuestDashboard';
import { AuthProvider } from './components/AuthProvider';
import { Smartphone, Monitor, LayoutDashboard, UserCircle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [view, setView] = useState<'website' | 'mobile' | 'dashboard' | 'guest'>('website');

  return (
    <AuthProvider>
      <div className="relative min-h-screen bg-gray-50">
        {/* View Switcher Floating Button */}
        <div className="fixed bottom-10 right-10 z-[1000] flex flex-col items-end gap-4 print:hidden">
          <motion.div 
            initial={false}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-primary text-white p-2 rounded-full shadow-2xl border border-accent/20 flex gap-2"
          >
            <button 
              onClick={() => setView('website')}
              className={`p-3 rounded-full transition-all flex items-center gap-2 ${view === 'website' ? 'bg-accent text-black font-bold' : 'hover:bg-white/10'}`}
            >
              <Monitor size={20} />
              {view === 'website' && <span className="text-xs uppercase tracking-widest">Desktop</span>}
            </button>
            <button 
              onClick={() => setView('mobile')}
              className={`p-3 rounded-full transition-all flex items-center gap-2 ${view === 'mobile' ? 'bg-accent text-black font-bold' : 'hover:bg-white/10'}`}
            >
              <Smartphone size={20} />
              {view === 'mobile' && <span className="text-xs uppercase tracking-widest">App View</span>}
            </button>
            <button 
              onClick={() => setView('guest')}
              className={`p-3 rounded-full transition-all flex items-center gap-2 ${view === 'guest' ? 'bg-accent text-black font-bold' : 'hover:bg-white/10'}`}
            >
              <UserCircle size={20} />
              {view === 'guest' && <span className="text-xs uppercase tracking-widest">Guest Hub</span>}
            </button>
            <button 
              onClick={() => setView('dashboard')}
              className={`p-3 rounded-full transition-all flex items-center gap-2 ${view === 'dashboard' ? 'bg-accent text-black font-bold' : 'hover:bg-white/10'}`}
            >
              <LayoutDashboard size={20} />
              {view === 'dashboard' && <span className="text-xs uppercase tracking-widest">Admin</span>}
            </button>
          </motion.div>
        
        {view === 'website' && (
          <div className="bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Luxury Experience</p>
              <h3 className="text-sm font-serif italic">Vivami Showcase</h3>
            </div>
            <div className="w-10 h-10 border border-accent flex items-center justify-center rotate-45">
              <span className="text-accent font-serif -rotate-45 text-sm">V</span>
            </div>
          </div>
        )}
      </div>

      <main className="transition-all duration-700">
        <AnimatePresence mode="wait">
          {view === 'website' ? (
            <motion.div 
              key="website"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <WebsiteLayout />
            </motion.div>
          ) : view === 'mobile' ? (
            <motion.div 
              key="mobile"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full h-screen bg-[#111111] flex items-center justify-center overflow-auto py-20"
            >
              <div className="relative w-[375px] h-[812px] bg-white rounded-[60px] shadow-[0_0_0_12px_#333,0_0_0_15px_#222,0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden scale-90 md:scale-100">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black rounded-b-3xl z-[1000]" />
                
                <div className="w-full h-full overflow-y-auto no-scrollbar">
                  <MobileApp />
                </div>
              </div>
              
              {/* Sidebar Info for Mobile View */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden xl:flex flex-col gap-8 ml-20 max-w-sm"
              >
                <div className="p-8 bg-white/5 border border-white/10 rounded-3xl space-y-6">
                  <span className="text-accent text-xs font-bold uppercase tracking-widest">Mobile Client</span>
                  <h2 className="text-white text-4xl font-serif">A pocket-sized <br /> paradise.</h2>
                  <p className="text-white/50 leading-relaxed">
                    Designed for travelers on the go. The Vivami mobile experience features biometric login, real-time room controls, and instant concierge chat.
                  </p>
                  <ul className="space-y-4">
                    {['Seamless Booking', 'Digital Keys', 'Exclusive Offers'].map(f => (
                      <li key={f} className="flex items-center gap-3 text-white/70 text-sm font-medium">
                        <ChevronRight size={16} className="text-accent" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ) : view === 'guest' ? (
            <motion.div 
              key="guest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full min-h-screen"
            >
              <GuestDashboard />
            </motion.div>
          ) : (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              className="w-full min-h-screen"
            >
              <Dashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
    </AuthProvider>
  );
}
