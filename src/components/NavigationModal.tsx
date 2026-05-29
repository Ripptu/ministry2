import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X, Sparkles, Shield, Clock, Heart, Play, Pause, Search, Calendar, MapPin, Users, Mail, BookOpen, AlertCircle, CheckCircle2, Send, Phone } from 'lucide-react';
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
    speaker: 'Pastor Isaac Mahugnon',
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
    speaker: 'Pastor Isaac Mahugnon',
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
    speaker: 'Pastor Isaac Mahugnon',
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
    speaker: 'Pastor Isaac Mahugnon',
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
        className="relative w-full max-w-4xl text-white liquid-glass rounded-3xl p-6 sm:p-10 md:p-12 overflow-hidden my-8 cursor-default"
        id="nav-modal-body"
      >
        {/* Absolute Subtle Ornaments */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.01] blur-3xl rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-80 h-80 bg-white/[0.01] blur-3xl rounded-full" />

        {/* Top bar info */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">
              ROYAL MINISTRY PORTAL
            </span>
            <span className="text-white/20">|</span>
            <span className="text-xs uppercase tracking-widest text-white/80 font-mono font-medium">
              {activeTab === 'VISION' && 'ABOUT US & VISION'}
              {activeTab === 'MEDIEN' && 'MEDIA & SERMONS'}
              {activeTab === 'EVENTS' && 'WEEKLY ENCOUNTERS & PROGRAMS'}
              {activeTab === 'COMMUNITY' && 'CONTACT & COMMUNITY'}
              {activeTab === 'IMPRINT' && 'IMPRINT / IMPRESSUM'}
              {activeTab === 'AGB' && 'TERMS & CONDITIONS / AGB'}
              {activeTab === 'PRIVACY' && 'PRIVACY POLICY / DATENSCHUTZ'}
            </span>
          </div>

          <button 
            onClick={handleClose}
            className="p-2 cursor-pointer bg-white/5 hover:bg-white/15 rounded-full transition-all text-white/80 hover:text-white"
            id="close-nav-modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Selection Content */}
        <div className="min-h-[380px] flex flex-col justify-between">
          
          {/* TAB 1: ÜBER UNS / VISION */}
          {activeTab === 'VISION' && (
            <div className="space-y-6">
              <div className="max-w-xl">
                <span className="text-xs font-mono uppercase tracking-[0.15em] text-white/50 block mb-1">Our Spiritual Foundation</span>
                <h3 className="text-3xl font-light font-sans tracking-tight leading-tight mb-3">
                  Welcome To Royal Ministry & Miracle Center
                </h3>
                <p className="text-sm font-light text-white/60 leading-relaxed">
                  Royal Ministry & Miracle Center is a christ centered ministry dedicated to teaching the Kingdom of God , spiritual growth, divine guidance, and transforming lives through the power of the Holy-Spirit.
                </p>
              </div>

              {/* Decorative bento layout for pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <Shield size={14} className="text-white/80" />
                    <h4 className="text-[15px] font-semibold text-white">Spiritual Growth</h4>
                  </div>
                  <p className="text-xs font-light text-white/50 leading-relaxed">
                    We nurture custom pathways for deepest discipleship, continuous word study, and heartfelt fellowship in the presence of the Spirit.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <Clock size={14} className="text-white/80" />
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

          {/* TAB 2: MEDIEN / PREDIGTEN ARCHIVE */}
          {activeTab === 'MEDIEN' && (
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
                    placeholder="Search messages, scriptures, speakers..."
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
                    className={`text-[10px] font-mono tracking-widest uppercase px-3.5 py-1.5 rounded-full cursor-pointer transition-colors ${
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
              <div className="space-y-3.5 max-h-[340px] overflow-y-auto pr-2">
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
                            {/* Play Circle trigger */}
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
                                <span className="text-[10px] font-mono bg-white/10 text-white/60 px-2 py-0.5 rounded">
                                  {sermon.category}
                                </span>
                                <span className="text-[10px] text-white/40 font-mono">
                                  {sermon.date} • {sermon.scripture}
                                </span>
                              </div>
                              <h4 className="text-sm font-semibold tracking-tight text-white mt-1">
                                {sermon.title}
                              </h4>
                              <p className="text-xs text-white/50 font-light">
                                {sermon.speaker} — {sermon.series}
                              </p>
                            </div>
                          </div>

                          <div className="text-right flex items-center gap-3">
                            {/* Visual simulation bar */}
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

                        {/* Interactive audio player feedback simulation */}
                        {isPlaying && (
                          <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-1">
                            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                              <div className="h-full bg-white animate-[pulse_1.5s_infinite] w-1/3" />
                            </div>
                            <span className="text-[9px] font-mono tracking-widest text-white/40 text-center uppercase mt-1 animate-pulse">
                              SIMULATED AUDIO PLAYBACK... CONNECTING TO RMMC STREAMING NODE
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

          {/* TAB 3: VERANSTALTUNGEN / PROGRAMME */}
          {activeTab === 'EVENTS' && (
            <div className="space-y-6">
              <div className="max-w-xl">
                <h3 className="text-2xl font-light font-sans tracking-tight mb-1">
                  Weekly Encounters & Services
                </h3>
                <p className="text-xs font-light text-white/50">
                  Join our weekly church life and active community. Experience powerful encounters and authentic fellowship.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <span className="text-[10px] font-mono text-white/40 block mb-1">
                          {evo.date}
                        </span>
                        <h4 className="text-[15px] font-semibold text-white tracking-tight mb-2">
                          {evo.title}
                        </h4>
                        <p className="text-xs font-light text-white/50 leading-relaxed mb-4">
                          {evo.description}
                        </p>
                      </div>

                      <div className="border-t border-white/5 pt-3.5 flex flex-col gap-2">
                        <div className="flex justify-between text-[10px] font-mono text-white/40">
                          <span className="flex items-center gap-1"><MapPin size={10} /> {evo.location}</span>
                          <span>{evo.capacity}</span>
                        </div>

                        <button
                          onClick={() => handleEventRegister(evo.id)}
                          className={`w-full py-2 rounded-full cursor-pointer text-xs font-medium uppercase tracking-widest transition-all ${
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

          {/* TAB 4: KONTAKT / GEMEINSCHAFT */}
          {activeTab === 'COMMUNITY' && (
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
                      <span>+49 152 152 377 11 (WhatsApp / Phone)</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/60">
                      <MapPin size={13} className="text-white/40" />
                      <span>Rheinlandstraße 14, 60529 Frankfurt am Main, Germany</span>
                    </div>
                  </div>
                </div>

                <div>
                  {contactSubmitted ? (
                    <div className="p-8 text-center bg-white/[0.02] border border-white/10 rounded-2xl h-full flex flex-col justify-center items-center">
                      <CheckCircle2 className="text-green-400 mb-3" size={36} />
                      <h4 className="text-md font-semibold text-white mb-2">Message sent successfully!</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Thank you for reaching out to us. A team member or pastor will get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-3.5">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Your Name</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Alexis" 
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="bg-white/5 border border-white/5 hover:border-white/10 focus:border-white/40 outline-none rounded-xl px-3.5 py-2.5 text-xs text-white transition-all"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Your Email</label>
                          <input 
                            type="email" 
                            required
                            placeholder="alexis@example.com" 
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            className="bg-white/5 border border-white/5 hover:border-white/10 focus:border-white/40 outline-none rounded-xl px-3.5 py-2.5 text-xs text-white transition-all"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Subject / Inquiry</label>
                        <select 
                          value={contactTopic}
                          onChange={(e) => setContactTopic(e.target.value)}
                          className="bg-zinc-900 border border-white/5 hover:border-white/10 focus:border-white/40 outline-none rounded-xl px-3 py-2 text-xs text-white transition-all"
                        >
                          <option value="Allgemeines Interesse">General Inquiry / Say Hello</option>
                          <option value="Theologische Begleitung">Prayer Request</option>
                          <option value="Hauskreise">Testimony</option>
                          <option value="Medienanfragen">Other Requests</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Share your thoughts with us</label>
                        <textarea 
                          rows={3}
                          required
                          placeholder="How can we stand in agreement or prayer with you today?"
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          className="bg-white/5 border border-white/5 hover:border-white/10 focus:border-white/40 outline-none rounded-xl px-3.5 py-2.5 text-xs text-white transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-white text-black rounded-xl text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all"
                      >
                        <Send size={12} /> Send Message
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: IMPRINT / IMPRESSUM */}
          {activeTab === 'IMPRINT' && (
            <div className="space-y-6 max-h-[420px] overflow-y-auto pr-2">
              <div className="max-w-xl">
                <h3 className="text-2xl font-light font-sans tracking-tight mb-2">Imprint / Impressum</h3>
                <p className="text-xs text-white/50">Legal information according to § 5 TMG for Royal Ministry.</p>
              </div>
              <div className="space-y-4 text-xs font-light text-white/70 leading-relaxed border-t border-white/10 pt-4">
                <div>
                  <h4 className="font-mono text-[10px] tracking-wider text-amber-500 uppercase mb-1">Information according to § 5 TMG / Angaben gemäß § 5 TMG</h4>
                  <p className="text-white font-medium text-sm">Royal Ministry e.V. (i.Gr.)</p>
                  <p>Rheinlandstraße 14</p>
                  <p>60529 Frankfurt am Main</p>
                  <p>Germany / Deutschland</p>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] tracking-wider text-amber-500 uppercase mb-1">Represented by / Vertreten durch</h4>
                  <p className="text-white font-medium">Pastor Isaac Mahugnon</p>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] tracking-wider text-amber-500 uppercase mb-1">Contact / Kontakt</h4>
                  <p>Email: <span className="text-white">Isaacmahugnon23@web.de</span></p>
                  <p>Phone / WhatsApp: <span className="text-white">+49 152 152 377 11</span></p>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] tracking-wider text-amber-500 uppercase mb-1">Disclaimer / Haftungsausschluss</h4>
                  <p className="mb-2">
                    <strong>Haftung für Inhalte:</strong> Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                  </p>
                  <p>
                    <strong>Haftung für Links:</strong> Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: TERMS & CONDITIONS / AGB */}
          {activeTab === 'AGB' && (
            <div className="space-y-6 max-h-[420px] overflow-y-auto pr-2">
              <div className="max-w-xl">
                <h3 className="text-2xl font-light font-sans tracking-tight mb-2">Terms & Conditions / Allgemeine Geschäftsbedingungen</h3>
                <p className="text-xs text-white/50">Last updated: May 2026</p>
              </div>
              <div className="space-y-4 text-xs font-light text-white/70 leading-relaxed border-t border-white/10 pt-4">
                <div>
                  <h4 className="font-mono text-[10px] tracking-wider text-amber-500 uppercase mb-1">1. Scope of Application / Geltungsbereich</h4>
                  <p>
                    These General Terms and Conditions govern the use of the Royal Ministry website, including bookings for weekly encounters, the creation of spiritual roadmaps, and subscribing to the spiritual newsletter.
                  </p>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] tracking-wider text-amber-500 uppercase mb-1">2. Spiritual Mentorship Disclaimer / Geistiger Haftungsausschluss</h4>
                  <p className="text-white/90">
                    <strong>IMPORTANT:</strong> All customized roadmaps, prayer counseling, and insights offered by Royal Ministry are strictly designed to support Christian spiritual growth, discipleship, and faith development. They do not constitute legal, financial, professional, medical, or psychotherapeutic advice or diagnostic assessments. If you require medical or psychiatric care, please contact professional healthcare providers immediately.
                  </p>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] tracking-wider text-amber-500 uppercase mb-1">3. Participation and Bookings / Teilnahme an Veranstaltungen</h4>
                  <p>
                    Registrations for programs or specific events (e.g. "Join Encounter") are conducted on a voluntary community basis. We reserve the right to modify service schedules, venue logistics, or speaker line-ups if requested by divine leadership or operational constraints.
                  </p>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] tracking-wider text-amber-500 uppercase mb-1">4. Code of Conduct / Gemeinschaftsregeln</h4>
                  <p>
                    Royal Ministry is a space of respect, honor, love, and Kingdom truth. Any hate speech, disruptive activities, or harassment during services or online intercession channels will lead to immediate exclusion from ministry events.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: PRIVACY POLICY / DATENSCHUTZ */}
          {activeTab === 'PRIVACY' && (
            <div className="space-y-6 max-h-[420px] overflow-y-auto pr-2">
              <div className="max-w-xl">
                <h3 className="text-2xl font-light font-sans tracking-tight mb-2">Privacy Policy / Datenschutzerklärung</h3>
                <p className="text-xs text-white/50">Compliance with European GDPR / DSGVO regulations.</p>
              </div>
              <div className="space-y-4 text-xs font-light text-white/70 leading-relaxed border-t border-white/10 pt-4">
                <div>
                  <h4 className="font-mono text-[10px] tracking-wider text-amber-500 uppercase mb-1">1. General Overview / Allgemeine Hinweise</h4>
                  <p>
                    Your privacy is of utmost importance to us. This privacy policy informs you about how we handle, process, and protect your personal data when you use our website, contact forms, weekly RSVPs, or register for our spiritual newsletters.
                  </p>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] tracking-wider text-amber-500 uppercase mb-1">2. Controller / Verantwortliche Stelle</h4>
                  <p className="font-medium text-white">Royal Ministry e.V. (i.Gr.)</p>
                  <p>Rheinlandstraße 14, 60529 Frankfurt am Main, Germany</p>
                  <p>Email: Isaacmahugnon23@web.de</p>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] tracking-wider text-amber-500 uppercase mb-1">3. Processed Data / Erhobene Daten</h4>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Contact Forms:</strong> Name, Email, Topic, Message (Art. 6 Abs. 1 lit. b GDPR).</li>
                    <li><strong>Newsletter:</strong> Email address, timestamp (Art. 6 Abs. 1 lit. a GDPR).</li>
                    <li><strong>Spiritual Roadmap Portal:</strong> Name, Email, chosen spiritual pillars, and duration.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] tracking-wider text-amber-500 uppercase mb-1">4. Your Rights under GDPR / Ihre Rechte nach DSGVO</h4>
                  <p>
                    You have the right is to access your stored data, demand correction, request erasure, or revoke data processing consent at any time. Simply send an email to <span className="text-white font-medium">Isaacmahugnon23@web.de</span>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-white/15">
            <span className="text-[10px] font-mono text-white/40 flex items-center gap-1.5 uppercase">
              <Sparkles size={11} /> Ready to grow deeper in faith?
            </span>
            <div className="flex gap-4">
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
                Get Spiritual Guidance
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
