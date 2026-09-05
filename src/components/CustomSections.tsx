import React from 'react';
import { Layers, Plus, Trash2, Trees, Sparkles } from 'lucide-react';
import { CustomSection } from '../types';

interface CustomSectionsProps {
  customSections: CustomSection[];
  isEditing: boolean;
  onUpdate: (updated: CustomSection[]) => void;
}

export const CustomSections: React.FC<CustomSectionsProps> = ({
  customSections,
  isEditing,
  onUpdate,
}) => {
  const handleAddSection = () => {
    const newSec: CustomSection = {
      id: `cs-${Date.now()}`,
      title: 'Blank Section Title',
      subtitle: 'Click Edit Mode to customize this section with your own text or cards',
      type: 'text',
      content:
        'This is a blank area ready for your custom information, history, travel logs, local guides, or announcements...',
    };
    onUpdate([...customSections, newSec]);
  };

  const handleUpdateSection = (id: string, field: keyof CustomSection, val: any) => {
    const updated = customSections.map((s) => (s.id === id ? { ...s, [field]: val } : s));
    onUpdate(updated);
  };

  const handleRemoveSection = (id: string) => {
    onUpdate(customSections.filter((s) => s.id !== id));
  };

  return (
    <div className="py-16 sm:py-20 bg-[#EEF5F0] border-b border-[#D6E3DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {customSections.map((section, sIndex) => (
          <div
            key={section.id}
            className="mb-12 last:mb-0 bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 border border-[#D6E3DB] shadow-sm relative"
          >
            {isEditing && (
              <button
                onClick={() => handleRemoveSection(section.id)}
                className="absolute top-4 right-4 p-1.5 rounded-xl text-[#7A9887] hover:text-[#991B1B] hover:bg-[#FEF2EB] transition-colors cursor-pointer"
                title="Delete section"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            {/* Section Header */}
            <div className="mb-6 pb-4 border-b border-[#EAF2ED]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#167041] uppercase tracking-widest mb-2">
                <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>[ CHAPTER {sIndex + 6} • CUSTOM ALPINE DOSSIER ]</span>
              </div>

              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => handleUpdateSection(section.id, 'title', e.target.value)}
                    className="w-full text-2xl font-serif font-bold text-[#0B1E13] bg-[#F4FAF6] border border-[#D6E3DB] rounded-xl p-2.5"
                    placeholder="Section Title"
                  />
                  <input
                    type="text"
                    value={section.subtitle || ''}
                    onChange={(e) => handleUpdateSection(section.id, 'subtitle', e.target.value)}
                    className="w-full text-xs font-sans text-[#3E5C4B] bg-[#F4FAF6] border border-[#D6E3DB] rounded-xl p-2"
                    placeholder="Subtitle or description"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1E13] tracking-tight">
                    {section.title}
                  </h2>
                  {section.subtitle && (
                    <p className="text-xs sm:text-sm text-[#3E5C4B] mt-1 font-sans">{section.subtitle}</p>
                  )}
                </>
              )}
            </div>

            {/* Content Area */}
            {isEditing ? (
              <textarea
                value={section.content}
                onChange={(e) => handleUpdateSection(section.id, 'content', e.target.value)}
                rows={5}
                className="w-full text-sm text-[#2A4436] bg-[#F4FAF6] border border-[#D6E3DB] rounded-2xl p-4 focus:ring-2 focus:ring-[#167041] focus:outline-none leading-relaxed font-sans"
                placeholder="Write your custom section content, list, or details here..."
              />
            ) : (
              <div className="prose max-w-none text-[#2A4436] text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans">
                {section.content}
              </div>
            )}
          </div>
        ))}

        {/* Add Blank Section CTA */}
        {isEditing && (
          <div className="text-center mt-6">
            <button
              onClick={handleAddSection}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-dashed border-[#167041]/40 hover:border-[#167041] bg-[#FFFFFF] hover:bg-[#EAF5EE] text-[#0B1E13] hover:text-[#167041] text-xs font-mono font-bold transition-all cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Add Another Section to Custom Dossier</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};


