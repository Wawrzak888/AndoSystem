export interface DailyRoutineItem {
  id: string;
  title: string;
  type: 'supplement' | 'habit' | 'workout' | 'meal';
  baseOffsetMinutes: number; // czas od pobudki
  actualTime?: string; // np. "07:30", calculated
  isCompleted: boolean;
  scientificContext: string; // Wyjaśnienie
  warning?: string; // np. "Nie na czczo!"
  cycleActive?: boolean; // For cyclic supplements
}

export interface UserProfile {
  name: string;
  wakeUpTime: string; // "HH:MM"
  cycleDay: number; // Dzień cyklu 30-dniowego
  supplementsCycle: {
     boronOn: boolean;
     tongkatOn: boolean;
  }
}

export interface DailyLog {
    date: string; // ISO Date YYYY-MM-DD
    energyLevel: number; // 1-10
    libido: number; // 1-10
    sleepQuality: number; // 1-10
    weight: number;
}
