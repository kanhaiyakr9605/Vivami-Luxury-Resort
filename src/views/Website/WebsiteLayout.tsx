import { motion } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  ChevronRight, 
  Star, 
  Wifi, 
  Coffee, 
  Wind, 
  Utensils, 
  Waves,
  Facebook,
  Instagram,
  Twitter,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 border border-accent flex items-center justify-center rotate-45">
            <span className="text-accent font-serif -rotate-45 text-xl">V</span>
          </div>
          <span className="text-white font-serif text-2xl tracking-widest uppercase">Vivami</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {['About', 'Rooms', 'Amenities', 'Dining', 'Gallery'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-white/70 hover:text-accent transition-colors text-sm uppercase tracking-widest font-medium">
              {item}
            </a>
          ))}
          <button className="bg-accent text-black px-8 py-3 uppercase tracking-widest text-sm font-bold hover:bg-white transition-all duration-300">
            Book Now
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-black border-b border-white/10 p-6 flex flex-col gap-6 md:hidden"
        >
          {['About', 'Rooms', 'Amenities', 'Dining', 'Gallery'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-white/70 hover:text-accent transition-colors text-lg uppercase tracking-widest">
              {item}
            </a>
          ))}
          <button className="bg-accent text-black px-8 py-4 uppercase tracking-widest text-sm font-bold w-full">
            Book Now
          </button>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0">
      <img 
        src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920" 
        alt="Vivami Hero" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
    
    <div className="relative z-10 text-center px-4">
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-accent uppercase tracking-[0.5em] text-sm mb-6 font-medium"
      >
        Welcome to Excellence
      </motion.p>
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-6xl md:text-8xl text-white font-serif mb-8 max-w-4xl leading-tight"
      >
        Where Luxury <br /> Meets Lifestyle
      </motion.h1>
      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="border border-white text-white px-10 py-4 uppercase tracking-widest text-sm font-bold hover:bg-white hover:text-black transition-all duration-500"
      >
        Explore Our Resort
      </motion.button>
    </div>

    <div className="absolute bottom-0 left-0 w-full p-8 hidden md:block">
      <div className="max-w-7xl mx-auto flex justify-between items-end">
        <div className="flex gap-12 text-white/50 text-xs tracking-widest uppercase font-medium">
          <div className="flex flex-col gap-2">
            <span className="text-accent">01</span>
            <span>Ocean View</span>
          </div>
          <div className="flex flex-col gap-2">
            <span>02</span>
            <span>Private Villas</span>
          </div>
          <div className="flex flex-col gap-2">
            <span>03</span>
            <span>Sky Suites</span>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="w-12 h-[1px] bg-white/20 mt-2" />
          <p className="text-white/60 text-xs max-w-xs leading-relaxed">
            Experience the pinnacle of sophisticated living in our hand-crafted sanctuary.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const BookingWidget = () => (
  <section className="relative z-20 -mt-16 px-6">
    <div className="max-w-6xl mx-auto bg-white shadow-2xl p-8 rounded-sm grid grid-cols-1 md:grid-cols-4 gap-8 items-end border-t-4 border-accent">
      <div className="space-y-3">
        <label className="text-[10px] uppercase tracking-widest font-bold text-text-secondary flex items-center gap-2">
          <Calendar size={12} className="text-accent" /> Check In
        </label>
        <input type="date" className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-accent text-sm" />
      </div>
      <div className="space-y-3">
        <label className="text-[10px] uppercase tracking-widest font-bold text-text-secondary flex items-center gap-2">
          <Calendar size={12} className="text-accent" /> Check Out
        </label>
        <input type="date" className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-accent text-sm" />
      </div>
      <div className="space-y-3">
        <label className="text-[10px] uppercase tracking-widest font-bold text-text-secondary flex items-center gap-2">
          <Users size={12} className="text-accent" /> Guests
        </label>
        <select className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-accent text-sm bg-white cursor-pointer">
          <option>1 Adult</option>
          <option selected>2 Adults</option>
          <option>3 Adults</option>
          <option>Family (2+2)</option>
        </select>
      </div>
      <button className="bg-primary text-white w-full py-4 uppercase tracking-widest text-xs font-bold hover:bg-accent hover:text-black transition-all">
        Check Availability
      </button>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-32 px-6 bg-bg-light overflow-hidden">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="aspect-[4/5] overflow-hidden rounded-sm">
          <img 
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200" 
            alt="About Vivami" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-10 -right-10 w-2/3 aspect-square border-8 border-bg-light overflow-hidden shadow-xl hidden md:block">
          <img 
            src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800" 
            alt="About Vivami Detail" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold">Discover Vivami</span>
        <h2 className="text-5xl md:text-6xl leading-tight">Authentic Heritage <br /> Modern Elegance</h2>
        <p className="text-text-secondary leading-relaxed text-lg">
          Since 1924, Vivami has been more than just a destination. It is a philosophy of living, where every detail is orchestrated to create perfection. Nestled between the sapphire sea and historic mountains, our resort offers a sanctuary of peace in a frantic world.
        </p>
        <p className="text-text-secondary leading-relaxed">
          We believe in the beauty of simplicity, the warmth of genuine service, and the power of heritage. Each room is a masterpiece of design, blending local craftsmanship with contemporary luxury.
        </p>
        <div className="pt-6">
          <button className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest border-b border-accent pb-2 hover:gap-6 transition-all">
            Read Our Story <ChevronRight size={14} className="text-accent" />
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

const RoomCard = ({ title, price, image, category }: { title: string, price: string, image: string, category: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="group bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 rounded-sm"
  >
    <div className="aspect-[4/3] overflow-hidden relative">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" referrerPolicy="no-referrer" />
      <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[10px] uppercase font-bold tracking-widest border-l-2 border-accent">
        {category}
      </div>
    </div>
    <div className="p-8 space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-2xl">{title}</h3>
        <div className="flex text-accent">
          {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#D4AF37" />)}
        </div>
      </div>
      <p className="text-text-secondary text-sm line-clamp-2">
        Experience ultimate comfort with panoramic views and bespoke amenities designed for the discerning traveler.
      </p>
      <div className="flex items-center gap-6 text-text-secondary py-2 border-y border-gray-100">
        <div className="flex items-center gap-2 text-[10px] uppercase font-bold">
          <Wifi size={14} className="text-accent" /> Free WiFi
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase font-bold">
          <Coffee size={14} className="text-accent" /> Breakfast
        </div>
      </div>
      <div className="flex justify-between items-center pt-2">
        <p className="text-lg font-serif">From <span className="font-bold text-accent text-2xl">${price}</span> <span className="text-xs text-text-secondary">/ Night</span></p>
        <button className="text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors">Book Now</button>
      </div>
    </div>
  </motion.div>
);

const Rooms = () => (
  <section id="rooms" className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div className="space-y-4">
          <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold">Accommodations</span>
          <h2 className="text-5xl">Elegance in Every <br /> Detail</h2>
        </div>
        <div className="flex gap-4">
          {['All', 'Suites', 'Penthouses', 'Villas'].map((tab) => (
            <button key={tab} className="text-xs uppercase tracking-widest font-bold px-6 py-3 border border-gray-200 hover:border-accent transition-all rounded-sm">
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <RoomCard 
          title="The Royal Suite" 
          price="1,200" 
          category="Penthouse"
          image="https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=800" 
        />
        <RoomCard 
          title="Ocean Breeze" 
          price="850" 
          category="Deluxe View"
          image="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800" 
        />
        <RoomCard 
          title="Private Eden Villa" 
          price="2,500" 
          category="Beachfront"
          image="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800" 
        />
      </div>
    </div>
  </section>
);

const Amenities = () => (
  <section id="amenities" className="py-32 px-6 luxury-gradient text-white">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-24 flex flex-col items-center space-y-6">
        <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold">The Experience</span>
        <h2 className="text-5xl">World Class Amenities</h2>
        <div className="w-20 h-1 bg-accent" />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {[
          { icon: <Waves />, title: 'Infinity Pool' },
          { icon: <Wind />, title: 'Luxury Spa' },
          { icon: <Utensils />, title: 'Fine Dining' },
          { icon: <Wifi />, title: 'Fiber Internet' },
          { icon: <Coffee />, title: 'Craft Coffee' },
          { icon: <MapPin />, title: 'Concierge' }
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-6 p-8 border border-white/10 rounded-sm hover:border-accent transition-colors group"
          >
            <div className="text-accent group-hover:scale-110 transition-transform duration-500">
              {item.icon}
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/70">{item.title}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Dining = () => (
  <section id="dining" className="py-32 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-sm shadow-2xl">
      <div className="relative group overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200" 
          alt="Fine Dining" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className="p-12 md:p-24 bg-white flex flex-col justify-center space-y-8">
        <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold">Gastronomy</span>
        <h2 className="text-5xl leading-tight">Culinary Art For <br /> Subtle Palates</h2>
        <p className="text-text-secondary leading-relaxed">
          Led by Michelin-starred Chef Antoine Morel, our signature restaurant "Aurum" explores the boundaries of Mediterranean fusion. Every dish is a story told through the finest seasonal ingredients.
        </p>
        <ul className="space-y-4">
          {['Gourmet Breakfast', 'Aurum Fine Dining', 'The Sky Lounge', 'Private In-Room Dining'].map((item) => (
            <li key={item} className="flex items-center gap-4 text-xs uppercase tracking-widest font-bold">
              <span className="w-1 h-1 bg-accent rounded-full" />
              {item}
            </li>
          ))}
        </ul>
        <div className="pt-6">
          <button className="bg-primary text-white px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-accent transition-all">
            Reserve Table
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-primary text-white pt-24 pb-12 px-6">
    <div className="max-w-7xl mx-auto space-y-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-8 col-span-1 lg:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border border-accent flex items-center justify-center rotate-45">
              <span className="text-accent font-serif -rotate-45 text-sm">V</span>
            </div>
            <span className="text-white font-serif text-xl tracking-widest uppercase">Vivami</span>
          </div>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Where luxury meets the legacy of timeless hospitality. Providing unforgettable experiences since 1924.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:border-accent transition-colors"><Facebook size={16} /></a>
            <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:border-accent transition-colors"><Instagram size={16} /></a>
            <a href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:border-accent transition-colors"><Twitter size={16} /></a>
          </div>
        </div>

        <div className="space-y-8">
          <h4 className="text-sm uppercase tracking-widest font-bold text-accent">Quick Links</h4>
          <ul className="space-y-4 text-sm text-white/50 font-medium">
            <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Career</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="text-sm uppercase tracking-widest font-bold text-accent">Contact Info</h4>
          <ul className="space-y-4 text-sm text-white/50 font-medium">
            <li className="flex items-center gap-3"><MapPin size={16} className="text-accent" /> 123 Paradise Coast, Amalfi</li>
            <li><a href="mailto:contact@vivami.com" className="hover:text-white transition-colors">contact@vivami.com</a></li>
            <li><a href="tel:+1234567890" className="hover:text-white transition-colors">+1 (234) 567 890</a></li>
          </ul>
        </div>

        <div className="space-y-8">
          <h4 className="text-sm uppercase tracking-widest font-bold text-accent">Newsletter</h4>
          <p className="text-white/50 text-sm">Join our mailing list to receive news about our latest offers and events.</p>
          <div className="flex">
            <input type="email" placeholder="Email Address" className="bg-white/5 border-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent w-full" />
            <button className="bg-accent text-black px-6 font-bold text-[10px] uppercase tracking-widest">Join</button>
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-white/30 text-xs">© 2026 Vivami Luxury Resort. All rights reserved.</p>
        <div className="flex gap-8 text-white/30 text-xs uppercase tracking-[0.2em]">
          <span>Privacy Policy</span>
          <span>Cookies Management</span>
        </div>
      </div>
    </div>
  </footer>
);

const Gallery = () => (
  <section id="gallery" className="py-32 px-6 bg-bg-light">
    <div className="max-w-7xl mx-auto space-y-16">
      <div className="flex flex-col items-center text-center space-y-4">
        <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold">Visual Journey</span>
        <h2 className="text-5xl font-serif">Moments of Perfection</h2>
      </div>
      
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {[
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1544124499-58912cbddade?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800",
          "https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?auto=format&fit=crop&q=80&w=800"
        ].map((img, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.02 }}
            className="relative group overflow-hidden rounded-sm cursor-pointer"
          >
            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-[10px] uppercase tracking-widest font-bold border border-white/40 px-4 py-2">View Experience</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export const WebsiteLayout = () => {
  return (
    <div className="bg-white selection:bg-accent selection:text-black">
      <Navbar />
      <Hero />
      <BookingWidget />
      <About />
      <Rooms />
      <Amenities />
      <Dining />
      <Gallery />
      <Footer />
    </div>
  );
};
