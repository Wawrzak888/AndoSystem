import { useState, useEffect } from 'react';
import { DayTimeline } from './components/DayTimeline';
import { Navigation } from './components/Navigation';
import { useStore } from './store/useStore';
import { Battery } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('schedule');
  const { userProfile, setWakeUpTime, checkDailyReset } = useStore();

  useEffect(() => {
    checkDailyReset();
  }, [checkDailyReset]);

  const renderContent = () => {
    switch (activeTab) {
      case 'schedule':
        return <DayTimeline />;
      case 'settings':
        return (
          <div className="p-4 space-y-6">
            <h2 className="text-xl font-bold text-medical-navy">Ustawienia</h2>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-medical-steel mb-2">
                Godzina pobudki (Anchor)
              </label>
              <input 
                type="time" 
                value={userProfile.wakeUpTime}
                onChange={(e) => setWakeUpTime(e.target.value)}
                className="w-full text-2xl font-bold text-medical-navy bg-gray-50 p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-medical-navy/20 outline-none"
              />
              <p className="text-xs text-medical-steel mt-2">
                Zmiana godziny pobudki automatycznie przeliczy cały harmonogram dnia.
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-medical-steel p-6 text-center">
            <h3 className="text-lg font-medium text-medical-navy mb-2">W budowie</h3>
            <p>Ta sekcja ({activeTab}) jest w trakcie implementacji.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-medical-bg text-medical-navy pb-20 font-sans">
      {/* Header */}
      <header className="bg-white px-4 py-4 sticky top-0 z-40 shadow-sm flex justify-between items-center">
        <div>
           <h1 className="text-xl font-bold tracking-tight">AndroSystem<span className="text-medical-gold">60+</span></h1>
           <p className="text-xs text-medical-steel">Witaj, {userProfile.name}</p>
        </div>
        <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-medical-navy/5 flex items-center justify-center">
                <Battery size={18} className="text-medical-navy" />
            </div>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        {renderContent()}
      </main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
