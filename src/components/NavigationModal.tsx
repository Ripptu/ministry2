import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X, Sparkles, Shield, Clock, Heart, Play, Pause, Search, Calendar, MapPin, Users, Mail, BookOpen, AlertCircle, CheckCircle2, Send, Phone, Info, Compass } from 'lucide-react';
import { MinistryPillar, ActiveTab } from '../types';

interface NavigationModalProps {
  activeTab: ActiveTab;
  onClose: () => void;
  pillars: MinistryPillar[];
  onOpenPlan: () => void;
}

// Simulated Sermons/Predigten media archive data
const SERMONS_ARCHIVE = [
  {
    id: 'sermon-1',
    title: 'Faith and Destiny',
    speaker: 'Pastor Isaac Mahougnon',
    series: 'Kingdom of God',
    duration: '28:15',
    date: 'May 24, 2026',
    scripture: 'Matthew 6:33',
    audioUrl: '#',
    category: 'Teaching'
  },
  {
    id: 'sermon-2',
    title: 'Word of Power for Daily Life',
    speaker: 'Pastor Isaac Mahougnon',
    series: 'Daily Victory',
    duration: '34:40',
    date: 'May 17, 2026',
    scripture: 'Philippians 4:13',
    audioUrl: '#',
    category: 'Power'
  },
  {
    id: 'sermon-3',
    title: 'The Presence of the Holy Spirit',
    speaker: 'Pastor Isaac Mahougnon',
    series: 'Spiritual Power',
    duration: '31:05',
    date: 'May 10, 2026',
    scripture: 'Acts 1:8',
    audioUrl: '#',
    category: 'Spirit'
  },
  {
    id: 'sermon-4',
    title: 'Family and Divine Care',
    speaker: 'Pastor Isaac Mahougnon',
    series: 'Community',
    duration: '25:10',
    date: 'May 03, 2026',
    scripture: '1 John 4:19',
    audioUrl: '#',
    category: 'Love'
  }
];

// Upcoming events/programs
const EVENTS_DATA = [
  {
    id: 'event-1',
    title: 'Celebration Service',
    description: 'Experience the tangible presence of God, where faith is ignited and destinies are transformed.',
    date: 'Sundays at 9:00 AM',
    location: 'Rheinlandstraße 14, 60529 Frankfurt am Main, Germany',
    capacity: 'Always Open',
    icon: Clock
  },
  {
    id: 'event-2',
    title: 'Word & Power',
    description: 'Biblical truths taught with clarity, power, and practical application for daily victory.',
    date: 'Wednesdays at 6:00 PM',
    location: 'Rheinlandstraße 14, 60529 Frankfurt am Main, Germany',
    capacity: 'Always Open',
    icon: BookOpen
  },
  {
    id: 'event-3',
    title: 'Miracle Vigil',
    description: 'Experience a night of miracles, deep prophetic encounters, and deliverance in our Friday night vigil.',
    date: 'Fridays at 11:00 PM',
    location: 'Rheinlandstraße 14, 60529 Frankfurt am Main, Germany',
    capacity: 'Always Open',
    icon: Users
  }
];

