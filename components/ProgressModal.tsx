import React from 'react';
import { VerificationState } from '../types';

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: number;
  verificationState: VerificationState;
  onVerify: () => void;
}

const ProgressModal: React.FC<ProgressModalProps> = ({ 
  isOpen, 
  onClose, 
  progress, 
  verificationState, 
  onVerify 
}) => {
  if (!isOpen) return null;

  const showVerify = progress >= 100;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-[4px] z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      <div 
        className="bg-card rounded-[24px] p-9 max-w-[460px] w-[90%] shadow-[0_20px_60px_rgba(0,0,0,0.3)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-[24px] font-bold text-center mb-2 bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
          Preparing Download
        </h3>
        <p className="text-center text-text-light text-[13px] mb-6">
          Please wait...
        </p>

        {!showVerify ? (
          <div className="my-7">
            <div className="text-center text-[28px] font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-4">
              {Math.round(progress)}%
            </div>
            <div className="h-[10px] bg-primary/10 rounded-[10px] overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="my-7 text-center animate-fade-in">
            <div 
              className="inline-flex items-center gap-3 bg-primary/5 border-[2px] border-border rounded-[14px] px-6 py-[14px] cursor-pointer transition-all duration-300 hover:bg-primary/10 hover:border-primary"
              onClick={onVerify}
            >
              <div 
                className={`
                  w-7 h-7 border-[2px] rounded-md flex items-center justify-center transition-all duration-300 relative
                  ${verificationState === 'idle' ? 'border-primary' : ''}
                  ${verificationState === 'loading' ? 'border-primary' : ''}
                  ${verificationState === 'verified' ? 'bg-success border-success' : ''}
                `}
              >
                {verificationState === 'loading' && (
                  <div className="w-4 h-4 border-2 border-transparent border-t-primary rounded-full animate-spin"></div>
                )}
                {verificationState === 'verified' && (
                  <i className="fas fa-check text-white text-[14px] font-black"></i>
                )}
              </div>
              <span className="font-medium text-text text-[15px]">I'm not a robot</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressModal;
