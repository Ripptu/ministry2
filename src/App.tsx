import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import gsap from 'gsap';
import { 
  Lock, 
  Menu, 
  Sparkles, 
  Navigation, 
  Shield, 
  Compass, 
  BookOpen, 
  Quote, 
  Sparkle,
  Play,
  Pause,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  Send,
  ChevronDown,
  ChevronUp,
  X,
  Mail,
  Heart,
  Cookie
} from 'lucide-react';
import { MinistryPillar, ActiveTab } from './types';
import PlanEscapeModal from './components/PlanEscapeModal';
import NavigationModal from './components/NavigationModal';

// Exquisite off-grid ministry pillars
const MINISTRY_PILLARS: MinistryPillar[] = [
  {
    id: 'prophetic-atmosphere',
    title: 'Prophetic Atmosphere',
    category: 'SPIRIT & POWER 01',
    vibe: 'Divine Presence',
    description: 'Immerse yourself in deep worship and prophetic encounters that shift atmospheres and reignite hearts.',
    accentQuote: 'Experience the tangible presence of God, where faith is ignited and destinies are transformed.',
    activities: ['Corporate Worship', 'Prophetic Intercession', 'Healing Ministries']
  },
  {
    id: 'word-of-power',
    title: 'Word of Power',
    category: 'SCRIPTURE & DOCTRINE 02',
    vibe: 'Biblical Foundation',
    description: 'Biblical truths taught with clarity, power, and practical application for your daily victory in life.',
    accentQuote: 'The living Word of God grants us orientation, wisdom, and the authority for personal transformation.',
    activities: ['Kingdom School', 'Wednesday Word Study', 'Sermon Analysis']
  },
  {
    id: 'family-love',
    title: 'Family & Love',
    category: 'FELLOWSHIP 03',
    vibe: 'Warm Welcome',
    description: 'A loving community where you are fully accepted, supported, and encouraged to develop your full potential in God.',
    activities: ['Life Groups', 'Community Meals', 'Counseling & Support'],
    accentQuote: 'We are not just a church; we are a family walking together in love.'
  },
  {
    id: 'divine-guidance',
    title: 'Divine Guidance',
    category: 'SPIRITUAL GROWTH 04',
    vibe: 'Holy Spirit Leading',
    description: 'A Christ-centered focus on spiritual growth, divine leadership, and activation of the gifts of the Holy Spirit.',
    accentQuote: 'Led by the Holy Spirit, we confidently walk into the destiny God has prepared for us.',
    activities: ['Mentorship Programs', 'Gifts Activation', 'Prayer Vigils']
  }
];

// Interactive Sermons data for the media section
interface SermonCard {
  id: string;
  title: string;
  description: string;
  speaker: string;
  category: string;
  duration?: string;
  frequency: number; // Pitch for synthesized sacred audio response!
}

const SERMONS_DATA: SermonCard[] = [
  {
    id: 'sermon_1',
    title: 'Teaching the Kingdom of God',
    description: 'An in-depth scriptural journey exploring the principles of the Kingdom of God and spiritual growth.',
    speaker: 'Pastor Isaac Mahugnon',
    category: 'Teaching • 18 Min',
    frequency: 180, // F3 pitch
  },
  {
    id: 'sermon_2',
    title: 'The Power of the Holy Spirit',
    description: 'Experience supernatural restoration and divine life transformation through the workings of the Spirit.',
    speaker: 'Pastor Isaac Mahugnon',
    category: 'Sermon • 25 Min',
    frequency: 220, // A3 pitch
  },
  {
    id: 'sermon_3',
    title: 'Prophetic Dimensions',
    description: 'How to clearly hear God\'s voice and actively shift atmospheres through deep worship.',
    speaker: 'Pastor Isaac Mahugnon',
    category: 'Message • 20 Min',
    frequency: 261.63, // C4 pitch
  }
];

// Interactive Calendar events for the event section
interface CommunityEvent {
  id: string;
  dateBadge: string;
  title: string;
  subtitle: string;
  time: string;
  location: string;
  slotsRemaining: number;
}

const EVENTS_DATA: CommunityEvent[] = [
  {
    id: 'event_1',
    dateBadge: 'SUN. 09:00',
    title: 'Celebration Service',
    subtitle: 'Our weekly Sunday service. Join us for a powerful encounter in faith and insightful biblical teachings.',
    time: '09:00 AM - 11:30 AM',
    location: 'Rheinlandstraße 14, 60529 Frankfurt am Main, Germany',
    slotsRemaining: 120
  },
  {
    id: 'event_2',
    dateBadge: 'WED. 18:00',
    title: 'Word & Power',
    subtitle: 'Midweek Bible study with dynamic teaching. Equip yourself with practical biblical keys for daily victory.',
    time: '06:00 PM - 07:30 PM',
    location: 'Rheinlandstraße 14, 60529 Frankfurt am Main, Germany',
    slotsRemaining: 80
  },
  {
    id: 'event_3',
    dateBadge: 'FRI. 23:00',
    title: 'Miracle Vigil',
    subtitle: 'Experience a night of miracles, deep prophetic encounters, and deliverance in our Friday night prayer vigil.',
    time: '11:00 PM - 02:00 AM',
    location: 'Rheinlandstraße 14, 60529 Frankfurt am Main, Germany',
    slotsRemaining: 60
  }
];

interface Sermon3DCardProps {
  sermon: SermonCard;
  isPlaying: boolean;
  handleTogglePlaySermon: (s: SermonCard) => void;
}

