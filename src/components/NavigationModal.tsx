import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { X, Sparkles, Shield, Clock, Heart, Play, Pause, Search, Calendar, MapPin, Users, Mail, BookOpen, AlertCircle, CheckCircle2, Send } from 'lucide-react';
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
    title: 'Gnade im Lärm der Welt',
    speaker: 'Pastor Johannes Thorne',
    series: 'Atmosphärische Stille',
    duration: '28:15',
    date: '24. Mai 2026',
    scripture: 'Psalm 46,11',
    audioUrl: '#',
    category: 'Stille'
  },
  {
    id: 'sermon-2',
    title: 'Die Gabe des Decrescendo',
    speaker: 'Dr. Sarah Althaus',
    series: 'Geistlicher Aufstieg',
    duration: '34:40',
    date: '10. Mai 2026',
    scripture: 'Matthäus 11,28',
    audioUrl: '#',
    category: 'Gnade'
  },
  {
    id: 'sermon-3',
    title: 'Wurzeln im tiefen Urgrund',
    speaker: 'Pastor Johannes Thorne',
    series: 'Seele kalibrieren',
    duration: '22:10',
    date: '26. April 2026',
    scripture: 'Kolosser 2,7',
    audioUrl: '#',
    category: 'Nachfolge'
  },
  {
    id: 'sermon-4',
    title: 'Mut zum unbeschriebenen Blatt',
    speaker: 'Ruth Gabriel',
    series: 'Liturgische Aufbrüche',
    duration: '31:05',
    date: '12. April 2026',
    scripture: 'Jesaja 43,19',
    audioUrl: '#',
    category: 'Aufbruch'
  }
];

