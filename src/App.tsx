import React, { useEffect, useRef, useState } from 'react';
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
  Heart
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

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>(null);
  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
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
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 py-5 md:py-6 flex justify-between items-center bg-transparent transition-all duration-300"
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
          <sup className="text-[9px] font-mono font-medium text-white/40 tracking-widest uppercase">
            TM
          </sup>
        </div>

        {/* Center Liquid-glass Navigation bar (Desktop) styled like a Dynamic Island */}
        <nav 
          className="hidden md:flex liquid-glass rounded-full px-3 py-2 items-center gap-1 bg-black/60 backdrop-blur-xl shadow-2xl"
          id="nav-links"
        >
          <button
            onClick={() => handleScrollToSection('hero-section')}
            className="text-[11px] font-medium tracking-[0.12em] text-white/90 cursor-pointer hover:text-white px-3.5 py-1.5 rounded-full transition-all duration-200 hover:bg-white/5"
            id="nav-link-hero"
          >
            START
          </button>
          <button
            onClick={() => handleScrollToSection('vision-section')}
            className="text-[11px] font-medium tracking-[0.12em] text-white/90 cursor-pointer hover:text-white px-3.5 py-1.5 rounded-full transition-all duration-200 hover:bg-white/5"
            id="nav-link-vision"
          >
            VISION
          </button>
          <button
            onClick={() => handleScrollToSection('medien-section')}
            className="text-[11px] font-medium tracking-[0.12em] text-white/90 cursor-pointer hover:text-white px-3.5 py-1.5 rounded-full transition-all duration-200 hover:bg-white/5"
            id="nav-link-sermons"
          >
            SERMONS
          </button>
          <button
            onClick={() => handleScrollToSection('events-section')}
            className="text-[11px] font-medium tracking-[0.12em] text-white/90 cursor-pointer hover:text-white px-3.5 py-1.5 rounded-full transition-all duration-200 hover:bg-white/5"
            id="nav-link-events"
          >
            EVENTS
          </button>
          <button
            onClick={() => handleScrollToSection('community-section')}
            className="text-[11px] font-medium tracking-[0.12em] text-white/90 cursor-pointer hover:text-white px-3.5 py-1.5 rounded-full transition-all duration-200 hover:bg-white/5"
            id="nav-link-newsletter"
          >
            COMMUNITY
          </button>
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
            REGISTER
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
        <div className="fixed inset-0 z-40 bg-[#121418]/98 backdrop-blur-xl flex flex-col justify-between pt-28 px-6 pb-12 animate-[fadeIn_0.2s_ease-out] md:hidden">
          <nav className="flex flex-col gap-5 text-center">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleScrollToSection('hero-section');
              }}
              className="text-lg font-light tracking-widest text-white/90 hover:text-white py-1.5 border-b border-white/5"
            >
              START
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleScrollToSection('vision-section');
              }}
              className="text-lg font-light tracking-widest text-white/90 hover:text-white py-1.5 border-b border-white/5"
            >
              VISION
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleScrollToSection('medien-section');
              }}
              className="text-lg font-light tracking-widest text-white/90 hover:text-white py-1.5 border-b border-white/5"
            >
              SERMONS
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleScrollToSection('events-section');
              }}
              className="text-lg font-light tracking-widest text-white/90 hover:text-white py-1.5 border-b border-white/5"
            >
              EVENTS
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleScrollToSection('community-section');
              }}
              className="text-lg font-light tracking-widest text-white/90 hover:text-white py-1.5 border-b border-white/5"
            >
              COMMUNITY
            </button>
            
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsPlanOpen(true);
              }}
              className="bg-white hover:bg-white/95 text-black rounded-full py-3.5 text-xs font-semibold tracking-widest uppercase mt-4 w-full transition-all"
            >
              REGISTER
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
            className="font-sans font-extralight text-center tracking-[-0.02em] leading-[1.05] flex flex-col gap-2 items-center"
            style={{ fontSize: "clamp(46px, 6vw, 84px)" }}
          >
            <span className="text-white font-normal font-serif-instrument italic tracking-normal">
              Welcome to the
            </span>
            <span className="text-white/90 font-light font-sans tracking-tight">
              Realm of Miracles.
            </span>
          </h1>

          <p className="mt-8 text-base md:text-lg text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
            Experience the tangible presence of God, where faith is ignited and destinies are transformed. A place for inspiration, growth, and authentic community.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => handleScrollToSection('vision-section')}
              className="border border-white/20 hover:border-white/50 text-white text-[14px] font-medium rounded-full px-8 py-4 cursor-pointer hover:scale-[1.03] active:scale-[0.97] bg-white/5 backdrop-blur-sm transition-all duration-300"
              id="explore-vision-btn"
            >
              Our Vision
            </button>
            <button 
              onClick={() => handleScrollToSection('medien-section')}
              className="bg-white text-black text-[14px] font-semibold rounded-full px-8 py-4 cursor-pointer hover:scale-[1.02] hover:shadow-[0_0_35px_5px_rgba(255,255,255,0.15)] active:scale-[0.98] transition-all duration-300"
              id="escape-cta-btn"
            >
              Watch Sermons
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
             onClick={() => handleScrollToSection('vision-section')}>
          <span className="text-[9px] font-mono tracking-widest text-white/45">SCROLL</span>
          <ChevronDown className="text-white/60" size={16} />
        </div>
      </section>

      {/* 3. VISION-SEKTION (Hintergrund: Weiß/Creme für extrem glanzvollen Kontrast) */}
      <section 
        className="relative py-24 md:py-32 bg-[#F9F7F2] text-[#121418] z-30 overflow-hidden"
        id="vision-section"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left 2-column image part style */}
            <div className="lg:col-span-5 relative" id="vision-visual-container">
              {/* Decorative light pattern glow */}
              <div className="absolute -inset-4 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />
              
              {/* High-res luxurious architectural shadow image */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] shadow-2xl border border-black/5" id="vision-photo-wrap">
                <img 
                  src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop" 
                  alt="Minimalist Spiritual Sacred Wood and Concrete Architecture Shadow"
                  className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                
                {/* Embedded Quote Graphic inside the column frame */}
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-black/5">
                  <Quote size={24} className="text-stone-300 mb-2" />
                  <p className="text-xs font-serif-instrument italic leading-relaxed text-stone-700">
                    "Faith is not clinging to simple dogmas, but placing complete trust in a reliable foundation."
                  </p>
                </div>
              </div>
            </div>

            {/* Right column description narrative of vision statement */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6" id="vision-text-wrap">
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-8 bg-amber-800/20" />
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-900/60">
                  OUR INNER HEART
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-sans font-light tracking-tight text-[#121418]">
                Our <span className="font-serif-instrument italic text-amber-900 font-normal">Vision</span>
              </h2>

              <p className="text-lg md:text-xl font-light leading-relaxed text-stone-700">
                Royal Ministry & Miracle Center is a Christ-centered ministry dedicated to teaching the Word of the Kingdom, raising spiritual growth, experiencing divine alignment, and transforming lives through the power of the Holy Spirit.
              </p>

              <p className="text-sm md:text-base font-light leading-relaxed text-stone-600">
                We invite you to be part of an active, loving community that actively pursues prophetic encounters, studies the Bible with profound depth, and experiences the move of the Holy Spirit in everyday church life.
              </p>

              <div className="pt-4 flex items-center">
                <button 
                  onClick={() => {
                    selectTab('VISION');
                  }}
                  className="inline-flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase font-semibold text-amber-950 hover:text-amber-800 border-b border-amber-950/40 pb-1.5 transition-all text-left"
                  id="vision-modal-trigger"
                >
                  Learn more about our foundation 
                  <ArrowUpRight size={14} className="text-amber-900" />
                </button>
              </div>

              {/* Core attributes bento blocks inside the Vision frame */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-stone-200">
                <div className="p-5 rounded-2xl bg-stone-100 hover:bg-stone-200/50 transition-colors">
                  <h4 className="text-sm font-semibold text-[#121418] mb-1">Spiritual Depth</h4>
                  <p className="text-xs text-stone-500 leading-relaxed font-light">
                    No superficial answers. We value sound theological teaching and authentic scriptural encounters.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-stone-100 hover:bg-stone-200/50 transition-colors">
                  <h4 className="text-sm font-semibold text-[#121418] mb-1">Open Heart</h4>
                  <p className="text-xs text-stone-500 leading-relaxed font-light">
                    Every individual is welcomed with warmth and grace. A genuine place where authentic fellowship is lived out.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. MEDIEN-SEKTION (Hintergrund: #121418 - Anthrazit) */}
      <section 
        className="relative py-24 md:py-32 bg-[#121418] text-white z-30 overflow-hidden"
        id="medien-section"
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
            {SERMONS_DATA.map((sermon) => {
              const isPlaying = activeSermonId === sermon.id;
              return (
                <div 
                  key={sermon.id}
                  className={`group relative p-8 rounded-[24px] bg-[#1A1D23] border transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between min-h-[300px] ${
                    isPlaying 
                      ? 'border-white/90 shadow-[0_0_30px_rgba(255,255,255,0.053)]' 
                      : 'border-white/5 hover:border-white/20'
                  }`}
                  id={`sermon-card-${sermon.id}`}
                >
                  {/* Decorative indicator lines */}
                  <div className="absolute top-0 left-0 w-16 h-[2px] bg-gradient-to-r from-white/30 to-transparent" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-wider text-white/40 uppercase bg-white/5 px-2.5 py-1 rounded">
                        {sermon.category}
                      </span>
                      {isPlaying && (
                        /* Sound active wave Equalizer animation simulated */
                        <div className="flex gap-0.5 items-end h-3" id="equalizer-waves">
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

                  {/* Card Actions Bottom */}
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-white/40">{sermon.speaker}</span>
                    
                    <button
                      onClick={() => handleTogglePlaySermon(sermon)}
                      className={`h-9 w-24 rounded-full flex items-center justify-center gap-1 text-[11px] font-mono tracking-widest uppercase transition-all ${
                        isPlaying 
                          ? 'bg-white text-black font-semibold' 
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
                </div>
              );
            })}
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

      {/* 5. VERANSTALTUNGEN (Gemeinsam unterwegs - Hintergrund: Weiß/Creme) */}
      <section 
        className="relative py-24 md:py-32 bg-[#F9F6F0] text-[#121418] z-30"
        id="events-section"
      >
        <div className="max-w-5xl mx-auto px-6">
          
          <div className="space-y-4 mb-16 text-center">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-stone-500 block">
              SERVICES & ENCOUNTERS
            </span>
            <h2 className="text-4xl md:text-5xl font-sans font-light tracking-tight text-[#121418] leading-tight">
              Walking <span className="font-serif-instrument italic text-amber-900 font-normal">Together</span>
            </h2>
            <p className="text-stone-600 max-w-xl mx-auto font-light leading-relaxed">
              Join us in our weekly church services or life group chapters. Experience powerful encounters and active church life.
            </p>
          </div>

          {/* Vertical Events Layout with elegant thin division lines */}
          <div className="space-y-1" id="events-table-list">
            {EVENTS_DATA.map((evo) => {
              const isExpanded = expandedEventId === evo.id;
              const hasRsvp = rsvpList.includes(evo.id);
              
              return (
                <div 
                  key={evo.id}
                  className="border-b border-stone-200/80 pb-3"
                  id={`event-row-${evo.id}`}
                >
                  <div 
                    className="flex flex-col lg:flex-row lg:items-center justify-between py-5 px-4 hover:bg-stone-100/50 transition-all rounded-2xl cursor-pointer gap-4"
                    onClick={() => {
                      setExpandedEventId(isExpanded ? null : evo.id);
                    }}
                  >
                    {/* Date Badge Column */}
                    <div className="flex flex-row items-center gap-4 sm:gap-6">
                      <span className="text-xs sm:text-sm font-mono tracking-widest font-semibold uppercase text-amber-950 bg-stone-200/50 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg inline-block text-center min-w-[90px] sm:min-w-[100px]">
                        {evo.dateBadge}
                      </span>
                      <h3 className="text-base sm:text-lg font-medium text-[#121418] leading-tight">
                        {evo.title}
                      </h3>
                    </div>

                    {/* Short Description Column */}
                    <p className="text-xs sm:text-sm text-stone-500 font-light lg:ml-4 flex-1 lg:max-w-md xl:max-w-xl self-start lg:self-center leading-relaxed">
                      {evo.subtitle}
                    </p>

                    {/* Right Ghost Actions Column */}
                    <div className="flex items-center gap-3 self-end lg:self-center">
                      {hasRsvp && (
                        <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md">
                          <CheckCircle size={10} /> ATTENDING
                        </span>
                      )}
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedEventId(isExpanded ? null : evo.id);
                        }}
                        className="px-4 py-2 rounded-full border border-stone-300 hover:border-stone-900 text-xs text-[#121418] font-medium bg-white hover:bg-stone-50 transition-colors"
                        id={`event-toggle-${evo.id}`}
                      >
                        {isExpanded ? 'Collapse' : 'Details'}
                      </button>
                    </div>
                  </div>

                  {/* Expanded description accordion drawer */}
                  {isExpanded && (
                    <div className="py-6 px-6 bg-stone-100/50 rounded-2xl mx-3 mb-4 space-y-4 animate-[fadeIn_0.25s_ease-out]">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-600">
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-stone-400" />
                          <div>
                            <span className="block font-semibold text-[#121418]">Time:</span>
                            <span>{evo.time}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-stone-400" />
                          <div>
                            <span className="block font-semibold text-[#121418]">Location:</span>
                            <span>{evo.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-stone-400" />
                          <div>
                            <span className="block font-semibold text-[#121418]">Availability:</span>
                            <span>{evo.slotsRemaining} seats available</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm font-light text-stone-700 leading-relaxed border-t border-stone-200/50 pt-4">
                        {evo.subtitle} Feel free to visit us. For questions or accessibility options, reach out to our team coordinators anytime through our contact modal.
                      </p>

                      <div className="flex flex-wrap gap-2.5 pt-2">
                        <button
                          onClick={() => handleToggleRsvp(evo.id)}
                          className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all ${
                            hasRsvp 
                              ? 'bg-amber-900 text-white' 
                              : 'bg-stone-900 hover:bg-stone-800 text-white'
                          }`}
                          id={`rsvp-action-${evo.id}`}
                        >
                          {hasRsvp ? 'Cancel RSVP' : 'Register & Attend'}
                        </button>
                        <button 
                          onClick={() => selectTab('EVENTS')}
                          className="px-4 py-2.5 text-xs font-mono tracking-wider uppercase text-[#121418]/60 hover:text-[#121418] transition-colors"
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

      {/* 6. NEWSLETTER / COMMUNITY (Hintergrund: #121418) */}
      <section 
        className="relative py-24 md:py-32 bg-[#121418] text-white z-30"
        id="community-section"
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
                    MINISTRY NEWSLETTER
                  </span>
                  <h3 className="text-3xl font-sans font-light tracking-tight text-white">
                    Stay <span className="font-serif-instrument italic text-white/70 font-normal">Connected</span>
                  </h3>
                  <p className="text-xs md:text-sm font-light text-white/55 leading-relaxed">
                    Receive spiritual insights, event updates, and invitations directly in your inbox. No spam – only valuable inspiration.
                  </p>
                </div>

                <form onSubmit={handleNewsletterSubmit} className="pt-4 space-y-4" id="newsletter-form">
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
                <sup className="text-[9px] font-mono text-white/40 font-medium">TM</sup>
              </div>
              <p className="text-sm font-light leading-relaxed max-w-sm">
                Royal Ministry stands for clarity, community, and spiritual growth. A safe harbor in a fast-paced world.
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
                <li>
                  <button 
                    onClick={() => handleScrollToSection('hero-section')}
                    className="hover:text-white transition-colors text-stone-500 cursor-pointer text-left"
                    id="footer-nav-hero"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleScrollToSection('vision-section')}
                    className="hover:text-white transition-colors text-stone-500 cursor-pointer text-left"
                    id="footer-nav-vision"
                  >
                    Our Vision & Foundation
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleScrollToSection('medien-section')}
                    className="hover:text-white transition-colors text-stone-500 cursor-pointer text-left"
                    id="footer-nav-medien"
                  >
                    Sermons & Teachings
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleScrollToSection('events-section')}
                    className="hover:text-white transition-colors text-stone-500 cursor-pointer text-left"
                    id="footer-nav-events"
                  >
                    Events & Encounters
                  </button>
                </li>
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
                    onClick={() => selectTab('COMMUNITY')}
                    className="hover:text-white transition-colors text-stone-500 text-left block cursor-pointer"
                  >
                    Imprint
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => selectTab('COMMUNITY')}
                    className="hover:text-white transition-colors text-stone-500 text-left block cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => selectTab('COMMUNITY')}
                    className="hover:text-white transition-colors text-stone-500 text-left block cursor-pointer"
                  >
                    Cookie Settings
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

          {/* Core copyright tagline block */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-[#4C4E53]">
            <span>
              &copy; {new Date().getFullYear()} Royal Ministry. All rights reserved.
            </span>
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 bg-emerald-500/80 rounded-full" />
              <span>Faith & Grace in the Kingdom</span>
            </div>
          </div>

        </div>
      </footer>

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
