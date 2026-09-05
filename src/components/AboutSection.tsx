import React from 'react';
import { Plus, Trash2, Trees } from 'lucide-react';
import { ProfileContent } from '../types';

interface AboutSectionProps {
  about: ProfileContent['aboutSection'];
  isEditing: boolean;
  onUpdate: (updated: ProfileContent['aboutSection']) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  about,
  isEditing,
  onUpdate,
}) => {
  const handleAddParagraph = () => {
    onUpdate({
      ...about,
      paragraphs: [...about.paragraphs, 'Write additional details about history, nature, or geography here...'],
    });
  };

  const handleParagraphChange = (index: number, val: string) => {
    const updated = [...about.paragraphs];
    updated[index] = val;
    onUpdate({ ...about, paragraphs: updated });
  };

  const handleRemoveParagraph = (index: number) => {
    onUpdate({
      ...about,
      paragraphs: about.paragraphs.filter((_, i) => i !== index),
    });
  };

  const handleAddFact = () => {
    onUpdate({
      ...about,
      quickFacts: [...about.quickFacts, { label: 'New Attribute', value: 'Custom detail' }],
    });
  };

  const handleFactChange = (index: number, field: 'label' | 'value', val: string) => {
    const updated = [...about.quickFacts];
    updated[index] = { ...updated[index], [field]: val };
    onUpdate({ ...about, quickFacts: updated });
  };

  const handleRemoveFact = (index: number) => {
    onUpdate({
      ...about,
      quickFacts: about.quickFacts.filter((_, i) => i !== index),
    });
  };

  return (
    <section id="about" className="py-16 sm:py-20 bg-[#F4F8F5] border-b border-[#D6E3DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#D6E3DB]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#167041] uppercase tracking-widest mb-2">
              <Trees className="w-4 h-4 text-[#D4AF37]" />
              <span>[ CHAPTER I • GEOGRAPHY & OLD-GROWTH WOODLAND ]</span>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={about.title}
                onChange={(e) => onUpdate({ ...about, title: e.target.value })}
                className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1E13] border-b-2 border-[#167041] bg-transparent focus:outline-none"
              />
            ) : (
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0B1E13] tracking-tight">
                {about.title}
              </h2>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Narrative Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Lead Summary */}
            {isEditing ? (
              <div>
                <label className="text-xs font-mono font-bold text-[#167041] block mb-1">Overview Summary:</label>
                <textarea
                  value={about.summary}
                  onChange={(e) => onUpdate({ ...about, summary: e.target.value })}
                  rows={3}
                  className="w-full text-base sm:text-lg font-serif italic text-[#0B1E13] bg-[#FFFFFF] border border-[#D6E3DB] rounded-2xl p-4 focus:ring-2 focus:ring-[#167041] focus:outline-none shadow-2xs"
                />
              </div>
            ) : (
              <p className="text-lg sm:text-xl font-serif italic text-[#0F2D1D] leading-relaxed border-l-3 border-[#D4AF37] pl-5 py-1">
                {about.summary}
              </p>
            )}

            {/* Paragraphs */}
            <div className="space-y-4 pt-2">
              {about.paragraphs.map((para, idx) => (
                <div key={idx} className="relative group">
                  {isEditing ? (
                    <div className="flex items-start gap-2">
                      <textarea
                        value={para}
                        onChange={(e) => handleParagraphChange(idx, e.target.value)}
                        rows={3}
                        className="w-full text-sm text-[#274032] bg-[#FFFFFF] border border-[#D6E3DB] rounded-2xl p-4 focus:ring-2 focus:ring-[#167041] focus:outline-none leading-relaxed shadow-2xs"
                        placeholder="Enter paragraph text..."
                      />
                      <button
                        onClick={() => handleRemoveParagraph(idx)}
                        className="p-2 text-[#7A9887] hover:text-[#C25E1A] hover:bg-[#FEF2EB] rounded-xl transition-colors cursor-pointer"
                        title="Delete paragraph"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm sm:text-base text-[#2A4436] leading-relaxed font-sans font-normal">
                      {para}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <button
                onClick={handleAddParagraph}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono font-bold text-[#0E3820] bg-[#EAF5EE] hover:bg-[#DEEBE2] border border-[#A8D5BA] rounded-xl transition-colors cursor-pointer shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5 text-[#167041]" />
                <span>Add Paragraph</span>
              </button>
            )}
          </div>

          {/* Quick Facts Sidebar / Matrix (5 cols) in Luxury Pine Card */}
          <div className="lg:col-span-5 bg-[#FFFFFF] rounded-2xl p-6 border border-[#D6E3DB] shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none" />

            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EAF2ED]">
              <h3 className="font-serif font-bold text-[#0B1E13] text-base flex items-center gap-2">
                <span>Key Geographic Attributes</span>
              </h3>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0E3820] bg-[#EAF5EE] px-2.5 py-0.5 rounded-full border border-[#A8D5BA]">
                Alpine Factsheet
              </span>
            </div>

            <div className="space-y-3">
              {about.quickFacts.map((fact, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 text-xs sm:text-sm py-2.5 border-b border-[#F0F5F2] last:border-0"
                >
                  {isEditing ? (
                    <div className="flex items-center gap-2 w-full">
                      <input
                        type="text"
                        value={fact.label}
                        onChange={(e) => handleFactChange(idx, 'label', e.target.value)}
                        className="w-1/2 p-1.5 text-xs bg-[#F4FAF6] border border-[#D6E3DB] rounded-lg font-semibold text-[#0B1E13]"
                        placeholder="Label"
                      />
                      <input
                        type="text"
                        value={fact.value}
                        onChange={(e) => handleFactChange(idx, 'value', e.target.value)}
                        className="w-1/2 p-1.5 text-xs bg-[#F4FAF6] border border-[#D6E3DB] rounded-lg text-[#0B1E13] font-bold"
                        placeholder="Value"
                      />
                      <button
                        onClick={() => handleRemoveFact(idx)}
                        className="p-1 text-[#7A9887] hover:text-[#C25E1A] cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-[#4F685A] font-mono text-xs uppercase tracking-wide">{fact.label}</span>
                      <span className="font-serif font-bold text-[#0B1E13] text-right">{fact.value}</span>
                    </>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <button
                onClick={handleAddFact}
                className="mt-4 w-full py-2.5 flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-[#0E3820] bg-[#EAF5EE] hover:bg-[#DEEBE2] border border-[#A8D5BA] rounded-xl transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#167041]" />
                <span>Add Attribute</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

