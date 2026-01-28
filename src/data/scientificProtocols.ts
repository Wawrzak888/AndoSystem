import type { DailyRoutineItem } from '../types';

/**
 * DEFINICJE TYPÓW DANYCH
 * To mówi aplikacji, jak wyglądają dane medyczne.
 */

export interface Supplement {
  id: string;
  name: string;
  dosage: string;
  timing: 'morning' | 'lunch' | 'evening' | 'bedtime';
  requiresFood: boolean;
  cycleLogic?: {
    daysOn: number;
    daysOff: number;
    description: string;
  };
  warning?: string; // Np. interakcje
  scientificNote: string; // Wyjaśnienie "Dlaczego?"
}

export interface RoutineHabit {
  id: string;
  title: string;
  category: 'light' | 'movement' | 'mindset' | 'diet';
  offsetMinutesFromWake: number; // Ile minut po przebudzeniu
  durationMinutes: number;
  description: string;
}

export interface WorkoutType {
  day: string; // Mon, Tue, etc.
  type: 'Resistance' | 'LISS' | 'Recovery' | 'HIIT';
  focus: string;
  protocol: string;
}

/**
 * BAZA DANYCH PROTOKOŁU "SYSTEM 60+"
 * Tutaj znajdują się konkretne zalecenia wypracowane przez nasz panel.
 */

export const SUPPLEMENTS_DATA: Supplement[] = [
  // --- PORANEK ---
  {
    id: 's_d3',
    name: 'Witamina D3 + K2MK7',
    dosage: '5000 IU + 100mcg',
    timing: 'morning',
    requiresFood: true,
    scientificNote: 'Kluczowa dla receptorów androgennych i odporności.',
  },
  {
    id: 's_citrulline',
    name: 'L-Cytrulina',
    dosage: '3-6 g',
    timing: 'morning',
    requiresFood: false,
    scientificNote: 'Zwiększa tlenek azotu (NO), poprawia przepływ krwi i dotlenienie tkanek.',
  },
  {
    id: 's_q10',
    name: 'Ubichinol (Koenzym Q10)',
    dosage: '100-200 mg',
    timing: 'morning',
    requiresFood: true,
    scientificNote: 'Paliwo dla mitochondriów. Chroni serce i poprawia energię.',
  },
  
  // --- OBIAD (Południe) ---
  {
    id: 's_boron',
    name: 'Bor (Boran Sodu)',
    dosage: '6-10 mg',
    timing: 'lunch',
    requiresFood: true,
    cycleLogic: {
      daysOn: 14,
      daysOff: 7,
      description: '2 tyg. stosowania / 1 tydz. przerwy'
    },
    scientificNote: 'Obniża SHBG, uwalniając więcej testosteronu wolnego.',
  },
  {
    id: 's_zinc',
    name: 'Cynk (Pikolinian)',
    dosage: '15-30 mg',
    timing: 'lunch',
    requiresFood: true,
    scientificNote: 'Niezbędny do produkcji testosteronu i ochrony prostaty.',
  },
  {
    id: 's_omega',
    name: 'Omega-3 (EPA/DHA)',
    dosage: '2000 mg',
    timing: 'lunch',
    requiresFood: true,
    scientificNote: 'Redukuje stan zapalny, który blokuje oś hormonalną.',
  },

  // --- WIECZÓR / SEN ---
  {
    id: 's_magnesium',
    name: 'Magnez (Jabłczan/Bisglicynian)',
    dosage: '400 mg jonów',
    timing: 'evening',
    requiresFood: false,
    scientificNote: 'Wycisza układ nerwowy, poprawia jakość snu głębokiego.',
  },
  {
    id: 's_ashwa',
    name: 'Ashwagandha (KSM-66)',
    dosage: '600 mg',
    timing: 'evening',
    requiresFood: false,
    scientificNote: 'Obniża kortyzol, poprawia regenerację nocną.',
  },
  {
    id: 's_nettle',
    name: 'Ekstrakt z Korzenia Pokrzywy',
    dosage: '500 mg',
    timing: 'evening',
    requiresFood: false,
    scientificNote: 'Zapobiega wiązaniu testosteronu przez SHBG oraz chroni prostatę.',
  },
  {
    id: 's_alpha_gpc',
    name: 'Alpha-GPC / Cholina',
    dosage: '300 mg',
    timing: 'evening',
    requiresFood: false,
    scientificNote: 'Wsparcie neuroplastyczności i regeneracji mózgu.',
  }
];

