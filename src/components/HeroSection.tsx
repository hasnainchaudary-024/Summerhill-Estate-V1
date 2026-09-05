import React, { useState } from 'react';
import { Mountain, MapPin, Trees, Sparkles, Compass, ShieldCheck, Sun, Moon, CloudFog, Sunset } from 'lucide-react';
import { ProfileContent } from '../types';

interface HeroSectionProps {
  content: ProfileContent;
  isEditing: boolean;
  onUpdate: (updated: Partial<ProfileContent>) => void;
}

type MountainMood = 'mist' | 'emerald' | 'dusk' | 'night';

export const HeroSection: React.FC<HeroSectionProps> = ({
  content,
  isEditing,
  onUpdate,
}) => {
  const [activeMood, setActiveMood] = useState<MountainMood>('emerald');

  const moodBackgrounds: Record<MountainMood, { bg: string; overlay: string; label: string; icon: any }> = {
    mist: {
      bg: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=85',
      overlay: 'from-[#06140D] via-[#0D2418]/90 to-[#06140D]/80',
      label: 'Dawn Mist',
      icon: CloudFog,
    },
    emerald: {
      bg: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85',
      overlay: 'from-[#05130A] via-[#0A2617]/92 to-[#0B2C1A]/80',
      label: 'Vibrant Pine',
      icon: Sun,
    },
    dusk: {
      bg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85',
      overlay: 'from-[#09140E] via-[#1A2518]/90 to-[#2A1E14]/80',
      label: 'Golden Dusk',
      icon: Sunset,
    },
    night: {
      bg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85',
      overlay: 'from-[#030906] via-[#06140D]/95 to-[#040C07]/90',
      label: 'Starry Ridge',
      icon: Moon,
    },
  };

  const currentMood = moodBackgrounds[activeMood];

  return (
    <div className="relative bg-[#07170E] text-[#F4F8F5] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#1A3B28]">
      
      {/* Dynamic Background Image with Smooth Crossfade */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
        style={{
          backgroundImage: `url('${currentMood.bg}')`,
          filter: 'brightness(0.7) contrast(1.15) saturate(1.25)',
        }}
      />

      {/* Atmospheric Pine Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${currentMood.overlay} transition-all duration-1000`} />

      {/* Subtle Gold Dust Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center z-10">
        
        {/* Luxury Pine Crest & Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D2418]/90 border border-[#D4AF37]/45 text-[#F3D993] text-[11px] font-mono tracking-widest uppercase mb-6 shadow-md backdrop-blur-xs">
          <Trees className="w-3.5 h-3.5 text-[#34D399]" />
          {isEditing ? (
            <input
              type="text"
              value={content.tagline}
              onChange={(e) => onUpdate({ tagline: e.target.value })}
              className="bg-transparent border-b border-[#D4AF37] text-[#FFFFFF] focus:outline-none px-1 py-0.5"
              placeholder="Enter brief tagline..."
            />
          ) : (
            <span className="font-semibold">{content.tagline || 'Himalayan Pine Mountain Monograph & Luxury Sanctuary'}</span>
          )}
        </div>

        {/* Main Title with Luxury Serif Styling */}
        {isEditing ? (
          <div className="mb-5">
            <label className="text-xs text-[#D4AF37] font-mono block mb-1">Heading Title:</label>
            <input
              type="text"
              value={content.welcomeHeading}
              onChange={(e) => onUpdate({ welcomeHeading: e.target.value })}
              className="w-full text-center text-3xl sm:text-5xl font-serif font-bold text-[#FFFFFF] bg-[#0E2419] border border-[#234A33] rounded-2xl p-3 focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
              placeholder="e.g. Welcome to Kuzagali"
            />
          </div>
        ) : (
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-[#FFFFFF] tracking-tight leading-[1.08] mb-6">
            {content.welcomeHeading || 'Kuzagali'}
            <span className="block text-2xl sm:text-3xl md:text-4xl font-light italic font-editorial text-[#E4D1A0] mt-2">
              The Alpine Pine Sanctuary
            </span>
          </h1>
        )}

        {/* Subtitle / Intro Paragraph */}
        {isEditing ? (
          <div className="mb-6">
            <label className="text-xs text-[#D4AF37] font-mono block mb-1">Introduction Paragraph:</label>
            <textarea
              value={content.welcomeText}
              onChange={(e) => onUpdate({ welcomeText: e.target.value })}
              rows={3}
              className="w-full text-sm sm:text-base text-[#D3E5DA] bg-[#0E2419] border border-[#234A33] rounded-2xl p-4 focus:ring-2 focus:ring-[#D4AF37] focus:outline-none leading-relaxed font-sans"
              placeholder="Write a welcome introduction or description of the location..."
            />
          </div>
        ) : (
          <p className="text-base sm:text-xl text-[#CDE3D5] max-w-2xl mx-auto leading-relaxed mb-8 font-sans font-normal">
            {content.welcomeText || 'Nestled in the lush pine-forested slopes of the Galiyat range between Murree and Abbottabad, Kuzagali offers serene alpine vistas, crisp mountain air, and tranquil walking trails.'}
          </p>
        )}

        {/* Quick Attribute Pills in Gold & Emerald */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 text-xs text-[#E0EFE6] font-mono mb-8">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0D2418]/90 border border-[#D4AF37]/30 shadow-xs">
            <Mountain className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[#F3D993] font-bold">2,420 m (7,940 ft)</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0D2418]/90 border border-[#1E432E] shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-[#34D399]" />
            <span>Hazara Himalayan Belt</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0D2418]/90 border border-[#1E432E] shadow-xs">
            <Trees className="w-3.5 h-3.5 text-[#34D399]" />
            <span>Old-Growth Deodar & Blue Pine</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0D2418]/90 border border-[#1E432E] shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>99.4% Forest Air Purity</span>
          </div>
        </div>

        {/* Interactive Atmosphere Mood Switcher */}
        <div className="inline-flex items-center p-1 rounded-2xl bg-[#081810]/80 border border-[#1E432E] backdrop-blur-md">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#789D86] px-3 hidden sm:inline">
            Alpine Atmosphere:
          </span>
          <div className="flex items-center gap-1">
            {(Object.keys(moodBackgrounds) as MountainMood[]).map((moodKey) => {
              const item = moodBackgrounds[moodKey];
              const Icon = item.icon;
              const isSelected = activeMood === moodKey;
              return (
                <button
                  key={moodKey}
                  onClick={() => setActiveMood(moodKey)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#1B5233] to-[#246A44] text-[#F3D993] font-bold border border-[#D4AF37]/40 shadow-sm'
                      : 'text-[#9CB6A6] hover:text-white hover:bg-[#122E1F]'
                  }`}
                >
                  <Icon className={`w-3 h-3 ${isSelected ? 'text-[#F3D993]' : 'text-[#9CB6A6]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};


