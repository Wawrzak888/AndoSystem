import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Check, Info, AlertTriangle, Calendar, Dumbbell } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { WEEKLY_WORKOUT_PLAN } from '../data/scientificProtocols';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale'; // WEEKLY_WORKOUT_PLAN uses English day names
import WorkoutWeeklyView from './WorkoutWeeklyView';

export const DayTimeline: React.FC = () => {
  const { routineItems, toggleRoutineItem } = useStore();
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');

  // Find today's workout
  const todayName = format(new Date(), 'EEEE', { locale: enUS });
  const todayWorkout = WEEKLY_WORKOUT_PLAN.find(w => w.day === todayName);

  if (viewMode === 'week') {
      return (
          <div className="space-y-4 p-4 pb-24">
              <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-medical-navy">Plan Treningowy</h2>
                  <button 
                      onClick={() => setViewMode('day')}
                      className="text-sm text-medical-gold font-medium px-3 py-1 bg-yellow-50 rounded-full"
                  >
                      Wróć do Dnia
                  </button>
              </div>
              <WorkoutWeeklyView />
          </div>
      );
  }

  return (
    <div className="space-y-4 p-4 pb-24">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-medical-navy">Harmonogram Dnia</h2>
          <button 
              onClick={() => setViewMode('week')}
              className="flex items-center gap-1 text-sm text-medical-navy/70 font-medium px-3 py-1 bg-gray-100 rounded-full"
          >
              <Calendar size={14} />
              Plan Tygodnia
          </button>
      </div>

      <div className="relative border-l-2 border-medical-steel/20 ml-3 space-y-8">
        {routineItems.map((item) => (
          <div key={item.id} className="relative pl-8">
            {/* Timeline Dot */}
            <div 
              className={twMerge(
                "absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 transition-colors",
                item.isCompleted 
                  ? "bg-medical-gold border-medical-gold" 
                  : "bg-medical-bg border-medical-steel"
              )}
            />
            
            {/* Time Label */}
            <span className="text-sm font-medium text-medical-steel block mb-1">
              {item.actualTime}
            </span>

            {/* Special Rendering for Workout Item */}
            {item.id === 'daily_workout' && todayWorkout ? (
                <div 
                  className={twMerge(
                    "bg-gradient-to-br from-indigo-50 to-white p-4 rounded-xl shadow-sm border border-indigo-100 transition-all cursor-pointer",
                    item.isCompleted && "opacity-70 grayscale"
                  )}
                  onClick={() => toggleRoutineItem(item.id)}
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                            <Dumbbell className="text-indigo-600 w-5 h-5" />
                            <h3 className="font-bold text-indigo-900">{todayWorkout.focus}</h3>
                        </div>
                         <div className={twMerge(
                            "h-6 w-6 rounded-full border flex items-center justify-center transition-colors",
                            item.isCompleted ? "bg-medical-gold border-medical-gold text-white" : "border-indigo-200 text-transparent"
                          )}>
                            <Check size={14} strokeWidth={3} />
                          </div>
                    </div>
                    <div className="text-sm text-indigo-800 font-medium mb-1">
                        {todayWorkout.type}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                        {todayWorkout.protocol}
                    </p>
                </div>
            ) : (
                /* Standard Card */
                <div 
                  className={twMerge(
                    "bg-white p-4 rounded-xl shadow-sm border transition-all cursor-pointer",
                    item.isCompleted ? "border-medical-gold/50 bg-yellow-50/10" : "border-gray-100",
                    "active:scale-[0.98]"
                  )}
                  onClick={() => toggleRoutineItem(item.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={twMerge(
                        "font-semibold text-lg text-medical-navy",
                        item.isCompleted && "line-through opacity-70"
                      )}>
                        {item.title}
                      </h3>
                      {item.warning && (
                        <div className="flex items-center gap-1 text-amber-600 text-xs mt-1">
                          <AlertTriangle size={12} />
                          <span>{item.warning}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className={twMerge(
                      "h-6 w-6 rounded-full border flex items-center justify-center transition-colors",
                      item.isCompleted ? "bg-medical-gold border-medical-gold text-white" : "border-gray-300 text-transparent"
                    )}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                  </div>

                  {/* Context Info */}
                   <div className="mt-3 text-xs text-medical-steel flex items-start gap-1 bg-gray-50 p-2 rounded">
                     <Info size={14} className="shrink-0 mt-0.5" />
                     <p>{item.scientificContext}</p>
                   </div>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