export const DAILY_ROUTINE_TEMPLATE: RoutineHabit[] = [
  {
    id: 'h_light',
    title: 'Ekspozycja na światło dzienne',
    category: 'light',
    offsetMinutesFromWake: 0,
    durationMinutes: 15,
    description: 'Wyjdź na zewnątrz lub stań w oknie. Resetuje zegar biologiczny i kortyzol.',
  },
  {
    id: 'h_water',
    title: 'Nawodnienie + Sól Kłodawska',
    category: 'diet',
    offsetMinutesFromWake: 5,
    durationMinutes: 2,
    description: '500ml wody + szczypta soli. Uruchamia nadnercza.',
  },
  {
    id: 'h_caffeine_cut',
    title: 'Koniec okna kofeinowego',
    category: 'diet',
    offsetMinutesFromWake: 600, // 10 godzin po wstaniu
    durationMinutes: 0,
    description: 'Ostatnia kawa. Później kofeina zaburzy sen głęboki.',
  },
  {
    id: 'h_blue_block',
    title: 'Blokada Światła Niebieskiego',
    category: 'light',
    offsetMinutesFromWake: 780, // 13 godzin po wstaniu
    durationMinutes: 120,
    description: 'Załóż okulary blokujące blue-light lub włącz tryb nocny w ekranach.',
  },
  {
    id: 'h_breath',
    title: 'Box Breathing (Oddech Pudełkowy)',
    category: 'mindset',
    offsetMinutesFromWake: 840, // Tuż przed snem
    durationMinutes: 5,
    description: 'Wdech 4s - Zatrzymaj 4s - Wydech 4s - Zatrzymaj 4s. Obniża tętno.',
  }
];

export const WEEKLY_WORKOUT_PLAN: WorkoutType[] = [
  { day: 'Monday', type: 'Resistance', focus: 'Siła Ogólna', protocol: '3 serie x 8 powtórzeń (75% max). Wielostawy.' },
  { day: 'Tuesday', type: 'LISS', focus: 'Cardio Tlenowe', protocol: 'Spacer 45-60 min. Tempo konwersacyjne.' },
  { day: 'Wednesday', type: 'Resistance', focus: 'Siła Ogólna', protocol: '3 serie x 8 powtórzeń (75% max).' },
  { day: 'Thursday', type: 'Recovery', focus: 'Regeneracja', protocol: 'Sauna, rozciąganie lub kąpiel w soli Epsom.' },
  { day: 'Friday', type: 'Resistance', focus: 'Siła Ogólna', protocol: '3 serie x 8 powtórzeń (75% max).' },
  { day: 'Saturday', type: 'LISS', focus: 'Cardio Tlenowe', protocol: 'Aktywność w terenie, rower lub spacer.' },
  { day: 'Sunday', type: 'Recovery', focus: 'Regeneracja', protocol: 'Pełny odpoczynek OUN (Ośrodkowego Układu Nerwowego).' },
];

/**
 * LOGIKA ZDROWIA (Safety Logic)
 */
export const checkScheduleSafety = (wakeTime: string, workoutTime: string): string | null => {
    // Placeholder - implementacja w utils/SafetyCheck.ts
    // Use variables to avoid linter unused error
    if (!wakeTime || !workoutTime) return null;
    return null; 
};


// ADAPTER DLA APLIKACJI
// Konwertujemy nowe dane na format używany przez Store

export const DEFAULT_ROUTINE: Omit<DailyRoutineItem, 'isCompleted' | 'actualTime'>[] = [
    ...DAILY_ROUTINE_TEMPLATE.map(h => ({
        id: h.id,
        title: h.title,
        type: 'habit' as const,
        baseOffsetMinutes: h.offsetMinutesFromWake,
        scientificContext: h.description
    })),
    // Placeholder for Daily Workout - details will be filled by UI based on day of week
    {
        id: 'daily_workout',
        title: 'Trening / Aktywność Fizyczna',
        type: 'workout' as const,
        baseOffsetMinutes: 540, // 9 hours after wake (e.g., 16:00 if wake 7:00) - adjustable
        scientificContext: 'Ruch jest kluczowy dla wrażliwości insulinowej i testosteronu.'
    },
    ...SUPPLEMENTS_DATA.map(s => {
        let offset = 30; // morning default
        if (s.timing === 'lunch') offset = 360; // 6h (e.g. 13:00 if wake 7:00)
        if (s.timing === 'evening') offset = 660; // 11h (e.g. 18:00)
        if (s.timing === 'bedtime') offset = 900; // 15h (e.g. 22:00)

        return {
            id: s.id,
            title: `${s.name} (${s.dosage})`,
            type: 'supplement' as const,
            baseOffsetMinutes: offset,
            scientificContext: s.scientificNote,
            warning: s.requiresFood ? 'Wymaga posiłku' : undefined,
            cycleActive: !!s.cycleLogic
        };
    })
].sort((a, b) => a.baseOffsetMinutes - b.baseOffsetMinutes);

export const BORON_CYCLE_DAYS = 14;
export const BORON_OFF_DAYS = 7;