export default function NavigationModal({ activeTab, onClose, pillars, onOpenPlan }: NavigationModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Sync internal tab switcher state with trigger prop
  const [currentTab, setCurrentTab] = useState<ActiveTab>(activeTab);

  // Search & Filter state for Media tab
  const [mediaQuery, setMediaQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [playingSermonId, setPlayingSermonId] = useState<string | null>(null);

  // Sign up state for Events tab
  const [registeredEventId, setRegisteredEventId] = useState<string | null>(null);

  // Form state for Community/Contact tab
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTopic, setContactTopic] = useState('Allgemeines Interesse');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  useEffect(() => {
    if (activeTab) {
      setCurrentTab(activeTab);
      document.body.style.overflow = 'hidden';
      // Announce and animate entry
      gsap.fromTo(containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
      gsap.fromTo(bodyRef.current,
        { scale: 0.98, y: 15 },
        { scale: 1, y: 0, duration: 0.45, delay: 0.05, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeTab]);

  const handleClose = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.25,
      onComplete: onClose
    });
  };

  const togglePlaySermon = (id: string) => {
    if (playingSermonId === id) {
      setPlayingSermonId(null);
    } else {
      setPlayingSermonId(id);
    }
  };

  const handleEventRegister = (id: string) => {
    setRegisteredEventId(id);
    setTimeout(() => {
      setRegisteredEventId(null);
    }, 4000); // clear visual state
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.includes('@')) {
      alert('Bitte füllen Sie Name und gültige E-Mail-Adresse aus.');
      return;
    }
    setContactSubmitted(true);
    setTimeout(() => {
      // Simulate close or soft reset
    }, 4000);
  };

  if (!activeTab) return null;

  // Filter sermons
  const filteredSermons = SERMONS_ARCHIVE.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(mediaQuery.toLowerCase()) || 
                          sermon.speaker.toLowerCase().includes(mediaQuery.toLowerCase()) ||
                          sermon.scripture.toLowerCase().includes(mediaQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || sermon.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-md overflow-y-auto cursor-pointer"
      id="nav-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div 
        ref={bodyRef}
        className="relative w-full max-w-5xl text-white liquid-glass rounded-3xl p-6 sm:p-10 md:p-12 overflow-hidden my-8 cursor-default"
        id="nav-modal-body"
      >
        {/* Absolute Subtle Ornaments */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.01] blur-3xl rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-80 h-80 bg-white/[0.01] blur-3xl rounded-full" />

        {/* Floating Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 p-2.5 rounded-full cursor-pointer hover:bg-white/10 text-white/70 hover:text-white transition-colors z-50 bg-black/40 backdrop-blur-md border border-white/10 pointer-events-auto"
          id="close-nav-modal"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Top bar info */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8 pr-12">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">
              ROYAL MINISTRY PORTAL
            </span>
            <span className="text-white/20">|</span>
            <span className="text-xs uppercase tracking-widest text-[#B3B5B9] font-mono font-medium">
              {currentTab === 'VISION' && 'ABOUT US & VISION'}
              {currentTab === 'LEADERSHIP' && 'FOUNDERS & LEADERSHIP'}
              {currentTab === 'MEDIEN' && 'MEDIA & SERMONS'}
              {currentTab === 'EVENTS' && 'WEEKLY ENCOUNTERS & PROGRAMS'}
              {currentTab === 'COMMUNITY' && 'CONTACT & COMMUNITY'}
              {currentTab === 'IMPRINT' && 'IMPRINT / IMPRESSUM'}
              {currentTab === 'AGB' && 'TERMS & CONDITIONS / AGB'}
              {currentTab === 'PRIVACY' && 'PRIVACY POLICY / DATENSCHUTZ'}
            </span>
          </div>
        </div>

        {/* Outer Grid for Seitenstruktur (Sidebar Navigation) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 min-h-[460px]" id="portal-inner-grid">
          
          {/* LEFT SIDEBAR: Navigable Tabs */}
          <div className="col-span-1 md:col-span-3 flex flex-row md:flex-col gap-1.5 overflow-y-hidden overflow-x-auto md:overflow-x-visible md:border-r border-white/10 pb-4 md:pb-0 md:pr-4 scrollbar-none" id="portal-sidebar">
            {[
              { id: 'VISION', label: 'About Us', icon: Compass },
              { id: 'LEADERSHIP', label: 'Leadership', icon: Users },
              { id: 'MEDIEN', label: 'Sermons', icon: Play },
              { id: 'EVENTS', label: 'Programs', icon: Calendar },
              { id: 'COMMUNITY', label: 'Contact', icon: Mail },
              { id: 'IMPRINT', label: 'Imprint', icon: Info },
              { id: 'PRIVACY', label: 'Privacy', icon: Shield },
              { id: 'AGB', label: 'Terms & AGB', icon: BookOpen }
            ].map((tabItem) => {
              const IconComp = tabItem.icon;
              const isSelected = currentTab === tabItem.id;
              return (
                <button
                  key={tabItem.id}
                  onClick={() => setCurrentTab(tabItem.id as ActiveTab)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all font-mono tracking-wider text-[10px] uppercase whitespace-nowrap cursor-pointer text-left ${
                    isSelected 
                      ? 'bg-white text-black font-semibold shadow-md' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  id={`side-tab-${tabItem.id}`}
                >
                  <IconComp size={12} strokeWidth={isSelected ? 2.5 : 1.8} />
                  <span>{tabItem.label}</span>
                </button>
              );
            })}
          </div>

          {/* RIGHT VIEW: Dynamic Tab Selection Content */}
          <div className="col-span-1 md:col-span-9 flex flex-col justify-between min-h-[380px] md:pl-4">
            
            {/* TAB: ÜBER UNS / VISION */}
            {currentTab === 'VISION' && (
              <div className="space-y-6">
                <div className="max-w-xl">
                  <span className="text-xs font-mono uppercase tracking-[0.15em] text-white/50 block mb-1">Our Spiritual Foundation</span>
                  <h3 className="text-3xl font-light font-sans tracking-tight leading-tight mb-3">
                    Welcome To Royal Ministry & Miracle Center
                  </h3>
                  <p className="text-sm font-light text-white/60 leading-relaxed">
                    Royal Ministry & Miracle Center is a christ-centered ministry dedicated to teaching the Kingdom of God, spiritual growth, divine guidance, and transforming lives through the power of the Holy Spirit.
                  </p>
                </div>

                {/* Decorative bento layout for pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <Shield size={14} className="text-amber-500/80" />
                      <h4 className="text-[15px] font-semibold text-white">Spiritual Growth</h4>
                    </div>
                    <p className="text-xs font-light text-white/50 leading-relaxed">
                      We nurture custom pathways for deepest discipleship, continuous word study, and heartfelt fellowship in the presence of the Spirit.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <Clock size={14} className="text-amber-500/80" />
                      <h4 className="text-[15px] font-semibold text-white">Divine Guidance</h4>
                    </div>
                    <p className="text-xs font-light text-white/50 leading-relaxed">
                      Dedicated to transformation through high-fidelity prayer chains, prophetic ministry sessions, and clear biblical doctrine.
                    </p>
                  </div>
                </div>

                {/* Scriptural highlight block */}
                <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 text-center my-2">
                  <p className="text-sm italic font-light text-white/80 font-serif-instrument">
                    "In quietness and in confidence shall be your strength."
                  </p>
                  <span className="text-[9px] font-mono tracking-widest text-white/40 block mt-1">ISAIAH 30:15</span>
                </div>
              </div>
            )}

            {/* TAB: LEADERS / FOUNDERS */}
            {currentTab === 'LEADERSHIP' && (
              <div className="space-y-6 max-h-[420px] overflow-y-auto pr-2">
                <div className="max-w-xl">
                  <span className="text-xs font-mono uppercase tracking-[0.15em] text-white/50 block mb-1">Founders & Overseers</span>
                  <h3 className="text-2xl font-light font-sans tracking-tight mb-2">Our Spiritual Leadership</h3>
                  <p className="text-xs text-white/50">Meet the spiritual oversight leading the Royal Ministry community.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/10 pt-4">
                  <div className="space-y-3">
                    <div className="aspect-[4/5] rounded-xl overflow-hidden relative bg-black/40 border border-white/5">
                      <img 
                        src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_2zg6kRsQgLvpBAc5mmGVtMaqZi0%2Fhf_20260531_134117_6f0523fe-385a-4efc-8326-b99f69fdafe8.png&w=1280&q=85" 
                        alt="Pastor Isaac Mahougnon"
                        className="w-full h-full object-cover grayscale"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Pastor Isaac Mahougnon</h4>
                      <span className="text-[9px] font-mono tracking-wider text-amber-500 uppercase block mt-0.5">Founder & Overseer</span>
                      <p className="text-xs font-light text-white/60 leading-relaxed mt-2">
                        Pastor Isaac Mahougnon drives Kingdom depth, prophetic revelation, and biblically sound teaching. He is deeply committed to equipping believers to discover their divine destiny.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="aspect-[4/5] rounded-xl overflow-hidden relative bg-black/40 border border-white/5">
                      <img 
                        src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_2zg6kRsQgLvpBAc5mmGVtMaqZi0%2Fhf_20260531_135902_4b95d1de-bb7a-4431-bf3d-a078b6d85130.png&w=1280&q=85" 
                        alt="Martina Mahougnon"
                        className="w-full h-full object-cover grayscale"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Martina Mahougnon</h4>
                      <span className="text-[9px] font-mono tracking-wider text-amber-500 uppercase block mt-0.5">Co-Founder & Intercessory Leader</span>
                      <p className="text-xs font-light text-white/60 leading-relaxed mt-2">
                        Martina leading intense prayer setups, discipleship circles, and youth cell group guidance. Her passion for prayer bridges communities worldwide.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 text-center mt-2">
                  <h5 className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/40 mb-1">Our Calling & Purpose</h5>
                  <p className="text-xs font-light text-stone-300 max-w-md mx-auto leading-relaxed">
                    Helping people discover divine purpose, grow in spiritual maturity, and live the reality of supernatural Christianity.
                  </p>
                </div>
              </div>
            )}

            {/* TAB: MEDIEN / PREDIGTEN ARCHIVE */}
            {currentTab === 'MEDIEN' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="max-w-md">
                    <h3 className="text-2xl font-light font-sans tracking-tight mb-1">
                      Sermon Archive & Teachings
                    </h3>
                    <p className="text-xs font-light text-white/50">
                      Listen to deeply insightful theological messages that ignite faith and transform destinies.
                    </p>
                  </div>

                  {/* Categories & Search Filter */}
                  <div className="flex items-center gap-2 bg-white/5 rounded-full px-3.5 py-1.5 border border-white/10 w-full sm:w-auto max-w-xs">
                    <Search size={14} className="text-white/40" />
                    <input 
                      type="text" 
                      placeholder="Search messages..."
                      value={mediaQuery}
                      onChange={(e) => setMediaQuery(e.target.value)}
                      className="bg-transparent border-none text-xs outline-none text-white w-full placeholder-white/30"
                    />
                  </div>
                </div>

                {/* Tag filters */}
                <div className="flex flex-wrap gap-2 pt-1 border-t border-white/5">
                  {['All', 'Teaching', 'Power', 'Spirit', 'Love'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-[9px] font-mono tracking-widest uppercase px-3 py-1 rounded-full cursor-pointer transition-colors ${
                        selectedCategory === cat 
                          ? 'bg-white text-black font-semibold' 
                          : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Archive feed loop */}
                <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-2">
                  {filteredSermons.length > 0 ? (
                    filteredSermons.map((sermon) => {
                      const isPlaying = playingSermonId === sermon.id;
                      return (
                        <div 
                          key={sermon.id}
                          className={`p-4 rounded-2xl border transition-all duration-300 ${
                            isPlaying 
                              ? 'bg-white/10 border-white' 
                              : 'bg-white/[0.02] border-white/5 hover:border-white/15'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => togglePlaySermon(sermon.id)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 active:scale-90 ${
                                  isPlaying ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                              >
                                {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} className="ml-0.5" />}
                              </button>

                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-mono bg-white/10 text-white/60 px-2 py-0.5 rounded">
                                    {sermon.category}
                                  </span>
                                  <span className="text-[9px] text-white/40 font-mono">
                                    {sermon.date} • {sermon.scripture}
                                  </span>
                                </div>
                                <h4 className="text-xs font-semibold tracking-tight text-white mt-1">
                                  {sermon.title}
                                </h4>
                                <p className="text-[11px] text-white/50 font-light">
                                  {sermon.speaker} — {sermon.series}
                                </p>
                              </div>
                            </div>

                            <div className="text-right flex items-center gap-3">
                              {isPlaying && (
                                <div className="flex gap-0.5 items-end h-3">
                                  <span className="w-0.5 h-2 bg-white animate-bounce" style={{ animationDelay: '0s' }} />
                                  <span className="w-0.5 h-3 bg-white animate-bounce" style={{ animationDelay: '0.15s' }} />
                                  <span className="w-0.5 h-1.5 bg-white animate-bounce" style={{ animationDelay: '0.3s' }} />
                                </div>
                              )}
                              <span className="text-xs font-mono text-white/40">{sermon.duration}</span>
                            </div>
                          </div>

                          {isPlaying && (
                            <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-1">
                              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                <div className="h-full bg-white animate-[pulse_1.5s_infinite] w-1/3" />
                              </div>
                              <span className="text-[9px] font-mono tracking-widest text-[#B3B5B9] text-center uppercase mt-1 animate-pulse">
                                SIMULATED AUDIO PLAYBACK... CONNECTING TO STREAMING NODE
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-10 text-center text-xs text-white/40 italic">
                      No sermons found matching these filters. Try another keyword.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: VERANSTALTUNGEN / PROGRAMME */}
            {currentTab === 'EVENTS' && (
              <div className="space-y-6">
                <div className="max-w-xl">
                  <h3 className="text-2xl font-light font-sans tracking-tight mb-1">
                    Weekly Encounters & Services
                  </h3>
                  <p className="text-xs font-light text-white/50">
                    Join our weekly church life and active community. Experience powerful encounters and authentic fellowship.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {EVENTS_DATA.map((evo) => {
                    const EvIcon = evo.icon;
                    const isRegistered = registeredEventId === evo.id;
                    return (
                      <div 
                        key={evo.id}
                        className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between"
                      >
                        <div>
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mb-3 text-white/80">
                             <EvIcon size={14} />
                          </div>
                          <span className="text-[9px] font-mono text-white/40 block mb-1">
                            {evo.date}
                          </span>
                          <h4 className="text-[13px] font-semibold text-white tracking-tight mb-1">
                            {evo.title}
                          </h4>
                          <p className="text-[11px] font-light text-white/50 leading-relaxed mb-4">
                            {evo.description}
                          </p>
                        </div>

                        <div className="border-t border-white/5 pt-3 flex flex-col gap-2">
                          <div className="text-[9px] font-mono text-white/40 leading-normal block">
                            <span className="flex items-center gap-1"><MapPin size={10} /> {evo.location}</span>
                          </div>

                          <button
                            onClick={() => handleEventRegister(evo.id)}
                            className={`w-full py-1.5 rounded-full cursor-pointer text-[10px] font-medium uppercase tracking-widest transition-all ${
                              isRegistered 
                                ? 'bg-green-500/20 text-green-300 pointer-events-none' 
                                : 'bg-white/10 hover:bg-white text-white hover:text-black'
                            }`}
                          >
                            {isRegistered ? 'Registered ✔' : 'Join Encounter'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: KONTAKT / GEMEINSCHAFT */}
            {currentTab === 'COMMUNITY' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-light font-sans tracking-tight mb-1">
                        Become Part of the Community
                      </h3>
                      <p className="text-xs font-light text-white/50 leading-relaxed">
                        Our doors and hearts are always open. Whether you have a prayer request, a testimony, or just want to say hello, we are here for you. We would love to hear from you.
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-3 text-xs text-white/60">
                        <Mail size={13} className="text-white/40" />
                        <span>Isaacmahugnon23@web.de</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-white/60">
                        <Phone size={13} className="text-white/40" />
                        <span>+49 152 152 377 11</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-white/60">
                        <MapPin size={13} className="text-white/40" />
                        <span className="leading-tight">Rheinlandstraße 14, 60529 Frankfurt, Germany</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {contactSubmitted ? (
                      <div className="p-8 text-center bg-white/[0.02] border border-white/10 rounded-2xl h-full flex flex-col justify-center items-center">
                        <CheckCircle2 className="text-green-400 mb-3" size={32} />
                        <h4 className="text-sm font-semibold text-white mb-2">Message sent successfully!</h4>
                        <p className="text-xs text-white/50 leading-relaxed">
                          Thank you for reaching out. A team member or pastor will get back to you within 24 hours.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-mono uppercase tracking-widest text-white/40">Your Name</label>
                            <input 
                              type="text" 
                              required
                              placeholder="Alexis" 
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              className="bg-white/5 border border-white/5 hover:border-white/10 focus:border-white/40 outline-none rounded-xl px-3 py-2 text-xs text-white transition-all"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[9px] font-mono uppercase tracking-widest text-white/40">Your Email</label>
                            <input 
                              type="email" 
                              required
                              placeholder="alexis@example.com" 
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              className="bg-white/5 border border-white/5 hover:border-white/10 focus:border-white/40 outline-none rounded-xl px-3 py-2 text-xs text-white transition-all"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-mono uppercase tracking-widest text-white/40">Subject</label>
                          <select 
                            value={contactTopic}
                            onChange={(e) => setContactTopic(e.target.value)}
                            className="bg-zinc-900 border border-white/5 hover:border-white/10 focus:border-white/40 outline-none rounded-xl px-3 py-2 text-xs text-white transition-all"
                          >
                            <option value="Allgemeines Interesse">General Inquiry</option>
                            <option value="Theologische Begleitung">Prayer Request</option>
                            <option value="Hauskreise">Testimony</option>
                            <option value="Medienanfragen">Other Requests</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1">
                          <textarea 
                            rows={3}
                            required
                            placeholder="How can we stand in agreement or prayer with you contextually?"
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            className="bg-white/5 border border-white/5 hover:border-white/10 focus:border-white/40 outline-none rounded-xl px-3 py-2 text-xs text-white transition-all resize-none font-sans"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2 bg-white text-black rounded-xl text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all"
                        >
                          <Send size={12} /> Send Message
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: IMPRINT / IMPRESSUM */}
            {currentTab === 'IMPRINT' && (
              <div className="space-y-6 max-h-[420px] overflow-y-auto pr-2">
                <div className="max-w-xl">
                  <h3 className="text-2xl font-light font-sans tracking-tight mb-2">Imprint / Impressum</h3>
                  <p className="text-xs text-white/50">Legal information according to § 5 TMG for Royal Ministry.</p>
                </div>
                <div className="space-y-4 text-xs font-light text-white/70 leading-relaxed border-t border-white/10 pt-4">
                  <div>
                    <h4 className="font-mono text-[9px] tracking-wider text-amber-500 uppercase mb-1">Angaben gemäß § 5 TMG / Information according to § 5 TMG</h4>
                    <p className="text-white font-medium text-sm">Royal Ministry e.V. (i.Gr.)</p>
                    <p>Rheinlandstraße 14</p>
                    <p>60529 Frankfurt am Main</p>
                    <p>Germany / Deutschland</p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[9px] tracking-wider text-amber-500 uppercase mb-1">Vertreten durch / Represented by</h4>
                    <p className="text-white font-medium">Pastor Isaac Mahougnon</p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[9px] tracking-wider text-amber-500 uppercase mb-1">Kontakt / Contact</h4>
                    <p>E-Mail: <span className="text-white">Isaacmahugnon23@web.de</span></p>
                    <p>Telefon / WhatsApp: <span className="text-white">+49 152 152 377 11</span></p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[9px] tracking-wider text-amber-500 uppercase mb-1">Disclaimer / Haftungsausschluss</h4>
                    <p className="mb-2">
                      <strong>Haftung für Inhalte:</strong> Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                    </p>
                    <p>
                      <strong>Haftung für Links:</strong> Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte keine Gewähr übernehmen. Für die verlinkten Seiten ist stets der jeweilige Anbieter des Webangebots verantwortlich.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: TERMS & CONDITIONS / AGB */}
            {currentTab === 'AGB' && (
              <div className="space-y-6 max-h-[420px] overflow-y-auto pr-2">
                <div className="max-w-xl">
                  <h3 className="text-2xl font-light font-sans tracking-tight mb-2">Terms & Conditions / Allgemeine Geschäftsbedingungen</h3>
                  <p className="text-xs text-white/50">Last updated: June 2026</p>
                </div>
                <div className="space-y-4 text-xs font-light text-white/70 leading-relaxed border-t border-white/10 pt-4">
                  <div>
                    <h4 className="font-mono text-[9px] tracking-wider text-amber-500 uppercase mb-1">1. Scope of Application / Geltungsbereich</h4>
                    <p>
                      These General Terms and Conditions govern the use of the Royal Ministry website, including weekly service bookings, the creation of customized spiritual roadmaps, and subscription to our newsletter offerings.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[9px] tracking-wider text-amber-500 uppercase mb-1">2. Spiritual Mentorship Disclaimer / Haftungsbegrenzung der Seelsorge</h4>
                    <p className="text-white/90">
                      <strong>IMPORTANT:</strong> All customized roadmaps, prayer counseling, and teachings offered by Royal Ministry are strictly designed to support Christian discipleship and personal faith development. None of these offerings constitute legal, financial, psychotherapeutic, medical, or professional diagnostic advice. If you face medical, clinical, or psychiatric issues, please contact qualified healthcare providers immediately.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[9px] tracking-wider text-amber-500 uppercase mb-1">3. Registrations and Program Attendance / Teilnahme an Encounters</h4>
                    <p>
                      Registrations for specific gatherings (such as "Join Encounter") are conducted on a voluntary community basis. We reserve the right to alter meeting schedules, formats, or locations in alignment with organizational requirements.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[9px] tracking-wider text-amber-500 uppercase mb-1">4. Right of Withdrawal / Widerrufsrecht (No Placeholders)</h4>
                    <p className="text-white/90 font-medium">
                      <strong>Widerrufsrecht für Verbraucher:</strong> Verbrauchern steht bei online geschlossenen Vereinbarungen ein gesetzliches Widerrufsrecht von 14 Tagen zu. Da alle unsere geistlichen Angebote, Gebete, Seelsorgerunden und interaktiven Roadmaps für alle Endnutzer absolut kostenfrei und spendenfinanziert bereitgestellt werden, entstehen hierdurch keinerlei finanzielle Bindungen oder Zahlungsverpflichtungen. Sie können die Teilnahme an Programmen oder Ihr Abonnement unserer Mailings jederzeit kostenfrei mit sofortiger Wirkung beenden.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[9px] tracking-wider text-amber-500 uppercase mb-1">5. Code of Conduct / Verhaltensregeln</h4>
                    <p>
                      Royal Ministry is a space of respect, honor, love, and Kingdom truth. Any hate speech, disruptive activities, or harassment on our intercession loops or venue sites will lead to immediate exclusion from ministry networks.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PRIVACY POLICY / DATENSCHUTZ */}
            {currentTab === 'PRIVACY' && (
              <div className="space-y-6 max-h-[420px] overflow-y-auto pr-2">
                <div className="max-w-xl">
                  <h3 className="text-2xl font-light font-sans tracking-tight mb-2">Privacy Policy / Datenschutzerklärung</h3>
                  <p className="text-xs text-white/50">GDPR and DSGVO compliant data handling standards.</p>
                </div>
                <div className="space-y-4 text-xs font-light text-white/70 leading-relaxed border-t border-white/10 pt-4">
                  <div>
                    <h4 className="font-mono text-[9px] tracking-wider text-amber-500 uppercase mb-1">1. Allgemeine Hinweise / General Overview</h4>
                    <p>
                      Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese Datenschutzerklärung klärt Sie darüber auf, wie wir Ihre personenbezogenen Daten erheben, verarbeiten und schützen, wenn Sie unsere Webseite, Kontaktformulare, Gottesdienst-RSVPs oder spirituellen Wegweiser (Roadmaps) nutzen.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[9px] tracking-wider text-amber-500 uppercase mb-1">2. Verantwortliche Stelle / Controller</h4>
                    <p className="font-medium text-white">Royal Ministry e.V. (i.Gr.)</p>
                    <p>Rheinlandstraße 14, 60529 Frankfurt am Main, Germany</p>
                    <p>E-Mail: Isaacmahugnon23@web.de</p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[9px] tracking-wider text-amber-500 uppercase mb-1">3. Erhobene Daten / Types of Processed Data</h4>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Kontaktformulare:</strong> Name, E-Mail-Adresse, Thema, Nachricht (Art. 6 Abs. 1 lit. b DSGVO).</li>
                      <li><strong>Newsletter-Abo:</strong> E-Mail-Adresse, Anmeldezeitpunkt (Art. 6 Abs. 1 lit. a DSGVO).</li>
                      <li><strong>Spiritual Guidance Roadmaps:</strong> Name, E-Mail, gewählte Fokusbereiche und Dauer.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-mono text-[9px] tracking-wider text-amber-500 uppercase mb-1">4. Ihre Rechte / Your Rights under GDPR</h4>
                    <p>
                      Sie haben das Recht, jederzeit unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Bei Fragen oder Widerruf schreiben Sie uns einfach eine E-Mail an <span className="text-white font-medium">Isaacmahugnon23@web.de</span>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Footer integrated nicely within detail right portion */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-white/15 mt-6">
              <span className="text-[10px] font-mono text-white/40 flex items-center gap-1.5 uppercase">
                <Sparkles size={11} className="text-amber-500/85" /> Ready to grow deeper in faith?
              </span>
              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="px-5 py-2 rounded-full cursor-pointer text-xs font-mono uppercase tracking-widest border border-white/10 text-white/60 hover:text-white"
                  id="modal-close-under"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleClose();
                    setTimeout(() => {
                      onOpenPlan();
                    }, 150);
                  }}
                  className="px-6 py-2 bg-white text-black text-xs font-mono uppercase tracking-widest rounded-full cursor-pointer hover:scale-[1.03] active:scale-[0.97] transition-all"
                  id="modal-quick-plan-btn"
                >
                  Get Roadmap
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
