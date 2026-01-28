import type { DailyRoutineItem } from '../types';

export const validateScheduleItem = (item: DailyRoutineItem, itemDate: Date): string | undefined => {
    const hours = itemDate.getHours();
    
    // Safety Rule 1: High Intensity Workout shouldn't be too late (Cortisol spike)
    if (item.type === 'workout') {
        if (hours >= 20) {
            return "Trening siłowy o tej porze może zaburzyć sen (zbyt wysoki kortyzol).";
        }
    }

    // Safety Rule 2: Meal timing relative to sleep (assuming sleep is around 22-23 typically, but here we check absolute time)
    // Ideally we check relative to sleep time, but for now let's use absolute thresholds or check against other items if passed.
    if (item.type === 'meal') {
        if (hours >= 21) {
            return "Jedzenie tuż przed snem zaburza wyrzut hormonu wzrostu.";
        }
    }

    // Safety Rule 3: Caffeine
    // If we had a caffeine item, we'd check it here. The block is just a marker.
    
    return item.warning; // Return existing warning if no new one
};