const Sermon3DCard: React.FC<Sermon3DCardProps> = ({ sermon, isPlaying, handleTogglePlaySermon }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group relative p-8 rounded-[24px] bg-[#1a1715] border transition-all duration-300 min-h-[300px] flex flex-col justify-between ${
          isPlaying 
            ? 'border-white/50 shadow-[0_0_40px_rgba(255,255,255,0.08)]' 
            : 'border-white/5 hover:border-white/20 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] shadow-none'
        }`}
        id={`sermon-card-${sermon.id}`}
      >
        <div 
          className="absolute top-0 left-0 w-16 h-[2px] bg-gradient-to-r from-white/30 to-transparent" 
          style={{ transform: "translateZ(30px)" }} 
        />
        
        <div className="space-y-4" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-wider text-white/40 uppercase bg-white/5 px-2.5 py-1 rounded">
              {sermon.category}
            </span>
            {isPlaying && (
              <div className="flex gap-0.5 items-end h-3">
                <span className="w-0.5 h-3 bg-white animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="w-0.5 h-1.5 bg-white animate-bounce" style={{ animationDelay: '0.1s' }} />
                <span className="w-0.5 h-2.5 bg-white animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            )}
          </div>

          <h3 className="text-xl font-medium tracking-tight text-white/95 group-hover:text-white transition-colors">
            {sermon.title}
          </h3>
          
          <p className="text-xs text-white/65 font-light leading-relaxed">
            {sermon.description}
          </p>
        </div>

        <div className="pt-6 border-t border-white/5 flex items-center justify-between" style={{ transform: "translateZ(30px)" }}>
          <span className="text-[11px] font-mono text-white/40">{sermon.speaker}</span>
          
          <button
            onClick={() => handleTogglePlaySermon(sermon)}
            className={`h-9 w-24 rounded-full flex items-center justify-center gap-1 text-[11px] font-mono tracking-widest uppercase transition-all ${
              isPlaying 
                ? 'bg-amber-900 text-white font-semibold shadow-lg' 
                : 'bg-white/10 hover:bg-white text-white hover:text-black'
            }`}
            id={`play-button-${sermon.id}`}
          >
            {isPlaying ? (
              <>
                <Pause size={10} fill="currentColor" />
                <span>STOP</span>
              </>
            ) : (
              <>
                <Play size={10} className="ml-0.5" />
                <span>LISTEN</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const MAIN_MENU = [
  { label: 'HOME', id: 'hero-section' },
  { label: 'ABOUT', id: 'about-section' },
  { label: 'TEACHINGS', id: 'teachings-section' },
  { label: 'MEDIA', id: 'media-section' },
  { label: 'EVENTS', id: 'events-section' },
  { label: 'PRAYER', id: 'prayer-section' },
  { label: 'LEADERSHIP', id: 'leadership-section' },
  { label: 'CONTACT', id: 'contact-section' }
];

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>(null);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const lastScrollY = useRef(0);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  // Cookie actions
  const handleAcceptCookies = () => {
    localStorage.setItem('rm-cookie-consent', 'accepted');
    setShowCookieBanner(false);
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('rm-cookie-consent', 'declined');
    setShowCookieBanner(false);
  };

  useEffect(() => {
    const consent = localStorage.getItem('rm-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setShowCookieBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Interactive UI states
  const [activeSermonId, setActiveSermonId] = useState<string | null>(null);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [rsvpList, setRsvpList] = useState<string[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // References for mouse physics parallax in Hero section
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);

  // Detect scrolly updates to adjust background transitions on header
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax Event Loop with GSAP (continuous linear interpolation lerp) for Hero background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      // Mouse coordinates relative to display center, scaled down for subtle luxury parallax
      targetX.current = ((e.clientX - cx) / cx) * 25;
      targetY.current = ((e.clientY - cy) / cy) * 25;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animId: number;
    const updateParallax = () => {
      currentX.current += (targetX.current - currentX.current) * 0.05;
      currentY.current += (targetY.current - currentY.current) * 0.05;

      if (videoWrapperRef.current) {
        gsap.set(videoWrapperRef.current, {
          x: currentX.current,
          y: currentY.current,
        });
      }

      animId = requestAnimationFrame(updateParallax);
    };

    updateParallax();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleVideoMetadata = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    e.currentTarget.playbackRate = 1.15;
  };

  const selectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
  };

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Interact with sermon cards - simple visual playback toggles
  const handleTogglePlaySermon = (sermon: SermonCard) => {
    if (activeSermonId === sermon.id) {
      setActiveSermonId(null);
    } else {
      setActiveSermonId(sermon.id);
    }
  };

  // RSVP toggle handlers
  const handleToggleRsvp = (eventId: string) => {
    if (rsvpList.includes(eventId)) {
      setRsvpList(prev => prev.filter(id => id !== eventId));
    } else {
      setRsvpList(prev => [...prev, eventId]);
    }
  };

  // Submit Newsletter
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    setNewsletterSubmitted(true);
  };

  return (
    <div 
      className="relative min-h-screen w-full bg-black text-white selection:bg-white selection:text-black"
      style={{ fontFamily: "'Inter', sans-serif" }}
      id="royal-ministry-root"
    >
      {/* 1. STICKY HEADER GLOBAL PANEL */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 py-5 md:py-6 flex justify-between items-center bg-transparent transition-all duration-300 ${scrollDirection === 'down' ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'} ${scrolled && scrollDirection === 'up' ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 py-3 md:py-4' : ''}`}
        id="header"
      >
        {/* Brand Wordmark Left */}
        <div 
          onClick={() => {
            setIsMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
          className="flex items-baseline gap-0.5 cursor-pointer group z-50"
        >
          <span className="text-[19px] tracking-tight font-sans font-semibold text-white group-hover:text-white/80 transition-colors">
            Royal Ministry
          </span>
        </div>

        {/* Center Liquid-glass Navigation bar (Desktop) styled like a Dynamic Island */}
        <nav 
          className="hidden md:flex liquid-glass rounded-full px-3 py-2 items-center gap-1 bg-black/60 backdrop-blur-xl shadow-2xl"
          id="nav-links"
        >
          {MAIN_MENU.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollToSection(item.id)}
              className="text-[11px] font-medium tracking-[0.12em] text-white/90 cursor-pointer hover:text-white px-3.5 py-1.5 rounded-full transition-all duration-200 hover:bg-white/5"
              id={`nav-link-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center gap-3 z-50">
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsPlanOpen(true);
            }}
            className="bg-white hover:bg-white/95 text-black rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-[10px] sm:text-[11px] font-medium tracking-[0.12em] uppercase cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
            id="get-roaming-btn"
          >
            GET CONNECTED
          </button>

          {/* Hamburger Mobile Menu Toggle Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex md:hidden p-2 text-white/80 hover:text-white hover:bg-white/5 rounded-full border border-white/10 transition-colors"
            id="mobile-menu-toggle"
            aria-label="Open menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* MOBILE NAV DRAWER OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#121110]/98 backdrop-blur-xl flex flex-col justify-between pt-28 px-6 pb-12 animate-[fadeIn_0.2s_ease-out] md:hidden">
          <nav className="flex flex-col gap-5 text-center">
            {MAIN_MENU.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleScrollToSection(item.id);
                }}
                className="text-lg font-light tracking-widest text-white/90 hover:text-white py-1.5 border-b border-white/5"
              >
                {item.label}
              </button>
            ))}
            
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsPlanOpen(true);
              }}
              className="bg-white hover:bg-white/95 text-black rounded-full py-3.5 text-xs font-semibold tracking-widest uppercase mt-4 w-full transition-all"
            >
              GET CONNECTED
            </button>
          </nav>
          
          <div className="text-center text-[10px] font-mono text-white/20 tracking-widest">
            ROYAL MINISTRY — EXPERIENCE THE REALM OF MIRACLES
          </div>
        </div>
      )}

      {/* 2. HERO-SEKTION */}
      <section 
        className="relative h-screen w-full flex flex-col items-center justify-center text-center overflow-hidden z-20"
        id="hero-section"
      >
        {/* Cinematic Video Background with dynamic mouse visual parallax */}
        <div 
          ref={videoWrapperRef}
          className="absolute inset-0 w-full h-full scale-[1.08] origin-center z-0 pointer-events-none"
          id="video-wrapper"
        >
          {/* Loop video on all devices with seamless autoplay parameters */}
          <video 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260510_060007_60275ce7-030c-4668-a160-8f364ec537d3.mp4"
            autoPlay 
            muted 
            loop 
            playsInline
            onLoadedMetadata={handleVideoMetadata}
            className="w-full h-full object-cover filter brightness-[0.35] contrast-[1.05]"
            style={{ pointerEvents: 'none' }}
          />

          {/* Mysterious spiritual dark mask overlay - 40% darker shadow */}
          <div className="absolute inset-0 bg-black/45 mix-blend-multiply" />
        </div>

        {/* Hero Title & Subtitle container */}
        <div 
          className={`relative z-20 w-full max-w-4xl px-6 pointer-events-auto transition-all duration-1000 ease-out transform ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          id="hero-headings"
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            <Sparkles className="text-white/70 animate-pulse" size={16} />
            <span className="text-[10px] md:text-xs font-mono tracking-[0.25em] text-white/50 uppercase">
              WELCOME TO ROYAL MINISTRY
            </span>
          </div>

          <h1 
            className="font-sans text-center tracking-[-0.02em] leading-[1.1] flex flex-col gap-1 md:gap-3 items-center w-full"
          >
            <span className="text-white font-normal tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-[72px]">
              Raising Lives Through
            </span>
            <span className="text-white/90 font-light tracking-tight flex flex-col sm:flex-row flex-wrap justify-center items-center gap-x-4 text-3xl sm:text-5xl md:text-6xl lg:text-[72px] mt-2">
              Kingdom Truth <span className="font-serif-instrument italic text-amber-500/80 font-normal text-4xl sm:text-6xl md:text-7xl lg:text-[84px] -mt-1 sm:mt-0 lg:ml-2">&amp;</span>
            </span>
            <span className="text-amber-500/90 font-serif-instrument italic font-normal tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-[84px] mt-2 md:mt-4 text-balance">
              Supernatural Transformation
            </span>
          </h1>

          <p className="mt-8 text-base md:text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed text-center">
            Royal Ministry is a modern Christ-centered ministry dedicated to Kingdom truth, spiritual growth, supernatural transformation and the power of the Holy Spirit.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => handleScrollToSection('teachings-section')}
              className="border border-white/20 hover:border-white/50 text-white text-[14px] font-medium rounded-full px-8 py-4 cursor-pointer hover:scale-[1.03] active:scale-[0.97] bg-white/5 backdrop-blur-sm transition-all duration-300"
              id="explore-teachings-btn"
            >
              Explore Teachings
            </button>
            <button 
              onClick={() => handleScrollToSection('media-section')}
              className="bg-white text-black text-[14px] font-semibold rounded-full px-8 py-4 cursor-pointer hover:scale-[1.02] hover:shadow-[0_0_35px_5px_rgba(255,255,255,0.15)] active:scale-[0.98] transition-all duration-300"
              id="watch-messages-btn"
            >
              Watch Messages
            </button>
          </div>
        </div>

        {/* Side quote accent displayed only on desktops */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-2 max-w-[190px] text-right" id="hero-side-quote">
          <span className="text-[9px] font-mono tracking-[0.2em] text-white/40 uppercase font-mono">Contemplation</span>
          <span className="text-xs font-light text-white/60 leading-relaxed italic font-serif-instrument">
            "He who seeks the source must swim against the current."
          </span>
        </div>

        {/* Scroll indicator chevron prompt */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 cursor-pointer animate-bounce"
             onClick={() => handleScrollToSection('about-section')}>
          <span className="text-[9px] font-mono tracking-widest text-white/45">SCROLL</span>
          <ChevronDown className="text-white/60" size={16} />
        </div>
      </section>

      {/* SHORT INTRO */}
      <section className="relative py-16 md:py-24 bg-[#121110] text-[#f9f9f9] z-30 border-t border-white/5 text-center px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-xl md:text-2xl font-light leading-relaxed text-white">
            Royal Ministry exists to equip believers through sound Kingdom teaching, spiritual growth, revelation, discipleship and the transforming power of the Holy Spirit.
          </p>
          <p className="text-base md:text-lg font-light leading-relaxed text-stone-400">
            Our mission is to help people discover divine purpose, grow spiritually and walk in the reality of supernatural Christianity through Jesus Christ.
          </p>
        </div>
      </section>

      {/* 3. ABOUT-SEKTION */}
      <section 
        className="relative py-24 md:py-32 bg-[#1a1715] text-[#f9f9f9] z-30 overflow-hidden"
        id="about-section"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left 2-column image part style */}
            <div className="lg:col-span-5 relative" id="vision-visual-container">
              {/* Decorative light pattern glow */}
              <div className="absolute -inset-4 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />
              
              {/* High-res luxurious architectural shadow image */}
              <div className="relative overflow-hidden rounded-[24px] shadow-2xl border border-white/5 bg-[#131110]" id="vision-photo-wrap">
                <img 
                  src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_2zg6kRsQgLvpBAc5mmGVtMaqZi0%2Fhf_20260531_122301_99bba794-2b25-43e0-973e-438f2ec7711c.png&w=1280&q=85"
                  alt="Royal Ministry Ministry Image"
                  className="w-full h-auto block hover:scale-[1.02] transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                
                {/* Embedded Quote Graphic inside the column frame */}
                <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#131110]/90 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
                  <Quote size={20} className="text-amber-500/80 mb-1.5" />
                  <p className="text-xs font-serif-instrument italic leading-relaxed text-stone-200">
                    "Faith is not clinging to simple dogmas, but placing complete trust in a reliable foundation."
                  </p>
                </div>
              </div>
            </div>

            {/* Right column description narrative of vision statement */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6" id="vision-text-wrap">
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-8 bg-amber-500/20" />
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-500/60">
                  OUR INNER HEART
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-sans font-light tracking-tight text-white">
                About <span className="font-serif-instrument italic text-amber-500/80 font-normal">Royal Ministry</span>
              </h2>

              <p className="text-lg md:text-xl font-light leading-relaxed text-stone-300">
                Royal Ministry is a Christ-centered ministry dedicated to advancing Kingdom truth, spiritual growth and supernatural transformation through the power of the Holy Spirit.
              </p>

              <p className="text-sm md:text-base font-light leading-relaxed text-stone-400">
                We believe that every believer is called to discover divine purpose, grow in spiritual maturity and live according to the principles of God’s Kingdom. Our mission is to equip individuals through biblical teaching, discipleship, prayer and spiritual development, helping them become effective representatives of Christ in every area of life.
              </p>

              <div className="pt-4 flex items-center">
                <button 
                  onClick={() => {
                    selectTab('VISION');
                  }}
                  className="inline-flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase font-semibold text-amber-100/60 hover:text-white border-b border-white/20 pb-1.5 transition-all text-left"
                  id="vision-modal-trigger"
                >
                  Learn more about our foundation 
                  <ArrowUpRight size={14} className="text-amber-500/60" />
                </button>
              </div>

              {/* Core attributes bento blocks inside the Vision frame */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-white/10">
                <div className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                  <h4 className="text-sm font-semibold text-white/90 mb-1">Sound Doctrine</h4>
                  <p className="text-xs text-stone-400 leading-relaxed font-light">
                    Royal Ministry exists to inspire, empower and transform lives through sound doctrine.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
                  <h4 className="text-sm font-semibold text-white/90 mb-1">A Deeper Relationship</h4>
                  <p className="text-xs text-stone-400 leading-relaxed font-light">
                    Focused on spiritual revelation and cultivating a deeper relationship with Jesus Christ.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. TEACHINGS-SEKTION */}
      <section 
        className="relative py-24 md:py-32 bg-[#1a1715] text-[#f9f9f9] z-30 border-t border-white/5"
        id="teachings-section"
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-500/60 block mb-4">
            KINGDOM TRUTH
          </span>
          <h2 className="text-4xl md:text-5xl font-sans font-light tracking-tight text-white mb-8">
            At Royal Ministry, <span className="font-serif-instrument italic text-amber-500/80 font-normal">Teaching</span> is at the heart of our mission
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 mb-12">
            <p className="text-lg font-light leading-relaxed text-stone-300">
              We are committed to delivering sound biblical teaching that equips believers to understand God’s Kingdom, grow in spiritual maturity and walk confidently in their divine purpose.
            </p>
            <p className="text-sm md:text-base font-light leading-relaxed text-stone-400">
              Our teachings focus on Kingdom principles, spiritual growth, divine guidance, discipleship, leadership development and the transforming work of the Holy Spirit. Through sermons, Bible studies, conferences and digital resources, we seek to provide practical and life-changing truth that empowers believers to live according to God’s Word and fulfill their God-given calling.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="p-8 rounded-[24px] bg-white/5 border border-white/10 hover:border-white/20 transition-all text-left group cursor-pointer">
                <span className="text-[10px] font-mono uppercase text-white/40 mb-3 block">KINGDOM SERIES</span>
                <h3 className="text-xl font-medium text-white/95 mb-3 group-hover:text-amber-400 transition-colors">The Supernatural Realm</h3>
                <p className="text-sm text-stone-400 font-light mb-6">Discover how to walk in the miraculous power of the Holy Spirit every day.</p>
                <div className="text-xs font-mono tracking-widest text-white/60 group-hover:text-white transition-colors flex items-center gap-2 uppercase">Read more <ArrowRight size={12} /></div>
             </div>
             <div className="p-8 rounded-[24px] bg-white/5 border border-white/10 hover:border-white/20 transition-all text-left group cursor-pointer">
                <span className="text-[10px] font-mono uppercase text-white/40 mb-3 block">DISCIPLESHIP</span>
                <h3 className="text-xl font-medium text-white/95 mb-3 group-hover:text-amber-400 transition-colors">Apostolic Foundations</h3>
                <p className="text-sm text-stone-400 font-light mb-6">Laying the groundwork for a life centered fully on Christ and the unshakable truth.</p>
                <div className="text-xs font-mono tracking-widest text-white/60 group-hover:text-white transition-colors flex items-center gap-2 uppercase">Read more <ArrowRight size={12} /></div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. MEDIA-SEKTION */}
      <section 
        className="relative py-24 md:py-32 bg-[#121110] text-white z-30 overflow-hidden"
        id="media-section"
      >
        {/* Subtle geometric lines */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.01),transparent_50%)]" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          {/* Section Headers */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/40 block">
                THE KINGDOM MESSAGE
              </span>
              <h2 className="text-4xl md:text-5xl font-sans font-light tracking-tight text-white leading-tight">
                Teachings & <span className="font-serif-instrument italic text-white/70 font-normal">Inspiration</span>
              </h2>
              <p className="text-sm md:text-base text-white/50 max-w-lg font-light">
                Spiritual growth and alignment for your everyday life. Click 'Listen' to engage with our messages.
              </p>
            </div>

            <div>
              <button 
                onClick={() => selectTab('MEDIEN')}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
                id="medien-archive-btn"
              >
                Load Full Archive
                <ArrowRight size={12} className="text-white/60" />
              </button>
            </div>
          </div>

          {/* 3-Spalten-Grid representing beautiful sermon cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="sermons-grid">
            {SERMONS_DATA.map((sermon) => (
              <Sermon3DCard
                key={sermon.id}
                sermon={sermon}
                isPlaying={activeSermonId === sermon.id}
                handleTogglePlaySermon={handleTogglePlaySermon}
              />
            ))}
          </div>

          {/* Active play overlay message without artificial server logs */}
          {activeSermonId && (
            <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono text-white/60 animate-fade-in">
              <span>Playback active: "{SERMONS_DATA.find(s => s.id === activeSermonId)?.title}"</span>
              <button 
                onClick={() => setActiveSermonId(null)}
                className="text-white hover:underline uppercase text-[9px]"
              >
                Close
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 5. VERANSTALTUNGEN */}
      <section 
        className="relative py-24 md:py-32 bg-[#131110] text-[#f9f9f9] z-30"
        id="events-section"
      >
        <div className="max-w-5xl mx-auto px-6">
          
          <div className="space-y-4 mb-16 text-center">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-stone-500 block">
              SERVICES & ENCOUNTERS
            </span>
            <h2 className="text-4xl md:text-5xl font-sans font-light tracking-tight text-white leading-tight">
              Kingdom <span className="font-serif-instrument italic text-amber-500/80 font-normal">Encounters</span> &amp; Gatherings
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-lg font-light leading-relaxed text-stone-300">
                Royal Ministry hosts conferences, seminars, prayer gatherings, leadership meetings and special ministry events designed to encourage spiritual growth and Kingdom advancement.
              </p>
              <p className="text-sm md:text-base text-stone-400 font-light leading-relaxed">
                Our events provide opportunities for worship, teaching, prayer, fellowship and personal transformation. Whether in-person or online, our desire is to create environments where people can encounter God, receive biblical instruction and be equipped for effective Christian living and service.
              </p>
            </div>
          </div>

          {/* Vertical Events Layout with elegant thin division lines */}
          <div className="space-y-1" id="events-table-list">
            {EVENTS_DATA.map((evo) => {
              const isExpanded = expandedEventId === evo.id;
              const hasRsvp = rsvpList.includes(evo.id);
              
              return (
                <div 
                  key={evo.id}
                  className="border-b border-white/10 pb-3"
                  id={`event-row-${evo.id}`}
                >
                  <div 
                    className="flex flex-col lg:flex-row lg:items-center justify-between py-5 px-4 hover:bg-white/5 transition-all rounded-2xl cursor-pointer gap-4"
                    onClick={() => {
                      setExpandedEventId(isExpanded ? null : evo.id);
                    }}
                  >
                    {/* Date Badge Column */}
                    <div className="flex flex-row items-center gap-4 sm:gap-6">
                      <span className="text-xs sm:text-sm font-mono tracking-widest font-semibold uppercase text-amber-500/90 bg-white/5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg inline-block text-center min-w-[90px] sm:min-w-[100px]">
                        {evo.dateBadge}
                      </span>
                      <h3 className="text-base sm:text-lg font-medium text-white/95 leading-tight">
                        {evo.title}
                      </h3>
                    </div>

                    {/* Short Description Column */}
                    <p className="text-xs sm:text-sm text-stone-400/80 font-light lg:ml-4 flex-1 lg:max-w-md xl:max-w-xl self-start lg:self-center leading-relaxed">
                      {evo.subtitle}
                    </p>

                    {/* Right Ghost Actions Column */}
                    <div className="flex items-center gap-3 self-end lg:self-center">
                      {hasRsvp && (
                        <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono text-emerald-400 font-bold bg-emerald-900/30 px-2.5 py-1 rounded-md">
                          <CheckCircle size={10} /> ATTENDING
                        </span>
                      )}
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedEventId(isExpanded ? null : evo.id);
                        }}
                        className="px-4 py-2 rounded-full border border-white/10 hover:border-white/30 text-xs text-white/90 font-medium bg-white/5 hover:bg-white/10 transition-colors"
                        id={`event-toggle-${evo.id}`}
                      >
                        {isExpanded ? 'Collapse' : 'Details'}
                      </button>
                    </div>
                  </div>

                  {/* Expanded description accordion drawer */}
                  {isExpanded && (
                    <div className="py-6 px-6 bg-[#1a1715] rounded-2xl mx-3 mb-4 space-y-4 animate-[fadeIn_0.25s_ease-out]">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-400">
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-stone-500" />
                          <div>
                            <span className="block font-semibold text-white/90">Time:</span>
                            <span>{evo.time}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-stone-500" />
                          <div>
                            <span className="block font-semibold text-white/90">Location:</span>
                            <span>{evo.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-stone-500" />
                          <div>
                            <span className="block font-semibold text-white/90">Availability:</span>
                            <span>{evo.slotsRemaining} seats available</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm font-light text-stone-300 leading-relaxed border-t border-white/10 pt-4">
                        {evo.subtitle} Feel free to visit us. For questions or accessibility options, reach out to our team coordinators anytime through our contact modal.
                      </p>

                      <div className="flex flex-wrap gap-2.5 pt-2">
                        <button
                          onClick={() => handleToggleRsvp(evo.id)}
                          className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all ${
                            hasRsvp 
                              ? 'bg-amber-900 text-white hover:bg-amber-800' 
                              : 'bg-white text-black hover:bg-white/90 border border-white'
                          }`}
                          id={`rsvp-action-${evo.id}`}
                        >
                          {hasRsvp ? 'Cancel RSVP' : 'Join Encounter'}
                        </button>
                        <button 
                          onClick={() => selectTab('EVENTS')}
                          className="px-4 py-2.5 text-xs font-mono tracking-wider uppercase text-white/60 hover:text-white transition-colors"
                        >
                          Learn More
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. PRAYER-SEKTION */}
      <section 
        className="relative py-24 md:py-32 bg-[#1a1715] text-[#f9f9f9] z-30 border-t border-white/5"
        id="prayer-section"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-500/60 block mb-4">
            PRAYER & SPIRITUAL GROWTH
          </span>
          <h2 className="text-4xl md:text-5xl font-sans font-light tracking-tight text-white mb-6">
            Prayer is one of the <span className="font-serif-instrument italic text-amber-500/80 font-normal">foundations</span> of Royal Ministry
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 mb-10">
            <p className="text-lg font-light leading-relaxed text-stone-300">
              We believe that spiritual growth and transformation are the result of a living relationship with God through Jesus Christ and the ongoing work of the Holy Spirit.
            </p>
            <p className="text-sm md:text-base font-light leading-relaxed text-stone-400">
              Through prayer, discipleship, biblical teaching and spiritual encouragement, we help believers grow stronger in their faith, develop spiritual maturity and experience greater intimacy with God. We also provide prayer support and ministry opportunities for individuals seeking spiritual breakthrough, healing, restoration and deeper spiritual development.
            </p>
          </div>
          <button 
            onClick={() => selectTab('COMMUNITY')}
            className="bg-white text-black text-[14px] font-semibold rounded-full px-8 py-4 cursor-pointer hover:scale-[1.02] hover:shadow-[0_0_35px_5px_rgba(255,255,255,0.15)] active:scale-[0.98] transition-all duration-300 inline-flex items-center gap-2"
          >
            Submit Prayer Request <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* 8. LEADERSHIP-SEKTION */}
      <section 
        className="relative py-24 md:py-32 bg-[#121110] text-white z-30 border-t border-white/5"
        id="leadership-section"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section title */}
          <div className="text-center md:text-left mb-16 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-500/60 block">
              APOSTOLIC OVERSIGHT & FOUNDERS
            </span>
            <h2 className="text-4xl md:text-5xl font-sans font-light tracking-tight text-white">
              Our <span className="font-serif-instrument italic text-amber-500/80 font-normal">Leadership</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left column: Comprehensive biography */}
            <div className="lg:col-span-6 space-y-6 text-stone-300 font-light leading-relaxed">
              <p className="text-lg text-white font-medium leading-relaxed">
                Pastor Isaac Mahougnon and Martina Mahougnon are the founders of Royal Ministry.
              </p>
              <p className="text-stone-400 text-sm md:text-base">
                Driven by a passion for God’s Kingdom and the transforming power of the Holy Spirit, they are committed to equipping believers through biblical teaching, spiritual growth, discipleship and Kingdom-centered living.
              </p>
              <p className="text-stone-400 text-sm md:text-base">
                Royal Ministry was established with a clear vision: to help individuals discover their divine purpose, grow in spiritual maturity and become effective representatives of Jesus Christ in every sphere of life.
              </p>
              <p className="text-stone-400 text-sm md:text-base font-medium text-amber-500/80">
                Their desire is to see lives transformed, believers equipped and communities impacted through the power of God’s Word and the work of the Holy Spirit.
              </p>
              <div className="pt-2">
                <button 
                  onClick={() => selectTab('LEADERSHIP')}
                  className="px-6 py-3 bg-white/5 border border-white/10 hover:border-white/20 text-xs text-white font-mono uppercase tracking-widest rounded-full cursor-pointer hover:bg-white/10 transition-all inline-flex items-center gap-1.5"
                >
                  <span>Open Leadership Portal</span>
                  <ArrowRight size={12} className="text-amber-500" />
                </button>
              </div>
            </div>

            {/* Right column: Fine aesthetic twin-card layout for Pastor Isaac & Coordinator Martina */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1: Pastor Isaac */}
              <div className="group relative rounded-2xl overflow-hidden border border-white/5 bg-[#1a1715] p-4 flex flex-col gap-4 shadow-xl hover:border-white/25 transition-all duration-300">
                <div className="w-full rounded-xl overflow-hidden relative bg-black/40">
                  <img 
                    src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_2zg6kRsQgLvpBAc5mmGVtMaqZi0%2Fhf_20260531_134117_6f0523fe-385a-4efc-8326-b99f69fdafe8.png&w=1280&q=85" 
                    alt="Pastor Isaac Mahougnon"
                    className="w-full h-auto block grayscale hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-wider text-amber-500 uppercase">
                    Founder & Pastor
                  </span>
                  <h4 className="text-lg font-semibold tracking-tight text-white">
                    Pastor Isaac Mahougnon
                  </h4>
                  <p className="text-xs text-stone-400 font-light leading-relaxed">
                    Apostolic leader driving Kingdom depth, prophetic revelation and biblical sound teaching.
                  </p>
                </div>
              </div>

              {/* Card 2: Martina */}
              <div className="group relative rounded-2xl overflow-hidden border border-white/5 bg-[#1a1715] p-4 flex flex-col gap-4 shadow-xl hover:border-white/25 transition-all duration-300">
                <div className="w-full rounded-xl overflow-hidden relative bg-black/40">
                  <img 
                    src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_2zg6kRsQgLvpBAc5mmGVtMaqZi0%2Fhf_20260531_135902_4b95d1de-bb7a-4431-bf3d-a078b6d85130.png&w=1280&q=85" 
                    alt="Martina Mahougnon"
                    className="w-full h-auto block grayscale hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-wider text-amber-500 uppercase">
                    Co-Founder & Leader
                  </span>
                  <h4 className="text-lg font-semibold tracking-tight text-white">
                    Martina Mahougnon
                  </h4>
                  <p className="text-xs text-stone-400 font-light leading-relaxed">
                    Leading prayer networks, community discipleship and organizational vision.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. CONTACT-SEKTION */}
      <section 
        className="relative py-24 md:py-32 bg-[#1a1715] text-white z-30 border-t border-white/5"
        id="contact-section"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="liquid-glass border border-white/10 rounded-[32px] p-8 md:p-16 relative overflow-hidden" id="newsletter-form-box">
            
            {/* Ambient Background decoration */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/[0.01] blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-80 h-80 bg-white/[0.01] blur-3xl rounded-full pointer-events-none" />

            {newsletterSubmitted ? (
              /* Success feedback container with transition states */
              <div className="text-center py-8 space-y-4 animate-[fadeIn_0.5s_ease-out]" id="newsletter-success">
                <div className="inline-flex p-4 rounded-full bg-white/5 border border-white/10 text-white mb-2">
                  <CheckCircle size={32} className="text-white fill-white/10" />
                </div>
                <h3 className="text-2xl font-serif-instrument italic font-normal text-white">
                  Successfully Subscribed.
                </h3>
                <p className="text-sm font-light text-white/60 max-w-md mx-auto leading-relaxed">
                  Thank you for your trust. We have sent you a welcoming email with teachings and insights to get connected.
                </p>
                <div className="pt-4">
                  <button 
                    onClick={() => {
                      setNewsletterEmail('');
                      setNewsletterSubmitted(false);
                    }}
                    className="text-white/40 hover:text-white transition-colors text-xs font-mono tracking-widest uppercase"
                  >
                    Enter another email
                  </button>
                </div>
              </div>
            ) : (
              /* Core Newsletter input form */
              <div className="space-y-6 text-center md:text-left">
                <div className="max-w-xl space-y-3">
                  <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/40 block">
                    CONTACT & COMMUNITY
                  </span>
                  <h3 className="text-3xl font-sans font-light tracking-tight text-white animate-fade-in">
                    We would love to <span className="font-serif-instrument italic text-white/70 font-normal">hear from you</span>
                  </h3>
                  <p className="text-xs md:text-sm font-light text-white/70 leading-relaxed">
                    Whether you have a prayer request, a question about our ministry, or would simply like to connect, we welcome you to reach out.
                  </p>
                  <p className="text-xs md:text-sm font-light text-white/50 leading-relaxed">
                    Our team is committed to serving, encouraging and supporting individuals as they grow in their relationship with Jesus Christ. Feel free to contact us through our contact form, email or future ministry communication channels.
                  </p>
                  <div className="pt-2">
                    <button 
                      onClick={() => selectTab('COMMUNITY')}
                      className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase px-5 py-2.5 bg-white/10 hover:bg-white text-white hover:text-black border border-white/10 rounded-full transition-all"
                      id="footer-contact-modal-btn"
                    >
                      Open Contact Form &amp; Info
                      <ArrowRight size={10} />
                    </button>
                  </div>
                </div>

                <form onSubmit={handleNewsletterSubmit} className="pt-6 border-t border-white/5 space-y-4" id="newsletter-form">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 block">Subscribe to our newsletter</span>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                      <input 
                        type="email" 
                        required
                        placeholder="Your email address..." 
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-white/40 focus:bg-white/10 outline-none rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-white/35 transition-all"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="bg-white hover:bg-stone-100 text-[#121418] rounded-xl px-8 py-3.5 text-xs font-mono uppercase tracking-widest font-bold flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] transition-transform"
                      id="newsletter-submit-btn"
                    >
                      <Send size={12} />
                      <span>Subscribe Now</span>
                    </button>
                  </div>

                  <p className="text-[10px] text-white/30 font-mono text-center sm:text-left">
                    * GDPR-compliant data processing • unsubscribe at any time with one click.
                  </p>
                </form>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* 7. FOOTER SECTION (Hintergrund: #0B0D10) */}
      <footer 
        className="relative bg-[#0B0D10] text-[#7A7E85] py-16 md:py-24 border-t border-white/5 z-30"
        id="footer"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
            
            {/* Col 1 left brand and tagline */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-baseline gap-0.5 text-white">
                <span className="text-[20px] font-sans font-bold tracking-tight">Royal Ministry</span>
              </div>
              <p className="text-sm font-light leading-relaxed max-w-sm">
                Raising Lives Through Kingdom Truth &amp; Supernatural Transformation
              </p>
              <div className="flex items-center gap-1.5 text-xs text-stone-500 py-1 font-mono">
                <Shield size={13} />
                <span>GDPR-compliant ministry</span>
              </div>
            </div>

            {/* Col 2 center navigation directory link structures */}
            <div className="md:col-span-3 space-y-3 text-xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B3B5B9] block font-bold">
                Navigation
              </span>
              <ul className="space-y-2">
                {MAIN_MENU.map((item) => (
                  <li key={`footer-${item.id}`}>
                    <button 
                      onClick={() => handleScrollToSection(item.id)}
                      className="hover:text-white transition-colors text-stone-500 cursor-pointer text-left"
                      id={`footer-nav-${item.id}`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 right legal details */}
            <div className="md:col-span-4 space-y-3 text-xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#B3B5B9] block font-bold">
                Legal
              </span>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => selectTab('IMPRINT')}
                    className="hover:text-white transition-colors text-stone-500 text-left block cursor-pointer"
                  >
                    Imprint / Impressum
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => selectTab('AGB')}
                    className="hover:text-white transition-colors text-stone-500 text-left block cursor-pointer"
                  >
                    Terms &amp; Conditions / AGB
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => selectTab('PRIVACY')}
                    className="hover:text-white transition-colors text-stone-500 text-left block cursor-pointer"
                  >
                    Privacy Policy / Datenschutz
                  </button>
                </li>
                <li>
                  <span className="text-[10px] text-stone-600 block pt-1">
                    Email: Isaacmahugnon23@web.de
                  </span>
                  <span className="text-[10px] text-stone-600 block font-mono">
                    Tel/WhatsApp: +49 152 152 377 11
                  </span>
                </li>
              </ul>
            </div>

          </div>

          {/* Core copyright tagline block with highly visible German compliant legal links */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-[#4C4E53]">
            <div className="flex flex-wrap items-center gap-4 text-stone-500 font-sans text-xs">
              <span>&copy; {new Date().getFullYear()} Royal Ministry. All rights reserved.</span>
              <span className="text-stone-700 hidden sm:inline">|</span>
              <button onClick={() => selectTab('IMPRINT')} className="hover:text-white transition-colors cursor-pointer text-left">Impressum / Imprint</button>
              <button onClick={() => selectTab('PRIVACY')} className="hover:text-white transition-colors cursor-pointer text-left">Datenschutz / Privacy</button>
              <button onClick={() => selectTab('AGB')} className="hover:text-white transition-colors cursor-pointer text-left">AGB / Terms</button>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 bg-emerald-500/80 rounded-full" />
              <span>Faith & Grace in the Kingdom</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Cookie Consent Banner */}
      {showCookieBanner && (
        <div 
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-12 md:max-w-md z-50 p-6 rounded-2xl border border-white/10 bg-[#131110]/95 backdrop-blur-md shadow-2xl flex flex-col gap-4 animate-fade-in"
          id="cookie-consent-banner"
        >
          <div className="flex gap-3 items-start">
            <div className="p-2.5 rounded-xl bg-white/5 h-fit text-amber-500 border border-white/5">
              <Cookie size={18} />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-tight text-white mb-1">
                Cookie-Einwilligung / Cookie Consent
              </h4>
              <p className="text-[11px] font-light tracking-wide text-stone-300 leading-relaxed">
                Wir nutzen funktionale Cookies, um das Laden der Predigten-Archive und die Wegweiser-Ausstellungen DSGVO-konform zu koordinieren. Details finden Sie in der{' '}
                <button 
                  onClick={() => selectTab('PRIVACY')} 
                  className="underline text-amber-500 hover:text-amber-400 cursor-pointer"
                >
                  Datenschutzerklärung
                </button>.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3 text-[10px] uppercase font-mono tracking-wider">
            <button 
              onClick={handleDeclineCookies}
              className="px-4 py-2 hover:bg-white/5 rounded-full text-stone-400 hover:text-white transition-colors cursor-pointer text-left"
            >
              Decline
            </button>
            <button 
              onClick={handleAcceptCookies}
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-full transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              Consent
            </button>
          </div>
        </div>
      )}

      {/* PORTAL SYSTEM MODAL COOPERATIVE OVERLAYS */}
      <PlanEscapeModal 
        isOpen={isPlanOpen} 
        onClose={() => setIsPlanOpen(false)} 
        pillars={MINISTRY_PILLARS} 
      />

      <NavigationModal 
        activeTab={activeTab} 
        onClose={() => setActiveTab(null)} 
        pillars={MINISTRY_PILLARS} 
        onOpenPlan={() => setIsPlanOpen(true)}
      />
    </div>
  );
}
