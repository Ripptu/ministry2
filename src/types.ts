export interface MinistryPillar {
  id: string;
  title: string;
  category: string;
  vibe: string;
  description: string;
  accentQuote: string;
  activities: string[];
}

export interface SpiritualPlan {
  pillarId: string;
  focusLevel: number; // 1 (Silence) to 5 (Active Community)
  durationWeeks: number;
  userName: string;
  userEmail: string;
  completed: boolean;
}

export type ActiveTab = 'VISION' | 'MEDIEN' | 'EVENTS' | 'COMMUNITY' | 'IMPRINT' | 'AGB' | 'PRIVACY' | null;
