import React, { useState } from 'react';
import { Compass, Plus, Trash2, MapPin, Trees, Sparkles, Footprints, Eye } from 'lucide-react';
import { HighlightCard } from '../types';

interface HighlightsSectionProps {
  highlights: HighlightCard[];
  isEditing: boolean;
  onUpdate: (updated: HighlightCard[]) => void;
}

export const HighlightsSection: React.FC<HighlightsSectionProps> = ({
  highlights,
  isEditing,
  onUpdate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleAddCard = () => {
    const newCard: HighlightCard = {
      id: `hl-${Date.now()}`,
      title: 'New Mountain Trail or Ridge',
      category: 'Pine Trail',
      description: 'Describe the key highlight, scenic viewpoint, old cedar grove, or colonial ridge path...',
      imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
      distance: '1.2 km',
      tag: 'Sanctuary View',
    };
    onUpdate([...highlights, newCard]);
  };

  const handleUpdateCard = (id: string, field: keyof HighlightCard, val: string) => {
    const updated = highlights.map((h) => (h.id === id ? { ...h, [field]: val } : h));
    onUpdate(updated);
  };

  const handleRemoveCard = (id: string) => {
    onUpdate(highlights.filter((h) => h.id !== id));
  };

  const categories: string[] = ['all', ...Array.from(new Set(highlights.map((h) => h.category).filter(Boolean))) as string[]];

  const filteredHighlights = selectedCategory === 'all' 
    ? highlights 
    : highlights.filter((h) => h.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="highlights" className="py-16 sm:py-20 bg-[#EEF5F0] border-b border-[#D6E3DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#D6E3DB]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#167041] uppercase tracking-widest mb-2">
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span>[ CHAPTER II • HIKING TRAILS & VISTAS ]</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1E13] tracking-tight">
              Curated Points of Interest in Kuzagali
            </h2>
            <p className="text-xs sm:text-sm text-[#3E5C4B] mt-1.5 font-sans max-w-xl">
              Notable pine canopy tracks, Himalayan ridgelines, colonial era tracks, and scenic rest stops around Kuzagali.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isEditing && (
              <button
                onClick={handleAddCard}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold text-[#FFFFFF] bg-gradient-to-r from-[#14532D] to-[#166534] hover:from-[#0F3D21] hover:to-[#14532D] border border-[#D4AF37]/40 rounded-xl transition-all cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4 text-[#D4AF37]" />
                <span>Add Pine Attraction</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-[#0E3820] text-[#F3D993] font-bold border border-[#D4AF37]/50 shadow-xs'
                  : 'bg-[#FFFFFF] text-[#476654] border border-[#D6E3DB] hover:bg-[#E2EEE5]'
              }`}
            >
              {cat === 'all' ? 'All Expeditions' : cat}
            </button>
          ))}
        </div>

        {/* Highlights Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredHighlights.map((card) => {
            const isCardEditing = isEditing;
            return (
              <div
                key={card.id}
                className="bg-[#FFFFFF] rounded-2xl border border-[#D6E3DB] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#167041]/50 transition-all duration-300 flex flex-col group relative"
              >
                {/* Image / Banner */}
                <div className="relative h-48 w-full bg-[#07170E] overflow-hidden">
                  <img
                    src={card.imageUrl || 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80'}
                    alt={card.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-90 brightness-95 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081810]/85 via-transparent to-transparent pointer-events-none" />

                  {/* Tag badge */}
                  {card.tag && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#081810]/85 backdrop-blur-xs text-[10px] font-mono font-bold text-[#F3D993] tracking-wider uppercase border border-[#D4AF37]/35 shadow-xs">
                      {card.tag}
                    </span>
                  )}

                  {/* Distance badge */}
                  {card.distance && (
                    <span className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#FFFFFF] drop-shadow-md bg-[#081810]/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      <Footprints className="w-3.5 h-3.5 text-[#34D399]" />
                      <span>{card.distance}</span>
                    </span>
                  )}

                  {isCardEditing && (
                    <button
                      onClick={() => handleRemoveCard(card.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-xl bg-[#991B1B] text-white hover:bg-[#7F1D1D] transition-colors cursor-pointer"
                      title="Delete card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#167041] block mb-1">
                      {isCardEditing ? (
                        <input
                          type="text"
                          value={card.category}
                          onChange={(e) => handleUpdateCard(card.id, 'category', e.target.value)}
                          className="w-full p-1 text-xs bg-[#F4FAF6] border border-[#D6E3DB] rounded-lg font-bold text-[#0E3820]"
                          placeholder="Category"
                        />
                      ) : (
                        card.category
                      )}
                    </span>

                    {isCardEditing ? (
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) => handleUpdateCard(card.id, 'title', e.target.value)}
                        className="w-full p-1.5 text-sm font-serif font-bold bg-[#F4FAF6] border border-[#D6E3DB] rounded-lg text-[#0B1E13] mb-2"
                        placeholder="Title"
                      />
                    ) : (
                      <h3 className="font-serif font-bold text-[#0B1E13] text-lg leading-snug mb-2 group-hover:text-[#167041] transition-colors">
                        {card.title}
                      </h3>
                    )}

                    {isCardEditing ? (
                      <textarea
                        value={card.description}
                        onChange={(e) => handleUpdateCard(card.id, 'description', e.target.value)}
                        rows={3}
                        className="w-full p-2 text-xs text-[#2A4436] bg-[#F4FAF6] border border-[#D6E3DB] rounded-lg"
                        placeholder="Description..."
                      />
                    ) : (
                      <p className="text-xs sm:text-sm text-[#3E5C4B] leading-relaxed font-sans font-normal">
                        {card.description}
                      </p>
                    )}
                  </div>

                  {/* Editing image URL and Tag fields */}
                  {isCardEditing && (
                    <div className="mt-3 pt-3 border-t border-[#EAF2ED] space-y-2 text-xs">
                      <input
                        type="text"
                        value={card.imageUrl || ''}
                        onChange={(e) => handleUpdateCard(card.id, 'imageUrl', e.target.value)}
                        className="w-full p-1.5 text-[11px] bg-[#F4FAF6] border border-[#D6E3DB] rounded-lg text-[#2A4436] truncate"
                        placeholder="Image URL..."
                      />
                      <div className="grid grid-cols-2 gap-1.5">
                        <input
                          type="text"
                          value={card.distance || ''}
                          onChange={(e) => handleUpdateCard(card.id, 'distance', e.target.value)}
                          className="p-1.5 text-[11px] bg-[#F4FAF6] border border-[#D6E3DB] rounded-lg text-[#2A4436]"
                          placeholder="Distance (e.g. 2 km)"
                        />
                        <input
                          type="text"
                          value={card.tag || ''}
                          onChange={(e) => handleUpdateCard(card.id, 'tag', e.target.value)}
                          className="p-1.5 text-[11px] bg-[#F4FAF6] border border-[#D6E3DB] rounded-lg text-[#2A4436]"
                          placeholder="Tag (e.g. Scenic)"
                        />
                      </div>
                    </div>
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


