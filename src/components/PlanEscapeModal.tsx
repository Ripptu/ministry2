import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, Sparkles, BookOpen, Compass, ArrowLeft, ArrowRight, Check, Shield } from 'lucide-react';
import { MinistryPillar } from '../types';

interface PlanEscapeModalProps {
  isOpen: boolean;
  onClose: () => void;
  pillars: MinistryPillar[];
}

export default function PlanEscapeModal({ isOpen, onClose, pillars }: PlanEscapeModalProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedPillarId, setSelectedPillarId] = useState<string>('');
  const [focusLevel, setFocusLevel] = useState<number>(3);
  const [durationWeeks, setDurationWeeks] = useState<number>(4);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  
  // Generating outcome
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [completedPlan, setCompletedPlan] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset state
      setStep(1);
      setSelectedPillarId(pillars[0]?.id || '');
      setFocusLevel(3);
      setDurationWeeks(4);
      setUserName('');
      setUserEmail('');
      setIsGenerating(false);
      setCompletedPlan(false);
      setGenerationProgress(0);

      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      gsap.fromTo(contentRef.current,
        { scale: 0.95, y: 20 },
        { scale: 1, y: 0, duration: 0.5, delay: 0.1, ease: 'back.out(1.1)' }
      );
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, pillars]);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: onClose
    });
  };

  const nextStep = () => {
    if (step < 4) {
      gsap.fromTo(contentRef.current, 
        { alpha: 0.7, x: 20 },
        { alpha: 1, x: 0, duration: 0.3, ease: 'power1.out' }
      );
      setStep(prev => prev + 1);
    } else {
      triggerItineraryGeneration();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      gsap.fromTo(contentRef.current, 
        { alpha: 0.7, x: -20 },
        { alpha: 1, x: 0, duration: 0.3, ease: 'power1.out' }
      );
      setStep(prev => prev - 1);
    }
  };

  const triggerItineraryGeneration = () => {
    if (!userName.trim() || !userEmail.includes('@')) {
      alert('Please enter a valid name and email address to secure your customized plan.');
      return;
    }
    setIsGenerating(true);
    let currentVal = 0;
    const interval = setInterval(() => {
      currentVal += 5;
      setGenerationProgress(currentVal);
      if (currentVal >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsGenerating(false);
          setCompletedPlan(true);
        }, 400);
      }
    }, 100);
  };

  if (!isOpen) return null;

  const currentPillar = pillars.find(p => p.id === selectedPillarId);

  return (
    <div 
      ref={modalRef} 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-md overflow-y-auto cursor-pointer"
      id="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div 
        ref={contentRef}
        className="relative w-full max-w-2xl text-white liquid-glass rounded-3xl p-8 sm:p-10 md:p-12 overflow-hidden cursor-default"
        id="modal-content"
      >
        {/* Progress bar */}
        {!completedPlan && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
            <div 
              className="h-full bg-gradient-to-r from-white/40 via-white to-white/60 transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        )}

        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 p-2.5 rounded-full cursor-pointer hover:bg-white/10 text-white/70 hover:text-white transition-all z-50 bg-black/40 backdrop-blur-md border border-white/10 pointer-events-auto"
          id="close-modal-btn"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {isGenerating ? (
          /* Generate Engine screen */
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="relative mb-6">
              <Compass className="animate-spin text-white mb-2" size={48} strokeWidth={1} />
              <div className="absolute inset-0 bg-white/10 blur-xl rounded-full scale-150 animate-pulse" />
            </div>
            <h3 className="text-2xl font-light tracking-tight font-sans mb-3 text-white">
              Creating your custom guidance path...
            </h3>
            <p className="text-sm font-light text-white/50 max-w-sm mb-8">
              Combining scriptural depth with your chosen rhythm ({focusLevel === 1 ? 'Contemplation' : focusLevel === 5 ? 'Active walk' : 'Balanced fellowship'}).
            </p>
            <div className="w-full max-w-md h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-100 ease-out"
                style={{ width: `${generationProgress}%` }}
              />
            </div>
            <div className="text-xs font-mono text-white/40 mt-3">
              {generationProgress}% SECURE NETWORK CONNECTION ESTABLISHED
            </div>
          </div>
        ) : completedPlan ? (
          /* Success visual generation */
          <div className="py-6 transition-all duration-500">
            <div className="flex items-center gap-3 mb-6 text-white text-xs tracking-widest font-mono">
              <Sparkles className="text-white fill-white/10" size={14} />
              <span>GUIDE SUCCESSFULLY GENERATED</span>
            </div>

            <h3 className="text-3xl font-light font-sans tracking-tight leading-tight mb-2 text-white">
              Hello, <span className="font-medium underline decoration-white/30">{userName}</span>.<br />
              Your spiritual roadmap is ready.
            </h3>

            <p className="text-white/60 font-light text-sm mb-6 max-w-lg leading-relaxed">
              We have generated a custom {durationWeeks}-week roadmap focusing on <span className="text-white font-medium">{currentPillar?.title}</span>. It has been secured and sent to <span className="text-white font-medium">{userEmail}</span>.
            </p>

            {/* Simulated Live Itinerary Outline */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 mb-8 text-left">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Chosen Focus</div>
                  <div className="text-[15px] font-medium mt-1">{currentPillar?.title}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono text-right">Rhythm Group</div>
                  <div className="text-[15px] font-medium text-white mt-1 text-right">
                    {focusLevel <= 2 ? 'Quiet Prayer & Word Meditation' : focusLevel >= 4 ? 'Church Integration & Activation' : 'Kingdom Study & Action'}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs font-semibold text-white/80">Week 1: Quiet Foundations</div>
                  <p className="text-xs text-white/50 mt-1">Establishing custom daily study time (15 mins) and key focus on: {currentPillar?.activities[0]}.</p>
                </div>
                <div>
                  <div className="text-xs font-semibold text-white/80">Weeks 2-{durationWeeks - 1}: Mentorship & Life Group</div>
                  <p className="text-xs text-white/50 mt-1">Connecting with scripture analysis and online fellowship resources. Focus on: {currentPillar?.activities[1]}.</p>
                </div>
                <div>
                  <div className="text-xs font-semibold text-white/80">Week {durationWeeks}: Action & Activation</div>
                  <p className="text-xs text-white/50 mt-1">Walking out Kingdom principles in daily interactions and spiritual breakthroughs.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-white/40 text-[10px] font-mono">
                <Shield size={12} />
                <span>SECURE END-TO-END NETWORK CONNECTION</span>
              </div>
              <button 
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-white text-black text-xs tracking-wider uppercase font-medium rounded-full cursor-pointer hover:scale-[1.03] active:scale-[0.97] transition-all"
                id="modal-finish-btn"
              >
                Close Portal
              </button>
            </div>
          </div>
        ) : (
          /* Step Flow Forms */
          <div>
            {/* Step Indicators */}
            <div className="flex items-center gap-2 mb-8 text-white/30 text-[10px] font-mono uppercase tracking-widest">
              <span>DESIGN ROADMAP</span>
              <span>/</span>
              <span className={step >= 1 ? 'text-white font-bold' : ''}>01 Focus</span>
              <span>/</span>
              <span className={step >= 2 ? 'text-white font-bold' : ''}>02 Rhythm</span>
              <span>/</span>
              <span className={step >= 3 ? 'text-white font-bold' : ''}>03 Duration</span>
              <span>/</span>
              <span className={step >= 4 ? 'text-white font-bold' : ''}>04 Finalize</span>
            </div>

            {/* STEP 1: FOCUS AREA */}
            {step === 1 && (
              <div>
                <h4 className="text-3xl font-light font-sans tracking-tight leading-tight mb-2 text-white">
                  Which focus speaks to you?
                </h4>
                <p className="text-sm font-light text-white/50 mb-6">
                  Select a spiritual pillar that matches your heart's desire right now.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2">
                  {pillars.map((pil) => {
                    const isSelected = selectedPillarId === pil.id;
                    return (
                      <button
                        key={pil.id}
                        onClick={() => setSelectedPillarId(pil.id)}
                        className={`text-left p-5 rounded-2xl cursor-pointer border transition-all duration-300 relative group ${
                          isSelected 
                            ? 'bg-white/10 border-white text-white' 
                            : 'bg-white/[0.01] border-white/10 text-white/60 hover:border-white/30 hover:bg-white/[0.03]'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-white/40 block font-mono">
                              {pil.category}
                            </span>
                            <span className="text-lg font-medium tracking-tight block text-white mt-1">
                              {pil.title}
                            </span>
                          </div>
                          {isSelected && (
                            <div className="p-1 rounded-full bg-white text-black">
                              <Check size={12} strokeWidth={3} />
                            </div>
                          )}
                        </div>
                        <p className={`text-xs font-light line-clamp-2 transition-colors ${
                          isSelected ? 'text-white/80' : 'text-white/40 group-hover:text-white/60'
                        }`}>
                          {pil.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: INTENSITY / FOCUS LEVEL */}
            {step === 2 && (
              <div>
                <h4 className="text-3xl font-light font-sans tracking-tight leading-tight mb-2 text-white">
                  Define your spiritual rhythm.
                </h4>
                <p className="text-sm font-light text-white/50 mb-10">
                  Select your current rhythm intensity (quiet meditation vs active study & activation).
                </p>

                <div className="py-8 px-4 bg-white/[0.02] border border-white/5 rounded-3xl relative">
                  <div className="flex justify-between text-xs font-mono tracking-widest text-white/40 mb-6">
                    <span>QUIET DEVOTION</span>
                    <span>BALANCED INSIGHTS</span>
                    <span>ACTIVE EMPOWERMENT</span>
                  </div>

                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    value={focusLevel} 
                    onChange={(e) => setFocusLevel(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-white"
                  />

                  <div className="mt-8 text-center">
                    <span className="text-[11px] font-mono tracking-[0.2em] text-white/40 uppercase block">Selected Level</span>
                    <span className="text-lg font-light tracking-wide text-white mt-1 block">
                      {focusLevel === 1 && 'Level 01 — Focused on quietness, solitude & devotion'}
                      {focusLevel === 2 && 'Level 02 — Weekly services & basic study reflection'}
                      {focusLevel === 3 && 'Level 03 — Balanced integration: study, prayer & active fellowship'}
                      {focusLevel === 4 && 'Level 04 — Active devotion walk & mentorship interactions'}
                      {focusLevel === 5 && 'Level 05 — Full integration: Kingdom School study, prayer cycles & mentorship'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: DURATION IN WEEKS */}
            {step === 3 && (
              <div>
                <h4 className="text-3xl font-light font-sans tracking-tight leading-tight mb-2 text-white">
                  How many weeks would you like to dedicate?
                </h4>
                <p className="text-sm font-light text-white/50 mb-8">
                  Commitment builds deep spiritual muscle. A dedicated cycle establishes lasting alignment.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6 justify-center py-6">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setDurationWeeks(w => Math.max(2, w - 1))}
                      className="w-12 h-12 rounded-full cursor-pointer bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center font-light text-xl select-none"
                    >
                      -
                    </button>
                    <div className="text-center min-w-[124px]">
                      <span className="text-5xl font-light font-sans tracking-tight display-block">{durationWeeks}</span>
                      <span className="text-[10px] font-mono tracking-[0.2em] text-white/40 block mt-1">WEEKS OF GUIDANCE</span>
                    </div>
                    <button 
                      onClick={() => setDurationWeeks(w => Math.min(12, w + 1))}
                      className="w-12 h-12 rounded-full cursor-pointer bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center font-light text-xl select-none"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl text-center text-xs font-light text-white/55 mt-4">
                  "A {durationWeeks}-week roadmap is perfect to firmly anchor yourself in divine truth and deep spiritual fellowship."
                </div>
              </div>
            )}

            {/* STEP 4: CONTACT */}
            {step === 4 && (
              <div>
                <h4 className="text-3xl font-light font-sans tracking-tight leading-tight mb-2 text-white">
                  Secure your road blueprint.
                </h4>
                <p className="text-sm font-light text-white/50 mb-6">
                  Your privacy is highly valued. We respect your security. No spam, end-to-end alignment.
                </p>

                <div className="space-y-4 max-w-md mx-auto">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs uppercase tracking-widest font-mono text-white/40">Your Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Alexis Thorne"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-white/60 focus:bg-white/10 outline-none rounded-xl px-4 py-3 placeholder-white/20 text-white text-sm transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-xs uppercase tracking-widest font-mono text-white/40">Secure Email Address</label>
                    <input 
                      type="email" 
                      placeholder="e.g. alexis@example.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-white/60 focus:bg-white/10 outline-none rounded-xl px-4 py-3 placeholder-white/20 text-white text-sm transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Nav Actions */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10">
              <button
                onClick={prevStep}
                disabled={step === 1}
                className={`flex items-center gap-1.5 text-xs uppercase tracking-widest font-medium transition-all ${
                  step === 1 
                    ? 'text-white/10 pointer-events-none' 
                    : 'text-white/60 hover:text-white cursor-pointer'
                }`}
                id="modal-back-btn"
              >
                <ArrowLeft size={14} /> Back
              </button>

              <button
                onClick={nextStep}
                disabled={step === 4 && (!userName.trim() || !userEmail.includes('@'))}
                className={`flex items-center gap-2 px-6 py-3 rounded-full cursor-pointer text-xs uppercase tracking-widest font-medium transition-all ${
                  step === 4 && (!userName.trim() || !userEmail.includes('@'))
                    ? 'bg-white/10 text-white/30 cursor-not-allowed'
                    : 'bg-white text-black hover:scale-[1.03] active:scale-[0.97]'
                }`}
                id="modal-next-btn"
              >
                {step === 4 ? 'Secure Roadmap' : 'Next'} <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
