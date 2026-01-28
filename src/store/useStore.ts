import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DailyRoutineItem, UserProfile, DailyLog } from '../types';
import { DEFAULT_ROUTINE } from '../data/scientificProtocols';
import { addMinutes, format, startOfToday } from 'date-fns';
import { validateScheduleItem } from '../utils/SafetyCheck';

interface AppState {
  userProfile: UserProfile;
  routineItems: DailyRoutineItem[];
  logs: DailyLog[];
  lastActiveDate: string | null;

  // Actions
  setWakeUpTime: (time: string) => void;
  toggleRoutineItem: (id: string) => void;
  checkDailyReset: () => void;
  addLog: (log: DailyLog) => void;
  recalculateSchedule: () => void;
}

const calculateTimes = (wakeUpTimeStr: string, items: DailyRoutineItem[]) => {
    const today = startOfToday();
    // parse 'HH:mm' relative to today
    const [hours, minutes] = wakeUpTimeStr.split(':').map(Number);
    const wakeUpDate = new Date(today);
    wakeUpDate.setHours(hours, minutes, 0, 0);

    return items.map((item) => {
        const itemTime = addMinutes(wakeUpDate, item.baseOffsetMinutes);
        const warning = validateScheduleItem(item, itemTime);
        return {
            ...item,
            actualTime: format(itemTime, 'HH:mm'),
            warning: warning || item.warning // Prefer dynamic warning, fallback to static
        };
    });
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      userProfile: {
        name: 'User',
        wakeUpTime: '07:00',
        cycleDay: 1,
        supplementsCycle: {
          boronOn: true,
          tongkatOn: true,
        },
      },
      // Initialize with default items, mapped to include actualTime based on default 07:00
      routineItems: calculateTimes('07:00', DEFAULT_ROUTINE.map(item => ({ ...item, isCompleted: false }))),
      logs: [],
      lastActiveDate: null,

      setWakeUpTime: (time) => {
        set((state) => {
            const newProfile = { ...state.userProfile, wakeUpTime: time };
            const newItems = calculateTimes(time, state.routineItems);
            return {
                userProfile: newProfile,
                routineItems: newItems
            };
        });
      },

      toggleRoutineItem: (id) => {
        set((state) => ({
          routineItems: state.routineItems.map((item) =>
            item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
          ),
        }));
      },

      checkDailyReset: () => {
          const { lastActiveDate } = get();
          const today = format(new Date(), 'yyyy-MM-dd');
          
          if (lastActiveDate !== today) {
              set((state) => ({
                  lastActiveDate: today,
                  routineItems: state.routineItems.map(item => ({ ...item, isCompleted: false })),
                  // Here we could also increment cycleDay logic
              }));
              get().recalculateSchedule(); 
          }
      },

      addLog: (log) => {
        set((state) => ({
          logs: [...state.logs, log],
        }));
      },

      recalculateSchedule: () => {
          const { userProfile, routineItems } = get();
          set({ routineItems: calculateTimes(userProfile.wakeUpTime, routineItems) });
      }
    }),
    {
      name: 'androsystem-storage',
    }
  )
);
