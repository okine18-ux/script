import React from 'react';

interface LockerProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

const Locker: React.FC<LockerProps> = ({ isOpen, onClose, url }) => {
  // Use a class on body to prevent scrolling when locker is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('locker-open', 'overflow-hidden', 'h-[100dvh]');
    } else {
      document.body.classList.remove('locker-open', 'overflow-hidden', 'h-[100dvh]');
    }
    return () => {
      document.body.classList.remove('locker-open', 'overflow-hidden', 'h-[100dvh]');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full h-[100dvh] bg-black/98 z-[100000] animate-fade-in overflow-hidden touch-none">
      <button 
        className="fixed top-[calc(env(safe-area-inset-top,0px)+20px)] right-[calc(env(safe-area-inset-right,0px)+20px)] bg-transparent border-none text-white text-[46px] font-light cursor-pointer z-[100001] transition-all duration-300 leading-none hover:text-[#ff4444] hover:scale-115"
        onClick={onClose}
      >
        ×
      </button>
      <iframe 
        src={url} 
        className="w-full h-full border-none block"
        loading="eager"
        title="Verification Locker"
      />
    </div>
  );
};

export default Locker;