// Upcoming events/programs
const EVENTS_DATA = [
  {
    id: 'event-1',
    title: 'Wochenende der absoluten Stille',
    description: 'Eine 48-stündige geführte Einkehr ohne digitale Ablenkungen mit persönlicher geistlicher Begleitung.',
    date: '12. - 14. Juni 2026',
    location: 'Chinguetti Solitude Outpost',
    capacity: '12 Plätze frei',
    icon: Clock
  },
  {
    id: 'event-2',
    title: 'Theologisches Forum: Glaube & Moderne',
    description: 'Interaktive Vorträge und offene Diskussionsrunden zu Glaubensfragen in einer beschleunigten Epoche.',
    date: '27. Juni 2026',
    location: 'Arashiyama Gaps Gilde',
    capacity: '45 Plätze frei',
    icon: BookOpen
  },
  {
    id: 'event-3',
    title: 'Gemeinschafts-Zentrierung & Ernte',
    description: 'Gemeinsames Arbeiten auf dem Bio-Klosterhof gefolgt von abendlicher Liturgie und Brotbrechen.',
    date: '18. Juli 2026',
    location: 'Cochamó Slabs Valley',
    capacity: '20 Plätze frei',
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-md overflow-y-auto"
      id="nav-modal-backdrop"
    >
      <div 
        ref={bodyRef}
        className="relative w-full max-w-4xl text-white liquid-glass rounded-3xl p-6 sm:p-10 md:p-12 overflow-hidden my-8"
        id="nav-modal-body"
      >
        {/* Absolute Subtle Ornaments */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.01] blur-3xl rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-80 h-80 bg-white/[0.01] blur-3xl rounded-full" />

        {/* Top bar info */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">
              WANDERFUL SANCTUARY PORTAL
            </span>
            <span className="text-white/20">|</span>
            <span className="text-xs uppercase tracking-widest text-white/80 font-mono font-medium">
              {activeTab === 'VISION' && 'ÜBER UNS & VISION'}
              {activeTab === 'MEDIEN' && 'MEDIEN & PREDIGTEN'}
              {activeTab === 'EVENTS' && 'VERANSTALTUNGEN & PROGRAMME'}
              {activeTab === 'COMMUNITY' && 'KONTAKT & GEMEINSCHAFT'}
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
                <span className="text-xs font-mono uppercase tracking-[0.15em] text-white/50 block mb-1">Unser geistliches Fundament</span>
                <h3 className="text-3xl font-light font-sans tracking-tight leading-tight mb-3">
                  Unsere Vision für tiefe geistliche Einkehr.
                </h3>
                <p className="text-sm font-light text-white/60 leading-relaxed">
                  In einer Ära des konstanten Rauschens sehnen wir uns nach der Stille, in der Gott spricht. Wanderful ist kein bloßes Portal, sondern ein Digitaler Altar und Wegweiser zu echter Hingabe, theologischer Klarheit und geistlicher Erneuerung.
                </p>
              </div>

              {/* Decorative bento layout for pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <Shield size={14} className="text-white/80" />
                    <h4 className="text-[15px] font-semibold text-white">Geistliches Wachstum</h4>
                  </div>
                  <p className="text-xs font-light text-white/50 leading-relaxed">
                    Wir ermutigen zu täglicher Bibellesung, unzensiertem Gebet und stiller Bewunderung der Schöpfung Gottes. Weg von lauter Selbstdarstellung, hin zur inneren Umkehr.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <Clock size={14} className="text-white/80" />
                    <h4 className="text-[15px] font-semibold text-white">Ruhige Ästhetik & Demut</h4>
                  </div>
                  <p className="text-xs font-light text-white/50 leading-relaxed">
                    Unsere Räume und Angebote sind gewollt entschleunigt und von exzellenter, schlichter Qualität. Weil Liturgie und Ästhetik die Seele beruhigen.
                  </p>
                </div>
              </div>

              {/* Scriptural highlight block */}
              <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 text-center my-2">
                <p className="text-sm italic font-light text-white/80 font-serif-instrument">
                  "In der Ruhe und im Vertrauen liegt eure Stärke."
                </p>
                <span className="text-[9px] font-mono tracking-widest text-white/40 block mt-1">JESAJA 30,15</span>
              </div>
            </div>
          )}

          {/* TAB 2: MEDIEN / PREDIGTEN ARCHIVE */}
          {activeTab === 'MEDIEN' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="max-w-md">
                  <h3 className="text-2xl font-light font-sans tracking-tight mb-1">
                    Predigtarchiv & Geistliche Lehre
                  </h3>
                  <p className="text-xs font-light text-white/50">
                    Höre theologische Botschaften, die dein Herz zur Ruhe bringen.
                  </p>
                </div>

                {/* Categories & Search Filter */}
                <div className="flex items-center gap-2 bg-white/5 rounded-full px-3.5 py-1.5 border border-white/10 w-full sm:w-auto max-w-xs">
                  <Search size={14} className="text-white/40" />
                  <input 
                    type="text" 
                    placeholder="Suche nach Texten, Rednern..."
                    value={mediaQuery}
                    onChange={(e) => setMediaQuery(e.target.value)}
                    className="bg-transparent border-none text-xs outline-none text-white w-full placeholder-white/30"
                  />
                </div>
              </div>

              {/* Tag filters */}
              <div className="flex flex-wrap gap-2 pt-1 border-t border-white/5">
                {['All', 'Stille', 'Gnade', 'Nachfolge', 'Aufbruch'].map((cat) => (
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
                              SIMULIERTES AUDIO STARTET... VERBINDE MIT SANCTUARY STREAMING NODE
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="p-10 text-center text-xs text-white/40 italic">
                    Keine Predigten unter diesen Filtern gefunden. Versuche ein anderes Schlagwort.
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
                  Veranstaltungen & Seminare
                </h3>
                <p className="text-xs font-light text-white/50">
                  Schließe dich unseren bewussten Kreisen an. Belegte Programme sind auf kleine Gruppen limitiert, um Privatsphäre und Einkehr zu schützen.
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
                          {isRegistered ? 'Eingeschrieben ✔' : 'Anmelden'}
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
                      Werde Teil der Gemeinschaft
                    </h3>
                    <p className="text-xs font-light text-white/50 leading-relaxed">
                      Hast du Fragen zur Vision, suchst du theologische Begleitung oder möchtest du dich einfach für Hauskreise (Kleine Gruppen) anmelden? Schreib uns. Unser Team antwortet still, diskret und geistlich fundiert.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 text-xs text-white/60">
                      <Mail size={13} className="text-white/40" />
                      <span>kanzlei@wanderful-sanctuary.org</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/60">
                      <Users size={13} className="text-white/40" />
                      <span>28 Hauskreise im DACH-Raum & Online-Kreise</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-white/60">
                      <Shield size={13} className="text-white/40" />
                      <span>Sicheres und anoymisiertes Seelsorge-Postfach</span>
                    </div>
                  </div>
                </div>

                <div>
                  {contactSubmitted ? (
                    <div className="p-8 text-center bg-white/[0.02] border border-white/10 rounded-2xl h-full flex flex-col justify-center items-center">
                      <CheckCircle2 className="text-green-400 mb-3" size={36} />
                      <h4 className="text-md font-semibold text-white mb-2">Nachricht erfolgreich verschlüsselt!</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Vielen Dank für das Vertrauen. Ein Seelsorger oder Koordinator wird sich innerhalb der nächsten 24 Stunden per Mail zurückmelden.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-3.5">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Ihr Name</label>
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
                          <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Ihre E-Mail</label>
                          <input 
                            type="email" 
                            required
                            placeholder="alexis@haven.de" 
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            className="bg-white/5 border border-white/5 hover:border-white/10 focus:border-white/40 outline-none rounded-xl px-3.5 py-2.5 text-xs text-white transition-all"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Inhaltliches Anliegen</label>
                        <select 
                          value={contactTopic}
                          onChange={(e) => setContactTopic(e.target.value)}
                          className="bg-zinc-900 border border-white/5 hover:border-white/10 focus:border-white/40 outline-none rounded-xl px-3 py-2 text-xs text-white transition-all"
                        >
                          <option value="Allgemeines Interesse">Allgemeines Interesse / Kennenlernen</option>
                          <option value="Theologische Begleitung">Theologische Begleitung / Seelsorge</option>
                          <option value="Hauskreise">Hauskreis-Suche / Kooperation</option>
                          <option value="Medienanfragen">Predigten / Audio-Protokoll Rechte</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-white/40">Teilen Sie uns Ihre Gedanken mit</label>
                        <textarea 
                          rows={3}
                          required
                          placeholder="Wie können wir Sie auf Ihrer geistlichen Reise begleiten?"
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          className="bg-white/5 border border-white/5 hover:border-white/10 focus:border-white/40 outline-none rounded-xl px-3.5 py-2.5 text-xs text-white transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-white text-black rounded-xl text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all"
                      >
                        <Send size={12} /> Absenden & Sichern
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-white/15">
            <span className="text-[10px] font-mono text-white/40 flex items-center gap-1.5 uppercase">
              <Sparkles size={11} /> Bereit, einen Schritt tiefer zu gehen?
            </span>
            <div className="flex gap-4">
              <button
                onClick={handleClose}
                className="px-5 py-2 rounded-full cursor-pointer text-xs font-mono uppercase tracking-widest border border-white/10 text-white/60 hover:text-white"
                id="modal-close-under"
              >
                Schließen
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
                Geistlichen Wegweiser anfordern
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
