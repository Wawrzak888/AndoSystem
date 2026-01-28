import React from 'react';
import { Activity, Dumbbell, Heart, BedDouble, Calendar } from 'lucide-react';
import { WEEKLY_WORKOUT_PLAN, type WorkoutType } from '../data/scientificProtocols';

const WorkoutWeeklyView: React.FC = () => {
    const getIcon = (type: WorkoutType['type']) => {
        switch (type) {
            case 'Resistance': return <Dumbbell className="w-5 h-5 text-indigo-600" />;
            case 'LISS': return <Heart className="w-5 h-5 text-rose-500" />;
            case 'HIIT': return <Activity className="w-5 h-5 text-orange-500" />;
            case 'Recovery': return <BedDouble className="w-5 h-5 text-emerald-500" />;
            default: return <Activity className="w-5 h-5" />;
        }
    };

    const getBgColor = (type: WorkoutType['type']) => {
        switch (type) {
            case 'Resistance': return 'bg-indigo-50 border-indigo-200';
            case 'LISS': return 'bg-rose-50 border-rose-200';
            case 'HIIT': return 'bg-orange-50 border-orange-200';
            case 'Recovery': return 'bg-emerald-50 border-emerald-200';
            default: return 'bg-gray-50';
        }
    };

    const dayMap: Record<string, string> = {
        'Monday': 'Poniedziałek',
        'Tuesday': 'Wtorek',
        'Wednesday': 'Środa',
        'Thursday': 'Czwartek',
        'Friday': 'Piątek',
        'Saturday': 'Sobota',
        'Sunday': 'Niedziela'
    };

    return (
        <div className="space-y-4 animate-fade-in pb-20">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-slate-500" />
                    <h2 className="text-lg font-bold text-slate-800">Tygodniowy Plan Treningowy</h2>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                    Poniżej znajduje się Twój cykl treningowy dostosowany do optymalizacji hormonalnej.
                </p>

                <div className="space-y-3">
                    {WEEKLY_WORKOUT_PLAN.map((workout, idx) => (
                        <div key={idx} className={`p-3 rounded-lg border ${getBgColor(workout.type)} transition-all hover:shadow-md`}>
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-slate-700 w-24">
                                        {dayMap[workout.day] || workout.day}
                                    </span>
                                    {getIcon(workout.type)}
                                </div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 px-2 py-1 bg-white/60 rounded-full">
                                    {workout.type}
                                </span>
                            </div>
                            
                            <div className="mt-2 pl-26 md:pl-0">
                                <h3 className="font-semibold text-slate-800">{workout.focus}</h3>
                                <p className="text-sm text-slate-600 mt-1">{workout.protocol}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800">
                <strong>Wskazówka:</strong> Trening oporowy (Resistance) wykonuj z ciężarem 75% max, skupiając się na technice. LISS to spacer lub lekki rower, przy którym możesz swobodnie rozmawiać.
            </div>
        </div>
    );
};

export default WorkoutWeeklyView;
