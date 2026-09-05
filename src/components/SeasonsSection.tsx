import React from 'react';
import { Calendar, Plus, Trash2, Thermometer, Sparkles, Snowflake, Sun, CloudRain, Wind, Trees } from 'lucide-react';
import { SeasonGuide } from '../types';

interface SeasonsSectionProps {
  seasons: SeasonGuide[];
  isEditing: boolean;
  onUpdate: (updated: SeasonGuide[]) => void;
}

export const SeasonsSection: React.FC<SeasonsSectionProps> = ({
  seasons,
  isEditing,
  onUpdate,
}) => {
  const handleAddSeason = () => {
    const newSeason: SeasonGuide = {
      id: `sea-${Date.now()}`,
      season: 'Alpine Season Period',
      months: 'Months',
      temperatureRange: '12°C - 22°C',
      highlights: 'Highlights of this time of year in the pine valleys...',
      tips: 'Luxury packing and mountain road advisory...',
    };
    onUpdate([...seasons, newSeason]);
  };

  const handleUpdateSeason = (id: string, field: keyof SeasonGuide, val: string) => {
    const updated = seasons.map((s) => (s.id === id ? { ...s, [field]: val } : s));
    onUpdate(updated);
  };

  const handleRemoveSeason = (id: string) => {
    onUpdate(seasons.filter((s) => s.id !== id));
  };

  const getSeasonIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('winter') || lower.includes('snow')) return Snowflake;
    if (lower.includes('spring') || lower.includes('bloom')) return Wind;
    if (lower.includes('monsoon') || lower.includes('rain') || lower.includes('summer')) return CloudRain;
    if (lower.includes('autumn') || lower.includes('fall')) return Trees;
    return Sun;
  };

  return (
    <section id="seasons" className="py-16 sm:py-20 bg-[#EEF5F0] border-b border-[#D6E3DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#D6E3DB]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#167041] uppercase tracking-widest mb-2">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>[ CHAPTER IV • CLIMATIC CHRONICLES & SEASONS ]</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1E13] tracking-tight">
              Seasonal Guide for Kuzagali
            </h2>
            <p className="text-xs sm:text-sm text-[#3E5C4B] mt-1.5 font-sans">
              Year-round weather patterns, temperature rhythms, and travel advisories in the Galiyat pine belt.
            </p>
          </div>

          {isEditing && (
            <button
              onClick={handleAddSeason}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold text-[#FFFFFF] bg-gradient-to-r from-[#14532D] to-[#166534] hover:from-[#0F3D21] hover:to-[#14532D] border border-[#D4AF37]/40 rounded-xl transition-all cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Add Season Period</span>
            </button>
          )}
        </div>

        {/* 4-Column Seasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasons.map((season) => {
            const Icon = getSeasonIcon(season.season);
            return (
              <div
                key={season.id}
                className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#D6E3DB] shadow-xs flex flex-col justify-between hover:shadow-lg hover:border-[#167041]/50 transition-all duration-300 relative group"
              >
                {isEditing && (
                  <button
                    onClick={() => handleRemoveSeason(season.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-xl bg-[#F4FAF6] text-[#7A9887] hover:text-[#991B1B] transition-colors cursor-pointer"
                    title="Remove season"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                <div>
                  {/* Season Title & Range */}
                  <div className="mb-4 pb-3 border-b border-[#EAF2ED]">
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={season.season}
                          onChange={(e) => handleUpdateSeason(season.id, 'season', e.target.value)}
                          className="w-full font-serif font-bold text-[#0B1E13] bg-[#F4FAF6] border border-[#D6E3DB] rounded-lg p-1.5 text-sm"
                          placeholder="Season Name"
                        />
                        <input
                          type="text"
                          value={season.temperatureRange}
                          onChange={(e) => handleUpdateSeason(season.id, 'temperatureRange', e.target.value)}
                          className="w-full text-xs font-mono font-bold text-[#167041] bg-[#F4FAF6] border border-[#D6E3DB] rounded-lg p-1.5"
                          placeholder="Temperature Range"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-serif font-bold text-[#0B1E13] text-lg leading-tight group-hover:text-[#167041] transition-colors">
                            {season.season}
                          </h3>
                          <div className="p-2 rounded-xl bg-[#EAF5EE] text-[#167041] border border-[#A8D5BA]">
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#0E3820] mt-2">
                          <Thermometer className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span className="bg-[#EAF5EE] px-2 py-0.5 rounded-md border border-[#A8D5BA]">{season.temperatureRange}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <span className="text-[10px] font-mono font-bold text-[#567563] uppercase tracking-wider block mb-1.5">
                      Atmosphere & Highlights
                    </span>
                    {isEditing ? (
                      <textarea
                        value={season.highlights}
                        onChange={(e) => handleUpdateSeason(season.id, 'highlights', e.target.value)}
                        rows={2}
                        className="w-full text-xs text-[#2A4436] bg-[#F4FAF6] border border-[#D6E3DB] rounded-lg p-2"
                        placeholder="Highlights..."
                      />
                    ) : (
                      <p className="text-xs sm:text-sm text-[#3E5C4B] leading-relaxed font-sans font-normal">
                        {season.highlights}
                      </p>
                    )}
                  </div>
                </div>

                {/* Travel Tips in Luxury Pine Pill Container */}
                <div className="pt-3.5 border-t border-[#EAF2ED] bg-[#F4FAF6] -mx-5 -mb-5 p-4 rounded-b-2xl border-b border-[#D6E3DB]">
                  <span className="text-[10px] font-mono font-bold text-[#167041] uppercase tracking-wider block mb-1">
                    Alpine Travel Notes
                  </span>
                  {isEditing ? (
                    <textarea
                      value={season.tips}
                      onChange={(e) => handleUpdateSeason(season.id, 'tips', e.target.value)}
                      rows={2}
                      className="w-full text-xs text-[#2A4436] bg-[#FFFFFF] border border-[#D6E3DB] rounded-lg p-2"
                      placeholder="Visitor tips..."
                    />
                  ) : (
                    <p className="text-xs text-[#2A4436] leading-relaxed font-sans font-medium">
                      {season.tips}
                    </p>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

