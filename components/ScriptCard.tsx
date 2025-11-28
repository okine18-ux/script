import React from 'react';
import { ScriptItem } from '../types';

interface ScriptCardProps {
  item: ScriptItem;
  onDownload: (id: string) => void;
  isLightMode: boolean;
}

const ScriptCard: React.FC<ScriptCardProps> = ({ item, onDownload, isLightMode }) => {
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'hot': return 'bg-[#ec4899]/90 text-white';
      case 'new': return 'bg-[#3b82f6]/90 text-white';
      case 'pro': return 'bg-[#8b5cf6]/90 text-white';
      case 'top': return 'bg-[#10b981]/90 text-white';
      default: return 'bg-gray-500/90 text-white';
    }
  };

  const imageWrapperBg = isLightMode 
    ? 'bg-gradient-to-br from-[#f3e8ff] to-[#fae8ff]' 
    : 'bg-gradient-to-br from-[#8b5cf6]/20 to-[#ec4899]/20';

  return (
    <div 
      className="group bg-card rounded-[20px] overflow-hidden cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2 !border-none !shadow-[0_4px_20px_rgba(139,92,246,0.08)]"
      onClick={() => onDownload(item.id)}
    >
      <div className={`relative w-full h-[200px] overflow-hidden ${imageWrapperBg}`}>
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className={`w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 ${item.id === '99-nights' ? 'object-center' : 'object-center'}`} 
        />
        {item.badges.map((badge, idx) => (
          <div 
            key={idx} 
            className={`absolute top-4 right-4 px-[14px] py-[6px] rounded-[20px] text-[11px] font-bold uppercase tracking-[0.5px] backdrop-blur-[10px] z-[2] ${getBadgeColor(badge.type)}`}
          >
            {badge.text}
          </div>
        ))}
      </div>

      <div className="p-6 !border-l !border-r !border-b !border-primary-light !border-t-0 !rounded-b-[20px] !shadow-[0_20px_40px_rgba(139,92,246,0.15)] bg-card">
        <div className="flex items-center gap-[14px] mb-[14px]">
          <div className="w-14 h-14 rounded-[14px] bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[26px] text-white shrink-0 shadow-[0_8px_16px_rgba(139,92,246,0.25)] overflow-hidden">
             <img src={item.iconUrl} alt={`${item.title} Icon`} className="w-full h-full object-cover" />
          </div>
          <div className="text-[22px] font-bold text-text leading-[1.2]">
            {item.title}
          </div>
        </div>

        <p className="text-text-light text-[13px] leading-[1.6] mb-4">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-[6px] mb-4">
          {item.tags.map((tag, idx) => (
            <span 
              key={idx} 
              className={`px-[10px] py-[5px] rounded-[6px] text-[11px] font-semibold ${isLightMode ? 'bg-[#f3f4f6] text-text-light' : 'bg-primary/10 text-primary'}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-around py-4 border-t border-b border-border mb-4">
          <div className="text-center">
            <span className="block text-[18px] font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
              {item.stats.rating}
            </span>
            <span className="text-[10px] text-text-light uppercase font-semibold">Rating</span>
          </div>
          <div className="text-center">
            <span className="block text-[18px] font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
              {item.stats.users}
            </span>
            <span className="text-[10px] text-text-light uppercase font-semibold">Users</span>
          </div>
          <div className="text-center">
            <span className="block text-[18px] font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
              {item.stats.size}
            </span>
            <span className="text-[10px] text-text-light uppercase font-semibold">Size</span>
          </div>
        </div>

        <button 
          className="w-full p-[14px] bg-gradient-to-br from-primary to-accent border-none rounded-xl text-white font-bold text-[14px] cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(139,92,246,0.3)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(139,92,246,0.4)] animate-dlFloat hover:paused"
          style={{ animationPlayState: 'running' }}
          onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
        >
          <i className="fas fa-download"></i>
          {item.id === 'delta' ? 'Download Now' : 'Download Script'}
        </button>
      </div>
    </div>
  );
};

export default ScriptCard;
