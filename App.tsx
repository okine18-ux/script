import React, { useState, useEffect, useRef } from 'react';
import ScriptCard from './components/ScriptCard';
import DeviceModal from './components/DeviceModal';
import ProgressModal from './components/ProgressModal';
import Locker from './components/Locker';
import { SCRIPTS } from './constants';
import { DeviceType, ModalType, VerificationState } from './types';

const App: React.FC = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [lockerOpen, setLockerOpen] = useState(false);
  
  const [currentScriptId, setCurrentScriptId] = useState<string>('');
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>(null);
  
  const [progress, setProgress] = useState(0);
  const [verificationState, setVerificationState] = useState<VerificationState>('idle');
  
  const progressIntervalRef = useRef<number | null>(null);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light-mode');
      document.body.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
      document.body.classList.remove('light-mode');
    }
  }, [isLightMode]);

  const handleDownload = (id: string) => {
    // Trigger AdBleuMedia content locker
    if (typeof window._wg === 'function') {
      window._wg();
    }

    setCurrentScriptId(id);
    setActiveModal('device');
  };

  const confirmDevice = () => {
    if (!selectedDevice) {
      alert('Please select a device');
      return;
    }
    setActiveModal('progress');
    startProgress();
  };

  const startProgress = () => {
    setProgress(0);
    setVerificationState('idle');
    
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    const totalTime = 8000;
    const updateInterval = 100;
    const steps = totalTime / updateInterval;
    const progressPerStep = 100 / steps;
    
    let currentProgress = 0;

    progressIntervalRef.current = window.setInterval(() => {
      currentProgress += progressPerStep;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      }
      
      setProgress(currentProgress);
    }, updateInterval);
  };

  const handleVerify = () => {
    if (verificationState !== 'idle') return;
    
    setVerificationState('loading');
    
    // Simulate verification delay
    setTimeout(() => {
      setVerificationState('verified');
      
      setTimeout(() => {
        setActiveModal(null);
        setLockerOpen(true);
      }, 150);
    }, 2500);
  };

  const handleCloseLocker = () => {
    setLockerOpen(false);
    setCurrentScriptId('');
  };

  const currentScript = SCRIPTS.find(s => s.id === currentScriptId);

  return (
    <>
      <div className={`min-h-screen ${isLightMode ? 'text-gray-800' : 'text-white'}`}>
        
        {/* Header */}
        <header className="bg-card py-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)] sticky top-0 z-[100] border-b border-border transition-colors duration-300">
          <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-2 text-[26px] font-extrabold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
              <i className="fas fa-cube text-transparent bg-gradient-to-br from-primary to-accent bg-clip-text"></i>
              Gamlob
            </div>
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 bg-primary/10 border-[2px] border-border rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 text-primary text-[20px] hover:bg-primary/20 hover:border-primary hover:scale-105"
                onClick={toggleTheme}
              >
                <i className={`fas ${isLightMode ? 'fa-moon' : 'fa-sun'}`}></i>
              </div>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="py-10 pb-20">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(420px,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(420px,1fr))] gap-6 max-w-full">
              {SCRIPTS.map(script => (
                <ScriptCard 
                  key={script.id} 
                  item={script} 
                  onDownload={handleDownload}
                  isLightMode={isLightMode}
                />
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-card py-8 border-t border-border text-center">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex justify-center gap-5 mb-3">
              <a href="#" className="text-text-light no-underline text-[13px] transition-colors duration-300 hover:text-primary">Privacy</a>
              <a href="#" className="text-text-light no-underline text-[13px] transition-colors duration-300 hover:text-primary">Terms</a>
              <a href="#" className="text-text-light no-underline text-[13px] transition-colors duration-300 hover:text-primary">Contact</a>
              <a href="#" className="text-text-light no-underline text-[13px] transition-colors duration-300 hover:text-primary">FAQ</a>
            </div>
            <div className="text-text-light text-[12px]">
              © 2025 Gamlob. Not affiliated with Roblox.
            </div>
          </div>
        </footer>
      </div>

      {/* Modals */}
      <DeviceModal 
        isOpen={activeModal === 'device'}
        onClose={() => setActiveModal(null)}
        onConfirm={confirmDevice}
        selectedDevice={selectedDevice}
        onSelectDevice={setSelectedDevice}
      />

      <ProgressModal 
        isOpen={activeModal === 'progress'}
        onClose={() => setActiveModal(null)}
        progress={progress}
        verificationState={verificationState}
        onVerify={handleVerify}
      />

      <Locker 
        isOpen={lockerOpen}
        onClose={handleCloseLocker}
        url={currentScript?.link || ''}
      />
    </>
  );
};

export default App;