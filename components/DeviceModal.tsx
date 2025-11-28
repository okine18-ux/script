import React from 'react';
import { DeviceType } from '../types';
import { playClickSound } from '../utils';

interface DeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedDevice: DeviceType;
  onSelectDevice: (device: DeviceType) => void;
}

const DeviceModal: React.FC<DeviceModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  selectedDevice, 
  onSelectDevice 
}) => {
  if (!isOpen) return null;

  const handleSelect = (device: DeviceType) => {
    playClickSound();
    if (selectedDevice === device) {
      onSelectDevice(null);
    } else {
      onSelectDevice(device);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-[4px] z-[9999] flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-card rounded-[24px] p-9 max-w-[460px] w-[90%] shadow-[0_20px_60px_rgba(0,0,0,0.3)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute top-4 right-4 w-8 h-8 bg-primary/10 border-none rounded-lg text-text text-[18px] cursor-pointer transition-all duration-300 hover:bg-primary/20 hover:rotate-90 flex items-center justify-center"
          onClick={onClose}
        >
          ×
        </button>
        <h3 className="text-[24px] font-bold text-center mb-2 bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
          Select Your Device
        </h3>
        <p className="text-center text-text-light text-[13px] mb-6">
          Choose your platform
        </p>
        
        <div className="grid gap-[10px] mb-6">
          {[
            { id: 'android', name: 'Android', icon: 'fab fa-android' },
            { id: 'ios', name: 'iOS / iPhone', icon: 'fab fa-apple' },
            { id: 'windows', name: 'Windows PC', icon: 'fab fa-windows' }
          ].map((device) => {
            const isActive = selectedDevice === device.id;
            return (
              <div 
                key={device.id}
                className={`
                  flex items-center gap-[14px] p-4 border-[2px] rounded-[14px] cursor-pointer transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-br from-primary/15 to-accent/15 border-primary shadow-[0_4px_12px_rgba(139,92,246,0.2)]' 
                    : 'bg-primary/5 border-border hover:bg-primary/10 hover:border-primary-light'}
                `}
                onClick={() => handleSelect(device.id as DeviceType)}
              >
                <div className="w-[52px] h-[52px] rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[24px] text-white shrink-0">
                  <i className={device.icon}></i>
                </div>
                <div className="font-semibold text-[16px] text-text">
                  {device.name}
                </div>
              </div>
            );
          })}
        </div>

        <button 
          className="w-full p-[14px] bg-gradient-to-br from-primary to-accent border-none rounded-xl text-white font-bold text-[15px] cursor-pointer transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(139,92,246,0.4)]"
          onClick={onConfirm}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default DeviceModal;
